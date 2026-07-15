# Deployment-Only Status Checklist

These behaviours **cannot be verified on a local static server** and must be confirmed on the
live host. Do not assume they pass because the local audit passed.

## ⚠️ URL extension policy — decide before/at deploy (most important)
The site uses **`.html` URLs** in every canonical, internal link and sitemap entry
(e.g. `https://namlandscaping.ae/about.html`). Pick a host that agrees:

- **GitHub Pages** — serves `/about.html` at `200` directly. ✅ Matches the site as-is. Recommended.
- **Netlify** — serves `/about.html` at `200`; leave "Pretty URLs" post-processing **off** to avoid `.html → /about` 301s.
- **Cloudflare Pages** — **strips `.html` by default** (301 `/about.html` → `/about`). If you use it, either disable that behaviour or switch the site to extensionless canonicals/links/sitemap (a one-line change to `SITE.url` usage + link generation, then rebuild). **Do not mix** `.html` canonicals with a clean-URL host.
- The local `npx serve` default also strips `.html` (`cleanUrls`); the added `serve.json` disables it so local previews match a `.html` host.

- [ ] Host chosen and its `.html` behaviour matches the site's canonical URLs.

## TLS / DNS / host redirects
- [ ] DNS resolves the production domain.
- [ ] Valid HTTPS certificate.
- [ ] HTTP → HTTPS 301.
- [ ] One canonical host (www vs non-www); the other 301s to it (must match the canonicals).
- [ ] Trailing-slash behaviour consistent with the canonicals.

## Live status behaviour
- [ ] Homepage + sample service pages return live `200`.
- [ ] An unknown URL returns a live **404** and serves `/404.html` (upload `404.html`; GitHub Pages/Netlify/Cloudflare use it automatically).
- [ ] `robots.txt` and `sitemap.xml` return `200` with correct content types on the live host.
- [ ] No `X-Robots-Tag: noindex` injected by the host/CDN on production pages.

## CDN / proxy / performance
- [ ] Gzip/Brotli compression enabled.
- [ ] Long cache for static assets; sensible HTML caching.
- [ ] CDN/reverse-proxy not altering status codes or content types.
- [ ] No production rate-limiting/bot-protection that blocks Googlebot.

## Third-party (not first-party failures)
- [ ] Contact-page **Google Maps iframe** renders on the live origin (it was blocked in the local sandbox — third-party `X-Frame-Options`, not a code defect).
- [ ] (Images are now first-party WebP on our own domain — no external image CDN to verify.)
- [ ] `wa.me` / `tel:` links open correctly on real devices.

## Search Console / monitoring
- [ ] Verify the domain property; submit `sitemap.xml`.
- [ ] Run URL Inspection + Rich Results on home, a service page, contact.
- [ ] Monitor Coverage / Crawl-error reports after launch.
- [ ] Run PageSpeed Insights (field CWV) once data accrues.

## Re-run the local audit any time
```
node build/build.js
node scripts/seo-http-audit.js      # exits non-zero on any critical HTTP/SEO issue
```
