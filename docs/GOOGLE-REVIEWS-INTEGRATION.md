# Google Reviews — how to show real reviews

The homepage has a premium, branded reviews section (`build/core-pages.js` → `REVIEWS`).
It shows a Google-styled "Read Our Google Reviews" CTA now, and **automatically upgrades**
to review cards + valid `AggregateRating`/`Review` structured data the moment you add real
reviews. **No reviews are fabricated** — the array is empty until you supply real ones.

## Why it isn't auto-fetching live reviews
This is a **static site with no backend**, and the Google Places API requires an **API key**.
Putting that key in client-side JavaScript would expose it to abuse (and bill your account).
Live fetching therefore needs *one* of the two options below. Both keep the key private and
the front-end fast (no render-blocking third-party widgets).

## Option A — Manual (fastest, zero cost, recommended to start)
Copy your real Google reviews into the `REVIEWS` array in `build/core-pages.js`:

```js
const REVIEWS = [
  { name: "Ahmed K.", rating: 5, date: "2026-05-12",
    text: "They redesigned our garden and took over the pool in one week. Spotless.",
    photo: "" /* optional absolute URL, e.g. the reviewer's Google avatar */ },
  { name: "Sara M.", rating: 5, date: "2026-04-28",
    text: "Weekly pool reports with photos and readings. Total peace of mind." },
];
```

Then `npm run build`. The cards render with stars, name, date, avatar (or initial), text,
plus the rating summary and the `AggregateRating`/`Review` JSON-LD (eligible for review
rich results). Only use reviews you are permitted to reproduce.

## Option B — Live via a serverless proxy (auto-updating)
1. Get a **Google Places API** key; enable *Places API*; restrict it to your function's IP/referrer.
2. Deploy a tiny serverless function (Netlify/Cloudflare/Vercel) that calls Place Details and
   returns the `reviews` array. Cache the response (~24 h) to protect Core Web Vitals & quota:

```js
// netlify/functions/reviews.js  (key stays server-side)
export async function handler() {
  const PLACE_ID = "ChIJ...";            // your Place ID
  const KEY = process.env.PLACES_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${KEY}`;
  const r = await fetch(url);
  const d = await r.json();
  return { statusCode: 200,
    headers: { "content-type": "application/json", "cache-control": "public, max-age=86400" },
    body: JSON.stringify(d.result || {}) };
}
```

3. Either (a) fetch `/.netlify/functions/reviews` at **build time** and write it into `REVIEWS`
   (best for SEO — reviews are in the static HTML + schema), or (b) fetch it client-side after
   load and inject cards (keep it non-blocking; note client-injected content/schema is weaker for SEO).
   **Build-time injection (a) is recommended.**

## Notes
- The Places API returns up to **5** reviews — that's a Google limitation, not the site.
- Don't scrape the Google Maps page (against Google's terms). Use the API or manual entry.
- The CTA button (`/.google-btn`) always links to the live Google Business Profile so visitors
  can read **all** reviews and leave their own.
