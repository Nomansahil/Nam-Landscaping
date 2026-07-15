# YouTube Video Integration — NAM Landscaping

**Date:** 2026-06-17
**Method:** Performance-first vertical-Shorts gallery with click-to-load facade + VideoObject schema
**Source:** 9 real videos from [youtube.com/@NamLandscaping-009](https://www.youtube.com/@NamLandscaping-009) (verified channel "Nam Landscaping")

---

## 1. Integration method

**YouTube Facade Pattern** — the industry-standard way to embed YouTube without the performance cost of iframes.

- Each video renders as a static `<img>` thumbnail + an accessible `<button>` play overlay
- **No `<iframe>`, no YouTube JavaScript, no YouTube network request at page load**
- On play-click, a tiny script replaces the facade with a live `<iframe src="youtube.com/embed/ID?autoplay=1&rel=0">` — only then does YouTube's player load
- Verified live in-browser: before click `iframe` count = 0; after click the facade is replaced by an autoplaying iframe

The videos are **vertical Shorts (9:16)**, presented as a **single-row horizontal carousel** (one scrolling lane, identical on mobile and laptop) rather than a wrapping grid — matching how Shorts are consumed, with no letterboxing. Swipe on touch; prev/next arrows + scroll on desktop; CSS `scroll-snap` keeps cards aligned.

---

## 2. Performance impact

| Metric | At page load |
|---|---|
| YouTube iframes | **0** |
| YouTube player JS | **0** |
| Render-blocking video assets | **0** |
| Extra requests | Only lazy-loaded thumbnail images (`i.ytimg.com`), fetched as cards near the viewport |
| Stylesheet | 36.8 KB minified (one request, unchanged delivery model) |
| JS | 4.5 KB minified |
| LCP impact | None — thumbnails are below the fold and lazy |
| CLS | **0** — `aspect-ratio: 9/16` reserves exact card space before the image loads |

YouTube player code loads **only** when a user clicks play. The site stays fast on mobile and desktop regardless of how many videos are added.

---

## 3. The 9 videos (real IDs + on-page captions)

The raw YouTube titles are hashtag strings (e.g. `landscaping#plants#pool#dudai#UAE`), unsuitable as on-page headings, so each card uses a clean, accurate caption describing the clip. Real video IDs are preserved exactly.

| # | Video ID | On-page caption | Tag |
|---|---|---|---|
| 1 | `Ee-Fh3KKrug` | Landscaping & Pool Care in Dubai | Landscaping |
| 2 | `qE9fq0EzN0c` | Pool Maintenance, Repair & Construction | Pool Services |
| 3 | `6XJO1rOLb6s` | A Landscaping & Pool Project in Dubai | Project |
| 4 | `-gkezMCzG3k` | Pool Design & Garden Landscaping | Pool Design |
| 5 | `w3d9FhEEdok` | Planting & Garden Greenery in Dubai | Planting |
| 6 | `Cd6SpXemQKY` | Garden Landscaping & Pool Cleaning | Pool Care |
| 7 | `4utqchOaj8E` | Quality Landscaping in Dubai | Landscaping |
| 8 | `KKogjwxAsVE` | Garden Plants & Landscaping | Planting |
| 9 | `ZexDkUnQ9TI` | Landscaping & Garden Plants in Dubai | Garden |

**Thumbnails:** `https://i.ytimg.com/vi/{ID}/oardefault.jpg` (the true vertical Shorts frame). All 9 verified returning HTTP 200. JS fallback to `hqdefault.jpg` if a future thumbnail isn't ready.

---

## 4. Placement

| Page | Section heading | Videos shown | Position |
|---|---|---|---|
| **Home** (`index.html`) | "Watch Our Dubai Projects in Action" | First 6 | After Featured Projects, before "How It Works" / CTA — trust before the conversion ask. Ends with a gold "Book a Free Site Visit" CTA. |
| **Projects** (`projects.html`) | "Our Landscaping & Pool Work on Video" | All 9 | After the project cards, before the closing CTA band. |

---

## 5. SEO — VideoObject schema

Each visible video emits a valid `VideoObject` JSON-LD block:
- `name`, `description`, `thumbnailUrl` (vertical + 16:9 fallback array), `contentUrl` (Shorts URL), `embedUrl`, `publisher` (linked to the site's `LocalBusiness` `@id`)
- `uploadDate` is **omitted rather than fabricated** (the dates aren't publicly readable). The schema is still valid; adding real dates later strengthens rich-result eligibility — see §9.

**Schema counts:** Home +6, Projects +9. Total JSON-LD blocks across the site rose **44 → 59**, all validated.

All video captions, tags, and thumbnail alt text are in the **static HTML** (not JS-injected), so Google indexes them on first crawl without executing JavaScript. The channel is linked from both sections, strengthening the brand entity graph.

---

## 6. Mobile optimisations

- `aspect-ratio: 9/16` on every card — **zero CLS**, space reserved before load
- Thumbnails `loading="lazy"` — fetched only near the viewport
- **Single-row carousel** on all sizes: on phones ~1.6 cards show (one featured + a peek of the next), swipe to scroll; on desktop ~5 cards show with prev/next arrows
- The play button fills the **entire card face** — full-card tap target, impossible to miss on touch
- Verified at 375 px: single-row carousel, arrows hidden (swipe instead), **no horizontal page overflow**

---

## 7. Accessibility

- Play control is a real `<button>` — keyboard-focusable, Enter/Space operable
- `aria-label="Play video: {caption}"` on each button — screen readers announce the specific video
- Decorative tag pill marked `aria-hidden="true"`; the caption is a real `<h3>`
- Thumbnail `alt` describes the video; gallery is a semantic `<ul role="list">`
- Gold `:focus-visible` ring matches the site's existing focus style
- Reduced-motion: the hover lift/scale transitions are disabled by the existing global rule

---

## 8. Conversion

- Home video section flows trust-building proof directly into a gold **"Book a Free Site Visit"** CTA
- Projects video section feeds the existing **"Your Property Could Be Next"** CTA band
- "See all our videos on YouTube" link drives channel subscriptions/engagement

---

## 9. Optional: add real upload dates (2 min, strengthens rich results)

`uploadDate` is the one recommended VideoObject field currently omitted (the dates aren't machine-readable from outside YouTube). To add them:

1. Open [YouTube Studio](https://studio.youtube.com) → Content
2. Note each video's publish date
3. In [`build/core-pages.js`](../build/core-pages.js), set the `date: ""` field on the matching `VIDEOS` entry to `"YYYY-MM-DD"`
4. Run `node build/build.js` — `uploadDate` is then emitted automatically

To **add more videos**: paste a new `{ id, title, desc, tag, date }` line into the `VIDEOS` array (the 11-char Shorts ID is the part after `/shorts/` in the URL) and rebuild.

---

## 10. Validation (all green)

- **16 pages built**, 0 errors
- **0 broken links** across 16 pages
- **59 JSON-LD blocks valid** (6 home + 9 projects VideoObject added)
- **HTTP audit: PASS, 0 critical**
- **0 console errors**
- All 9 vertical thumbnails return **HTTP 200**
- Click-to-load **verified in-browser**: 0 iframes at load → autoplaying iframe on click
- Mobile (375 px): 2-col, no horizontal overflow, full-card tap target

---

## 11. Files changed

| File | Change |
|---|---|
| `build/core-pages.js` | `VIDEOS` array (9 real IDs), `ACTIVE_VIDEOS`, `videoSchema()` (vertical thumb + optional uploadDate), `videosSection()` vertical-card renderer; sections added to home (6) + projects (9); VideoObject schemas added to both pages' meta |
| `css/styles.css` | Vertical Shorts **carousel**: `.vid-carousel`, `.vid-track` (single-row flex, `scroll-snap-type: x mandatory`, gold thin scrollbar), `.vid-card` (9:16, fixed width), `.vid-nav` prev/next arrows, `.vid-media`, `.yt-facade/.yt-thumb/.yt-play`, overlay `.vid-tag`, `.vid-title`, `.vid-footer`, `.vid-yt-link` |
| `js/main.js` | Facade click handler (swap thumbnail → autoplay iframe), `oardefault → hqdefault` thumbnail fallback, and carousel prev/next arrow scrolling with end-state disabling |
