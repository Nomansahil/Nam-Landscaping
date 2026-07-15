# UI/UX Premium Polish & Refinement Pass — NAM Landscaping

**Date:** 2026-06-16
**Brief:** Take the site from "good" to "exceptional" without redesigning — preserve
structure and content; refine for premium feel, trust, conversion, mobile, accessibility,
SEO-friendly UX, and performance.

**Approach:** The site already had a mature, token-driven design system (fluid `clamp()`
type, focus-visible rings, reduced-motion handling, AA-aware contrast, semantic HTML,
alternating section rhythm). So this pass is **surgical CSS craft**, not rework — every
change is additive, content-preserving, and SEO/performance-neutral. No new libraries, no
heavy animation, no markup restructuring.

---

## 1. UI improvements
- **Primary-CTA prominence (gold elevation):** the gold "primary action" button had **no
  resting elevation** — it didn't read as the page's main action. Added a soft gold-tinted
  shadow at rest and a richer one on hover, and fixed the hover state that previously
  *flattened* the gradient to a solid colour. The primary CTA now visibly leads the eye on
  every section.
- **Card hover affordance:** service/feature cards now shift their border to a subtle gold
  on hover (was shadow + lift only) — a more crafted, intentional interaction.
- **Review cards:** gain the same gold border + deeper shadow on hover (the carousel pauses
  on hover, so the focused testimonial highlights cleanly).
- **FAQ items:** added a hover border tint and an **open-state gold accent bar** (rendered
  as an inset shadow, so it adds zero layout shift). Open questions are now visually grouped
  and obvious.
- **Button typography:** added a hair of letter-spacing (`0.01em`) for a crisper, more
  premium label.

## 2. UX improvements
- **Snappier, consistent micro-interactions:** cards animate in with a scroll-reveal that
  *also* set a slow `0.55s` transition — which was bleeding into hover, making hover lifts
  feel sluggish and preventing shadow/border from animating. Reworked the revealed state to
  hand transitions back to the component (`transform 0.25s`, `box-shadow`/`border-color
  0.2s`). Entrances stay smooth; hovers are now crisp.
- **Link affordance:** body links now use a soft underline that darkens to full on hover,
  with a smooth colour transition — clearer "this is clickable" signalling.
- **Typographic polish:** `text-wrap: pretty` on paragraphs and ledes removes orphans/ragged
  last lines (progressive enhancement; older browsers simply ignore it).

## 3. Mobile improvements
- **Tap targets brought to ~44px:** the header "Location" button was 38px; the compact
  icon-only variant on ≤380px screens was smaller still. Both now sit at the ~44px target.
  Mobile sub-navigation links went from ~36px to ~44px touch height.
- Verified the primary mobile actions (sticky Call/WhatsApp bar 44px, hero CTAs 48px, nav
  toggle 44px) and **no horizontal overflow** at 375px.

## 4. Accessibility improvements
- Larger, more reliable touch targets (above) — toward WCAG 2.5.5/2.5.8.
- Open-state FAQ accent adds a **non-colour-only** cue (shape/position), complementing the
  +/− glyph for state.
- All existing strengths preserved: visible `:focus-visible` rings, reduced-motion disables
  the new transitions too, semantic landmarks, one H1 per page, AA contrast.

## 5. Conversion (CRO) improvements
- The gold primary CTA now has clear visual primacy over secondary buttons on every screen,
  guiding clicks toward "Book a Free Visit" / quote actions.
- Stronger hover feedback on cards, reviews, and FAQs increases perceived interactivity and
  engagement (micro-signals that the site is responsive and well-built = trust).
- Trust block: review cards highlight on focus, reinforcing the social-proof section.

## 6. SEO-friendly UX improvements
- All changes are **CSS-only and content-identical** — headings, internal links, structured
  data, and copy are untouched, so rankings/indexing are unaffected.
- Engagement signals (clearer CTAs, snappier interactions, better mobile ergonomics) support
  dwell time and interaction without adding JS.

## 7. Performance preservation
- Single stylesheet, still minified at build (**~34.6 KB**), no new requests, no JS added,
  no heavy animation. The marquee remains GPU-transform only and pauses/halts under
  `prefers-reduced-motion`. CLS-safe (FAQ accent via inset shadow, not border width).
- **Validation (all green):** 16 pages built · 0 broken links · 44 JSON-LD blocks valid ·
  HTTP audit **PASS, 0 critical** · **0 console errors** · no horizontal overflow · tap
  targets verified.

---

## Additional recommendations (future, need owner input or a live host)
1. **Real review portraits + dates** in the cards (currently initials) — lifts trust further
   once you export them from the Google Business Profile.
2. **Before/after project sliders** on the projects page once real paired photos exist — the
   single strongest trust device for landscaping/pool work.
3. **A tuned Content-Security-Policy** at deploy time (left out because of the Maps iframe +
   a few inline style attributes).
4. **Lighthouse field data (CrUX)** after launch to confirm INP/LCP on real devices, and a
   branded 1200×630 OG cover for richer link shares.
