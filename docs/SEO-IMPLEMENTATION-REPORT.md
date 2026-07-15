# SEO Implementation Report — NAM Landscaping

## Executive summary
This pass integrated **newly verified business data** (Google Business Profile, real
coordinates, legal name "Noor Al Madeena Landscaping LLC", phone +971 55 817 0150),
implemented local SEO (map embed, directions, geo + `hasMap` schema, centralized NAP),
and removed **fabricated content** (fake reviews, invented stats, unverified
credential/guarantee claims, placeholder address, TODO comments) in line with a strict
no-fabrication policy. All 20 pages rebuild cleanly and pass automated validation.

## Project architecture
- **Framework:** none. Hand-built static site.
- **Rendering:** static generation at build time (`node build/build.js`).
- **Routing:** flat files (`*.html`, `services/*.html`).
- **Metadata system:** single `head()` partial in `build/templates.js` (title, description,
  robots, canonical, OG, Twitter, schema) — one source of truth, no per-file duplication.
- **Structured data:** reusable helpers — `businessSchema()`, `breadcrumbSchema()`,
  `faqSchema()`, plus per-page `Service`/`ContactPage`/`AboutPage`/`WebSite`.
- **Sitemap/robots:** static `sitemap.xml` (20 canonical URLs) + `robots.txt` (disallows
  `/build/`, `/docs/`; references sitemap).
- **Deployment assumption:** any static host (Netlify/Cloudflare Pages/GitHub Pages),
  production host `https://namlandscaping.ae` (canonical; update if real domain differs).

## Files changed this pass
| File | Purpose of change |
|---|---|
| `build/templates.js` | New verified `SITE` config (LLC name, phone E.164, geo, maps/ directions/OG URLs); `businessSchema()` + `mapEmbed()` helpers; Twitter/OG-image/robots in `head()`; footer maps link; sticky-bar WA message; exports |
| `build/core-pages.js` | Home + contact now use `businessSchema()`; removed fake stats + fake reviews; honest trust section; real map embed on contact; directions link on areas; removed unverified badges; reframed "licensed/insured" FAQ; softened response-time + price claims; "certified"->"trained"; removed TODO comments |
| `build/services-data.js` | "certified technicians" -> "trained technicians" (3 places) |
| `css/styles.css` | Replaced `.map-placeholder` with responsive `.map-embed` (16:10 reserved box, no CLS) + `.map-actions` / `.map-link` |
| `build/validate-seo.js` | **New** automated validator (titles/desc uniqueness, H1, canonical, robots, OG/Twitter, JSON-LD parse, stale-phone) |
| `docs/SEO-*.md / .csv` | **New** required documentation set |

## On-page SEO
- Titles & meta descriptions: unique across all 20 pages (validated). Keyword-first,
  Dubai-modified, brand-suffixed.
- Headings: exactly one `<h1>` per page (validated); logical H2/H3 sections.
- Internal linking: header mega-nav to all services; footer service columns; per-service
  related-service clusters; every page routes to `/contact.html`. All links validated
  (`check-links.js`: 0 broken).
- Social: OG + Twitter `summary_large_image` with real 1200×630 image, dimensions, alt.

## Local SEO
- **NAP centralized** in `SITE` and used everywhere (header/footer/contact/schema/sticky bar).
- **Map:** one interactive key-free Google Maps embed on contact; lighter "Get Directions"
  links on areas page + footer (avoids heavy iframes site-wide).
- **Directions:** official `maps/dir/?api=1&destination=<lat,lng>` link.
- **Schema:** `["LocalBusiness","HomeAndConstructionBusiness"]` with verified `telephone`,
  `geo`, `hasMap`, `areaServed` (Dubai + genuine communities), `legalName`/`alternateName`,
  `openingHoursSpecification`; stable `@id` referenced by all `Service.provider` and page `about`.
- **Service-area model:** no fabricated street address; presents as serving Dubai.

## Technical SEO
- Indexability intentional: all 20 pages `index, follow, max-image-preview:large`; no
  noindex/thank-you pages (lead capture is a WhatsApp/mailto handoff, no separate URL).
- Canonicals: absolute, self-referencing, https, match sitemap (validated).
- Sitemap/robots: consistent host; sitemap lists only the 20 canonical 200 URLs.
- JS SEO: content is fully in static HTML; JS is progressive enhancement only.
- Mobile: responsive, no horizontal overflow (verified, scrollWidth delta = 0).
- Performance: WebP everywhere, responsive 1600/720 heroes with media-scoped preload,
  lazy below-fold images with width/height (no CLS), single CSS, deferred JS, map lazy +
  reserved aspect box.

## Lead-generation
- Call (`tel:+971558170150`), WhatsApp (`wa.me/971558170150` with pre-filled per-service
  messages), Email (`mailto:`) on every page (sticky bar + CTA bands + hero).
- Quote form with labelled fields + WhatsApp handoff (`data-whatsapp`).
- Get Directions CTA added.

## Validation results
| Check | Result |
|---|---|
| `node build/build.js` | Passed — 20 pages |
| `node build/check-links.js` | Passed — 0 broken internal links |
| `node build/validate-seo.js` | Passed — 20 pages, 52 JSON-LD blocks parse, unique titles/descriptions, 1 H1 each, canonical+robots+OG+Twitter present, no stale phone |
| Placeholder/fake-content grep | Passed — no TODO/placeholder/fake review/stale data in output |
| Browser (contact map) | Map box renders with reserved dimensions, lazy, titled; directions link works; **iframe content blank in local sandbox** (third-party frame `ERR_ABORTED`) — verify on live domain |
| Browser (schema) | LocalBusiness type/phone/geo/hasMap/legalName confirmed live |

## Remaining limitations / owner actions
See `SEO-CONTENT-GAPS.md` (owner-supplied facts/photos/reviews) and
`SEO-DEPLOYMENT-CHECKLIST.md` (live-host + Search Console + GBP). Notably: confirm address
model, hours, licence/insurance, guarantee terms; supply real photos, reviews, stats,
social URLs, and a branded OG cover.
