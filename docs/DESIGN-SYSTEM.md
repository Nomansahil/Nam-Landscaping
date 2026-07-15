# Design System — NAM Landscaping

Single stylesheet: `css/styles.css` (mobile-first, no framework). All values are CSS
custom properties on `:root`. Use tokens; do not hard-code new arbitrary values.

## Colour
Concept: designed outdoor space — botanical green (dominant), pool teal (secondary),
restrained gold (accent), warm stone neutrals.

| Token | Value | Use |
|---|---|---|
| `--green-950 … --green-600` | `#0e241b → #2f6b4f` | Dominant brand greens (heroes, dark sections, text) |
| `--green-100` | `#e3efe7` | Tinted icon chips / hover |
| `--brand-green` | `#1f7d35` | Logo green (brand lockup) |
| `--pool-700 / 600 / 100` | `#0d6e86 / #1187a3 / #e0f2f6` | Secondary — swimming-pool services |
| `--gold-500` | `#c8a24b` | Accent on dark surfaces, rules, icons |
| `--gold-600` | `#8f6e20` | Accent **text on light** (darkened for WCAG AA) |
| `--gold-100` | `#f6eeda` | Gold icon-chip backgrounds |
| `--cream` / `--white` | `#faf8f3` / `#fff` | Surfaces |
| `--ink` / `--muted` | `#1c2620` / `#56655d` | Body text / secondary text |
| `--line` | `#e4e2da` | Hairline borders |
| `--whatsapp` | `#1eaa53` | WhatsApp CTA only |
| error indicator | `#b23b3b` | Required-field marker / form errors (paired with text, never colour-only) |

Contrast: gold **text** uses `--gold-600` on light; `--gold-500` only on dark. Photo
heroes use a `linear-gradient` overlay (0.94→0.58) to keep white text AA-readable.

## Typography
- Display: **Fraunces** (`--font-head`) — headings only. Body: **Inter** (`--font-body`).
- Loaded via Google Fonts with `display=swap`, preconnect, limited weights (Fraunces 600/700, Inter 400–700).
- Sizes (fluid): h1 `clamp(2rem,5.5vw,3.1rem)`, h2 `clamp(1.55,4vw,2.25)`, h3 `clamp(1.15,2.6vw,1.4)`, body `1rem/1.65`, lede `1.08rem`.
- Headings: weight 600, `line-height:1.18`, `letter-spacing:-0.012em`, `text-wrap:balance`.

## Spacing & layout
- Scale: `--space-1…9` = `0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 / 6 rem`.
- Section vertical padding: `clamp(3rem, 8vw, 5.5rem)` (scales for mobile, not just shrinks).
- Container: `--wrap` 1140px; `--wrap-narrow` 760px (long-form reading); `.wrap = min(--wrap, 100% - 2.5rem)`.
- Grids: `.grid-2/3/4` collapse at 900 / 640px breakpoints.

## Borders, radius, elevation
- Radius: `--radius` 14px (cards/inputs), `--radius-sm` 9px, `999px` (pills/buttons/chips).
- Shadows: `--shadow-1` (resting), `--shadow-2` (raised/hover).
- Borders: 1px `--line` hairlines.

## Buttons
Variants: `.btn--gold` (primary, gold gradient), `.btn--green`, `.btn--whatsapp`, `.btn--ghost` (auto-flips white on dark surfaces). Size: `.btn--lg`.
States: hover (lift + shadow), **active** (reset), **focus-visible** (3px ring — `--green-950` on light, `#fff` on dark/green/whatsapp), disabled. Pill shape, icon 18px.

## Forms
Card container, 2-col grid (`form-field--full` spans). Visible labels, required `*` marker (`.req`, `#b23b3b`) + legend + `aria-required`. Inputs: cream fill, focus = gold outline + gold border. `aria-live` status; privacy note; descriptive submit ("Send My Enquiry").

## Cards & patterns
`.card` (hairline + shadow-1, hover lift to shadow-2), `.card-media` (16:9 photo, floating icon badge), `.project-card` (16:10), `.icon-list`, `.check-list` (1–2 col), `.split` (editorial 1:1), `.steps` (numbered, gold connector on desktop), `.faq-item` (`<details>` accordion), `.area-chip`, `.badge`, `.map-embed` (16:10 reserved box).

## Icons
One inline-SVG set (`ICONS` in `build/templates.js`): 24px grid, 1.8px stroke, round caps. Zero icon-font / library weight. Decorative icons `aria-hidden`.

## Motion
- Durations `--dur-1/2/3` = 0.15 / 0.25 / 0.45s; `--ease = cubic-bezier(0.22,0.61,0.36,1)`.
- Uses only `transform` / `opacity` (no layout-shifting animation). `.reveal` = fade+rise via IntersectionObserver.
- `@media (prefers-reduced-motion: reduce)` disables all animation/transition + smooth scroll and forces `.reveal` visible.

## Breakpoints
640 (2-col / form) · 800 (footer, trust bar, areas) · 900 (3–4 col, split, steps) · 1000 (desktop nav + hide mobile menu/sticky bar) · 1140 (max content width).

## Accessibility rules
Semantic landmarks + `aria-labelledby` sections; one H1/page; skip-link; `focus-visible` everywhere (never removed without replacement); high-contrast button rings; `accent-color`; required state shown by marker + text, never colour alone; touch targets ≥44px (nav toggle, sticky bar); reduced-motion respected; `text-size-adjust` locked.

## Z-index layers
`--z-sticky` 90 (mobile CTA) · `--z-header` 100 · `--z-skip` 200.
