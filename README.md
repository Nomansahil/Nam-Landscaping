# NAM Landscaping (Noor Al Madeena) — Website

Premium, mobile-first, SEO-structured static website for a Dubai landscaping and
swimming pool maintenance company. Pure HTML/CSS/JS — no framework, no backend required.

## Structure

```
*.html, services/*.html              All 20 pages — generated, do not edit directly
css/styles.css                       Single stylesheet (design system + components)
js/main.js                           Nav, scroll reveal, quote-form → WhatsApp handoff
assets/logo.svg                      NAM Landscaping logo (vector recreation)
build/                               Page generator (shared chrome + content data)
docs/                                Phase 1 strategy + Phase 2 content reference
robots.txt, sitemap.xml              Technical SEO
```

## Editing content

All pages are generated from `build/` (single source of truth for header, footer,
sticky CTA bar, schema, brand and photos):

- **Service page copy** → edit `build/services-data.js`
- **Home / Services hub / About / Projects / Areas / Contact / FAQ / AMC** → edit `build/core-pages.js`
- **Brand, NAP, phone/WhatsApp/email, photo registry, schema** → `SITE` object in `build/templates.js`
- Then regenerate: `node build/build.js`
- Verify links: `node build/check-links.js`

## Branding

Visible brand: **NAM Landscaping** (schema `alternateName`: Noor Al Madeena Landscaping).
The logo is recreated as a crisp inline SVG (`BRAND_MARK` in templates.js +
`assets/logo.svg` for schema/social use) so it costs zero HTTP requests and stays
sharp at any size. If you prefer the original raster logo file, drop it in `assets/`
and swap the `<img>` in the header partial.

## Photography & performance

- **Real company project photos**, served as **WebP from our own domain** (`/assets/photos/`).
  No external image hosts. Source-of-truth mapping in `build/photo-map.js`; convert with
  `npm run photos` (sharp, build-time only) which writes responsive WebP + `manifest.json`.
- Originals live in `assets/photos/originals/` (build-time source — excluded from crawl via
  robots.txt; safe to omit from the deployed upload).
- Heroes: preloaded with `fetchpriority="high"`, with a separate **720px mobile variant**
  preloaded under a `(max-width: 640px)` media query. LCP hero ≈ 174 KB at 1600px.
- All other images: `loading="lazy"`, `decoding="async"`, explicit width/height (no CLS),
  responsive widths (1600/1024/768/480) chosen per slot; EXIF stripped.
- To swap a photo: replace the file in `assets/photos/originals/`, run `npm run photos && npm run build`.
- Single CSS file, deferred JS, inline SVG icons (zero icon requests).

## Before launch — owner-supplied items

The site contains **no fabricated content and no `TODO` placeholders** (a clean grep
confirms it; details in `docs/SEO-CONTENT-GAPS.md`). The items below are real-world
facts/assets only the owner can supply — the site is honest and deployable without them.

Done in this build (verified): phone & WhatsApp `+971 55 817 0150`; legal name
*Noor Al Madeena Landscaping LLC*; verified map pin (25.1555203, 55.4611583) with a live
Google Maps embed on the contact page + Get Directions links; centralized LocalBusiness
schema (geo + `hasMap`); real social/OG image.

Still owner-dependent (see `docs/SEO-CONTENT-GAPS.md`):

1. **Address model** — currently a Dubai service-area business (no street address shown).
   If a visitable address exists, add it to the `SITE` object and confirm it matches the GBP.
2. **Domain** — currently `https://namlandscaping.ae`. If different, change `SITE.url`
   + sitemap.xml + robots.txt, then rebuild.
3. **Real stats** — owner confirmed **10+ years** (now shown). Other figures (project /
   community counts, renewal %) stay removed until you supply verified numbers.
4. **Reviews** — owner chose the **Google-reviews button** (in place). Optionally send
   owner-approved, attributable quotes to display on-site; fabricated ones were removed.
5. **Photography — done.** Real company project photos throughout, served as WebP from our
   own domain; the OG/social image is a real project photo. (More photos are available in
   `originals/` if you want to expand the projects gallery later.)
6. **Owner-confirmed and restored:** licensed, insured, workmanship guarantee. Still
   optional: certification names, exact hours, exact licence number, social URLs.

See `docs/SEO-DEPLOYMENT-CHECKLIST.md` and `docs/GOOGLE-BUSINESS-PROFILE-CHECKLIST.md` for
live-host and GBP steps.

## Deployment (Hostinger)

Target host: **Hostinger** (LiteSpeed, which reads `.htaccess`). The repo ships a
production `.htaccess` at the root that handles HTTPS + canonical host, compression,
caching and security headers — no extra config needed. (The legacy `_headers` file is
Netlify-format and is simply ignored by Hostinger; leave or delete it.)

1. **Rebuild first** so `sitemap.xml` `lastmod` is current: `node build/build.js`.
2. **Upload the project root** to `public_html` via hPanel File Manager or FTP. Include
   `.htaccess`, `llms.txt`, `robots.txt`, `sitemap.xml`, all `*.html`, `css/`, `js/`,
   `assets/` and `services/`. **Exclude** `build/`, `docs/`, `scripts/`, `node_modules/`
   and `assets/photos/originals/` (not needed live; robots already disallows them).
3. **Domain + SSL:** point `namlandscaping.ae` at the hosting, enable Hostinger's free
   SSL, and confirm the `.htaccess` redirects `http://` and `www.` to the canonical
   `https://namlandscaping.ae` (matches every `<link rel="canonical">`).
4. **Search Console:** add the domain property, verify, submit `sitemap.xml`, and run the
   URL Inspection / Rich Results tests on a couple of pages (LocalBusiness + FAQ schema).
5. **Google Business Profile:** claim/align with the exact NAP on the site; categories
   "Landscaper" + "Swimming Pool Repair Service".
6. **Run PageSpeed Insights** (mobile + desktop) after launch — the build targets ~100 on
   all four categories. If Performance dips, the GTM deferral fallback (in `build/templates.js`)
   is the first lever.

### Lead capture

Quote forms need **no backend**: submitting opens WhatsApp with the enquiry
pre-filled (number from `data-whatsapp`). For email capture, point the form at
Formspree/Basin or a serverless endpoint — field names are ready
(`name`, `phone`, `area`, `service`, `message`).

## Local preview

```powershell
npx serve "D:\Nam Landscaping"
```
