# SEO Changelog — Local SEO + Integrity Pass

Date: 2026-06-13 · All changes are in `build/` source (regenerate with `node build/build.js`).

| File | Change | SEO purpose | Risk | Validation |
|---|---|---|---|---|
| build/templates.js | `SITE`: legalName "…LLC", `phoneE164`, verified `geo`, `mapsUrl`, derived `mapEmbedUrl`/`directionsUrl`/`ogImage` | Accurate NAP + local signals | Low | Browser schema check |
| build/templates.js | Added `businessSchema()` (LocalBusiness+HomeAndConstructionBusiness, geo, hasMap, areaServed) | Single correct entity, no duplication/drift | Low | 52 JSON-LD blocks parse |
| build/templates.js | Added `mapEmbed()` helper (lazy, titled, reserved box, directions) | Local map + directions, no CLS | Low | DOM: box 522×326, lazy |
| build/templates.js | `head()`: robots meta, real og:image + width/height/alt, Twitter card | Social/share + crawl directives | Low | validate-seo.js |
| build/templates.js | Footer "View our location on Google Maps"; sticky-bar WA message normalized | Local link + brand consistency | Low | grep |
| build/core-pages.js | Home + contact use `businessSchema()` (removed 2 hardcoded blocks w/ stale phone, fake address, wrong geo) | Fix wrong NAP/geo; DRY | Low | no stale phone in output |
| build/core-pages.js | Removed fabricated stat bar -> verifiable value props | Remove fake claims | Low | grep clean |
| build/core-pages.js | Removed 3 fabricated 5-star testimonials -> factual trust section + GBP link | Remove fake reviews (policy) | Low | no ★★★★★ in output |
| build/core-pages.js | Replaced unverified credential badges (licensed/insured/guarantee) on home + about | Remove unsupported claims | Medium (softer trust copy) | grep clean |
| build/core-pages.js | Reframed "licensed & insured" FAQ -> "registered Dubai company" + details on request | Honesty | Low | content |
| build/core-pages.js | Real map embed on contact; directions link on areas; removed TODO map placeholders | Local SEO + remove placeholders | Low | browser |
| build/core-pages.js | Softened response-time + "best rate" claims; "certified"->"trained" | No invented claims | Low | grep |
| build/services-data.js | "certified technicians" -> "trained technicians" (×3) | No unverified certification | Low | grep |
| css/styles.css | `.map-placeholder` -> `.map-embed` (16:10 reserved) + `.map-actions`/`.map-link` | Responsive map, no CLS | Low | DOM |
| build/validate-seo.js | New automated SEO validator | Repeatable QA evidence | None | runs green |
| docs/SEO-*.md/.csv | New required documentation set | Deliverables | None | n/a |
| build/core-pages.js | **Owner-verified restore:** 10+ years (trust bar, FAQ, About story), "Licensed & insured" + "Workmanship guarantee" badges (home + about), affirmative licensed/insured FAQ | Restore strong trust signals now confirmed by owner | Low (owner is the source) | rebuild + grep |

Rollback: all content changes are isolated to `build/` source files; reverting a row and
re-running `node build/build.js` restores prior output. (Note: reverting integrity fixes
would re-introduce fabricated content and is not advised.)
