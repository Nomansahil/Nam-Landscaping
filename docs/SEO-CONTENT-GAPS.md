# SEO Content Gaps & Owner Verification Required

This file lists everything that could not be verified from the repository or the
Google Business Profile and therefore **must be confirmed or supplied by the owner**
before the related claim is restored to the live site. Nothing in this list blocks
deployment of the current (honest) version.

Convention used in this build: where a fact could not be verified, the unsupported
claim was **removed or softened** rather than guessed (per the project's no-fabrication rule).

## 1. Business identity / NAP

| Field | Current state | Needed from owner |
|---|---|---|
| Exact street address | **Not published.** Map pin (25.1555203, 55.4611583) is verified from the GBP; site presents as a Dubai service-area business. | Confirm whether to display a full street address. If customers can visit, supply the exact address so it matches the GBP, and we will add `streetAddress` to schema + contact page. |
| Trade licence | **Owner confirmed: licensed Dubai company.** "Licensed" now shown site-wide. | (Optional) provide the licence number/authority if you want it displayed. |
| Insurance | **Owner confirmed: carries liability insurance.** "Insured" badge restored. | None — confirmed. |
| Opening hours | Assumed **Mon–Sat 08:00–18:00** | Confirm exact hours, Friday handling, and any holiday hours; must match GBP. |
| Social profiles (`sameAs`) | Empty array in schema | Provide Instagram / Facebook / TikTok / LinkedIn URLs. |

## 2. Trust & credibility (removed pending proof)

| Item | What was removed | To restore |
|---|---|---|
| Homepage stat bar | **Owner confirmed 10+ years** — restored as a trust point. Other invented figures (project/community counts, renewal %) stay removed. | Supply verified counts/percentages to add more numeric proof. |
| Testimonials | Fabricated reviews removed. **Owner chose the Google-reviews button**, which is in place. | (Optional) send owner-approved, attributable customer quotes to display on-site. |
| "Certified" technicians | Softened to "trained" technicians (no certification claimed by owner) | If staff hold a recognised certification (e.g. pool operator / CPO), name it and we will restore "certified". |
| Workmanship guarantee | **Owner confirmed** — guarantee wording restored on home, about and the repair page. | (Optional) confirm the exact guarantee period if you want it stated explicitly. |
| Awards / partnerships / years of experience | Never claimed | Supply only if genuine and provable. |

## 3. Photography — DONE

- **Resolved.** The site now uses the company's **own real project photos**, served as
  WebP from our own domain (`/assets/photos/`). No external image hosts.
- Slot→photo mapping + alt text live in `build/photo-map.js`; `npm run photos` regenerates
  responsive WebP + `manifest.json`. ~30 additional photos remain in `originals/`-source
  if you want to expand the projects gallery later.
- **OG/social image:** now a real company project photo (1200×630 JPG) on our own domain.
- Optional: review the alt text in `build/photo-map.js` and add genuine "completed project"
  captions on `projects.html` if you want named, verified project write-ups.

## 4. Content opportunities (optional, future)

- A small **blog** answering buyer questions (villa landscaping planning, summer pool
  care, natural vs artificial grass, irrigation in Dubai heat) would capture
  informational search and feed internal links to the service pages. Only add if it can
  be genuinely useful, original content — not AI filler.
- Per-community location pages are **intentionally not created** (would be thin doorway
  pages). Build one only if a community has a genuine completed project + owned photos +
  unique local detail.

## 5. Deployment-dependent (see SEO-DEPLOYMENT-CHECKLIST.md)

Domain, HTTPS/redirects, Search Console, sitemap submission, real-user Core Web Vitals,
and GBP alignment can only be completed once the site is live and the owner grants access.
