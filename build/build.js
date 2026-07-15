/* Generates the static site. Usage: node build/build.js
   - Standalone service pages
   - 3 merged service pages (pool / landscaping+lighting / water+irrigation)
   - Core pages (home, hub, about, projects, areas, contact, faq, amc, 404)
   - Global link rewrite: any link to a merged-member URL -> merged page + section anchor
   - Minified CSS (self-hosted fonts + styles) and JS
   - sitemap.xml lastmod refreshed to the build date */

const fs = require("fs");
const path = require("path");
const { servicePage, mergedServicePage, MERGED_GROUPS, corePage } = require("./templates");
const services = require("./services-data");
const corePages = require("./core-pages");

const root = path.join(__dirname, "..");
const servicesDir = path.join(root, "services");
fs.mkdirSync(servicesDir, { recursive: true });

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
const memberSlugs = new Set(MERGED_GROUPS.flatMap((g) => g.members.map((m) => m.slug)));
// old member slug -> new relative URL (within /services/) with section anchor
const redirectMap = {};
for (const g of MERGED_GROUPS) for (const m of g.members) redirectMap[m.slug] = `${g.slug}.html#${m.anchor}`;

let count = 0;

// 1. Standalone services (not part of a merge)
for (const s of services) {
  if (memberSlugs.has(s.slug)) continue;
  fs.writeFileSync(path.join(servicesDir, `${s.slug}.html`), servicePage(s));
  count++;
}

// 2. Merged service pages
for (const g of MERGED_GROUPS) {
  fs.writeFileSync(path.join(servicesDir, `${g.slug}.html`), mergedServicePage(g, bySlug));
  count++;
}

// 3. Remove the old merged-member URLs entirely (no redirects — pre-launch, nothing indexed;
//    every internal link already points to the merged pages via the rewrite below).
for (const s of services) {
  if (!memberSlugs.has(s.slug)) continue;
  const f = path.join(servicesDir, `${s.slug}.html`);
  if (fs.existsSync(f)) fs.unlinkSync(f);
}

// 4. Core pages
for (const c of corePages) {
  fs.writeFileSync(path.join(root, c.file), corePage({ meta: c.meta, file: c.file, body: c.body, p: c.p }));
  count++;
}

// 5. Global link rewrite — point every link to a merged member at the merged page + anchor.
const htmlFiles = [
  ...fs.readdirSync(root).filter((f) => f.endsWith(".html")).map((f) => path.join(root, f)),
  ...fs.readdirSync(servicesDir).filter((f) => f.endsWith(".html")).map((f) => path.join(servicesDir, f)),
];
let rewrites = 0;
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [slug, target] of Object.entries(redirectMap)) {
    const re = new RegExp(slug.replace(/[-]/g, "\\-") + "\\.html(?!#)", "g");
    const next = html.replace(re, target);
    if (next !== html) { html = next; changed = true; rewrites++; }
  }
  if (changed) fs.writeFileSync(file, html);
}

// 5b. Clean URL normalisation — strip .html from all internal href attributes so
//     internal navigation never shows the extension in the URL bar. Handles BOTH
//     double- and single-quoted hrefs. External URLs (https://, //) are left
//     untouched. /index(.html) → /.
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, "utf8");
  const cleaned = html.replace(
    /href=(["'])(?!https?:\/\/|\/\/)([^"'#]*?)\.html(#[^"']*)?\1/g,
    (m, q, p, hash) => {
      const clean = (p === "index" || p === "/index") ? "/" : p;
      return `href=${q}${clean}${hash || ''}${q}`;
    }
  );
  if (cleaned !== html) fs.writeFileSync(file, cleaned);
}

// 6. Minify assets. Transforms are direct (no string-protection needed): the only url()
//    data-URI and the content:"x" strings in this stylesheet contain none of the
//    punctuation the strip pass touches, and calc()/space-separated values keep their
//    single spaces (whitespace is collapsed, not removed around + and -).
const minifyCss = (s) =>
  s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
const minifyJs = (s) =>
  s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^[ \t]+/gm, "")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{2,}/g, "\n")
    .trim();

const cssSrc =
  fs.readFileSync(path.join(root, "css", "fonts.css"), "utf8") +
  "\n" +
  fs.readFileSync(path.join(root, "css", "styles.css"), "utf8");
const cssMin = minifyCss(cssSrc);
fs.writeFileSync(path.join(root, "css", "styles.min.css"), cssMin);
const jsMin = minifyJs(fs.readFileSync(path.join(root, "js", "main.js"), "utf8"));
fs.writeFileSync(path.join(root, "js", "main.min.js"), jsMin);
const kb = (n) => (n / 1024).toFixed(1);

// 7. Refresh sitemap.xml <lastmod> and strip .html from <loc> URLs.
const today = new Date().toISOString().slice(0, 10);
const sitemapPath = path.join(root, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  let sm = fs.readFileSync(sitemapPath, "utf8");
  sm = sm.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, "");
  sm = sm.replace(/(<loc>[^<]+?)\.html(<\/loc>)/g, "$1$2");
  sm = sm.replace(/(<loc>[^<]*<\/loc>)/g, `$1<lastmod>${today}</lastmod>`);
  fs.writeFileSync(sitemapPath, sm);
}

console.log(
  `Built ${count} pages (incl. ${MERGED_GROUPS.length} merged service pages, no redirects); rewrote ${rewrites} links to the merged pages.`
);
console.log(
  `Minified: styles.min.css ${kb(Buffer.byteLength(cssMin))} KB (from ${kb(Buffer.byteLength(cssSrc))} KB), main.min.js ${kb(Buffer.byteLength(jsMin))} KB. Sitemap lastmod ${today}.`
);
