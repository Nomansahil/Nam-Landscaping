# Production-Readiness, SEO, LLM & Performance Optimization — NAM Landscaping

**Date:** 2026-06-15
**Scope:** Full codebase audit + implementation. Static site generator (no framework):
`build/*.js` → flat HTML, single stylesheet, one progressive-enhancement JS file.

This pass focused on the **genuine remaining gaps**. The site already had (from prior
passes) one canonical per page, absolute self-referencing canonicals, complete
OG/Twitter, LocalBusiness + Service + FAQ + Breadcrumb + WebPage JSON-LD, a clean
mobile-first single stylesheet, deferred JS, responsive WebP with width/height (no CLS),
no redirects/redirect chains, a real branded 404, robots.txt + sitemap, and semantic
HTML (`header/nav/main/section/article/footer`). Those were verified, not redone.

---

## Issues found & fixes implemented (this pass)

### 1. Render-blocking third-party fonts → self-hosted (LCP, privacy, consistency)
- **Before:** `<link>` to `fonts.googleapis.com` (render-blocking external CSS) + 2
  `preconnect`s to Google. Every page paid a third-party DNS/TLS/round-trip before text
  could paint, and leaked visitor IPs to Google (GDPR-relevant).
- **After:** Fonts self-hosted. `scripts/fetch-fonts.js` downloads **only the Latin +
  Latin-ext subsets** of Fraunces & Inter (4 woff2, ~257 KB, `font-display: swap`) into
  `assets/fonts/`, generates `css/fonts.css`, and the build concatenates that into the
  single stylesheet. The two critical Latin files are `<link rel="preload" as="font">`ed.
  **Zero** `googleapis`/`gstatic` references remain in any HTML. Matches the existing
  "no external image hosts" policy.

### 2. CSS & JS minification at build time
- **Before:** unminified `styles.css` (42.2 KB) and `main.js` served directly.
- **After:** `build.js` emits `css/styles.min.css` (**33.8 KB**, fonts + styles in one
  request) and `js/main.min.js` (**3.5 KB**). The minifier protects the `url()` data-URI
  and `content:"…"` strings and preserves `calc()` spacing (verified intact). Source files
  stay readable for editing; the chrome references the `.min` outputs.

### 3. Structured-data rating mismatch (would suppress the rich result)
- **Before:** visible rating showed **4.2** but `AggregateRating` emitted **5.0** — a
  visible-vs-structured mismatch Google treats as a violation (rich result dropped /
  possible manual action).
- **After:** `AggregateRating.ratingValue` = **4.2** (matches the visible summary), plus
  `worstRating: 1`. The 8 owner-supplied reviews remain individual `Review` nodes.

### 4. Carousel accessibility
- **Before:** the seamless loop duplicates all 8 review cards; screen readers announced
  every review **twice**.
- **After:** the clone set is `aria-hidden="true"`; the carousel is a labelled `role="region"`.
  Under `prefers-reduced-motion`, the auto-scroll stops and the strip becomes a
  manually-swipeable, scroll-snapped row with clones hidden (no content is trapped).

### 5. Dead code & placeholder removal (technical debt)
- Removed the unused `redirectStub()` function (~24 lines) and its export — no longer
  called after redirects were dropped.
- Removed the now-pointless meta-refresh skip in `validate-seo.js`.
- Fixed the placeholder WhatsApp fallback in `main.js` (`971500000000` → real
  `971558170150`).
- Removed a dev "…when ready" note and stale header comments referencing redirect stubs.

### 6. Sitemap freshness
- `build.js` now stamps a current `<lastmod>` on every `<loc>` (2026-06-15) on each build.

### 7. Host config: caching + security headers
- Added `_headers` (Netlify / Cloudflare Pages): long cache for fonts/photos, daily
  revalidation for CSS/JS, short cache for HTML, plus `X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security`.
  (Ignored by GitHub Pages — replicate there if that's the host. CSP intentionally left
  for deploy-time tuning because of the Google Maps iframe + a few inline style attrs.)

### 8. Audit tooling correctness
- `seo-http-audit.js` now serves `.woff2/.woff/.ttf` with correct `font/*` MIME and only
  applies the soft-404 heuristic to `text/html`. This removed **2 false-positive soft-404s**
  (the preloaded fonts were being judged as pages with no `<main>`).

---

## Before → after

| Metric | Before | After |
|---|---|---|
| Render-blocking third-party requests | 1 CSS + 2 preconnects (Google) | 0 |
| Font hosting | Google CDN (external) | Self-hosted, 2 preloaded, `swap` |
| Stylesheet delivered | 42.2 KB unmin, separate font CSS | 33.8 KB minified, single request |
| JS delivered | unminified | 3.5 KB minified |
| Reviews `AggregateRating` | 5.0 (mismatch vs visible 4.2) | 4.2 (matches) |
| Review cards announced by SR | ×2 (clones read) | ×1 (clones `aria-hidden`) |
| Sitemap `lastmod` | none | present on all URLs |
| Dead code / placeholders | redirectStub + fake fallback no. | removed |
| HTTP audit soft-404s | 2 (false positives) | 0 |

## Validation (all green)
- `node build/build.js` → 16 pages, minified assets, sitemap stamped.
- `node build/check-links.js` → 0 broken links across 16 pages.
- `node build/validate-seo.js` → 44 JSON-LD blocks valid, unique titles/descriptions, 1 H1
  each, canonical/robots/OG/Twitter present.
- `node scripts/seo-http-audit.js` → **PASS, 0 critical**, 0 redirect chains/loops, 0 broken
  resources, 0 soft-404s.
- Browser: **0 console errors, 0 failed network requests**; self-hosted fonts load on home
  and service pages; dark-section contrast intact (white `<strong>`).

---

## Genuinely blocked without external access / owner-provided data
These cannot be completed from the codebase alone:
1. **Live-host items** — HTTPS enforcement, HTTP→HTTPS, www↔non-www canonical host, real
   Brotli/GZIP, TTFB, CDN, and applying `_headers`/CSP. Tracked in `SEO-DEPLOYMENT-CHECKLIST.md`.
2. **Search Console / GBP** — submitting the sitemap, indexing requests, and confirming the
   `AggregateRating` matches the live Google profile total.
3. **Owner facts** (`SEO-CONTENT-GAPS.md`) — exact trade-licence number, social profile URLs
   (for `sameAs`), a branded 1200×630 OG cover, real project street locations, and confirmation
   of the published street address (currently a service-area model).
