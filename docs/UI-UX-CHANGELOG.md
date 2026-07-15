# UI/UX Changelog — Premium Refinement Pass

Date: 2026-06-13. All changes in `css/styles.css` except one additive markup change in
`build/core-pages.js`. Regenerate with `node build/build.js`.

| File | Component | Change | Purpose | SEO impact | Performance impact | Accessibility impact | Validation |
|---|---|---|---|---|---|---|---|
| css/styles.css | Tokens | Added `--space-1..9`, `--dur-1..3`, `--ease`, `--z-*`, `--wrap-narrow` | Centralized scale (no scattered values) | None | None | None | Inspect: tokens resolve |
| css/styles.css | Base type | `letter-spacing:-0.012em` on h1–h4; `text-rendering:optimizeLegibility`; `::selection`; `accent-color`; `text-size-adjust` | Refined display type + brand-consistent controls | None | None | + (accent-color, no zoom lock-out) | Inspect: h1 -0.595px |
| css/styles.css | Buttons | Added `:active`; high-contrast `:focus-visible` ring (dark on light, white on dark/green/whatsapp) | Press feedback + visible focus on primary CTAs | None | None | **+ (keyboard focus now visible on gold/green)** | Code + keyboard |
| css/styles.css | Process steps | Gold connector between numbered steps (≥900px) | Communicate sequence | None | None | Neutral (decorative `::after`) | `::after` 20×2px gradient on 3/4 |
| css/styles.css | Cards | Card-link arrow nudges on hover (transform) | Affordance polish | None | None | Neutral (transform only) | Inspect |
| css/styles.css | Forms | `.req` marker + `.form-legend` styles | Required-field clarity | None | None | **+ (indicator + text, not colour-only)** | DOM |
| build/core-pages.js | Contact form | Added `*` markers, legend, `aria-required` on Name/Phone | Show required fields before submit | None (additive, non-semantic) | None | **+** | label "Your name *", `aria-required=true` |

## Guarantees
- No change to titles, meta descriptions, canonicals, robots, H1s, heading order, internal links, structured data, or visible content.
- No new fonts, scripts, libraries, images, or network requests (net change ≈ a few hundred bytes of CSS).
- All motion uses `transform`/`opacity`; no CLS introduced; `prefers-reduced-motion` still disables it.

Rollback: revert the CSS rows (visual only) and the single `core-pages.js` form edit, then rebuild.
