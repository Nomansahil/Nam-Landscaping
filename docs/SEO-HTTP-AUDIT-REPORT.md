# SEO HTTP / Crawlability / Status Audit — NAM Landscaping

## Environment
| | |
|---|---|
| Framework | **None** — custom Node static-site generator (flat `.html` output) |
| Package manager | None required (npx for the static server) |
| Build command | `node build/build.js` |
| Start command | `npx serve -l 5173 .` (now reads `serve.json` → `cleanUrls:false`, `.html` served at 200) |
| Audit server | `node scripts/seo-http-audit.js` starts an **internal production-faithful** static server (serves `/*.html` at 200, unknown → real 404 with the `/404.html` body) |
| Local base URL (audit) | `http://127.0.0.1:<ephemeral>` (internal) |
| Production mode | Yes — for a static site the generated files **are** the production output (no dev/prod divergence) |
| Crawl date | 2026-06-13 |

## Crawl summary (after fixes)
| Metric | Count |
|---|---|
| URLs discovered | 28 (21 pages + 4 first-party resources + 3 synthetic invalid) |
| Pages crawled | 21 |
| 1xx | 0 |
| 2xx | 25 |
| 3xx | 0 |
| 4xx | 3 (the 3 intentional invalid URLs → correct 404) |
| 5xx | 0 |
| Network failures | 0 |
| Soft 404s | 0 |
| Redirect chains | 0 |
| Redirect loops | 0 |
| Broken internal links | 0 |
| Broken first-party resources | 0 |
| Runtime/console errors | 0 |
| Sitemap URLs (all 200 locally, no redirects) | 20 |
| Robots errors | 0 |
| Canonical errors | 0 |
| **Critical issues remaining** | **0 — audit script exits PASS** |

## Critical errors
None. No public `5xx`, no redirect loops, homepage and all service pages return `200`.

## Redirect findings
- **0 redirect chains / loops** in the production-faithful crawl.
- **Important nuance (local-server artifact, not a code defect):** the *default* `npx serve`
  (without config) has `cleanUrls` **on**, so it 301-redirects `/about.html` → `/about`. The
  site's canonicals, internal links and sitemap all use `.html`, which a `.html`-serving host
  (GitHub Pages) and the now-added `serve.json` (`cleanUrls:false`) return at **200** directly.
  The audit therefore used a `.html`-serving server to reflect production. **Deployment decision
  required** — see `SEO-DEPLOYMENT-STATUS-CHECKLIST.md` §"URL extension policy".

## 4xx findings
- **Correct intentional 404s:** the 3 synthetic invalid URLs (`/__seo-test-...`, `/services/__seo-invalid-...`, `/projects/__seo-invalid-...`) all return a **real `404`** with the new branded `404.html` (single H1, `noindex, follow`, helpful navigation). Not a soft 200.
- **Broken internal links to important pages:** none (0).
- **Public pages incorrectly 4xx:** none.
- **Missing resources:** none.
- **Private routes:** none exist (fully public static site).

## 5xx findings
None — static files cannot raise server errors; the internal audit server returned no 5xx.

## Soft errors
- Soft 404: **0** (invalid paths return a hard 404; no SPA shell fallback — this is not an SPA).
- Empty 200 / missing `<main>`: **0** (every page has one `<main>` and substantial content).
- Error page returning 200: **0** (the 404 page returns status 404).
- Runtime error inside a 200: **0**.

## Canonical, robots & sitemap
- **Canonical:** every indexable page has exactly one absolute `https://namlandscaping.ae/...` canonical; each path maps to a local `200` route; the 404 page is `noindex`.
- **Robots meta:** all indexable pages `index, follow, max-image-preview:large`; `404.html` is `noindex, follow`. No accidental `noindex`.
- **robots.txt:** `200`, `text/plain`, disallows `/build/` `/docs/`, declares the sitemap. No full-site block, no localhost/staging URL.
- **sitemap.xml:** `200`, valid XML, 20 absolute production URLs — all return `200` locally with **no redirects**, all canonical, all indexable, none are the 404/thank-you/search/API.

## Browser runtime errors
Zero console logs/errors across `/`, a service page, `/contact.html`, and `/404.html`. The site is fully static: JS is progressive enhancement only (nav toggle, scroll-reveal, WhatsApp form handoff) — no SPA routing, no hydration, no client-side 404. (The contact-page Google Maps iframe is third-party and was blocked only in the local sandbox; not a first-party error — see deployment checklist.)

## Files changed / created
| File | Change |
|---|---|
| `build/core-pages.js` | Added branded **404 page** (`notFound`, `p:"/"`, `noindex`, root-absolute links) + export |
| `build/templates.js` | `corePage()` now accepts `p` so the 404 emits root-absolute chrome paths |
| `build/build.js` | Passes `c.p` through to `corePage` (now builds 21 pages) |
| `build/check-links.js` | Resolves **root-absolute** hrefs (`/css/...`) from site root (validator fix) |
| `serve.json` | **New** — `cleanUrls:false`, `trailingSlash:false`, `directoryListing:false` so the local server matches a `.html`-serving host |
| `scripts/seo-http-audit.js` | **New** reusable audit (internal server, redirect-follow, soft-404 detection, CSV output, non-zero exit on critical) |
| `package.json` | **New** minimal scripts: `build`, `check-links`, `seo:validate`, `seo:audit:http` |
| `docs/SEO-HTTP-STATUS-AUDIT.csv`, `SEO-REDIRECT-AUDIT.csv`, `SEO-BROKEN-LINKS.csv`, `SEO-BROKEN-RESOURCES.csv`, `SEO-RUNTIME-ERRORS.csv`, `seo-http-audit-summary.json` | **New** evidence files |

## Validation
| Check | Result |
|---|---|
| Production build (`build.js`) | Passed (21 pages) |
| Type check / Lint | Not available (no toolchain — vanilla JS/HTML/CSS) |
| Tests | Passed (`check-links` 21 pages 0 broken; `validate-seo` 52 JSON-LD blocks) |
| Raw HTTP crawl | Passed (PASS, 0 critical) |
| Browser crawl | Passed (0 console errors, rendered metadata correct) |
| Redirect validation | Passed (0 chains/loops on `.html` host) |
| Invalid-route test | Passed (real 404 + branded page) |
| Sitemap validation | Passed (20 URLs, all 200, no redirects) |
| Robots validation | Passed |
| Canonical validation | Passed |
| Internal-link validation | Passed (0 broken / 0 to redirects) |
| Resource validation | Passed (css/js/robots/sitemap all 200, correct MIME) |
| Runtime validation | Passed (0 errors) |

## Remaining errors
None at the code/local level.

## Deployment-only limitations
Live HTTPS, DNS, HTTP→HTTPS, www/non-www, CDN, compression, cache headers, firewall/rate
limits, and **the host's URL-extension behaviour** cannot be proven locally. See
`SEO-DEPLOYMENT-STATUS-CHECKLIST.md`.
