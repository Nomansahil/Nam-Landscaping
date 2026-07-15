/* Automated SEO validation across all generated HTML.
   Run: node build/validate-seo.js   (exits non-zero on any failure) */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const files = [];
for (const f of fs.readdirSync(ROOT)) if (f.endsWith(".html")) files.push(f);
const svcDir = path.join(ROOT, "services");
for (const f of fs.readdirSync(svcDir)) if (f.endsWith(".html")) files.push("services/" + f);

let problems = 0;
const fail = (file, msg) => { problems++; console.log(`  ✗ [${file}] ${msg}`); };

const titles = new Map();
const descs = new Map();
let jsonldBlocks = 0;

for (const rel of files) {
  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");

  // Title
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!title) fail(rel, "missing <title>");
  else { titles.set(title, (titles.get(title) || 0) + 1); }

  // Meta description
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!desc) fail(rel, "missing meta description");
  else descs.set(desc, (descs.get(desc) || 0) + 1);

  // Robots
  if (!/<meta name="robots"/.test(html)) fail(rel, "missing robots meta");

  // Canonical (absolute, https)
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (!canon) fail(rel, "missing canonical");
  else if (!/^https:\/\//.test(canon)) fail(rel, `canonical not absolute https: ${canon}`);

  // Exactly one H1
  const h1count = (html.match(/<h1[ >]/g) || []).length;
  if (h1count !== 1) fail(rel, `expected 1 <h1>, found ${h1count}`);

  // OG + Twitter image
  if (!/<meta property="og:image"/.test(html)) fail(rel, "missing og:image");
  if (!/<meta name="twitter:card"/.test(html)) fail(rel, "missing twitter:card");

  // Phone links use verified number; no stale placeholder
  if (html.includes("tel:+971500000000")) fail(rel, "stale placeholder phone tel:+971500000000");

  // JSON-LD parses
  const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  for (const b of blocks) {
    jsonldBlocks++;
    const json = b.replace(/<script type="application\/ld\+json">/, "").replace(/<\/script>/, "").trim();
    try { JSON.parse(json); } catch (e) { fail(rel, `invalid JSON-LD: ${e.message}`); }
  }
}

// Duplicate titles / descriptions
for (const [t, n] of titles) if (n > 1) fail("(global)", `duplicate <title> x${n}: ${t}`);
for (const [d, n] of descs) if (n > 1) fail("(global)", `duplicate meta description x${n}`);

console.log(`\nChecked ${files.length} pages, ${jsonldBlocks} JSON-LD blocks.`);
if (problems === 0) console.log("All SEO validation checks passed.");
else { console.log(`${problems} problem(s) found.`); process.exit(1); }
