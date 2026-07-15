/* Convert real project photos -> responsive WebP, strip metadata, write manifest.
   Usage: npm run photos   (or: node scripts/process-photos.js)
   Reads originals named per build/photo-map.js from assets/photos/originals/,
   writes assets/photos/<base>-<width>.webp + manifest.json that the build consumes.
   Build-time only — sharp is a devDependency; the shipped site has no runtime deps. */
const fs = require("fs");
const path = require("path");
let sharp;
try { sharp = require("sharp"); }
catch { console.error("sharp is not installed. Run: npm install   (sharp is a devDependency)"); process.exit(1); }

const map = require("../build/photo-map");
const root = path.join(__dirname, "..");
const srcDir = path.join(root, map.srcDir);
const outDir = path.join(root, map.outDir);
fs.mkdirSync(outDir, { recursive: true });

// Clean previous outputs so renamed/removed photos never leave stale files behind.
for (const f of fs.readdirSync(outDir)) {
  if (/\.webp$/.test(f) || /-og\.jpg$/.test(f)) fs.unlinkSync(path.join(outDir, f));
}

(async () => {
  const manifest = {};
  let files = 0, totalIn = 0, totalOut = 0;
  const missing = [], done = [];

  for (const [slot, cfg] of Object.entries(map.slots)) {
    const src = path.join(srcDir, cfg.file);
    if (!fs.existsSync(src)) { missing.push(cfg.file); continue; }
    totalIn += fs.statSync(src).size;
    // Never upscale, and collapse requested widths that exceed the source width to one
    // native-width file (avoids byte-identical duplicate sizes).
    const meta = await sharp(src).metadata();
    const srcW = meta.width || Math.max(...cfg.widths);
    const targetWidths = [...new Set(cfg.widths.map((w) => Math.min(w, srcW)))].sort((a, b) => b - a);
    const widths = [];
    for (const w of targetWidths) {
      const out = path.join(outDir, `${cfg.base}-${w}.webp`);
      let pipe = sharp(src).rotate().resize({ width: w, withoutEnlargement: true });
      if (cfg.flip) pipe = pipe.flop();                         // horizontal mirror to differentiate a reused source
      await pipe.webp({ quality: map.quality }).toFile(out);    // sharp strips metadata by default; Lanczos resize keeps downscales crisp
      totalOut += fs.statSync(out).size; widths.push(w); files++;
    }
    manifest[slot] = { base: cfg.base, widths, alt: cfg.alt };
    if (cfg.og) {
      const og = `${cfg.base}-og.jpg`;
      await sharp(src).rotate().resize({ width: 1200, height: 630, fit: "cover" })
        .jpeg({ quality: 78 }).toFile(path.join(outDir, og));   // OG image: JPG for widest scraper support
      manifest.og = `/${map.outDir}/${og}`;
      files++;
    }
    done.push(`${slot} (${widths.join(",")})`);
  }

  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`Processed ${done.length} slots, ${files} files.`);
  if (done.length) console.log("  " + done.join("\n  "));
  if (missing.length) {
    console.log(`\nNot found (drop these into ${map.srcDir}/ and re-run):`);
    console.log("  " + missing.join("\n  "));
  }
  if (totalOut) console.log(`\nInput ${(totalIn / 1024).toFixed(0)}KB -> WebP ${(totalOut / 1024).toFixed(0)}KB` +
    ` (${totalIn ? (100 - (totalOut / totalIn) * 100).toFixed(0) : 0}% smaller)`);
  console.log("\nNext: node build/build.js   (the build now uses the local photos via manifest.json)");
})();
