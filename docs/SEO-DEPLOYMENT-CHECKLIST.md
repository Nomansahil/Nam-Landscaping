# SEO Deployment Checklist

Items that can only be completed against a live host / domain / Google access.
None are done by this codebase — work through them at launch.

## Domain & HTTPS
- [ ] Point the production domain. Confirm it matches `SITE.url` (`https://namlandscaping.ae`). If different, update `SITE.url` in `build/templates.js` **and** `sitemap.xml` + `robots.txt`, then rebuild.
- [ ] Force HTTPS (redirect HTTP -> HTTPS).
- [ ] Pick ONE canonical host (www vs non-www) and 301 the other to it, so it matches the canonicals in the HTML.
- [ ] Decide trailing-slash policy and keep it consistent (these are `.html` files, so generally no trailing slash).

## Live response checks (after deploy)
- [ ] Homepage and a sample of service pages return **200**.
- [ ] `https://<domain>/robots.txt` returns 200, correct content, references the live sitemap URL.
- [ ] `https://<domain>/sitemap.xml` returns 200, valid XML, all URLs 200 + canonical + indexable.
- [ ] A random unknown URL returns a real **404** (not a soft 200).
- [ ] No mixed-content warnings; no `noindex` accidentally shipped.
- [ ] **Contact-page map renders** (it was blocked in the local sandbox — confirm the Google embed loads on the live origin) and "Get Directions" opens the correct pin.

## Headers / hosting
- [ ] Gzip/Brotli enabled; long cache for static assets; sensible HTML caching.
- [ ] Security-conscious headers as supported by the host.

## Search Console / Bing
- [ ] Verify the domain property in Google Search Console (DNS or HTML tag — do not invent a token).
- [ ] Submit `sitemap.xml`.
- [ ] (Optional) Verify in Bing Webmaster Tools and submit sitemap.
- [ ] Use the URL Inspection + Rich Results tools on home, a service page, and contact to confirm indexability and that LocalBusiness/Service/FAQ/Breadcrumb markup is valid.

## Performance (field data — post-launch)
- [ ] Run PageSpeed Insights (mobile) on home, contact, a landscaping page, a pool page.
- [ ] Monitor real Core Web Vitals (LCP/INP/CLS) at p75 in Search Console once data accrues.

## Analytics & conversions
- [ ] Add analytics via environment/config (no duplicate installs; no hardcoded IDs here).
- [ ] Wire conversion events for: call click, WhatsApp click, email click, form submit, directions click (hooks are centralized in the markup/JS — connect to your analytics).
- [ ] Respect consent; keep personal data out of URLs/events.

## Assets to replace (see SEO-CONTENT-GAPS.md)
- [ ] Branded 1200×630 OG cover -> `SITE.ogImage`.
- [ ] Real owned project photos -> `PHOTOS` registry + projects.html captions.
- [ ] Confirm hours, address model, licence/insurance, guarantee terms, social URLs, real stats/reviews.

## GBP
- [ ] Complete `GOOGLE-BUSINESS-PROFILE-CHECKLIST.md`.
