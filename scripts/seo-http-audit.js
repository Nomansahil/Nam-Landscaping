/* ============================================================================
   seo-http-audit.js — local HTTP / crawlability / SEO status audit
   ----------------------------------------------------------------------------
   Static site (flat .html). By default this script starts its OWN static server
   with PRODUCTION-FAITHFUL semantics (serves /foo.html at 200, unknown paths
   return a real 404 with the body of /404.html) so the crawl reflects a
   .html-serving host (e.g. GitHub Pages) — NOT the local `npx serve` default
   (which has cleanUrls on and 301-redirects /foo.html -> /foo).

   Usage:
     node scripts/seo-http-audit.js                 # internal server (default)
     node scripts/seo-http-audit.js --base http://localhost:5173   # crawl external
   Output: docs/*.csv evidence files + console summary. Exit 1 on critical issues.
   ============================================================================ */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "docs");
const PROD_ORIGIN = "https://namlandscaping.ae";
const MAX_HOPS = 5;

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".svg": "image/svg+xml",
  ".xml": "application/xml", ".txt": "text/plain; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf",
};

/* --- internal production-faithful static server ----------------------------- */
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split("?")[0]);
      if (urlPath === "/") urlPath = "/index.html";
      const rel = urlPath.replace(/^\/+/, "");
      const file = path.join(ROOT, rel);
      // contain within ROOT
      if (!file.startsWith(ROOT)) { res.writeHead(400); return res.end("bad"); }
      if (fs.existsSync(file) && fs.statSync(file).isFile()) {
        const ext = path.extname(file).toLowerCase();
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        return res.end(fs.readFileSync(file));
      }
      // not found -> real 404, serve custom 404.html body if present
      const np = path.join(ROOT, "404.html");
      const body = fs.existsSync(np) ? fs.readFileSync(np) : Buffer.from("404 Not Found");
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(body);
    });
    server.listen(0, "127.0.0.1", () => resolve({ server, base: `http://127.0.0.1:${server.address().port}` }));
  });
}

/* --- single request, no redirect follow ------------------------------------ */
function req(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    const r = http.get(url, { headers: { "User-Agent": "seo-http-audit/1.0" } }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const buf = Buffer.concat(chunks);
        resolve({
          status: res.statusCode, headers: res.headers,
          location: res.headers.location || "",
          contentType: res.headers["content-type"] || "",
          xRobots: res.headers["x-robots-tag"] || "",
          size: buf.length, body: buf.toString("utf8"), ms: Date.now() - start,
        });
      });
    });
    r.on("error", (e) => resolve({ status: 0, error: e.message, headers: {}, location: "", contentType: "", size: 0, body: "", ms: Date.now() - start }));
    r.setTimeout(15000, () => { r.destroy(); resolve({ status: 0, error: "timeout", headers: {}, location: "", contentType: "", size: 0, body: "", ms: 15000 }); });
  });
}

/* --- follow redirects, capture chain --------------------------------------- */
async function crawl(url) {
  const chain = []; let cur = url, hops = 0, loop = false;
  const seen = new Set();
  let res = await req(cur);
  while (res.status >= 300 && res.status < 400 && res.location && hops < MAX_HOPS) {
    chain.push({ from: cur, status: res.status, to: res.location });
    const next = new URL(res.location, cur).href;
    if (seen.has(next)) { loop = true; break; }
    seen.add(next); cur = next; hops++;
    res = await req(cur);
  }
  return { requested: url, finalUrl: cur, final: res, chain, hops, loop };
}

/* --- HTML parsing helpers --------------------------------------------------- */
const pick = (re, s) => { const m = s.match(re); return m ? m[1].trim() : ""; };
function parse(html) {
  return {
    title: pick(/<title>([^<]*)<\/title>/i, html),
    canonical: pick(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i, html),
    robots: pick(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i, html),
    h1count: (html.match(/<h1[\s>]/gi) || []).length,
    hasMain: /<main[\s>]/i.test(html),
    mainText: (html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()).length,
  };
}
function softness(status, p, body, contentType) {
  const lc = body.toLowerCase();
  const signals = [];
  // Only HTML documents can be "soft 404s". Fonts/images/other binaries are resources.
  if (status === 200 && /text\/html/.test(contentType || "")) {
    if (/page not found|404|does not exist|no results found/.test(lc) && p.h1count <= 1 && p.mainText < 400) signals.push("not-found-text");
    if (!p.hasMain) signals.push("no-main");
    if (p.mainText < 200) signals.push("thin-body");
    if (/internal server error|stack trace|application error|failed to load/.test(lc)) signals.push("soft-500");
  }
  return signals;
}

/* --- URL discovery ---------------------------------------------------------- */
function listHtml() {
  const out = ["index.html"];
  for (const f of fs.readdirSync(ROOT)) if (f.endsWith(".html")) out.push(f);
  for (const f of fs.readdirSync(path.join(ROOT, "services"))) if (f.endsWith(".html")) out.push("services/" + f);
  return [...new Set(out)];
}
function toLocal(base, u) { return u.startsWith(PROD_ORIGIN) ? base + (u.slice(PROD_ORIGIN.length) || "/") : u; }

function discover(base) {
  const pages = new Set(), resources = new Set(), links = [];
  // sitemap
  const sm = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
  const sitemapUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const sitemapLocal = sitemapUrls.map((u) => toLocal(base, u));
  // scan every html for links + resources
  for (const rel of listHtml()) {
    const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
    const pageUrl = base + "/" + rel;
    for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const h = m[1];
      if (/^(mailto:|tel:|data:|#)/.test(h)) continue;
      if (/^https?:/.test(h)) {
        if (h.startsWith(PROD_ORIGIN)) { /* canonical/og self refs: tracked separately */ }
        continue; // external (wa.me, google maps) handled separately
      }
      const abs = new URL(h, pageUrl).href.split("#")[0];
      if (!abs.startsWith(base)) continue;
      const isRes = /\.(css|js|svg|png|jpe?g|webp|ico|xml|txt)$/i.test(abs);
      if (isRes) resources.add(abs); else pages.add(abs);
      links.push({ source: rel, anchor: "", dest: abs, raw: h, type: isRes ? "resource" : "page" });
    }
  }
  // canonical pages from sitemap
  sitemapLocal.forEach((u) => pages.add(u));
  // robots + sitemap endpoints
  resources.add(base + "/robots.txt"); resources.add(base + "/sitemap.xml");
  // invalid test URLs
  const invalid = [
    base + "/__seo-test-nonexistent-page-928374/",
    base + "/services/__seo-invalid-service-928374/",
    base + "/projects/__seo-invalid-project-928374/",
  ];
  return { pages: [...pages], resources: [...resources], links, sitemapUrls, sitemapLocal, invalid };
}

/* --- main ------------------------------------------------------------------- */
(async () => {
  const baseArg = process.argv.indexOf("--base");
  let base, server;
  if (baseArg > -1) { base = process.argv[baseArg + 1]; }
  else { const s = await startServer(); base = s.base; server = s.server; }
  console.log(`Crawling base: ${base}\n`);

  const { pages, resources, links, sitemapUrls, sitemapLocal, invalid } = discover(base);
  const counts = { "1xx": 0, "2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0, net: 0 };
  const bucket = (s) => s === 0 ? "net" : s < 200 ? "1xx" : s < 300 ? "2xx" : s < 400 ? "3xx" : s < 500 ? "4xx" : "5xx";
  let critical = 0, soft404 = 0, chains = 0, loops = 0;
  const statusRows = [], redirectRows = [], resourceRows = [];

  // crawl pages
  for (const url of pages) {
    const r = await crawl(url);
    const f = r.final; counts[bucket(f.status)]++;
    const p = f.body ? parse(f.body) : {};
    const soft = f.status === 200 ? softness(200, p, f.body, f.contentType) : [];
    if (soft.length) soft404++;
    if (r.chain.length) chains++;
    if (r.loop) { loops++; critical++; }
    const inboundCount = links.filter((l) => l.dest === url).length;
    const inSitemap = sitemapLocal.includes(url);
    let severity = "OK", issue = "";
    if (f.status >= 500) { severity = "Critical"; issue = "server error"; critical++; }
    else if (f.status >= 400) { severity = "High"; issue = "client error on linked page"; }
    else if (soft.length) { severity = "High"; issue = "soft error: " + soft.join(","); }
    else if (r.chain.length) { severity = "Medium"; issue = "redirect before 200"; }
    statusRows.push([
      url, "scan/sitemap", "page", "200", r.chain[0] ? r.chain[0].status : f.status,
      r.chain.map((c) => c.status).join(">"), r.finalUrl, f.status, f.contentType,
      (p.robots || "").includes("noindex") ? "no" : "yes", p.robots || "", f.xRobots || "",
      p.canonical || "", "", csvq(p.title || ""), p.h1count ?? "", p.hasMain ? "yes" : "no",
      soft.length ? "yes" : "no", inboundCount, inSitemap ? "yes" : "no", severity, issue, "", f.status, "",
    ]);
    if (r.chain.length) {
      redirectRows.push([url, r.chain[0].status, r.chain[0].to, hop(r, 0), hop(r, 1), hop(r, 2),
        r.finalUrl, f.status, r.loop ? "yes" : "no", r.hops, inboundCount, inSitemap ? "yes" : "no",
        p.canonical || "", "local-server", "n/a", "redirect chain", "", f.status]);
    }
  }

  // invalid URLs -> must be 404
  for (const url of invalid) {
    const r = await crawl(url); const f = r.final; counts[bucket(f.status)]++;
    const p = f.body ? parse(f.body) : {};
    const ok = f.status === 404;
    if (!ok) critical++;
    statusRows.push([url, "synthetic-invalid", "invalid", "404", f.status, "", r.finalUrl, f.status,
      f.contentType, "n/a", p.robots || "", "", "", "", csvq(p.title || ""), p.h1count ?? "",
      p.hasMain ? "yes" : "no", f.status === 200 ? "yes" : "no", 0, "no",
      ok ? "OK" : "Critical", ok ? "correct 404" : "invalid URL did not 404", "", f.status, ok ? "real 404 + custom page" : ""]);
  }

  // resources
  for (const url of resources) {
    const r = await crawl(url); const f = r.final; counts[bucket(f.status)]++;
    const ext = path.extname(url.split("?")[0]).toLowerCase();
    const htmlForAsset = /^(\.css|\.js|\.svg|\.xml|\.txt|\.png|\.jpe?g|\.webp|\.ico)$/.test(ext) && /text\/html/.test(f.contentType);
    let sev = "OK", issue = "";
    if (f.status >= 400) { sev = "Critical"; issue = "resource error"; critical++; }
    else if (htmlForAsset) { sev = "High"; issue = "HTML returned for asset"; }
    else if (r.chain.length) { sev = "Medium"; issue = "resource redirect"; }
    resourceRows.push([url, url, ext.replace(".", "") || "?", f.status, r.finalUrl, f.contentType, "", "first-party", issue, "", f.status]);
  }

  // sitemap validation (each sitemap URL must be 200 locally)
  let sitemapErrors = 0;
  for (const u of sitemapLocal) {
    const r = await crawl(u);
    if (r.final.status !== 200 || r.chain.length) sitemapErrors++;
  }

  fs.mkdirSync(OUT, { recursive: true });
  writeCsv("SEO-HTTP-STATUS-AUDIT.csv",
    ["Requested URL","URL source","Page type","Expected status","Initial status","Redirect chain","Final URL","Final status","Content type","Indexable","Meta robots","X-Robots-Tag","Canonical","Canonical local status","Title","H1 count","Main content present","Soft 404 suspected","Internal links to URL","Sitemap inclusion","Severity","Issue","Fix applied","Final retest status","Notes"],
    statusRows);
  writeCsv("SEO-REDIRECT-AUDIT.csv",
    ["Source URL","Status","Location","Hop 1","Hop 2","Hop 3","Final URL","Final status","Loop","Number of hops","Internal links pointing to source","Sitemap inclusion","Canonical reference","Redirect purpose","Correct redirect type","Issue","Fix","Retest"],
    redirectRows);
  writeCsv("SEO-BROKEN-RESOURCES.csv",
    ["Page","Resource URL","Resource type","Status","Final URL","Content type","Console error","First-party or third-party","Issue","Fix","Retest"],
    resourceRows);

  // broken internal links = links whose dest final status >= 400 or redirected
  const linkRows = [];
  const destCache = {};
  for (const l of links) {
    if (!(l.dest in destCache)) { const r = await crawl(l.dest); destCache[l.dest] = r; }
    const r = destCache[l.dest]; const f = r.final;
    const broken = f.status >= 400; const redir = r.chain.length > 0;
    if (broken || redir) {
      linkRows.push([l.source, l.anchor, l.raw, "raw", r.chain[0] ? r.chain[0].status : f.status,
        r.finalUrl, r.hops, "internal", "", broken ? "links to " + f.status : "links to redirect", "", f.status]);
    }
  }
  writeCsv("SEO-BROKEN-LINKS.csv",
    ["Source page","Anchor text","Destination","Raw or rendered DOM","Status","Final destination","Redirect hops","Internal or external","Canonical destination","Issue","Fix","Retest"],
    linkRows);

  // summary
  const summary = {
    base, urlsDiscovered: pages.length + resources.length + invalid.length,
    pagesCrawled: pages.length, resources: resources.length, invalidTested: invalid.length,
    counts, soft404, redirectChains: chains, redirectLoops: loops,
    brokenLinks: linkRows.length, brokenResources: resourceRows.filter((r) => Number(r[3]) >= 400).length,
    sitemapErrors, sitemapUrls: sitemapUrls.length, critical,
  };
  fs.writeFileSync(path.join(OUT, "seo-http-audit-summary.json"), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\n${critical === 0 ? "PASS — no critical HTTP/SEO issues" : "FAIL — " + critical + " critical issue(s)"}`);
  if (server) server.close();
  process.exit(critical ? 1 : 0);

  function hop(r, i) { return r.chain[i] ? r.chain[i].to : ""; }
})();

function csvq(s) { return String(s).replace(/"/g, "'").replace(/[\r\n]+/g, " "); }
function writeCsv(name, header, rows) {
  const esc = (v) => { v = v == null ? "" : String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
  const out = [header.join(",")].concat(rows.map((r) => r.map(esc).join(","))).join("\n");
  fs.writeFileSync(path.join(OUT, name), out + "\n");
  console.log(`wrote docs/${name} (${rows.length} rows)`);
}
