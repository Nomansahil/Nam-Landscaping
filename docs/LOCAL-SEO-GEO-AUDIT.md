# Local SEO & GEO/AEO Audit — NAM Landscaping

**Date:** 2026-06-17
**Method:** Audit-first. Every item was verified in the source, the built HTML, and the
JSON-LD output before any change. Items already correct were **bypassed, not rewritten**
(per the change-control rule). Only genuine gaps were fixed. **No business facts were
invented** — unverifiable items are listed in §6 for owner input.

---

## Phase 0 — Repository & safety

- **Stack:** custom Node static-site generator (`build/*.js`) → flat HTML; one stylesheet
  (`css/styles.css` → `.min.css`), one progressive-enhancement JS (`js/main.js` → `.min.js`).
  No CMS, no framework, no SEO plugin. Schema is hand-authored in `build/templates.js` +
  `build/core-pages.js`.
- **Git:** the working directory is **not a git repository** (`git: false`), so no branch
  could be created. Changes were made directly; all files are recoverable via the build
  (HTML/sitemap/min assets are generated). Source-of-truth edits are isolated to 3 files.
- **Build health before changes:** clean — 16 pages, 0 broken links, 44→59 JSON-LD blocks,
  HTTP audit PASS. No pre-existing errors.
- **Environments:** single static output; no separate dev/prod in-repo. Deploy-time items
  (HTTPS, www↔non-www, CDN, WAF) are out of repo scope — flagged in §6.

## Phase 1 — Business model (verified from repo, not inferred)

- **Name:** NAM Landscaping · **Legal:** Noor Al Madeena Landscaping LLC (from GBP).
- **Category:** LocalBusiness / HomeAndConstructionBusiness — landscaping + swimming pool.
- **Model:** **service-area business** (verified Google Maps pin; street address intentionally
  not published pending owner confirmation). Correctly modelled — no fake office/branch pages.
- **Primary market:** Dubai. **Service areas:** 16 named communities (Palm Jumeirah, Emirates
  Hills, Dubai Hills Estate, Arabian Ranches, etc.) — all real, in `areaServed`.
- **Services (real, each with a canonical page):** garden landscaping & lighting; garden
  maintenance; swimming pool services (build/maintain/clean/repair); water features &
  irrigation; artificial grass; pergolas & shade; hardscaping; annual maintenance contracts.

---

## 1. Executive summary

**Already implemented correctly (bypassed):** per-page unique titles/meta/canonical/robots;
one H1 per page; LocalBusiness JSON-LD with `@id`, geo, `hasMap`, 16-city `areaServed`,
opening hours; Service schema with `provider` `@id` on all service pages; BreadcrumbList;
FAQPage (visible Q&A only); VideoObject (vertical Shorts); WebSite; complete OG/Twitter;
self-hosted fonts; CSS/JS minification; valid sitemap (15 canonical URLs + lastmod); noindex
branded 404; centralized NAP; sensible internal-link graph; no fabricated reviews/awards/stats.

**What was missing/weak → fixed this pass (4 items, all safe & non-fabricated):**
1. `sameAs` was **empty** → added the **verified** YouTube channel.
2. Business entity did **not enumerate its services** → added `hasOfferCatalog` (8 real
   services, real canonical URLs) — a major entity/answer-engine clarity gain.
3. robots.txt had **no documented AI-crawler policy** → kept full search + AI-search access,
   documented the training-crawler distinction and opt-out (Phase 15).
4. Home hero used an **unverified superlative** ("Dubai's Best…") → reworded to a defensible,
   keyword-rich line.

**Bypassed (verified correct):** all schema types listed above; canonicals; sitemap; mobile
layout; CTA flow; NAP. Not refactored.

**Requires business input:** see §6 (street address decision, exact founding year, license
number, Instagram/Facebook/GBP URLs, real review dates/photos, verified pricing).

**Risks remaining:** none introduced. The only standing risks are owner-data gaps (§6) and
deploy-time config (HTTPS/canonical host/WAF AI-bot allowlist) that cannot be set from the repo.

---

## 2. Verification matrix

| Requirement | Page/File | Previous | Final | Action | Priority | Validated by |
|---|---|---|---|---|---|---|
| Unique title/meta/canonical | all | Correct | Correct | Bypass | — | validate-seo |
| One H1 per page | all | Correct | Correct | Bypass | — | validate-seo |
| LocalBusiness `@id`+geo+areaServed+hours+hasMap | templates.js | Correct | Correct | Bypass | — | JSON-LD parse |
| Service schema + `provider @id` | service pages | Correct | Correct | Bypass | — | JSON-LD parse |
| BreadcrumbList | all non-home | Correct | Correct | Bypass | — | validate-seo |
| FAQPage (visible only) | home/faq/service/AMC | Correct | Correct | Bypass | — | JSON-LD parse |
| VideoObject (real videos) | home/projects | Correct | Correct | Bypass | — | JSON-LD parse |
| **`sameAs` profiles** | templates.js | **Missing (empty)** | **Added (verified YT)** | **Fix** | High | JSON-LD parse |
| **`hasOfferCatalog` service list** | templates.js | **Missing** | **Added (8 real services)** | **Fix** | High | JSON-LD parse + file-exists check |
| **AI-crawler policy documented** | robots.txt | **Missing** | **Documented, access kept open** | **Fix** | Med-High | manual review |
| **Unverified superlative claim** | core-pages.js | **Present ("Best")** | **Removed** | **Fix** | High (policy) | grep + HTML check |
| Reviews = visible + schema match (4.2) | core-pages.js | Correct | Correct | Bypass | — | prior pass |
| AggregateRating legitimacy | core-pages.js | Correct (owner reviews) | Correct | Bypass | — | JSON-LD parse |
| Sitemap valid + lastmod | sitemap.xml | Correct | Correct | Bypass | — | http audit |
| robots not blocking content | robots.txt | Correct | Correct (+docs) | Verify | — | http audit |
| 404 noindex, not in sitemap | 404.html | Correct | Correct | Bypass | — | http audit |
| NAP consistency | SITE object → all | Correct | Correct | Bypass | — | grep |
| Foundation/license/address facts | — | Gap | Gap (flagged) | Owner input | — | §6 |

## 3. Changed files

| File | Purpose | Main change | UI impact | SEO/GEO impact | Risk |
|---|---|---|---|---|---|
| `build/templates.js` | Schema source | `businessSchema()`: added `hasOfferCatalog` (8 real services) + `sameAs` (verified YouTube) | **None** (schema is invisible) | High — entity scope + profile link for Google/AI engines | Very low |
| `build/core-pages.js` | Home content | Hero eyebrow: "Dubai's Best…" → "Dubai Garden Landscaping & Swimming Pool Specialists" | Text-only swap in the **same** styled element; no layout/CLS change | Removes policy-risk superlative; keeps keywords | Very low |
| `robots.txt` | Crawl policy | Documented search vs AI-training crawler policy; access unchanged (all allowed) | None | Clarifies AI-search welcome; gives owner a training opt-out path | None (no access changed) |

All outputs rebuilt: 16 pages, `styles.min.css` 37.8 KB, `main.min.js` 5.4 KB, **59 JSON-LD
blocks valid**, 0 broken links, HTTP audit PASS.

## 4. Page-level summary (canonical pages)

| Page | Intent | Primary cluster | Location | Title / H1 status | Schema | CTA | Remaining gap |
|---|---|---|---|---|---|---|---|
| `/` home | Brand + category discovery | landscaping & pool maintenance Dubai | Dubai | Verified, superlative removed | LocalBusiness+OfferCatalog, WebSite, FAQPage, VideoObject, AggregateRating/Review | Above-fold + band + final | Real review dates/photos (owner) |
| `/services.html` hub | Service navigation | landscaping & pool services Dubai | Dubai | Verified | BreadcrumbList | Hero + band | — |
| 7 service pages | Service intent | per-service + Dubai | Dubai | Verified | Service+`provider`, Breadcrumb, FAQPage | Hero + band | Service-specific review/cost (owner) |
| `/annual-maintenance-contracts.html` | Commercial/retention | AMC garden+pool Dubai | Dubai | Verified | Service, FAQPage, Breadcrumb | Hero + band | Verified pricing (owner) |
| `/projects.html` | Proof/portfolio | landscaping & pool projects Dubai | Dubai | Verified | Breadcrumb, VideoObject ×9 | Band | Real project photos/locations (owner) |
| `/areas-we-serve.html` | Local/area intent | areas served Dubai communities | Dubai + communities | Verified | Breadcrumb | Hero + band | Per-area proof (owner) |
| `/about.html` | Trust/E-E-A-T | about NAM Landscaping | Dubai | Verified | AboutPage, Breadcrumb | Band | Founding year, license # (owner) |
| `/faq.html` | Informational | landscaping & pool FAQ Dubai | Dubai | Verified | FAQPage, Breadcrumb | Band | — |
| `/contact.html` | Transactional | contact / quote Dubai | Dubai | Verified | Breadcrumb | Form + map | Published address decision (owner) |

## 5. Redirect & consolidation report

No new redirects this pass. The site already consolidated 12 individual service slugs into 7
canonical service pages (with in-page anchors); the old member URLs are removed at build and
every internal link is rewritten to the merged page + anchor (verified: 45 links rewritten,
0 broken). Canonicals are self-referencing and absolute. **No cannibalization** found between
home / hub / service / area pages — each holds a distinct intent.

## 6. Required business input (do NOT fabricate)

| Item | Why needed | Where it would go |
|---|---|---|
| Decision: publish street address? | Upgrades service-area → full local entity; enables `streetAddress` + richer GBP match | `SITE.address`, contact page |
| Exact founding year | Enables `foundingDate`; content says "10+ years" but no year | `businessSchema` |
| Trade licence number | E-E-A-T / verifiable credential | About + schema `identifier` |
| Instagram / Facebook / GBP profile URLs | Complete `sameAs` (only YouTube is verified so far) | `businessSchema.sameAs` |
| Real review dates + reviewer photos | Strengthens existing Review schema + visible trust | `REVIEWS` array |
| Verified price ranges / call-out minimums | Enables a compliant cost section/page | new cost module |
| Real project street-level locations & paired before/after photos | Enables genuine case studies | projects page |

## 7. Recommended next content (ranked — build only with real evidence)

1. **Cost-factors module/page** (High commercial intent, strong AI-answer target). Needs
   verified ranges or at least real cost drivers — **owner input required** before building.
2. **2–3 real case studies** (High trust/E-E-A-T). Requires real paired photos + outcomes.
3. **"Repair vs. replace your pool" comparison** (Med, buyer-decision + AI-answer intent).
   Buildable from existing expertise; neutral criteria.
4. **Problem/symptom pages** ("green pool", "garden won't survive summer") — Med; partially
   covered in FAQ already, so only promote to standalone if search demand justifies (avoid
   cannibalizing the pool/garden service pages).
5. **Instagram/Facebook `sameAs`** once URLs confirmed — Low effort, entity gain.

*Not recommended:* mass service×city pages, per-community doorway pages, FAQ duplication
across areas — all flagged as risky in the brief and intentionally avoided.

## 8. KPI recommendations

- **Organic:** non-brand clicks; leads by landing page (esp. the 7 service pages + AMC);
  service-cluster page-one coverage; cannibalization watch (home vs hub).
- **Local:** Share of Local Voice; top-3 grid for "landscaping Dubai" / "swimming pool
  maintenance Dubai"; GBP calls, website clicks, direction requests, bookings.
- **Reputation:** review velocity + rating (keep visible reviews and `AggregateRating` in
  sync — currently 4.2); service-specific review coverage; response rate.
- **GEO/AI:** brand mention + citation share in ChatGPT Search / Perplexity / Gemini / AI
  Overviews; AI referral traffic (GA4 referrer = chatgpt.com, perplexity.ai, etc.); factual
  accuracy of AI answers about the business (spot-check quarterly).

---

## Phase 15 note — AI & search crawler access (recommendation, owner decision)

- **Current access:** all crawlers — search, AI-search, and AI-training — are **allowed**
  (`robots.txt` wildcard; no blocks on content). This maximises Google/Bing ranking and
  AI-search citation (ChatGPT Search, Perplexity, Gemini, Claude).
- **Training distinction:** GPTBot, CCBot, Google-Extended, anthropic-ai also have access.
  Blocking them would **not** reduce search ranking or AI-search visibility.
- **Recommended action:** keep search + AI-search open (done/documented). Decide separately
  whether to allow AI *training* — if not, add per-agent `Disallow: /` groups (template is in
  the robots.txt comments).
- **Cannot set from repo:** if a CDN/WAF is added at deploy time, ensure it does **not**
  challenge/block `OAI-SearchBot`, `PerplexityBot`, `Googlebot`, `Bingbot` — a silent WAF
  block is the most common cause of lost AI-search visibility. Flagged for the deploy step.
