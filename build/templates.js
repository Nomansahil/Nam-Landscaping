/* Shared page chrome + renderers for Noor Al Madeena Landscaping.
   All pages are generated as flat static HTML, run `node build/build.js`. */

const SITE = {
  url: "https://namlandscaping.ae",
  name: "NAM Landscaping",
  legalName: "Noor Al Madeena Landscaping LLC", // registered name, verified from Google Business Profile
  altName: "Noor Al Madeena Landscaping",
  phoneDisplay: "+971 55 817 0150",
  phoneHref: "tel:+971558170150",
  phoneE164: "+971558170150",
  whatsapp: "971558170150",
  email: "hello@namlandscaping.ae",
  // Service-area business: verified Google Business Profile map pin below.
  // Exact street address is intentionally not published (pending owner confirmation) — see SEO-CONTENT-GAPS.md.
  serviceArea: "Serving villas, communities & commercial properties across Dubai, UAE",
  addressLocality: "Dubai",
  addressRegion: "Dubai",
  addressCountry: "AE",
  geo: { lat: 25.1555203, lng: 55.4611583 },
  mapsUrl: "https://maps.app.goo.gl/f2MnDG11ENgpsNBG7",
  hours: "Mon to Sat, 8:00 AM to 6:00 PM",
};
// Derived, key-free Google Maps URLs (no API key exposed)
SITE.mapEmbedUrl = `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=15&hl=en&output=embed`;
SITE.directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`;
// Social/OG preview image — real company photo (1200x630 JPG), served from our own domain.
SITE.ogImage = `${SITE.url}/assets/photos/villa-garden-pool-landscaping-dubai-og.jpg`;
// Owner-confirmed social profiles (clean canonical URLs, tracking params stripped).
// Used for footer links AND schema sameAs (an E-E-A-T / entity-confirmation signal).
SITE.social = {
  facebook: "https://www.facebook.com/share/18jpHEXTj4/",
  instagram: "https://www.instagram.com/landscapenam",
  tiktok: "https://www.tiktok.com/@nam.landscaping",
  youtube: "https://www.youtube.com/@NamLandscaping-009",
};

/* Brand mark (matches assets/logo.svg): leaf sprout in a swirl basin */
const BRAND_MARK = `<svg class="brand-mark" viewBox="8 8 156 172" aria-hidden="true"><path d="M22 142c-4 18 28 34 66 32 36-2 64-18 60-34-3-11-20-16-40-14 16 3 25 9 23 15-3 10-24 16-44 16-30 0-58-8-65-15z" fill="#1f7d35"/><path d="M44 168c14 9 42 12 64 6-20 11-54 9-64-6z" fill="#1f7d35" opacity="0.85"/><path d="M92 150C86 118 90 84 112 50" stroke="#1f7d35" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M114 48C97 45 86 34 83 17c17 3 28 14 31 31z" fill="#1f7d35"/><path d="M104 62C87 65 73 60 64 46c17-3 31 2 40 16z" fill="#1f7d35"/><path d="M112 66c17-6 33-3 44 8-17 6-33 3-44-8z" fill="#1f7d35"/><path d="M96 92C79 95 65 90 56 76c17-3 31 2 40 16z" fill="#1f7d35"/><path d="M100 98c17-6 33-3 44 8-17 6-33 3-44-8z" fill="#1f7d35"/></svg>`;

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='8 8 156 172'%3E%3Cpath d='M22 142c-4 18 28 34 66 32 36-2 64-18 60-34-3-11-20-16-40-14 16 3 25 9 23 15-3 10-24 16-44 16-30 0-58-8-65-15z' fill='%231f7d35'/%3E%3Cpath d='M92 150C86 118 90 84 112 50' stroke='%231f7d35' stroke-width='10' stroke-linecap='round' fill='none'/%3E%3Cpath d='M114 48C97 45 86 34 83 17c17 3 28 14 31 31z' fill='%231f7d35'/%3E%3Cpath d='M104 62C87 65 73 60 64 46c17-3 31 2 40 16z' fill='%231f7d35'/%3E%3Cpath d='M112 66c17-6 33-3 44 8-17 6-33 3-44-8z' fill='%231f7d35'/%3E%3C/svg%3E";

const ICONS = {
  check:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
  whatsapp:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.8 1.4 1.8 2.2 1.2 1.1 2.3 1.4 2.6 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.4z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
  email:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.3L4.2 7h15.6L12 12.3zM4 9.4V17h16V9.4l-8 5.2-8-5.2z"/></svg>',
};

/* Custom icon set, single design language: 24px grid, 1.8 stroke, round caps */
const stroke = (paths) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
Object.assign(ICONS, {
  leaf: stroke('<path d="M4.5 19.5C5.5 11 11 5.5 20 4.5c-1 9-6.5 14.5-15 15z"/><path d="M4.5 19.5C8 14.5 12 10.5 17 7.5"/>'),
  sprout: stroke('<path d="M12 21v-8"/><path d="M12 13C12 8.5 9.5 6 5 6c0 4.5 2.5 7 7 7z"/><path d="M12 11c0-3.5 2-5.5 6-5.5 0 3.5-2 5.5-6 5.5z"/><path d="M7 21h10"/>'),
  dropCheck: stroke('<path d="M12 3c-3 3.8-6 7.2-6 10.7a6 6 0 0 0 12 0C18 10.2 15 6.8 12 3z"/><path d="M9.6 13.8l1.8 1.8 3.2-3.2"/>'),
  dropSparkle: stroke('<path d="M10 5c-2.6 3.3-5 6.2-5 9.2a5.4 5.4 0 0 0 10.8 0C15.8 11.2 12.6 8.3 10 5z"/><path d="M18.5 3v4M16.5 5h4"/><path d="M20 10.5v2.6M18.7 11.8h2.6"/>'),
  wrenchDrop: stroke('<path d="M15.2 6a4.2 4.2 0 0 0-5.6 5.6L4 17.2V20h2.8l5.6-5.6a4.2 4.2 0 0 0 5.6-5.6L15.4 11.4 12.6 8.6z"/><path d="M19.5 16.5c-.9 1.2-1.5 2.2-1.5 3a1.5 1.5 0 0 0 3 0c0-.8-.6-1.8-1.5-3z"/>'),
  poolSteps: stroke('<path d="M8 4v11M12 4v11M8 7h4M8 11h4"/><path d="M3 18c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0"/>'),
  sprinkler: stroke('<path d="M12 21v-7"/><path d="M12 14 7.5 9.5M12 14l4.5-4.5M12 14V7.5"/><path d="M5.5 6v.01M12 3.5v.01M18.5 6v.01"/><path d="M8 21h8"/>'),
  turf: stroke('<path d="M5 21c-.2-4.5.5-7.5 2-10 1.2 2.8 1.4 6 1 10"/><path d="M11 21c-.4-6 .2-9.8 2-14 1.8 4.2 2.4 8 2 14"/><path d="M18.5 21c.3-3.5-.1-6-1.2-8-.9 1.8-1.2 4.5-1 8"/><path d="M3 21h18"/>'),
  pergola: stroke('<path d="M2.5 7.5 5 4h14l2.5 3.5"/><path d="M5 7.5V21M19 7.5V21"/><path d="M9 7.5V11M15 7.5V11M12 7.5V11"/><path d="M2.5 7.5h19"/>'),
  pathLight: stroke('<path d="M12 3.5a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4z"/><path d="M12 7.5V19"/><path d="M9 21h6"/><path d="M5.5 8.5 7.5 10M18.5 8.5 16.5 10M12 1v.01"/>'),
  fountain: stroke('<path d="M12 3.5v3"/><path d="M8.5 9a3.5 3.5 0 0 0 7 0"/><path d="M12 12.5V16"/><path d="M5 19.5c0-1.6 3.1-2.8 7-2.8s7 1.2 7 2.8"/><path d="M7.5 4.5l-1.2 2.3M16.5 4.5l1.2 2.3"/>'),
  paver: stroke('<path d="M12 3l4.2 4.2L12 11.4 7.8 7.2z"/><path d="M5.2 10.2 9.4 14.4 5.2 18.6 1 14.4z"/><path d="M18.8 10.2 23 14.4l-4.2 4.2-4.2-4.2z"/><path d="M12 17l2.5 2.5L12 22l-2.5-2.5z"/>'),
  calendarCheck: stroke('<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 2.5V7M16 2.5V7M4 10.5h16"/><path d="M9.5 15.5l1.8 1.8 3.2-3.2"/>'),
  sun: stroke('<circle cx="12" cy="12" r="4"/><path d="M12 2.5V4.5M12 19.5v2M4.9 4.9 6.3 6.3M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  team: stroke('<circle cx="9" cy="8" r="3.2"/><path d="M3 20.5v-.7a6 6 0 0 1 12 0v.7"/><path d="M16.5 5.2a3.2 3.2 0 0 1 0 6.1"/><path d="M21 20.5v-.7a6 6 0 0 0-3.5-5.5"/>'),
  report: stroke('<path d="M9 4h6v3H9z"/><path d="M15 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/><path d="M9 12.5h6M9 16.5h4"/>'),
  shield: stroke('<path d="M12 3l7.5 3v5.2c0 4.6-3.1 8.1-7.5 9.8-4.4-1.7-7.5-5.2-7.5-9.8V6z"/><path d="M9.3 11.8l2 2 3.4-3.4"/>'),
  clock: stroke('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  link: stroke('<path d="M9.5 14.5l5-5"/><path d="M8 12 5.5 14.5a3.5 3.5 0 0 0 5 5L13 17"/><path d="M16 12l2.5-2.5a3.5 3.5 0 0 0-5-5L11 7"/>'),
  search: stroke('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/>'),
  doc: stroke('<path d="M13 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z"/><path d="M13 3v5h5"/><path d="M9.5 13h5M9.5 17h5"/>'),
  careLeaf: stroke('<path d="M12 20.5S4.5 16 3 11.5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 9 3.5c-1.5 4.5-9 9-9 9z"/>'),
  star: stroke('<path d="M12 3.5l2.6 5.4 5.9.7-4.4 4 1.2 5.9L12 16.6l-5.3 2.9 1.2-5.9-4.4-4 5.9-.7z"/>'),
  villa: stroke('<path d="M3 21h18"/><path d="M5 21V9.5L12 4l7 5.5V21"/><path d="M9.5 21v-5.5h5V21"/>'),
  building: stroke('<path d="M3 21h18"/><path d="M6 21V4.5L14 2v19"/><path d="M14 8.5l4 1.5V21"/><path d="M9 7v.01M9 11v.01M9 15v.01"/>'),
});

/* Curve easing a hero into the next section; fill must match that section's bg */
const heroCurve = (fill = "#faf8f3") =>
  `<div class="hero-curve" aria-hidden="true"><svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 56C240 10 480 0 720 14c240 14 480 26 720-4v46H0z" fill="${fill}"/></svg></div>`;

const iconChip = (name) => `<span class="li-icon">${ICONS[name]}</span>`;

const waLink = (msg) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

/* Image slots. Values are opaque slot keys; each resolves to the company's own
   responsive WebP photos under /assets/photos (built by `npm run photos` from
   build/photo-map.js). No external image hosts are used anywhere. */
const PHOTOS = {
  homeHero: "homeHero", landscaping: "landscaping", gardenCare: "gardenCare",
  poolMaintenance: "poolMaintenance", poolCleaning: "poolCleaning", poolRepair: "poolRepair",
  poolBuild: "poolBuild", irrigation: "irrigation", grass: "grass", lighting: "lighting",
  waterFeature: "waterFeature", hardscape: "hardscape", skyline: "skyline", facadeDusk: "facadeDusk",
  pergola: "pergola",
};

/* Local responsive WebP manifest written by scripts/process-photos.js. */
let PHOTO_MANIFEST = {};
try { PHOTO_MANIFEST = require("../assets/photos/manifest.json"); } catch { /* run `npm run photos` */ }
if (PHOTO_MANIFEST.og) SITE.ogImage = `${SITE.url}${PHOTO_MANIFEST.og}`;
const IMG = (slot, w) => {
  const loc = PHOTO_MANIFEST[slot];
  if (!loc || !loc.widths || !loc.widths.length) {
    throw new Error(`No processed photo for slot "${slot}". Add assets/photos/originals/ files, then run: npm run photos`);
  }
  const sizes = [...loc.widths].sort((a, b) => a - b);
  const best = sizes.find((x) => x >= w) || sizes[sizes.length - 1];
  return `/assets/photos/${loc.base}-${best}.webp`;
};

/* Responsive content <img>: emits srcset + sizes so phones fetch a small variant and
   desktops a larger one (actual-display-size optimisation). Hero images stay CSS
   backgrounds with their own 1600/720 media-query swap. */
const CARD_SIZES = "(min-width: 900px) 22rem, (min-width: 640px) 45vw, 92vw";
const PROJECT_SIZES = "(min-width: 900px) 34rem, (min-width: 640px) 46vw, 92vw";
const PANEL_SIZES = "(min-width: 900px) 34rem, 92vw";
function photoImg(slot, { alt, sizes = CARD_SIZES, w, h, eager = false } = {}) {
  const m = PHOTO_MANIFEST[slot];
  if (!m || !m.widths || !m.widths.length) {
    throw new Error(`No processed photo for slot "${slot}". Run: npm run photos`);
  }
  const finalAlt = alt || m.alt || ""; // fall back to the accurate per-photo alt from photo-map
  const widths = [...m.widths].sort((a, b) => a - b);
  const srcset = widths.map((x) => `/assets/photos/${m.base}-${x}.webp ${x}w`).join(", ");
  const src = `/assets/photos/${m.base}-${widths[widths.length - 1]}.webp`;
  const load = eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<img src="${src}" srcset="${srcset}" sizes="${sizes}" alt="${finalAlt}" width="${w}" height="${h}" ${load}>`;
}

const check = (text) => `<li>${ICONS.check}<span>${text}</span></li>`;

/* Official Google Maps product icon for the header Location button.
   Downloaded from Google's gstatic CDN and stored locally as WebP (no hotlinking). */
const GMAP_PIN = '<img class="gmap-logo" src="/assets/google-maps-icon.webp" width="20" height="20" alt="" decoding="async">';

/* p = "" for root pages, "../" for /services/ pages */
function head(page, p) {
  const og = page.canonical;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Google Tag Manager (deferred for Core Web Vitals: loads gtm.js on first
       user interaction or shortly after load, so it never blocks render/LCP) -->
  <script>
  window.dataLayer=window.dataLayer||[];(function(w,d){var done=false;
  function load(){if(done)return;done=true;
  w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName('script')[0],j=d.createElement('script');
  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=GTM-TZK6FN26';
  f.parentNode.insertBefore(j,f);off();}
  var ev=['scroll','mousemove','touchstart','keydown','pointerdown'];
  function off(){ev.forEach(function(e){w.removeEventListener(e,load,{passive:true});});}
  ev.forEach(function(e){w.addEventListener(e,load,{once:true,passive:true});});
  w.addEventListener('load',function(){setTimeout(load,3500);});})(window,document);
  </script>
  <!-- End Google Tag Manager -->
  <meta name="google-site-verification" content="C8mpHyIBfHVt29TRW6R-B2P594sB51Pr2As57a0D6RU">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="robots" content="${page.robots || "index, follow, max-image-preview:large"}">
  <link rel="canonical" href="${og}">
  <link rel="alternate" hreflang="en-ae" href="${og}">
  <link rel="alternate" hreflang="x-default" href="${og}">
  <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
  <link rel="dns-prefetch" href="https://i.ytimg.com">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${og}">
  <meta property="og:image" content="${SITE.ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${SITE.name} — landscaping and swimming pool services in Dubai">
  <meta property="og:locale" content="en_AE">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${SITE.ogImage}">
  <meta name="twitter:image:alt" content="${SITE.name} — landscaping and swimming pool services in Dubai">
  <meta name="theme-color" content="#143527">
  <link rel="icon" href="${FAVICON}">
  <link rel="apple-touch-icon" href="${p}assets/apple-touch-icon.png">
  <link rel="manifest" href="${p}site.webmanifest">
  <link rel="preload" as="font" type="font/woff2" href="${p}assets/fonts/poppins-latin-2.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="${p}assets/fonts/poppins-latin-6.woff2" crossorigin>
${page.heroImg ? `  <link rel="preload" as="image" href="${page.heroImg}" media="(min-width: 641px)" fetchpriority="high">\n` : ""}${page.heroImgSm ? `  <link rel="preload" as="image" href="${page.heroImgSm}" media="(max-width: 640px)" fetchpriority="high">\n` : ""}  <link rel="stylesheet" href="${p}css/styles.min.css">
${(page.schema || [])
  .map(
    (s) =>
      `  <script type="application/ld+json">\n  ${JSON.stringify(s, null, 2).replace(/\n/g, "\n  ")}\n  </script>`
  )
  .join("\n")}
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZK6FN26"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<a class="skip-link" href="#main">Skip to content</a>
`;
}

function header(p, current) {
  const cur = (href) => (href === current ? ' aria-current="page"' : "");
  return `
<header class="site-header">
  <div class="wrap header-bar">
    <a class="brand" href="/" aria-label="${SITE.name} home page">
      ${BRAND_MARK}
      <span class="brand-name">NAM<small>Landscaping · Dubai</small></span>
    </a>
    <nav id="site-nav" class="site-nav" aria-label="Main navigation">
      <ul>
        <li><a href="/"${cur("/")}>Home</a></li>
        <li>
          <button class="nav-sub-toggle" type="button" aria-expanded="false" aria-controls="nav-services">Services</button>
          <ul class="nav-sub" id="nav-services">
            <li><a href="/services"${cur("/services")}>All Services</a></li>
            <li><a href="/services/garden-landscaping-lighting-dubai"${cur("/services/garden-landscaping-lighting-dubai")}>Garden Landscaping &amp; Lighting</a></li>
            <li><a href="/services/garden-maintenance-dubai"${cur("/services/garden-maintenance-dubai")}>Garden Maintenance</a></li>
            <li><a href="/services/swimming-pool-services-dubai"${cur("/services/swimming-pool-services-dubai")}>Swimming Pool Services</a></li>
            <li><a href="/services/water-features-irrigation-dubai"${cur("/services/water-features-irrigation-dubai")}>Water Features &amp; Irrigation</a></li>
            <li><a href="/services/artificial-grass-installation-dubai"${cur("/services/artificial-grass-installation-dubai")}>Artificial Grass</a></li>
            <li><a href="/services/pergola-shade-structures-dubai"${cur("/services/pergola-shade-structures-dubai")}>Pergolas &amp; Shade</a></li>
            <li><a href="/services/hardscaping-outdoor-upgrades-dubai"${cur("/services/hardscaping-outdoor-upgrades-dubai")}>Hardscaping</a></li>
            <li><a href="/annual-maintenance-contracts"${cur("/annual-maintenance-contracts")}>Annual Maintenance Contracts</a></li>
          </ul>
        </li>
        <li><a href="/projects"${cur("/projects")}>Projects</a></li>
        <li><a href="/areas-we-serve"${cur("/areas-we-serve")}>Areas</a></li>
        <li><a href="/about"${cur("/about")}>About</a></li>
        <li><a href="/faq"${cur("/faq")}>FAQ</a></li>
        <li><a href="/contact"${cur("/contact")}>Contact</a></li>
      </ul>
    </nav>
    <a class="header-map" href="${SITE.mapsUrl}" target="_blank" rel="noopener" aria-label="View our location on Google Maps">${GMAP_PIN}<span>Location</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span><span></span><span></span></button>
  </div>
</header>
`;
}

function footer(p) {
  return `
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-nap">
      <div class="footer-brand">
        ${BRAND_MARK}
        <span class="brand-name">NAM<small>Landscaping · Dubai</small></span>
      </div>
      <p>Premium landscaping, garden maintenance and swimming pool care for villas, communities and commercial properties across Dubai.</p>
      <p>${SITE.serviceArea}</p>
      <p><a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p>${SITE.hours}</p>
      <p><a href="${SITE.mapsUrl}" target="_blank" rel="noopener">View our location on Google Maps</a></p>
      <div class="footer-social">
        <a href="${SITE.social.facebook}" target="_blank" rel="noopener" aria-label="NAM Landscaping on Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h2.5l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.2 15.8.1 14.7.1 12.4.1 11 1.5 11 3.9V6H8.5v3H11v9h3V9z"/></svg></a>
        <a href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="NAM Landscaping on Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg></a>
        <a href="${SITE.social.tiktok}" target="_blank" rel="noopener" aria-label="NAM Landscaping on TikTok"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.4 2.3 1.8 3.9 4 4.2v2.6c-1.4.1-2.8-.3-4-1v5.6c0 3.4-2.6 5.9-5.9 5.9C7.4 20.3 5 17.9 5 14.9c0-3 2.6-5.4 5.7-5.2v2.7c-.4-.1-.8-.2-1.2-.2-1.6 0-2.8 1.3-2.6 2.9.1 1.4 1.4 2.5 2.8 2.4 1.5 0 2.6-1.2 2.6-2.7V3h2.2z"/></svg></a>
        <a href="${SITE.social.youtube}" target="_blank" rel="noopener" aria-label="NAM Landscaping on YouTube"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 8.2c0-1.4-1-2.5-2.4-2.7C17.7 5.2 12 5.2 12 5.2s-5.7 0-7.6.3C3 5.7 2 6.8 2 8.2 1.8 9.6 1.8 12 1.8 12s0 2.4.2 3.8c0 1.4 1 2.5 2.4 2.7 1.9.3 7.6.3 7.6.3s5.7 0 7.6-.3c1.4-.2 2.4-1.3 2.4-2.7.2-1.4.2-3.8.2-3.8s0-2.4-.2-3.8zM10.2 14.7V9.3l4.7 2.7-4.7 2.7z"/></svg></a>
      </div>
    </div>
    <nav aria-label="Pool services">
      <h2>Pool Services</h2>
      <ul>
        <li><a href="/services/swimming-pool-services-dubai">Swimming Pool Services</a></li>
        <li><a href="/services/swimming-pool-services-dubai#pool-maintenance">Pool Maintenance</a></li>
        <li><a href="/services/swimming-pool-services-dubai#pool-cleaning">Pool Cleaning</a></li>
        <li><a href="/services/swimming-pool-services-dubai#pool-construction">Pool Construction</a></li>
        <li><a href="/annual-maintenance-contracts">Maintenance Contracts</a></li>
      </ul>
    </nav>
    <nav aria-label="Landscaping services">
      <h2>Landscaping</h2>
      <ul>
        <li><a href="/services/garden-landscaping-lighting-dubai">Landscaping &amp; Lighting</a></li>
        <li><a href="/services/garden-maintenance-dubai">Garden Maintenance</a></li>
        <li><a href="/services/water-features-irrigation-dubai">Water Features &amp; Irrigation</a></li>
        <li><a href="/services/artificial-grass-installation-dubai">Artificial Grass</a></li>
        <li><a href="/services/pergola-shade-structures-dubai">Pergolas &amp; Shade</a></li>
        <li><a href="/services/hardscaping-outdoor-upgrades-dubai">Hardscaping</a></li>
      </ul>
    </nav>
    <nav aria-label="Company">
      <h2>Company</h2>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/areas-we-serve">Areas We Serve</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </div>
  <div class="wrap footer-bottom">
    <p>© ${SITE.name}. All rights reserved.</p>
    <p>Landscaping &amp; Swimming Pool Maintenance in Dubai, UAE</p>
  </div>
</footer>

<div class="sticky-cta" role="region" aria-label="Quick contact">
  <a class="sticky-btn" href="${SITE.phoneHref}">${ICONS.phone}<span>Call</span></a>
  <a class="sticky-btn sticky-btn--wa" href="${waLink("Hello NAM Landscaping, I'd like a quote for my garden or pool.")}" rel="nofollow noopener" target="_blank">${ICONS.whatsapp}<span>WhatsApp</span></a>
</div>

<button class="to-top" type="button" aria-label="Back to top" hidden>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>
</button>

<script src="${p}js/main.min.js" defer></script>
</body>
</html>
`;
}

function breadcrumbsHtml(p, trail) {
  const items = trail
    .map((t, i) =>
      i === trail.length - 1
        ? `<li><span aria-current="page">${t.name}</span></li>`
        : `<li><a href="${t.href || '/'}">${t.name}</a></li>`
    )
    .join("\n          ");
  return `<nav class="crumbs" aria-label="Breadcrumb">
        <ol>
          ${items}
        </ol>
      </nav>`;
}

function breadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.href ? `${SITE.url}${t.href}` : `${SITE.url}/`,
    })),
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.aPlain || f.a.replace(/<[^>]+>/g, "") },
    })),
  };
}

function faqListHtml(faqs) {
  return `<div class="faq-list">
${faqs
  .map(
    (f) => `        <details class="faq-item">
          <summary>${f.q}</summary>
          <div class="faq-body"><p>${f.a}</p></div>
        </details>`
  )
  .join("\n")}
      </div>`;
}

/* Single source of truth for the LocalBusiness entity (referenced by @id site-wide).
   Service-area business: verified Google Maps pin, no published street address. */
function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: SITE.altName,
    description:
      "Landscaping, garden maintenance and swimming pool maintenance company in Dubai serving villas, residential communities and commercial properties.",
    url: `${SITE.url}/`,
    logo: `${SITE.url}/assets/logo.svg`,
    image: SITE.ogImage,
    telephone: SITE.phoneE164,
    email: SITE.email,
    priceRange: "$$",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50 },
    slogan: "One trusted team for landscaping and swimming pool care across Dubai.",
    knowsAbout: [
      "Landscaping", "Garden landscaping", "Garden maintenance",
      "Swimming pool maintenance", "Swimming pool cleaning", "Swimming pool repair",
      "Swimming pool construction", "Artificial grass installation", "Irrigation systems",
      "Water features", "Pergolas and shade structures", "Hardscaping", "Landscape lighting",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      addressCountry: SITE.addressCountry,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.mapsUrl,
    areaServed: [
      "Dubai", "Palm Jumeirah", "Emirates Hills", "Dubai Hills Estate", "Arabian Ranches",
      "Jumeirah Golf Estates", "Al Barari", "The Meadows", "The Springs",
      "Jumeirah Village Circle", "Damac Hills", "Tilal Al Ghaf",
      "Mohammed Bin Rashid City", "Mirdif", "Jumeirah", "Umm Suqeim",
    ].map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    // Machine-readable list of the services we actually offer (each maps to a real
    // canonical page). Helps Google, AI Overviews and answer engines understand scope.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscaping & Swimming Pool Services in Dubai",
      itemListElement: [
        { name: "Garden Landscaping & Landscape Lighting", href: "services/garden-landscaping-lighting-dubai" },
        { name: "Garden Maintenance", href: "services/garden-maintenance-dubai" },
        { name: "Swimming Pool Services (Construction, Maintenance, Cleaning & Repair)", href: "services/swimming-pool-services-dubai" },
        { name: "Water Features & Irrigation", href: "services/water-features-irrigation-dubai" },
        { name: "Artificial Grass Installation", href: "services/artificial-grass-installation-dubai" },
        { name: "Pergolas & Shade Structures", href: "services/pergola-shade-structures-dubai" },
        { name: "Hardscaping & Outdoor Upgrades", href: "services/hardscaping-outdoor-upgrades-dubai" },
        { name: "Annual Garden & Pool Maintenance Contracts", href: "annual-maintenance-contracts" },
      ].map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${SITE.url}/${s.href}`,
          provider: { "@id": `${SITE.url}/#business` },
          areaServed: { "@type": "City", name: "Dubai" },
        },
      })),
    },
    // Only verified, owner-confirmed profiles belong here. The YouTube channel is
    // verified (its videos are embedded on this site). Add Instagram/Facebook/GBP
    // once the owner confirms the exact URLs — see docs/LOCAL-SEO-GEO-AUDIT.md.
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.tiktok, SITE.social.youtube],
  };
}

/* Responsive, lazy, key-free Google Maps embed with reserved aspect ratio + directions link */
function mapEmbed(title) {
  return `<div class="map-embed">
        <iframe src="${SITE.mapEmbedUrl}" title="${title}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
      <p class="map-actions"><a class="btn btn--green" href="${SITE.directionsUrl}" target="_blank" rel="noopener">${ICONS.pin} Get Directions</a> <a class="map-link" href="${SITE.mapsUrl}" target="_blank" rel="noopener">View on Google Maps</a></p>`;
}

/* Conversion band: primary action + the three contact channels Dubai leads use */
function ctaBand(p, { title, lede, primary = "Book a Free Site Visit", waMsg }) {
  const leaf =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.8" aria-hidden="true"><path d="M4.5 19.5C5.5 11 11 5.5 20 4.5c-1 9-6.5 14.5-15 15z"/><path d="M4.5 19.5C8 14.5 12 10.5 17 7.5"/></svg>';
  return `
  <section class="section cta-band" aria-labelledby="cta-title">
    <span class="cta-leaf cta-leaf--left" aria-hidden="true">${leaf}</span>
    <span class="cta-leaf cta-leaf--right" aria-hidden="true">${leaf}</span>
    <div class="wrap">
      <h2 id="cta-title">${title}</h2>
      <p class="lede">${lede}</p>
      <div class="hero-ctas">
        <a class="btn btn--gold btn--lg" href="/contact#quote">${primary}</a>
        <a class="btn btn--whatsapp btn--lg" href="${waLink(waMsg)}" rel="nofollow noopener" target="_blank">${ICONS.whatsapp} WhatsApp Us</a>
      </div>
    </div>
  </section>
`;
}

/* Hero photo + two example photos per service page, keyed by slug */
const SERVICE_IMG = {
  "landscaping-dubai": { hero: "landscaping", ex: ["gardenCare", "hardscape"], icon: "leaf" },
  "garden-maintenance-dubai": { hero: "gardenCare", ex: ["irrigation", "grass"], icon: "sprout" },
  "swimming-pool-maintenance-dubai": { hero: "poolMaintenance", ex: ["poolCleaning", "waterFeature"], icon: "dropCheck" },
  "swimming-pool-cleaning-dubai": { hero: "poolCleaning", ex: ["poolMaintenance", "poolRepair"], icon: "dropSparkle" },
  "swimming-pool-repair-dubai": { hero: "poolRepair", ex: ["poolMaintenance", "poolBuild"], icon: "wrenchDrop" },
  "swimming-pool-construction-dubai": { hero: "poolBuild", ex: ["homeHero", "waterFeature"], icon: "poolSteps" },
  "irrigation-installation-repair-dubai": { hero: "irrigation", ex: ["grass", "gardenCare"], icon: "sprinkler" },
  "artificial-grass-installation-dubai": { hero: "grass", ex: ["hardscape", "irrigation"], icon: "turf" },
  "pergola-shade-structures-dubai": { hero: "pergola", ex: ["facadeDusk", "lighting"], icon: "pergola" },
  "landscape-lighting-dubai": { hero: "lighting", ex: ["facadeDusk", "waterFeature"], icon: "pathLight" },
  "water-features-dubai": { hero: "waterFeature", ex: ["lighting", "poolMaintenance"], icon: "fountain" },
  "hardscaping-outdoor-upgrades-dubai": { hero: "hardscape", ex: ["landscaping", "facadeDusk"], icon: "paver" },
};

const BENEFIT_ICONS = ["star", "shield", "careLeaf", "clock"];
const WHY_ICONS = ["link", "team", "report", "doc", "clock"];
const STEP_ICONS = ["search", "doc", "wrenchDrop", "careLeaf"];

/* Optional "What affects the cost" section — buyer-intent cost-factor content
   (real price DRIVERS, never invented figures). Gated: renders only when a page
   supplies `costFactors`. Reuses existing section + check-list components, so it
   adds no new CSS/JS and no layout shift. tint alternates the background to keep
   the page's section rhythm. */
function costFactorsSection(cf, p, tint) {
  if (!cf || !cf.factors || !cf.factors.length) return "";
  // Owner-approved indicative "from" prices only (never auto-generated). Each carries
  // a disclaimer so an unusual job is never locked to a headline figure.
  const priceBlock = (cf.prices && cf.prices.length)
    ? `<div class="price-cards">
        ${cf.prices.map((pr) => `<div class="price-card">
          <span class="price-card__label">${pr.label}</span>
          <span class="price-card__price"><span class="price-card__from">from</span> <span class="price-card__amount">${pr.from}</span> <span class="price-card__unit">${pr.unit}</span></span>
        </div>`).join("\n        ")}
      </div>
      ${cf.priceNote ? `<p class="price-note">${cf.priceNote}</p>` : ""}`
    : "";
  const valueLine = cf.valueLine || "<strong>Fair, transparent pricing.</strong> Fixed in writing before any work begins, so there are no surprises later.";
  return `
  <section class="section${tint ? " section--tint" : ""}" aria-labelledby="cost-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">What It Costs</p>
        <h2 id="cost-title">${cf.title}</h2>
        <p class="lede">${cf.lead}</p>
      </div>
      ${priceBlock}
      <ul class="cost-grid">
        ${cf.factors.map((f) => `<li class="cost-card"><span class="cost-card__icon">${ICONS.check}</span><span class="cost-card__text">${f}</span></li>`).join("\n        ")}
      </ul>
      <p class="cost-value"><span class="cost-value__icon">${ICONS.shield}</span><span>${valueLine}</span></p>
      <div class="cost-cta"><a class="btn btn--gold btn--lg" href="${p}contact.html#quote">Get Your Free Quote</a></div>
    </div>
  </section>`;
}

/* Optional comparison table (e.g. artificial grass vs natural lawn). Semantic
   <table> for SEO/LLM extraction; CSS stacks it into cards on mobile. */
function comparisonSection(c, p, tint) {
  if (!c || !c.rows || !c.rows.length) return "";
  return `
  <section class="section${tint ? " section--tint" : ""}" aria-labelledby="compare-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${c.eyebrow || "Compare"}</p>
        <h2 id="compare-title">${c.title}</h2>
        ${c.lead ? `<p class="lede">${c.lead}</p>` : ""}
      </div>
      <table class="compare-table">
        <thead><tr><th scope="col">${c.factorLabel || "Factor"}</th><th scope="col">${c.cols[0]}</th><th scope="col">${c.cols[1]}</th></tr></thead>
        <tbody>
          ${c.rows.map((r) => `<tr><th scope="row">${r.f}</th><td data-label="${c.cols[0]}">${r.a}</td><td data-label="${c.cols[1]}">${r.b}</td></tr>`).join("\n          ")}
        </tbody>
      </table>
      ${c.verdict ? `<p class="cost-value"><span class="cost-value__icon">${ICONS.check}</span><span>${c.verdict}</span></p>` : ""}
      ${c.cta !== false ? `<div class="cost-cta"><a class="btn btn--gold btn--lg" href="${p}contact.html#quote">Get Your Free Quote</a></div>` : ""}
    </div>
  </section>`;
}

/* Optional N-column price/grade table (e.g. artificial grass by grade). Reuses the
   responsive .compare-table (stacks into labelled cards on mobile). rows = arrays:
   [rowHeader, cell, cell, ...] aligned to cols (first col is the row header). */
function priceTableSection(pt, p, tint) {
  if (!pt || !pt.rows || !pt.rows.length) return "";
  return `
  <section class="section${tint ? " section--tint" : ""}" aria-labelledby="gradeprice-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${pt.eyebrow || "Pricing"}</p>
        <h2 id="gradeprice-title">${pt.title}</h2>
        ${pt.lead ? `<p class="lede">${pt.lead}</p>` : ""}
      </div>
      <table class="compare-table">
        <thead><tr>${pt.cols.map((c) => `<th scope="col">${c}</th>`).join("")}</tr></thead>
        <tbody>
          ${pt.rows.map((r) => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map((cell, i) => `<td data-label="${pt.cols[i + 1]}">${cell}</td>`).join("")}</tr>`).join("\n          ")}
        </tbody>
      </table>
      ${pt.note ? `<p class="price-note">${pt.note}</p>` : ""}
      <div class="cost-cta"><a class="btn btn--gold btn--lg" href="${p}contact.html#quote">Get Your Free Quote</a></div>
    </div>
  </section>`;
}

/* Full service-page renderer (10-section template) */
function servicePage(s) {
  const p = "/";
  const si = SERVICE_IMG[s.slug];
  const heroImg = IMG(PHOTOS[si.hero], 1600);
  const heroImgSm = IMG(PHOTOS[si.hero], 720);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: s.crumb, href: `/services/${s.slug}` },
  ];
  const page = {
    title: s.metaTitle,
    description: s.metaDescription,
    canonical: `${SITE.url}/services/${s.slug}`,
    heroImg,
    heroImgSm,
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: s.serviceName,
        serviceType: s.serviceName,
        description: s.metaDescription,
        areaServed: { "@type": "City", name: "Dubai" },
        provider: { "@id": `${SITE.url}/#business` },
        url: `${SITE.url}/services/${s.slug}`,
      },
      breadcrumbSchema(trail),
      faqSchema(s.faqs),
    ],
  };

  const body = `
<main id="main">

  <section class="hero hero--page hero--photo" aria-labelledby="page-title">
    <img class="hero-bg" src="${heroImg}" srcset="${heroImgSm} 720w, ${heroImg} 1600w" sizes="100vw" alt="" aria-hidden="true" fetchpriority="high" decoding="async">
    <div class="wrap">
      ${breadcrumbsHtml(p, trail)}
      <p class="eyebrow">${s.eyebrow}</p>
      <h1 id="page-title">${s.h1}</h1>
      <p class="lede">${s.heroLede}</p>
      <div class="hero-ctas">
        <a class="btn btn--gold btn--lg" href="${p}contact.html#quote">Get a Free Quote</a>
        <a class="btn btn--whatsapp btn--lg" href="${waLink(s.waMsg)}" rel="nofollow noopener" target="_blank">${ICONS.whatsapp} WhatsApp Us</a>
      </div>
      <ul class="hero-points">
        ${s.heroPoints.map((pt) => `<li>${ICONS.check} ${pt}</li>`).join("\n        ")}
      </ul>
    </div>
    ${heroCurve()}
  </section>

  <section class="section" aria-labelledby="intro-title">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Overview</p>
        <h2 id="intro-title">${s.introTitle}</h2>
        ${s.intro.map((para) => `<p>${para}</p>`).join("\n        ")}
      </div>
      <div>
        <div class="card">
          <div class="card-icon">${ICONS[si.icon]}</div>
          <h3>What's Included</h3>
          <ul class="check-list">
            ${s.includes.map(check).join("\n            ")}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="benefits-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Why It Matters</p>
        <h2 id="benefits-title">${s.benefitsTitle}</h2>
      </div>
      <div class="grid grid-2">
        ${s.benefits
          .map(
            (b, i) => `<article class="card reveal"><div class="card-icon card-icon--gold">${ICONS[BENEFIT_ICONS[i % 4]]}</div><h3>${b.h}</h3><p>${b.t}</p></article>`
          )
          .join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="problems-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Problems We Solve</p>
        <h2 id="problems-title">${s.problemsTitle}</h2>
      </div>
      <ul class="check-list check-list--2col">
        ${s.problems.map(check).join("\n        ")}
      </ul>
    </div>
  </section>
${costFactorsSection(s.costFactors, p, true)}
${priceTableSection(s.priceTable, p, false)}
${comparisonSection(s.comparison, p, true)}
  <section class="section section--dark" aria-labelledby="process-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Our Process</p>
        <h2 id="process-title">${s.processTitle}</h2>
      </div>
      <div class="steps">
        ${s.process
          .map((st, i) => `<div class="step reveal"><span class="step-icon">${ICONS[STEP_ICONS[i % 4]]}</span><h3>${st.h}</h3><p>${st.t}</p></div>`)
          .join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="why-title">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Why NAM Landscaping</p>
        <h2 id="why-title">One Trusted Team for Your Whole Outdoors</h2>
        <ul class="icon-list">
          ${s.why.map((w, i) => `<li>${iconChip(WHY_ICONS[i % 5])}<span>${w}</span></li>`).join("\n          ")}
        </ul>
      </div>
      <div class="split-panel ${s.pool ? "pm-2" : "pm-1"}">
        ${photoImg("skyline", { alt: "Landscaped estate courtyard with lawns and palms. NAM Landscaping serves villas and communities across Dubai", sizes: PANEL_SIZES, w: 900, h: 600 })}
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="examples-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Recent Work</p>
        <h2 id="examples-title">Project Examples</h2>
      </div>
      <div class="grid grid-2">
        ${s.examples
          .map(
            (e, i) => `<article class="card project-card reveal">
          <div class="project-media ${e.pm}"><span class="pm-tag">${e.tag}</span>${photoImg(si.ex[i], { alt: `${e.tag} project in ${e.meta.split(" · ")[0]}, Dubai`, sizes: PROJECT_SIZES, w: 800, h: 500 })}</div>
          <div class="project-body">
            <p class="project-meta">${e.meta}</p>
            <h3>${e.h}</h3>
            <p>${e.t}</p>
            <a class="card-link" href="/projects">See all projects</a>
          </div>
        </article>`
          )
          .join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="faq-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Good to Know</p>
        <h2 id="faq-title">${s.faqTitle}</h2>
      </div>
      ${faqListHtml(s.faqs)}
      <p class="mt-2"><a href="/faq">Browse the full FAQ library →</a></p>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="related-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Related Services</p>
        <h2 id="related-title">Often Paired With</h2>
      </div>
      <div class="related-strip">
        ${s.related
          .map(
            (r) => `<article class="card reveal"><h3>${r.h}</h3><p>${r.t}</p><a class="card-link" href="${r.href}">${r.label}</a></article>`
          )
          .join("\n        ")}
      </div>
    </div>
  </section>
${ctaBand(p, { title: s.ctaTitle, lede: s.ctaLede, waMsg: s.waMsg })}
</main>
`;

  return head(page, p) + header(p, `/services/${s.slug}`) + body + footer(p);
}

/* ---- Merged (combined) service pages ------------------------------------
   Several individual services are consolidated onto one comprehensive page
   (all content, keywords, images and FAQs retained as in-page sections).
   The old per-service URLs are removed at build time; every internal link is
   rewritten to the merged page + section anchor (see build.js). */
const MERGED_GROUPS = [
  {
    slug: "swimming-pool-services-dubai", crumb: "Swimming Pool Services", heroSlot: "poolMaintenance",
    metaTitle: "Swimming Pool Maintenance, Repair & Construction Dubai | NAM",
    metaDescription: "Complete swimming pool services in Dubai: pool construction, weekly maintenance, cleaning and repair by one trusted team. Free pool assessment and written quote.",
    eyebrow: "Swimming Pool Services in Dubai",
    h1: "Swimming Pool Services in Dubai: Construction, Maintenance, Cleaning & Repair",
    heroLede: "One trusted Dubai team for your whole pool: building it, keeping the water safe and balanced, deep-cleaning it, and fixing it fast when something fails.",
    heroPoints: ["Build, maintain, clean & repair", "Trained pool technicians", "Free pool assessment"],
    waMsg: "Hello NAM Landscaping, I'd like a quote for swimming pool services.",
    intro: ["From a brand-new build to weekly upkeep, NAM Landscaping covers every swimming pool service a Dubai villa or community needs, under one accountable contract. Each service is detailed below."],
    members: [
      { slug: "swimming-pool-construction-dubai", anchor: "pool-construction", imgSlot: "poolBuild" },
      { slug: "swimming-pool-maintenance-dubai", anchor: "pool-maintenance", imgSlot: "poolMaintenance" },
      { slug: "swimming-pool-cleaning-dubai", anchor: "pool-cleaning", imgSlot: "poolCleaning" },
      { slug: "swimming-pool-repair-dubai", anchor: "pool-repair", imgSlot: "poolRepair" },
    ],
    costFactors: {
      title: "What Affects the Cost of Pool Work in Dubai",
      lead: "Pool pricing splits two ways: weekly maintenance is a fixed monthly fee, while construction, renovation and repairs are quoted by scope after a free assessment. The factors that move the figure:",
      prices: [
        { label: "Weekly pool maintenance", from: "AED 350", unit: "/ month" },
        { label: "New pool construction", from: "AED 65,000", unit: "/ project" },
      ],
      priceNote: "Indicative starting prices, with routine chemicals included in maintenance. Construction, renovation and repairs are quoted by scope after a free assessment.",
      valueLine: "<strong>Competitive, transparent pricing.</strong> Maintenance at one fixed monthly fee; projects quoted in writing before work starts.",
      factors: [
        "Pool size and type, and whether it's a new build, a repair or weekly care",
        "Maintenance frequency, and whether garden care is combined on the same visit",
        "For construction: structure, finishes, plant and lighting specified",
        "For repairs: the fault itself, from leak detection to pump, heater, tiling or finish",
        "Equipment efficiency, modern variable-speed pumps and salt systems cut running costs",
        "Routine chemicals and consumables, which are included in our maintenance plans",
      ],
    },
    faqTitle: "Swimming Pool Services: Questions, Answered",
    ctaTitle: "Get Your Pool Sorted, Start to Finish", ctaLede: "Book a free pool assessment: one team for building, cleaning, balancing and repairing your Dubai pool.",
    related: [
      { h: "Annual Maintenance Contracts", t: "Combine pool and garden care on one schedule and one invoice.", href: "/annual-maintenance-contracts.html", label: "See contracts" },
      { h: "Garden Landscaping", t: "Design the garden around your pool: planting, shade, paving and lighting.", href: "/services/garden-landscaping-lighting-dubai.html#landscaping", label: "Explore landscaping" },
      { h: "Water Features", t: "Add fountains and cascades to your pool area.", href: "/services/water-features-irrigation-dubai.html#water-features", label: "Water features" },
    ],
  },
  {
    slug: "garden-landscaping-lighting-dubai", crumb: "Landscaping & Lighting", heroSlot: "landscaping",
    metaTitle: "Garden Landscaping & Design + Lighting in Dubai | NAM Landscaping",
    metaDescription: "Garden landscaping and landscape design in Dubai by one in-house team: design, build, planting, hardscape and warm landscape lighting. Free site visit and quote.",
    eyebrow: "Garden Landscaping & Design in Dubai",
    h1: "Garden Landscaping, Design & Landscape Lighting in Dubai",
    heroLede: "Designed, built and beautifully lit: complete villa garden landscaping and design, plus the warm landscape lighting that makes it work after dark.",
    heroPoints: ["Design + build by one team", "Climate-smart planting", "Warm landscape lighting"],
    waMsg: "Hello NAM Landscaping, I'd like a quote for garden landscaping and lighting.",
    intro: ["NAM Landscaping handles complete garden landscaping and landscape design in Dubai, then layers in the lighting that lets you enjoy the space every evening. Both services are detailed below."],
    members: [
      { slug: "landscaping-dubai", anchor: "landscaping", imgSlot: "landscaping" },
      { slug: "landscape-lighting-dubai", anchor: "landscape-lighting", imgSlot: "lighting" },
    ],
    costFactors: {
      title: "What Affects the Cost of Landscaping",
      lead: "A full garden is quoted by design and scope after a free site visit, there's no flat rate because no two plots are alike. The main cost drivers:",
      prices: [
        { label: "Garden design & build", from: "AED 120", unit: "/ m²" },
      ],
      priceNote: "Indicative starting rate for garden landscaping. The figure varies with planting, hardscape and features, fixed in writing after a free site visit.",
      valueLine: "<strong>Competitive, transparent pricing.</strong> A fixed, itemised quote before we break ground, with no scope creep.",
      factors: [
        "Plot size, and how much is soft planting versus hardscape",
        "Design complexity, levels, zones and feature elements",
        "Planting choice, mature trees and palms cost more than young stock",
        "Irrigation, drainage and groundworks below the surface",
        "Lighting, pergolas and water features added to the scheme",
        "Community NOC approval and site access for materials",
      ],
    },
    faqTitle: "Landscaping & Lighting: Questions, Answered",
    ctaTitle: "Design, Build and Light Your Garden", ctaLede: "Book a free site visit for complete garden landscaping and landscape lighting across Dubai.",
    related: [
      { h: "Garden Maintenance", t: "Keep the new garden pristine with scheduled visits.", href: "/services/garden-maintenance-dubai.html", label: "Garden maintenance" },
      { h: "Hardscaping", t: "Paving, decking and outdoor living upgrades.", href: "/services/hardscaping-outdoor-upgrades-dubai.html", label: "Hardscaping" },
      { h: "Water Features & Irrigation", t: "Fountains and smart watering for the garden.", href: "/services/water-features-irrigation-dubai.html", label: "Water & irrigation" },
    ],
  },
  {
    slug: "water-features-irrigation-dubai", crumb: "Water Features & Irrigation", heroSlot: "waterFeature",
    metaTitle: "Water Features, Fountains & Irrigation in Dubai | NAM Landscaping",
    metaDescription: "Water features and fountains in Dubai: cascades, ponds and wall fountains, plus efficient drip and sprinkler irrigation, installed and repaired. Free assessment.",
    eyebrow: "Water Features & Fountains in Dubai",
    h1: "Water Features, Fountains & Irrigation Systems in Dubai",
    heroLede: "The sight and sound of water, from fountains and cascades to the smart irrigation that keeps your whole garden alive through the Dubai summer.",
    heroPoints: ["Fountains, cascades & ponds", "Drip & sprinkler systems", "Water-wise design"],
    waMsg: "Hello NAM Landscaping, I'd like a quote for water features and irrigation.",
    intro: ["NAM Landscaping designs and installs decorative water features and fountains, plus the working irrigation that keeps Dubai gardens green. Both services are detailed below."],
    members: [
      { slug: "water-features-dubai", anchor: "water-features", imgSlot: "waterFeature" },
      { slug: "irrigation-installation-repair-dubai", anchor: "irrigation", imgSlot: "irrigation" },
    ],
    costFactors: {
      title: "What Affects the Cost of Water Features & Irrigation",
      lead: "Decorative water features are quoted by design and scale, while irrigation is priced by garden size and system type. The main cost drivers:",
      prices: [
        { label: "Smart irrigation system", from: "AED 2,500", unit: "/ villa" },
        { label: "Garden water feature", from: "AED 6,000", unit: "/ project" },
      ],
      priceNote: "Indicative starting prices for a typical Dubai villa. Fountains, cascades and ponds vary with size, pump, lighting and stonework, all fixed in writing after a free assessment.",
      valueLine: "<strong>Competitive, transparent pricing.</strong> An itemised quote before installation, with efficient pumps and smart controllers that cut your running costs.",
      factors: [
        "Feature type and size, from a wall fountain to a multi-tier cascade or pond",
        "Pump, plumbing, filtration and lighting specified",
        "Stone, tiling and finishes around the feature",
        "Garden size and zoning for the irrigation layout",
        "Drip versus sprinkler, plus a smart controller for water-wise scheduling",
        "Connection to existing water and power, and any groundworks",
      ],
    },
    faqTitle: "Water Features & Irrigation: Questions, Answered",
    ctaTitle: "Add Water, Save Water", ctaLede: "Book a free assessment for water features and efficient irrigation across Dubai.",
    related: [
      { h: "Garden Landscaping", t: "Design the whole garden around your water feature.", href: "/services/garden-landscaping-lighting-dubai.html#landscaping", label: "Explore landscaping" },
      { h: "Garden Maintenance", t: "Keep planting and irrigation tuned year-round.", href: "/services/garden-maintenance-dubai.html", label: "Garden maintenance" },
      { h: "Swimming Pool Services", t: "Build and maintain a pool alongside your features.", href: "/services/swimming-pool-services-dubai.html", label: "Pool services" },
    ],
  },
];

const MERGED_WHY = [
  "<strong>One contract, one team.</strong> Garden and pool handled together, with no finger-pointing between suppliers.",
  "<strong>In-house, trained staff.</strong> Uniformed technicians and gardeners, never anonymous subcontractors.",
  "<strong>Reports to your WhatsApp.</strong> Photos, readings and work done after every scheduled visit.",
  "<strong>Honest, written quotations.</strong> Clear scope and fixed pricing before any work starts.",
];

function mergedServicePage(group, bySlug) {
  const p = "/";
  const heroImg = IMG(group.heroSlot, 1600);
  const heroImgSm = IMG(group.heroSlot, 720);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: group.crumb, href: `/services/${group.slug}` },
  ];
  const md = group.members.map((m) => ({ m, d: bySlug[m.slug] }));
  const allFaqs = md.flatMap(({ d }) => d.faqs);
  const page = {
    title: group.metaTitle,
    description: group.metaDescription,
    canonical: `${SITE.url}/services/${group.slug}`,
    heroImg, heroImgSm,
    schema: [
      ...md.map(({ m, d }) => ({
        "@context": "https://schema.org", "@type": "Service",
        name: d.serviceName, serviceType: d.serviceName, description: d.metaDescription,
        areaServed: { "@type": "City", name: "Dubai" },
        provider: { "@id": `${SITE.url}/#business` },
        url: `${SITE.url}/services/${group.slug}#${m.anchor}`,
      })),
      breadcrumbSchema(trail),
      faqSchema(allFaqs),
    ],
  };
  const jump = md.map(({ m, d }) => `<a href="#${m.anchor}">${d.serviceName}</a>`).join("\n          ");
  const sections = md
    .map(({ m, d }, i) => `
  <section id="${m.anchor}" class="section${i % 2 ? " section--tint" : ""}" aria-labelledby="${m.anchor}-title">
    <div class="wrap split">
      <div>
        <p class="eyebrow">${d.eyebrow}</p>
        <h2 id="${m.anchor}-title">${d.serviceName}</h2>
        ${d.intro.map((x) => `<p>${x}</p>`).join("\n        ")}
        <ul class="check-list check-list--2col">
          ${d.includes.map(check).join("\n          ")}
        </ul>
      </div>
      <div class="split-panel">${photoImg(m.imgSlot, { sizes: PANEL_SIZES, w: 900, h: 600 })}</div>
    </div>
    <div class="wrap mt-2">
      <div class="grid grid-2">
        ${d.benefits.map((b, j) => `<article class="card reveal"><div class="card-icon card-icon--gold">${ICONS[BENEFIT_ICONS[j % 4]]}</div><h3>${b.h}</h3><p>${b.t}</p></article>`).join("\n        ")}
      </div>
    </div>
  </section>`)
    .join("\n");

  const body = `
<main id="main">

  <section class="hero hero--page hero--photo" aria-labelledby="page-title">
    <img class="hero-bg" src="${heroImg}" srcset="${heroImgSm} 720w, ${heroImg} 1600w" sizes="100vw" alt="" aria-hidden="true" fetchpriority="high" decoding="async">
    <div class="wrap">
      ${breadcrumbsHtml(p, trail)}
      <p class="eyebrow">${group.eyebrow}</p>
      <h1 id="page-title">${group.h1}</h1>
      <p class="lede">${group.heroLede}</p>
      <div class="hero-ctas">
        <a class="btn btn--gold btn--lg" href="${p}contact.html#quote">Get a Free Quote</a>
        <a class="btn btn--whatsapp btn--lg" href="${waLink(group.waMsg)}" rel="nofollow noopener" target="_blank">${ICONS.whatsapp} WhatsApp Us</a>
      </div>
      <ul class="hero-points">
        ${group.heroPoints.map((pt) => `<li>${ICONS.check} ${pt}</li>`).join("\n        ")}
      </ul>
    </div>
    ${heroCurve()}
  </section>

  <section class="section" aria-labelledby="intro-title">
    <div class="wrap">
      <p class="eyebrow">Overview</p>
      <h2 id="intro-title">Everything Under One Contract</h2>
      ${group.intro.map((x) => `<p class="lede">${x}</p>`).join("\n      ")}
      <nav class="jump-links" aria-label="Jump to a service">
        ${jump}
      </nav>
    </div>
  </section>
${sections}
${costFactorsSection(group.costFactors, p, false)}
  <section class="section section--dark" aria-labelledby="why-title">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Why NAM Landscaping</p>
        <h2 id="why-title">One Trusted Team for Your Whole Outdoors</h2>
        <ul class="icon-list">
          ${MERGED_WHY.map((w, i) => `<li>${iconChip(WHY_ICONS[i % 5])}<span>${w}</span></li>`).join("\n          ")}
        </ul>
      </div>
      <div class="split-panel">${photoImg("skyline", { sizes: PANEL_SIZES, w: 900, h: 600 })}</div>
    </div>
  </section>

  <section class="section" aria-labelledby="faq-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Good to Know</p>
        <h2 id="faq-title">${group.faqTitle}</h2>
      </div>
      ${faqListHtml(allFaqs)}
      <p class="mt-2"><a href="/faq">Browse the full FAQ library →</a></p>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="related-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Related Services</p>
        <h2 id="related-title">Often Paired With</h2>
      </div>
      <div class="related-strip">
        ${group.related.map((r) => `<article class="card reveal"><h3>${r.h}</h3><p>${r.t}</p><a class="card-link" href="${r.href}">${r.label}</a></article>`).join("\n        ")}
      </div>
    </div>
  </section>
${ctaBand(p, { title: group.ctaTitle, lede: group.ctaLede, waMsg: group.waMsg })}
</main>
`;
  return head(page, p) + header(p, `/services/${group.slug}`) + body + footer(p);
}

/* Generic core-page renderer: caller supplies the <main> body.
   p defaults to "" (root pages use relative links). The 404 page passes p="/"
   so the shared chrome emits root-absolute paths — it is served at unknown depths. */
function corePage({ meta, file, body, p = "/" }) {
  const current = file === "index.html" ? "/" : `/${file.replace(/\.html$/, "")}`;
  return head(meta, p) + header(p, current) + body + footer(p);
}

module.exports = {
  SITE,
  ICONS,
  IMG,
  PHOTOS,
  heroCurve,
  iconChip,
  STEP_ICONS,
  waLink,
  check,
  photoImg,
  CARD_SIZES,
  PROJECT_SIZES,
  PANEL_SIZES,
  breadcrumbsHtml,
  breadcrumbSchema,
  faqSchema,
  faqListHtml,
  businessSchema,
  mapEmbed,
  ctaBand,
  servicePage,
  mergedServicePage,
  MERGED_GROUPS,
  corePage,
};
