# Image Optimization Report — NAM Landscaping

All website images are the **company's own project photos**, processed to WebP and served
from our own domain (`/assets/photos/`). **No external image hosts, no hotlinking, no stock.**
Each of the home "What We Do" service cards uses a **distinct** image (no repeats).

## Per-image summary
| Source photo (orig dims, size) | Local WebP files (responsive widths) | Largest WebP | Savings | Alt text |
|---|---|---|---|---|
| home-hero.jpg (2560×1360, 1127 KB) | `villa-garden-pool-landscaping-dubai-{720/1024/1600}.webp` | 174 KB | 85% | Designed villa garden with a lawn, paved pathway and planting |
| landscaping.jpg (1920×1080, 1023 KB) | `villa-garden-landscaping-design-{480/768/1024/1600}.webp` | 234 KB | 77% | Designed villa garden with raised stone planters, a lawn and stepping stones |
| garden-maintenance.jpg (1280×720, 251 KB) | `garden-maintenance-lawn-care-{480/768/1024/1280}.webp` | 173 KB | 31% | Well-maintained villa garden with a tidy lawn, hedges and seating |
| pool-maintenance.jpg (1024×1024, 204 KB) | `swimming-pool-maintenance-{480/768/1024}.webp` | 157 KB | 23% | Clean villa swimming pool with sun loungers and a dining area |
| pool-cleaning.jpg (1600×1200, 394 KB) | `swimming-pool-cleaning-{480/768/1024/1600}.webp` | 272 KB | 31% | Swimming pool with a paved deck at a villa |
| pool-repair.jpg (1024×1024, 204 KB) *mirrored* | `swimming-pool-repair-{480/768/1024}.webp` | 155 KB | 24% | Swimming pool serviced and restored to clear, balanced water |
| pool-construction.jpg (1600×900, 405 KB) | `swimming-pool-construction-{480/768/1024/1600}.webp` | 303 KB | 25% | Swimming pool under construction at a villa |
| irrigation.jpg (1600×1200, 325 KB) | `garden-planting-irrigation-{480/768/1024/1600}.webp` | 208 KB | 36% | Landscaped planting beds with gravel and irrigation in a villa courtyard |
| artificial-grass.jpg (800×533, 141 KB) | `artificial-grass-installation-{480/600/800}.webp` | 104 KB | 26% | Rolls of artificial grass being installed over a prepared base |
| landscape-lighting.jpg (800×533, 339 KB) | `garden-landscape-lighting-{480/600/800}.webp` | 42 KB | 88% | Garden patio at night with landscape lighting and a fire feature |
| water-feature.jpg (1600×1200, 350 KB) | `garden-fountain-water-feature-{480/768/1024/1600}.webp` | 212 KB | 39% | Circular garden fountain water feature at a large property |
| hardscaping.jpg (2560×1920, 871 KB) | `outdoor-hardscaping-paving-{480/768/1024/1600}.webp` | 230 KB | 74% | Modern hardscaping with pavers, gravel and grass strips at a villa |
| dubai-community.jpg (1600×1200, 355 KB) | `estate-landscaping-courtyard-{480/768/1024/1600}.webp` | 216 KB | 39% | Landscaped estate courtyard with lawns, palms and paved walkways |
| villa-evening.jpg (1600×1200, 351 KB) | `villa-garden-evening-{480/768/1024/1600}.webp` | 234 KB | 33% | Landscaped villa garden with warm lighting in the evening |
| pergola.jpg (1244×786, 188 KB) | `pergola-shade-structure-{480/768/1024/1244}.webp` | 195 KB | -4% | Timber pergola with shaded seating and a fire feature in a villa backyard |

- "Largest WebP" is the desktop size; mobile fetches a much smaller `srcset` variant (480/768 px).
- *mirrored* = the same source reframed by horizontal flip so no two cards repeat (Pool Repair vs Pool Maintenance).

## Totals & performance
- 15 source photos → 55 responsive WebP, **0 unused**.
- LCP home hero: 174 KB @1600 / 40 KB @720 (mobile). All `<img>` (77/77) have srcset + width/height + lazy + alt.
- Source sum 6528 KB → largest-WebP sum 2910 KB (**55% smaller**, and only on-screen size is fetched).
- EXIF stripped; SEO filenames; WebP format; 0 external URLs; validated: build 21 pages, 0 broken links, 52 JSON-LD, HTTP audit PASS.

## Pipeline
`build/photo-map.js` → `npm run photos` (sharp: resize + optional mirror + WebP + manifest) → `npm run build`.
Originals in `assets/photos/originals/` (build-time source; robots-disallowed; exclude from deploy).
