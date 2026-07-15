# UI/UX Audit — NAM Landscaping

Scope: visual design, UX, mobile, accessibility and conversion of the existing 20-page
static site. **Starting point was already strong** (custom design system, not a template),
so this was a *refinement* pass, not a rescue. Findings and what was done below.

Severity: Critical / High / Medium / Low / Informational.

| # | Severity | Problem | Affected | User impact | SEO impact | Conversion impact | Implemented solution | Validation |
|---|---|---|---|---|---|---|---|---|
| 1 | Low | No formal spacing/motion/z-index token scale — values were ad-hoc | All (CSS) | Minor inconsistency risk as site grows | None | None | Added `--space-1..9`, `--dur-1..3`, `--ease`, `--z-*`, `--wrap-narrow` tokens | Inspect: tokens resolve |
| 2 | Low | Headings used default tracking; body lacked legibility hints | All | Slightly less refined display type | None | Perceived quality | `letter-spacing:-0.012em` on h1–h4, `text-rendering:optimizeLegibility`, `::selection`, `accent-color` | Inspect: h1 tracking -0.595px |
| 3 | Medium | Buttons had hover but **no `:active` state and a low-contrast focus ring** (global gold outline is invisible on gold/green buttons) | All CTAs | Keyboard users couldn't see focus on primary buttons; no press feedback | None | Accessibility of the primary conversion control | Added `.btn:active` + high-contrast `:focus-visible` ring (dark on light, white on dark/green) | Inspect + keyboard |
| 4 | Low | Process steps were separate cards with no visual sense of sequence | Service pages, AMC | Order read as 4 unrelated cards | None | Process clarity builds trust | Added a gold connector line between numbered steps (desktop), aligned to the "01" numeral | `::after` 20×2px gold gradient on 3 of 4 steps |
| 5 | Low | Card links were static (" →") | Service/home cards | Less sense of affordance | None | Minor | Card-link arrow nudges on card hover (transform only) | Inspect |
| 6 | Medium | Quote form had no **visible required-field indicator** (only the HTML `required` attribute) | Contact form | Users couldn't see which fields were mandatory before submitting | None | Form completion / abandonment | Added `*` markers + legend "Fields marked * are required" + `aria-required` | DOM: label "Your name *", `aria-required=true` |
| 7 | Informational | Homepage hero uses three CTA buttons (Quote + WhatsApp + Call) | Home | Slightly more than the "max two" guideline | None | Positive — Dubai users prefer call/WhatsApp | **Kept by design** (explicit earlier owner requirement for 3 contact channels); gold "Book a Free Site Visit" remains the dominant action | n/a |

## Confirmed already-good (no change needed)
- Coherent custom identity: botanical greens + pool teal + restrained gold on warm cream — **not** the generic black-and-gold Dubai template.
- Layout variety already present: editorial splits, numbered steps, icon lists, photo galleries, check-lists — not "every section a card grid."
- Photo heroes use AA-readable gradient overlays; responsive 1600/720 WebP; hero curve transitions.
- Sticky mobile contact bar with `env(safe-area-inset-bottom)`, hidden ≥1000px.
- `prefers-reduced-motion` fully disables animation; `focus-visible` global; skip-link; semantic landmarks; `aria-labelledby` on sections.
- Form already had `novalidate`, `aria-live` status, autocomplete, typed inputs, a descriptive submit ("Send My Enquiry"), and a privacy note.
- Projects gallery already uses real licensed photos (not gradient placeholders).

## SEO preservation (non-negotiable) — verified
All changes were CSS-only plus additive, non-semantic markup (`<span class="req">`, a legend `<p>`, `aria-required`). No titles, descriptions, canonicals, robots, H1s, heading order, internal links, schema, or visible content were changed. Regression checks: `check-links` 0 broken; `validate-seo` 20 pages, 52 JSON-LD blocks valid, unique titles/descriptions, one H1 each. See `UI-UX-IMPLEMENTATION-REPORT.md`.
