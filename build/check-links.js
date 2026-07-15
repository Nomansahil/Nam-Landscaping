/* Verifies every internal href/src across all HTML pages resolves to a real file. */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pages = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
for (const f of fs.readdirSync(path.join(root, "services"))) {
  if (f.endsWith(".html")) pages.push("services/" + f);
}

let bad = 0;
for (const pg of pages) {
  const html = fs.readFileSync(path.join(root, pg), "utf8");
  const dir = path.dirname(path.join(root, pg));
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const h = m[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(h)) continue;
    const clean = h.split("#")[0];
    if (!clean) continue;
    // Root-absolute hrefs (e.g. /css/styles.css) resolve from the site root;
    // relative hrefs resolve from the current page's directory.
    const base = clean.startsWith("/")
      ? path.join(root, clean)
      : path.resolve(dir, clean);
    // Clean URLs (the build strips .html from internal links) and directory roots
    // resolve to a real file by appending .html or /index.html — mirroring how the
    // site is served. Accept any of these candidate paths as a valid target.
    const candidates = [
      base,
      base + ".html",
      path.join(base, "index.html"),
    ];
    if (!candidates.some((t) => fs.existsSync(t))) {
      console.log(`BROKEN in ${pg}: ${h}`);
      bad++;
    }
  }
}
console.log(bad ? `${bad} broken links` : `All internal links OK across ${pages.length} pages`);
process.exitCode = bad ? 1 : 0;
