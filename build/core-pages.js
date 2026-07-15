/* Core (non-service) page definitions: meta + <main> body HTML.
   Root-level pages, all internal links are relative to site root. */

const { SITE, ICONS, IMG, PHOTOS, heroCurve, iconChip, STEP_ICONS, waLink, check, photoImg, CARD_SIZES, PROJECT_SIZES, PANEL_SIZES, breadcrumbsHtml, breadcrumbSchema, faqSchema, faqListHtml, businessSchema, mapEmbed, ctaBand } = require("./templates");

const p = "/"; // root prefix (root-absolute paths)
const pin = (name) => `<span class="area-chip">${ICONS.pin} ${name}</span>`;
const heroPhoto = (key) => ` hero--photo`;
const heroBgImg = (key) => `<img class="hero-bg" src="${IMG(PHOTOS[key], 1600)}" srcset="${IMG(PHOTOS[key], 720)} 720w, ${IMG(PHOTOS[key], 1600)} 1600w" sizes="100vw" alt="" aria-hidden="true" fetchpriority="high" decoding="async">`;

/* ---- YouTube project videos (vertical Shorts) -----------------------------
   Real videos from youtube.com/@NamLandscaping-009 (verified channel "Nam Landscaping").
   These are vertical 9:16 Shorts, rendered as a vertical-video gallery with a
   click-to-load facade (no YouTube iframe/JS until the user presses play).
   Titles/descriptions are clean, accurate summaries of each clip (the raw YouTube
   titles are hashtag strings). `date` is the real upload date when known — leave ""
   to omit uploadDate from schema (add later from YouTube Studio for richer results).
   To add more: paste the 11-char Shorts ID into a new { id, title, desc, tag, date }. */
const VIDEOS = [
  { id: "Ee-Fh3KKrug", title: "Landscaping & Pool Care in Dubai", desc: "Garden landscaping and swimming pool care for a Dubai property, by the NAM Landscaping team.", tag: "Landscaping", date: "" },
  { id: "qE9fq0EzN0c", title: "Pool Maintenance, Repair & Construction", desc: "Swimming pool maintenance, cleaning, repair and construction work for Dubai villas.", tag: "Pool Services", date: "" },
  { id: "6XJO1rOLb6s", title: "A Landscaping & Pool Project in Dubai", desc: "A look at one of our landscaping and pool projects across Dubai's villa communities.", tag: "Project", date: "" },
  { id: "-gkezMCzG3k", title: "Pool Design & Garden Landscaping", desc: "Pool design alongside garden landscaping, planting and ongoing pool maintenance.", tag: "Pool Design", date: "" },
  { id: "w3d9FhEEdok", title: "Planting & Garden Greenery in Dubai", desc: "Fresh planting and garden greenery brought to a Dubai home by our in-house team.", tag: "Planting", date: "" },
  { id: "Cd6SpXemQKY", title: "Garden Landscaping & Pool Cleaning", desc: "Landscaping and swimming pool cleaning work on a UAE villa property.", tag: "Pool Care", date: "" },
  { id: "4utqchOaj8E", title: "Quality Landscaping in Dubai", desc: "A closer look at the quality of landscaping work we deliver across Dubai.", tag: "Landscaping", date: "" },
  { id: "KKogjwxAsVE", title: "Garden Plants & Landscaping", desc: "Garden plants and landscaping for a Dubai villa, chosen to thrive in the local climate.", tag: "Planting", date: "" },
  { id: "ZexDkUnQ9TI", title: "Landscaping & Garden Plants in Dubai", desc: "Garden landscaping and plant work across Dubai, from design through to finishing.", tag: "Garden", date: "" },
];
const ACTIVE_VIDEOS = VIDEOS.filter((v) => v.id);
const videoSchema = (v) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: v.title,
  description: v.desc,
  thumbnailUrl: [
    `https://i.ytimg.com/vi/${v.id}/oardefault.jpg`,
    `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
  ],
  ...(v.date ? { uploadDate: v.date } : {}),
  contentUrl: `https://www.youtube.com/shorts/${v.id}`,
  embedUrl: `https://www.youtube.com/embed/${v.id}`,
  publisher: { "@type": "Organization", name: SITE.name, "@id": `${SITE.url}/#business` },
});
const YT_PLAY_SVG = `<svg viewBox="0 0 68 68" aria-hidden="true" focusable="false"><circle cx="34" cy="34" r="34" fill="rgba(0,0,0,0.65)"/><polygon points="27,22 27,46 51,34" fill="#fff"/></svg>`;
const YT_ICON_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M23.5 6.2a2.9 2.9 0 0 0-2-2.1C19.7 3.7 12 3.7 12 3.7s-7.7 0-9.5.4a2.9 2.9 0 0 0-2 2.1A31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 2.9 2.9 0 0 0 2 2.1c1.8.4 9.5.4 9.5.4s7.7 0 9.5-.4a2.9 2.9 0 0 0 2-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>`;
const CHEV_L = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`;
const CHEV_R = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>`;
function videosSection(active, opts = {}) {
  if (!active.length) return "";
  const {
    tint = false,
    maxCards = active.length,
    heading = "Watch Our Dubai Projects in Action",
    eyebrow = "See the Work",
    lede = "Short videos of real landscaping and swimming pool work across Dubai. Tap any clip to play.",
    ctaHref = "",
    ctaLabel = "Book a Free Site Visit",
  } = opts;
  const cards = active.slice(0, maxCards);
  const esc = (s) => s.replace(/"/g, "&quot;");
  return `
  <section class="section${tint ? " section--tint" : ""}" aria-labelledby="videos-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${eyebrow}</p>
        <h2 id="videos-title">${heading}</h2>
        <p class="lede">${lede}</p>
      </div>
      <div class="vid-carousel">
        <button class="vid-nav vid-nav--prev" type="button" aria-label="Scroll to previous videos">${CHEV_L}</button>
        <ul class="vid-track" role="list" tabindex="0" aria-label="${esc(heading)} — scrollable list">
        ${cards.map((v) => `<li class="vid-card">
          <div class="vid-media">
            <div class="yt-facade" data-video-id="${v.id}" data-title="${esc(v.title)}">
              <img class="yt-thumb" src="https://i.ytimg.com/vi/${v.id}/oardefault.jpg"
                   width="270" height="480" loading="lazy" decoding="async"
                   alt="${esc(v.title)} — NAM Landscaping Dubai video">
              <button class="yt-play" type="button" aria-label="Play video: ${esc(v.title)}">
                ${YT_PLAY_SVG}
              </button>
              <span class="vid-tag" aria-hidden="true">${v.tag}</span>
            </div>
          </div>
          <h3 class="vid-title">${v.title}</h3>
        </li>`).join("\n        ")}
        </ul>
        <button class="vid-nav vid-nav--next" type="button" aria-label="Scroll to next videos">${CHEV_R}</button>
      </div>
      <div class="vid-footer">
        <a class="vid-yt-link" href="https://www.youtube.com/@NamLandscaping-009" target="_blank" rel="noopener">${YT_ICON_SVG}<span>See all our videos on YouTube</span></a>
        ${ctaHref ? `<a class="btn btn--gold" href="${ctaHref}">${ctaLabel}</a>` : ""}
      </div>
    </div>
  </section>`;
}

/* ---------------------------------------------------------------- ABOUT */
const aboutTrail = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
];
const about = {
  file: "about.html",
  meta: {
    title: "About Us | NAM Landscaping Dubai",
    description:
      "Meet NAM Landscaping, Dubai's one-team outdoor company for landscaping, garden maintenance and swimming pool care. In-house teams, honest quotes.",
    canonical: `${SITE.url}/about`,
    heroImg: IMG(PHOTOS.skyline, 1600),
    heroImgSm: IMG(PHOTOS.skyline, 720),
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About NAM Landscaping",
        url: `${SITE.url}/about`,
        about: { "@id": `${SITE.url}/#business` },
      },
      breadcrumbSchema(aboutTrail),
    ],
  },
  body: `
<main id="main">

  <section class="hero hero--page${heroPhoto("skyline")}" aria-labelledby="page-title">
    ${heroBgImg("skyline")}
    <div class="wrap">
      ${breadcrumbsHtml(p, aboutTrail)}
      <p class="eyebrow">About Us</p>
      <h1 id="page-title">The One-Team Outdoor Company Dubai Was Missing</h1>
      <p class="lede">NAM Landscaping exists because Dubai homeowners deserved better than juggling a gardener, a pool company and a contractor who never talk to each other.</p>
    </div>
    ${heroCurve()}
  </section>

  <section class="section" aria-labelledby="story-title">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Our Story</p>
        <h2 id="story-title">Built Around a Simple Frustration</h2>
        <p>Every villa owner in Dubai knows the routine: the gardener blames the irrigation, the irrigation man blames the pool contractor's trench, the pool company blames the leaves from the trees. Three invoices, three schedules, nobody accountable for the outdoor space as a whole.</p>
        <p>NAM Landscaping, short for Noor Al Madeena Landscaping, was founded more than a decade ago to end that. We trained one company to master both halves of the Dubai outdoors: the living, growing garden and the engineered, balanced swimming pool, delivered with the discipline of a contractor and the care of a craftsman.</p>
        <p>Today our 50-plus trained, in-house team has delivered more than 1,000 landscaping and swimming pool projects across Dubai's villa communities and commercial properties. Many clients arrive with a single problem, a tired lawn or a cloudy pool, and stay for years on a single <a href="/annual-maintenance-contracts.html">maintenance contract</a> that covers it all. Around 80% of them renew it every year.</p>
      </div>
      <div class="split-panel pm-4">
        ${photoImg("facadeDusk", { alt: "Villa garden with warm lighting in the evening, the standard of finish we maintain", sizes: PANEL_SIZES, w: 900, h: 600 })}
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="values-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">How We Work</p>
        <h2 id="values-title">The Standards Behind Every Visit</h2>
      </div>
      <div class="grid grid-2">
        <article class="card reveal"><div class="card-icon card-icon--gold">${ICONS.careLeaf}</div><h3>Honesty before revenue</h3><p>If a repair beats a replacement, or a smaller job solves your problem, that's what we quote. Long relationships are worth more to us than big first invoices.</p></article>
        <article class="card reveal"><div class="card-icon card-icon--gold">${ICONS.team}</div><h3>In-house people, properly trained</h3><p>Our gardeners and pool technicians are employed, uniformed and trained by us, in plant care, water chemistry, safety and simple respect for your home.</p></article>
        <article class="card reveal"><div class="card-icon card-icon--gold">${ICONS.report}</div><h3>Proof, not promises</h3><p>Photo reports after maintenance visits, written scopes before projects, water readings you can check. You should never wonder what you're paying for.</p></article>
        <article class="card reveal"><div class="card-icon card-icon--gold">${ICONS.sun}</div><h3>Built for this climate</h3><p>Everything we plant, build and balance is chosen for Dubai's heat, dust, humidity and hard water, because that's where it has to live.</p></article>
      </div>
      <div class="badge-row">
        <span class="badge">${ICONS.check} Licensed &amp; insured in Dubai</span>
        <span class="badge">${ICONS.check} Registered with Dubai Municipality</span>
        <span class="badge">${ICONS.check} Trained, uniformed in-house teams</span>
        <span class="badge">${ICONS.check} Workmanship guarantee on projects</span>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="serve-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Who We Serve</p>
        <h2 id="serve-title">Homes, Communities &amp; Commercial Properties</h2>
        <p class="lede">From a single villa garden in <a href="/areas-we-serve.html">Arabian Ranches</a> to community common areas and hotel pools, the same team, the same standard, scaled to the property.</p>
      </div>
      <div class="grid grid-3">
        <article class="card reveal"><h3>Villa Owners</h3><p>Garden transformations, new pools, and the weekly care that keeps both looking like handover day.</p><a class="card-link" href="/services.html">Explore services</a></article>
        <article class="card reveal"><h3>Communities &amp; OAs</h3><p>Common-area landscaping and shared pool compliance with SLAs and consolidated monthly reporting.</p><a class="card-link" href="/contact.html">Discuss your community</a></article>
        <article class="card reveal"><h3>Commercial &amp; Hospitality</h3><p>Presentable, safe, audit-ready outdoor areas for offices, retail and hotels, handled quietly in the background.</p><a class="card-link" href="/contact.html">Request a proposal</a></article>
      </div>
    </div>
  </section>

  <div class="trust-bar" role="region" aria-label="NAM Landscaping by the numbers">
    <div class="wrap">
      <div class="trust-item">${ICONS.sprout}<strong>1,000+</strong><span>Gardens &amp; pools delivered</span></div>
      <div class="trust-item">${ICONS.team}<strong>50+</strong><span>Trained in-house staff</span></div>
      <div class="trust-item">${ICONS.star}<strong>10+ yrs</strong><span>Caring for Dubai's outdoors</span></div>
      <div class="trust-item">${ICONS.careLeaf}<strong>~80%</strong><span>Of clients renew each year</span></div>
    </div>
  </div>

  <section class="section" aria-labelledby="method-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Our Method</p>
        <h2 id="method-title">Why One Team Beats Three Suppliers</h2>
        <p class="lede">A garden and a swimming pool are one connected outdoor system, the same soil, sun, water and drainage. Treat them as one and problems get solved instead of passed between suppliers who never speak.</p>
      </div>
      <div class="grid grid-2">
        <article class="card reveal"><div class="card-icon card-icon--gold">${ICONS.doc}</div><h3>1. Listen and assess</h3><p>Every relationship starts with a free site visit. We walk the whole property, garden and pool, note what is thriving and what is failing, and listen to how you actually use the space before we propose anything.</p></article>
        <article class="card reveal"><div class="card-icon card-icon--gold">${ICONS.sprout}</div><h3>2. Design and build</h3><p>From a single planting bed to a full villa garden with a new pool, one team designs it, prices it in writing, manages the community NOC and builds it, with no scope creep and no surprise invoices.</p></article>
        <article class="card reveal"><div class="card-icon card-icon--gold">${ICONS.calendarCheck}</div><h3>3. Maintain on schedule</h3><p>Most clients move onto a single <a href="/annual-maintenance-contracts.html">annual contract</a> covering garden and pool together, fixed monthly fee, routine chemicals included, the same crew every visit.</p></article>
        <article class="card reveal"><div class="card-icon card-icon--gold">${ICONS.report}</div><h3>4. Report and prove</h3><p>After every maintenance visit you get a photo report with the work done and the pool readings, sent to your WhatsApp. You always know exactly what you are paying for.</p></article>
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="creds-title">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Credentials You Can Check</p>
        <h2 id="creds-title">Licensed, Insured and Accountable</h2>
        <p>NAM Landscaping is the trading name of <strong>Noor Al Madeena Landscaping LLC</strong>, a licensed Dubai company registered with Dubai Municipality (Baladiya) and the relevant authorities. We carry liability insurance, our teams are trained in safety as well as their trade, and our project work is backed by a workmanship guarantee.</p>
        <p>That matters because Dubai gardens and pools are regulated, and because the cheapest quote often hides an unlicensed crew, no insurance and no one to call when something goes wrong six months later. With us, the company that quotes the work is the company that does it and stands behind it.</p>
        <ul class="check-list">
          ${[
            "Licensed Dubai company, Noor Al Madeena Landscaping LLC",
            "Registered with Dubai Municipality (Baladiya)",
            "Liability insurance carried on every project",
            "Workmanship guarantee on completed work",
            "Trained, uniformed, in-house teams, never anonymous subcontractors",
            "Written, itemised quotations before any work starts",
          ].map(check).join("\n          ")}
        </ul>
        <p class="mt-2"><a class="btn btn--green" href="/contact.html#quote">Book a Free Site Visit</a></p>
      </div>
      <div class="split-panel pm-1">
        ${photoImg("poolMaintenance", { alt: "A clean villa swimming pool maintained by the NAM Landscaping team in Dubai", sizes: PANEL_SIZES, w: 900, h: 600 })}
      </div>
    </div>
  </section>
${ctaBand(p, {
  title: "Let's Look After Your Outdoors Together",
  lede: "Book a free site visit and see why clients hand us the garden, the pool, and then never take them back.",
  waMsg: "Hello NAM Landscaping, I'd like to discuss my property.",
})}
</main>
`,
};

/* ---------------------------------------------------------------- PROJECTS */
const projectsTrail = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
];
const PROJECTS = [
  { pm: "pm-1", tag: "Landscaping", loc: "Arabian Ranches", type: "Villa garden design & build", title: "Family Garden Transformation",
    scope: "Full design and build of a 450 m² rear garden: natural lawn, drip irrigation, shade trees, pergola dining corner and play lawn.",
    objective: "Turn a bare sand plot into a usable family garden that survives summer without constant replanting.",
    solution: "Zoned irrigation and heat-proven planting, a louvred pergola over the dining area and a soft play lawn sized for two young children.",
    outcome: "Delivered in five weeks. The family now eats outdoors eight months a year, and the garden moved straight onto a weekly maintenance plan." },
  { pm: "pm-2", tag: "Pool Renovation", loc: "The Meadows", type: "Pool repair & renovation", title: "Leaking Pool Brought Back to Life",
    scope: "Leak detection, structural crack repair, full re-tile, new variable-speed pump and LED lighting for a 12-year-old, 10-metre pool.",
    objective: "Stop a persistent water-loss problem and modernise an ageing pool without a full rebuild.",
    solution: "Pressure testing isolated the leak to a return line and a tile-band crack; both repaired, then finishes and plant upgraded in one programme.",
    outcome: "Water loss eliminated, running costs cut by the new pump, and the pool now maintained weekly, crystal clear through its first full summer." },
  { pm: "pm-3", tag: "Outdoor Living", loc: "Dubai Hills Estate", type: "Hardscaping & outdoor upgrade", title: "Resort-Style Backyard Upgrade",
    scope: "Composite deck, porcelain paving, automated louvred pergola, outdoor kitchen, artificial grass, layered lighting and plunge-pool refresh.",
    objective: "One coordinated upgrade to make the whole backyard feel like a resort, without managing five contractors.",
    solution: "A single design and a single eight-week programme covering every trade in the right order, under one supervisor.",
    outcome: "Zero coordination effort for the owner, one defect-free handover, and a backyard that now hosts everything from breakfast to dinner parties." },
  { pm: "pm-4", tag: "Pool Care", loc: "The Springs", type: "Annual pool maintenance", title: "Year-Round Villa Pool Care",
    scope: "Weekly maintenance visits: water testing and balancing, cleaning, filter care and equipment checks, with WhatsApp reports.",
    objective: "A pool that is simply always swim-ready, including during the owners' two-month summer travels.",
    solution: "Fixed weekly schedule with the same technician, photo-and-readings report after every visit, and proactive equipment flagging.",
    outcome: "Three years on contract, two minor faults caught before they became failures, and not one green-water day." },
  { pm: "pm-1", tag: "Garden Care", loc: "Jumeirah Golf Estates", type: "Garden rescue & maintenance", title: "Neglected Garden, Rescued & Kept",
    scope: "Eight-week recovery programme, lawn renovation, palm treatment, irrigation repair, replanting, followed by weekly maintenance.",
    objective: "Bring a badly neglected garden back to community standard, then make sure it never slips again.",
    solution: "Triage first: irrigation fixed and lawn reseeded before cosmetic work; then a structured weekly visit checklist with photo reporting.",
    outcome: "Garden restored within a season. The owner consolidated pool care into the same contract six months later." },
  { pm: "pm-2", tag: "New Build", loc: "Tilal Al Ghaf", type: "Pool construction", title: "Family Pool with Sunken Lounge",
    scope: "Design, NOC approval and construction of an 11-metre pool with kids' ledge, sunken seating, salt chlorination and integrated lighting.",
    objective: "A showpiece family pool built right the first time, coordinated with the villa's new landscape.",
    solution: "Pool and garden designed as one project, levels, drainage and sight lines resolved together; premium waterproofing and efficient plant specified.",
    outcome: "Handover on schedule with balanced water and a care plan from day one. The sunken lounge is now the most-used 'room' of the house." },
  { pm: "pm-3", tag: "Pergola", loc: "Dubai Hills Estate", type: "Pergola & shade structure", title: "Automated Louvred Dining Pavilion",
    scope: "5×4 m motorised louvred-roof pergola with integrated LED lighting and fan; community NOC managed end to end.",
    objective: "Make the terrace usable at lunch in May and dinner in August, without boxing in the garden view.",
    solution: "A powder-coated aluminium louvred system: blades open to winter sky, seal against summer sun, with lighting and fan built in from the start.",
    outcome: "The terrace went from avoided to default. NOC to finished structure took five weeks." },
  { pm: "pm-4", tag: "Community", loc: "Jumeirah Village Circle", type: "Commercial landscape & pool", title: "Community Common Areas, Audit-Ready",
    scope: "Year-round contract: shared lawns, palms and planting beds plus the community pool's documented maintenance and water-testing logs.",
    objective: "Lift tired common areas to a standard residents notice, and keep the shared pool permanently inspection-ready.",
    solution: "Dedicated crew with a supervisor, monthly consolidated reporting for the OA board, and documented pool chemistry on every visit.",
    outcome: "Visible turnaround within one quarter and a unanimous board renewal at year end." },
  { pm: "pm-1", tag: "Artificial Grass", loc: "Damac Hills", type: "Artificial grass installation", title: "Play Lawn That Survives Everything",
    scope: "120 m² of premium pet-friendly turf over an engineered free-draining base, with new edge paving and a rinse point.",
    objective: "End the mud, dust and dead-grass cycle for a family with three children and a dog.",
    solution: "Dense soft-pile UV-stable turf, compacted sub-base with drainage, antibacterial infill and pinned perimeter edging.",
    outcome: "A green, mud-free play space twelve months a year, and the garden hose finally retired from lawn duty." },
  { pm: "pm-2", tag: "Water Feature", loc: "Emirates Hills", type: "Water feature design & build", title: "Arrival Court Reflecting Pool",
    scope: "Still reflecting pool with three brass spillways, auto-fill, underwater lighting and scale-management treatment at the villa entrance.",
    objective: "Give an imposing entrance the calm, considered arrival moment the architecture deserved.",
    solution: "Proportion-led design with concealed plant access, auto top-up against evaporation and warm lighting tuned on site after dark.",
    outcome: "The entrance now begins with the sound of water, and the feature needs minutes of attention a month, not hours." },
  { pm: "pm-3", tag: "Lighting", loc: "Al Barari", type: "Landscape lighting", title: "A Garden That Glows",
    scope: "Sixty-fitting layered lighting scheme across palms, pathways, water and facade, zoned into app-controlled scenes.",
    objective: "Let a spectacular mature garden work after dark, for quiet evenings and for entertaining.",
    solution: "Warm-white layered design: path pools, palm uplights, wall grazing and underwater accents, commissioned at night fitting by fitting.",
    outcome: "From 'invisible at 7pm' to the neighbourhood's best evening garden. Scenes range from 'dinner' to 'security' on one tap." },
  { pm: "pm-4", tag: "Irrigation", loc: "Arabian Ranches", type: "Irrigation system upgrade", title: "From Flooded Beds to Smart Zones",
    scope: "Replacement of a failing 15-year-old system: zoned drip lines, lawn pop-ups, filtration and a Wi-Fi smart controller.",
    objective: "Stop the cycle of drowned beds, dying borders and unexplained water bills.",
    solution: "A full audit first, then planting-matched zones, pressure-compensating emitters and seasonal smart scheduling.",
    outcome: "Garden recovered within two months and water consumption dropped by roughly a third." },
];
/* Photo per project card, in PROJECTS order */
const PROJECT_IMGS = ["landscaping", "poolRepair", "hardscape", "poolMaintenance", "gardenCare", "poolBuild", "homeHero", "skyline", "grass", "waterFeature", "lighting", "irrigation"];
const projects = {
  file: "projects.html",
  meta: {
    title: "Landscaping & Pool Projects in Dubai | NAM Landscaping",
    description:
      "Browse NAM Landscaping projects across Dubai, villa garden transformations, pool builds and renovations, pergolas, lighting and maintenance success stories.",
    canonical: `${SITE.url}/projects`,
    heroImg: IMG(PHOTOS.homeHero, 1600),
    heroImgSm: IMG(PHOTOS.homeHero, 720),
    schema: [breadcrumbSchema(projectsTrail), ...ACTIVE_VIDEOS.map(videoSchema)],
  },
  body: `
<main id="main">

  <section class="hero hero--page${heroPhoto("homeHero")}" aria-labelledby="page-title">
    ${heroBgImg("homeHero")}
    <div class="wrap">
      ${breadcrumbsHtml(p, projectsTrail)}
      <p class="eyebrow">Projects &amp; Portfolio</p>
      <h1 id="page-title">Landscaping and Pool Projects Across Dubai</h1>
      <p class="lede">Gardens, pools and outdoor living projects across Dubai's communities, each one designed, built or cared for by our in-house teams. <em>Representative showcase entries; project photography is being added.</em></p>
    </div>
    ${heroCurve()}
  </section>

  <section class="section" aria-label="Project portfolio">
    <div class="wrap">
      <div class="grid grid-2">
        ${PROJECTS.map(
          (j, i) => `<article class="card project-card reveal">
          <div class="project-media ${j.pm}"><span class="pm-tag">${j.tag}</span>${photoImg(PROJECT_IMGS[i], { alt: `${j.type} in ${j.loc}, Dubai: ${j.title}`, sizes: PROJECT_SIZES, w: 800, h: 500 })}</div>
          <div class="project-body">
            <p class="project-meta">${j.loc} · ${j.type}</p>
            <h3>${j.title}</h3>
            <p><strong>Scope:</strong> ${j.scope}</p>
            <p><strong>Objective:</strong> ${j.objective}</p>
            <p><strong>Solution:</strong> ${j.solution}</p>
            <p><strong>Outcome:</strong> ${j.outcome}</p>
          </div>
        </article>`
        ).join("\n        ")}
      </div>
    </div>
  </section>
${videosSection(ACTIVE_VIDEOS, { tint: true, eyebrow: "Project Videos", heading: "Our Landscaping & Pool Work on Video", lede: "Real landscaping, planting and swimming pool projects across Dubai's villa communities. Tap any clip to play." })}
${ctaBand(p, {
  title: "Your Property Could Be Next",
  lede: "Tell us what you're imagining, or what's broken, and we'll bring a plan to a free site visit.",
  waMsg: "Hello NAM Landscaping, I saw your projects and would like to discuss mine.",
})}
</main>
`,
};

/* ---------------------------------------------------------------- AREAS */
const areasTrail = [
  { name: "Home", href: "/" },
  { name: "Areas We Serve", href: "/areas-we-serve" },
];
const areas = {
  file: "areas-we-serve.html",
  meta: {
    title: "Areas We Serve in Dubai | NAM Landscaping",
    description:
      "NAM Landscaping serves villas and communities across Dubai, Palm Jumeirah, Emirates Hills, Dubai Hills Estate, Arabian Ranches, JVC, Damac Hills and more.",
    canonical: `${SITE.url}/areas-we-serve`,
    heroImg: IMG(PHOTOS.skyline, 1600),
    heroImgSm: IMG(PHOTOS.skyline, 720),
    schema: [breadcrumbSchema(areasTrail)],
  },
  body: `
<main id="main">

  <section class="hero hero--page${heroPhoto("skyline")}" aria-labelledby="page-title">
    ${heroBgImg("skyline")}
    <div class="wrap">
      ${breadcrumbsHtml(p, areasTrail)}
      <p class="eyebrow">Areas We Serve</p>
      <h1 id="page-title">Landscaping &amp; Pool Care Across Dubai's Communities</h1>
      <p class="lede">Our teams work across Dubai every day. If your community isn't listed below, ask, the answer is almost certainly yes.</p>
      <div class="hero-ctas"><a class="btn btn--gold" href="/contact.html#quote">Check Your Area, Free Quote</a></div>
    </div>
    ${heroCurve()}
  </section>

  <section class="section section--tint" aria-labelledby="areas-intro-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">A Dubai Team, On the Ground Daily</p>
        <h2 id="areas-intro-title">Local Knowledge Is Half the Job in Dubai</h2>
        <p class="lede">NAM Landscaping serves villas, residential communities and commercial properties right across Dubai. With 50+ in-house staff routing across the city every day, a free site visit is usually only a day or two away wherever you are.</p>
      </div>
      <p>Why does the location matter so much here? Because Dubai is not one garden, it is dozens of micro-conditions. A salt-laden plot on <a href="/services/garden-landscaping-lighting-dubai.html">Palm Jumeirah</a> needs different planting and corrosion-resistant pool equipment than a mature, twenty-year-old garden in Emirates Hills or a brand-new handover villa in Dubai Hills Estate that arrives as a bare plot with a community NOC attached. We have worked across all of them, so we already know the soil, the community rules, the access constraints and the planting that actually survives in each. That local experience is what turns a generic quote into a garden and pool that thrive instead of struggle.</p>
      <p>The communities below are grouped by the conditions they share. If yours is not listed, it almost certainly still falls inside our service area, so just <a href="/contact.html#quote">ask for a free site visit</a> and we will confirm.</p>
    </div>
  </section>

  <section class="section" aria-labelledby="coastal-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Coastal &amp; Central Dubai</p>
        <h2 id="coastal-title">Jumeirah, Palm Jumeirah &amp; Surroundings</h2>
        <p class="lede">Salt-laden air, premium frontages and high expectations. In coastal villas we lean on salt-tolerant planting, corrosion-resistant pool equipment and finishes that keep their looks beside the sea.</p>
      </div>
      <div class="areas-grid">
        ${["Palm Jumeirah", "Jumeirah", "Jumeirah Bay Island", "Umm Suqeim", "Madinat Jumeirah Living", "Al Manara", "Al Barsha", "Al Safa", "Pearl Jumeira", "La Mer villas", "City Walk villas"].map(pin).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="emirates-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Emirates Living &amp; Golf Communities</p>
        <h2 id="emirates-title">Established Gardens, Mature Trees, High Standards</h2>
        <p class="lede">Twenty-year-old communities mean mature landscapes that punish neglect and reward expertise, established palms, ageing irrigation and pools due their first renovation. Exactly our home ground.</p>
      </div>
      <div class="areas-grid">
        ${["Emirates Hills", "The Meadows", "The Springs", "The Lakes", "Jumeirah Golf Estates", "Jumeirah Islands", "Jumeirah Park", "Jumeirah Heights", "Victory Heights", "The Greens villas"].map(pin).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="family-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Family Villa Communities</p>
        <h2 id="family-title">Gardens Built for Living, Pools Built for Splashing</h2>
        <p class="lede">Play lawns that survive football, pet-friendly artificial grass, shaded terraces and family pools on dependable weekly care, the everyday work we love most.</p>
      </div>
      <div class="areas-grid">
        ${["Arabian Ranches", "Arabian Ranches 2", "Arabian Ranches 3", "Mudon", "Damac Hills", "Damac Hills 2", "The Villa", "Villanova", "Serena", "Mirdif", "Town Square", "Living Legends", "Remraam", "Reem & Mira"].map(pin).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="new-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">New Dubai &amp; Master Communities</p>
        <h2 id="new-title">New Handovers, Blank Canvases</h2>
        <p class="lede">Fresh handovers across Dubai's newest districts arrive as bare plots with an NOC process attached. We design, get approvals and deliver complete gardens and pools, then maintain them from day one.</p>
      </div>
      <div class="areas-grid">
        ${["Dubai Hills Estate", "Tilal Al Ghaf", "DAMAC Lagoons", "MBR City – District One", "Sobha Hartland", "Al Barari", "Dubai Creek Harbour", "The Valley", "Jumeirah Village Circle", "Jumeirah Village Triangle", "The Sustainable City", "Emaar South", "Motor City", "Arjan & Al Furjan", "Expo City", "Dubai South", "Nad Al Sheba"].map(pin).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="map-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Find Us</p>
        <h2 id="map-title">A Dubai Team, Routing Across the City Daily</h2>
        <p class="lede">${SITE.serviceArea}. Our crews travel to you, so a free site visit is usually only a day or two away wherever you are in Dubai.</p>
      </div>
      <p class="map-actions"><a class="btn btn--green" href="${SITE.directionsUrl}" target="_blank" rel="noopener">${ICONS.pin} Get Directions on Google Maps</a> <a class="map-link" href="${SITE.mapsUrl}" target="_blank" rel="noopener">View our Google Business Profile</a></p>
    </div>
  </section>
${ctaBand(p, {
  title: "In Dubai? Then You're in Our Service Area",
  lede: "Book a free site visit, our teams route across the city daily, so scheduling is fast.",
  waMsg: "Hello NAM Landscaping, do you cover my area? I'm in ",
})}
</main>
`,
};

/* ---------------------------------------------------------------- CONTACT */
const contactTrail = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];
const contact = {
  file: "contact.html",
  meta: {
    title: "Contact Us | Free Site Visit in Dubai | NAM Landscaping",
    description:
      "Contact NAM Landscaping in Dubai: call, WhatsApp or send the quote form to book a free site visit for landscaping, garden or pool services.",
    canonical: `${SITE.url}/contact`,
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact NAM Landscaping",
        url: `${SITE.url}/contact`,
        about: { "@id": `${SITE.url}/#business` },
      },
      businessSchema(),
      breadcrumbSchema(contactTrail),
    ],
  },
  body: `
<main id="main">

  <section class="hero hero--page" aria-labelledby="page-title">
    <div class="wrap">
      ${breadcrumbsHtml(p, contactTrail)}
      <p class="eyebrow">Contact Us</p>
      <h1 id="page-title">Book Your Free Site Visit</h1>
      <p class="lede">Call, WhatsApp or send the form, we reply during working hours the same day, and site visits anywhere in Dubai are free.</p>
    </div>
    ${heroCurve()}
  </section>

  <section class="section" aria-labelledby="contact-title">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Reach Us Directly</p>
        <h2 id="contact-title">Talk to a Real Person, Fast</h2>
        <ul class="contact-list">
          <li>${ICONS.phone}<span><strong>Phone</strong><br><a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a><br>${SITE.hours}</span></li>
          <li>${ICONS.whatsapp}<span><strong>WhatsApp</strong><br><a href="${waLink("Hello NAM Landscaping, I'd like a quote for my garden or pool.")}" rel="nofollow noopener" target="_blank">Message us on WhatsApp</a>, photos of the garden or pool help us respond with real advice immediately.</span></li>
          <li>${ICONS.pin}<span><strong>Service area</strong><br>${SITE.serviceArea}. Site visits across Dubai are free.</span></li>
          <li>${ICONS.email}<span><strong>Email</strong><br><a href="mailto:${SITE.email}">${SITE.email}</a></span></li>
        </ul>
        <div class="mt-2">
          ${mapEmbed("Map of the Dubai service area of NAM Landscaping (Noor Al Madeena Landscaping LLC)")}
        </div>
      </div>
      <form class="form-card" id="quote" data-quote-form data-whatsapp="${SITE.whatsapp}" novalidate aria-label="Quote request form">
        <h3>Request a Free Quote</h3>
        <p class="form-legend">Fields marked <span class="req" aria-hidden="true">*</span> are required.</p>
        <div class="form-grid">
          <div class="form-field"><label for="q-name">Your name <span class="req" aria-hidden="true">*</span></label><input id="q-name" name="name" type="text" autocomplete="name" required aria-required="true"></div>
          <div class="form-field"><label for="q-phone">Phone / WhatsApp <span class="req" aria-hidden="true">*</span></label><input id="q-phone" name="phone" type="tel" autocomplete="tel" required aria-required="true"></div>
          <div class="form-field"><label for="q-area">Community / area</label><input id="q-area" name="area" type="text" placeholder="e.g. Arabian Ranches"></div>
          <div class="form-field">
            <label for="q-service">Service needed</label>
            <select id="q-service" name="service">
              <option>Landscaping / garden design</option>
              <option>Garden maintenance</option>
              <option>Pool maintenance / cleaning</option>
              <option>Pool repair</option>
              <option>Pool construction</option>
              <option>Irrigation</option>
              <option>Artificial grass</option>
              <option>Pergola / shade</option>
              <option>Lighting / water features</option>
              <option>Annual maintenance contract</option>
              <option>Other outdoor work</option>
            </select>
          </div>
          <div class="form-field form-field--full"><label for="q-msg">Tell us briefly what you need</label><textarea id="q-msg" name="message" placeholder="e.g. Full garden landscaping for a new handover villa, plot approx 400 m²"></textarea></div>
          <div class="form-field form-field--full"><button class="btn btn--gold btn--lg" type="submit" style="width:100%">Send My Enquiry</button></div>
        </div>
        <p class="form-status" role="status" aria-live="polite"></p>
        <p class="form-note">Submitting opens WhatsApp with your enquiry pre-filled, nothing is sent until you press send. We never share your details.</p>
      </form>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="expect-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">What Happens Next</p>
        <h2 id="expect-title">From Enquiry to Site Visit</h2>
      </div>
      <div class="steps">
        <div class="step reveal"><span class="step-icon">${ICONS.report}</span><h3>We Reply</h3><p>Same working day, usually within the hour on WhatsApp.</p></div>
        <div class="step reveal"><span class="step-icon">${ICONS.search}</span><h3>Quick Questions</h3><p>A few details (or photos) so the right specialist visits you.</p></div>
        <div class="step reveal"><span class="step-icon">${ICONS.pin}</span><h3>Free Site Visit</h3><p>At a time that suits you, anywhere in Dubai.</p></div>
        <div class="step reveal"><span class="step-icon">${ICONS.doc}</span><h3>Written Quote</h3><p>Clear scope and fixed pricing, then the decision is entirely yours.</p></div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="reassure-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Zero Risk</p>
        <h2 id="reassure-title">No Pressure, No Obligation</h2>
        <p class="lede">The site visit and the written quotation are genuinely free, with no obligation to proceed.</p>
      </div>
      <p>You deal with the same licensed, insured and Dubai Municipality registered team that actually does the work, more than 50 trained staff who have delivered over 1,000 landscaping and swimming pool projects across Dubai. We would rather give you honest advice and earn the job than push a sale, so if a smaller fix solves your problem, that is what we will tell you. Prefer to talk it through first? Call or WhatsApp <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a> during working hours, ${SITE.hours.toLowerCase()}, and a real person will pick up.</p>
    </div>
  </section>

</main>
`,
};

/* ---------------------------------------------------------------- FAQ LIBRARY */
const faqTrail = [
  { name: "Home", href: "/" },
  { name: "FAQ", href: "/faq" },
];
const FAQ_SECTIONS = [
  { id: "general", title: "About the Company", faqs: [
    { q: "What services does NAM Landscaping provide?", a: "Everything outdoors: landscaping design and build, garden maintenance, swimming pool maintenance, cleaning, repair and construction, irrigation, artificial grass, pergolas and shade, landscape lighting, water features and hardscaping, across Dubai." },
    { q: "What makes you different from other Dubai companies?", a: "One trained, in-house team covers both the garden and the pool under a single contract, one supervisor, one invoice, one standard. Add written quotes, photo reports after every maintenance visit and honest advice, and that's the whole formula." },
    { q: "Are you licensed and insured?", a: "Yes. We are a licensed, insured Dubai company (Noor Al Madeena Landscaping LLC) with more than 10 years caring for gardens and pools across the city, and our teams are trained in safety as well as their trade. Full trade licence and insurance details are available on request." },
    { q: "Do you serve commercial properties or only homes?", a: "Both. Villas are our core, and we also maintain community common areas, shared pools, offices and hospitality outdoor spaces with SLAs and consolidated reporting." },
  ]},
  { id: "landscaping", title: "Landscaping", faqs: [
    { q: "Do you provide landscape design or just execution?", a: "Both, as one service, concept and planting design, then construction by the same team. Design-and-build means the price you approve is the garden you get." },
    { q: "Can you work on a brand-new handover villa with a bare plot?", a: "That's one of our most common projects. We design from zero, manage the community NOC, and deliver irrigation, lawn, planting, hardscape and shade as a single programme." },
    { q: "Will my garden survive the Dubai summer?", a: "Yes, if it's designed to. We choose heat- and salt-tolerant species, position them by sun exposure and support them with correctly zoned drip irrigation, that combination is what survives August." },
  ]},
  { id: "garden-maintenance", title: "Garden Maintenance", faqs: [
    { q: "What's included in a garden maintenance visit?", a: "Mowing and edging, pruning, weeding, fertilising to a seasonal programme, pest and disease checks, irrigation inspection and a full tidy-up, finished with a photo report to your WhatsApp." },
    { q: "Weekly or bi-weekly, what do you recommend?", a: "Weekly for most villa gardens with lawn, which grows quickly under irrigation. Bi-weekly can suit smaller, low-planting gardens. We confirm after seeing the garden." },
    { q: "Can you rescue a neglected garden before starting maintenance?", a: "Yes, we begin with a recovery programme (lawn renovation, pruning, irrigation repair, replanting) and then move to regular care once the garden is back to standard." },
  ]},
  { id: "pool-maintenance", title: "Pool Maintenance", faqs: [
    { q: "What does weekly pool maintenance include?", a: "Water testing and chemical balancing, skimming, brushing, vacuuming, filter cleaning or backwashing, basket emptying and an equipment inspection, plus a report with readings and photos after every visit." },
    { q: "Why does my pool need professional maintenance in Dubai?", a: "Heat burns off sanitiser within hours, evaporation concentrates minerals, and dust loads the filter constantly. Balanced chemistry protects swimmers, equipment and the pool's finish, and it needs to happen every week, not when the water looks off." },
    { q: "Can you look after the pool while we travel for the summer?", a: "Yes, it's one of our most requested services. The pool stays balanced and protected, and the weekly photo report lets you check it from anywhere." },
  ]},
  { id: "pool-cleaning", title: "Pool Cleaning", faqs: [
    { q: "Can you fix a green pool?", a: "Yes, usually without draining. Shock treatment, intensive filtration and brushing typically restore a green pool in three to five days. We quote after a quick inspection." },
    { q: "What should I do about my pool after a sandstorm?", a: "Don't swim and don't vacuum heavy sand into the system, it can damage the pump. Run the filter and call us for a storm clean-up; we remove sediment safely and deep-clean the filter afterwards." },
    { q: "Do you offer one-off cleaning or only contracts?", a: "Both. One-off deep cleans, before parties, after reopening a holiday home, post-construction, are common, with a fixed price agreed up front." },
  ]},
  { id: "pool-repair", title: "Pool Repair", faqs: [
    { q: "What pool repairs do you handle?", a: "Pumps and motors, filters, salt chlorinators, heaters and chillers, underwater lights, pipework and valves, leak detection, plus tiling and finish restoration, diagnosed first, quoted in writing, then repaired." },
    { q: "How do I know if my pool is leaking?", a: "If the water level drops faster than a reference bucket on the step evaporates, suspect a leak. We confirm with pressure testing before recommending any work." },
    { q: "How quickly can you attend a breakdown?", a: "Same or next working day in most of Dubai, with priority for maintenance-contract clients. Summer equipment failures are treated as urgent." },
  ]},
  { id: "pool-construction", title: "Pool Construction", faqs: [
    { q: "How long does building a villa pool take?", a: "Usually 8–14 weeks on site after approvals, depending on size and finishes. We start the NOC paperwork immediately so approval time overlaps with design." },
    { q: "Do you handle the permits and community approvals?", a: "Yes, engineering drawings, the community NOC and any authority requirements are managed by us as part of every build." },
    { q: "Can you renovate an old pool instead of rebuilding?", a: "Often yes: new waterproofing, finishes and modern equipment can transform a structurally sound pool for far less than a new build. Our assessment tells you honestly which option fits." },
  ]},
  { id: "irrigation", title: "Irrigation", faqs: [
    { q: "Do you install and repair irrigation systems?", a: "Both, new zoned drip and sprinkler systems with smart controllers, and repairs to existing systems: leaks traced, emitters replaced, zones rebalanced, schedules reprogrammed." },
    { q: "How much water can a proper irrigation system save?", a: "Converting spray-everything systems to zoned drip with smart scheduling routinely cuts garden water use by 30–50%, while the plants get healthier, because they're watered correctly." },
    { q: "My garden has dry patches and soggy patches, why?", a: "Classic zoning failure: one circuit serving plants with different needs, or blocked and mismatched emitters. An irrigation audit finds it quickly, and the fix is usually simpler than expected." },
  ]},
  { id: "pricing", title: "Pricing & Quotes", faqs: [
    { q: "How does your pricing work?", a: "Site visit first, then a written quotation with a fixed price and clear scope. Maintenance is a flat monthly rate; projects are itemised by stage. No estimates that quietly grow later." },
    { q: "Is the site visit and quote really free?", a: "Yes, free visit, free written quote, no obligation, anywhere in Dubai." },
    { q: "Are chemicals and materials included in maintenance plans?", a: "Routine pool chemicals and standard consumables are included in our plans so your monthly cost is predictable. Anything beyond routine, major treatments, plant replacement, parts, is quoted and approved before we proceed." },
  ]},
  { id: "timelines", title: "Timelines", faqs: [
    { q: "How soon can maintenance visits start?", a: "Usually within a few days of approving the plan, we slot you into the route for your area and confirm a fixed visit day." },
    { q: "How long do typical projects take?", a: "Artificial grass: 1–3 days. Pergolas: 2–5 days on site after fabrication. Villa landscaping: 3–8 weeks. Pool construction: 8–14 weeks after approvals. Your quote includes a specific timeline." },
    { q: "Do you work in summer?", a: "All year. Summer is when gardens and pools need professional care most, our schedules and working practices are built for it." },
  ]},
  { id: "areas", title: "Service Areas", faqs: [
    { q: "Do you offer landscaping and pool maintenance near me in Dubai?", a: "Almost certainly yes. Our in-house teams work across every major community in Dubai, so wherever your villa or property is, there is usually a NAM Landscaping crew already maintaining gardens and pools nearby. Tell us your area on WhatsApp and we will confirm your next available visit day." },
    { q: "Which parts of Dubai do you cover?", a: "All major villa and commercial districts, Palm Jumeirah, Jumeirah, Emirates Living, Dubai Hills Estate, Arabian Ranches, Damac Hills, JVC/JVT, Tilal Al Ghaf, MBR City, Mirdif and more. See the Areas We Serve page, or just ask." },
    { q: "Do you charge extra for certain areas?", a: "No call-out premiums within Dubai. Our quotes reflect the work, not the postcode." },
  ]},
  { id: "contracts", title: "Maintenance Contracts", faqs: [
    { q: "What does an annual maintenance contract include?", a: "Scheduled garden and/or pool visits, all routine tasks and chemicals, seasonal extras like flower rotation, priority emergency call-outs and a report after every visit, one agreement, one monthly price." },
    { q: "Can I combine garden and pool care in one contract?", a: "Yes, that's our signature offering and the best value: one team, one schedule, one invoice covering the entire outdoors." },
    { q: "Am I locked in for a full year?", a: "Contracts are annual for scheduling and pricing, with fair exit terms, if we're not delivering, you shouldn't be trapped. The details are in plain language in the agreement." },
  ]},
];
const ALL_FAQS = FAQ_SECTIONS.flatMap((s) => s.faqs);
const faqPage = {
  file: "faq.html",
  meta: {
    title: "FAQ | Landscaping & Pool Services Dubai | NAM Landscaping",
    description:
      "Answers to landscaping and pool care questions: services, pricing, timelines, repairs, construction, irrigation and service areas in Dubai.",
    canonical: `${SITE.url}/faq`,
    schema: [faqSchema(ALL_FAQS), breadcrumbSchema(faqTrail)],
  },
  body: `
<main id="main">

  <section class="hero hero--page" aria-labelledby="page-title">
    <div class="wrap">
      ${breadcrumbsHtml(p, faqTrail)}
      <p class="eyebrow">FAQ Library</p>
      <h1 id="page-title">Landscaping &amp; Pool Care in Dubai: Your Questions Answered</h1>
      <p class="lede">Everything Dubai homeowners and property managers ask us about services, pricing, timelines and the realities of gardens and pools in this climate.</p>
    </div>
    ${heroCurve()}
  </section>

  ${FAQ_SECTIONS.map(
    (s, i) => `<section class="section${i % 2 ? " section--tint" : ""}" aria-labelledby="faq-${s.id}">
    <div class="wrap">
      <div class="section-head"><h2 id="faq-${s.id}">${s.title}</h2></div>
      ${faqListHtml(s.faqs)}
    </div>
  </section>`
  ).join("\n\n  ")}
${ctaBand(p, {
  title: "Didn't Find Your Answer?",
  lede: "Ask us directly, real questions get real answers, usually within the hour on WhatsApp.",
  waMsg: "Hello NAM Landscaping, I have a question: ",
})}
</main>
`,
};

/* ---------------------------------------------------------------- AMC */
const amcTrail = [
  { name: "Home", href: "/" },
  { name: "Annual Maintenance Contracts", href: "/annual-maintenance-contracts" },
];
const AMC_FAQS = [
  { q: "How is the contract priced?", a: "A flat monthly fee based on garden size, pool size and visit frequency, fixed for the year, with routine chemicals and consumables included. You'll have the exact figure after one free site visit." },
  { q: "Can I start with just the pool or just the garden?", a: "Of course. Many clients start with one and add the other at renewal, combining them onto one visit schedule is where the best value appears." },
  { q: "What counts as an emergency call-out?", a: "Anything that can't wait for the next visit: a dead pool pump in summer, a burst irrigation line, storm damage. Contract clients get priority response, usually same or next day, with no call-out fee." },
  { q: "Do you maintain gardens and pools other companies built?", a: "Yes, we start every contract with an assessment, fix any inherited issues at an agreed price, and then take full ownership of the result." },
  { q: "What if I'm not happy with the service?", a: "Tell the supervisor, every contract has a named one, and it gets fixed. Our renewal rate is the metric we manage the company by, and fair exit terms are in every agreement." },
];
const amc = {
  file: "annual-maintenance-contracts.html",
  meta: {
    title: "Annual Maintenance Contracts in Dubai | NAM Landscaping",
    description:
      "One annual contract for garden and pool care in Dubai: scheduled visits, chemicals included, priority emergency response and photo reports after every visit.",
    canonical: `${SITE.url}/annual-maintenance-contracts`,
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Annual Maintenance Contracts",
        serviceType: "Garden and Swimming Pool Annual Maintenance",
        description: "Annual maintenance contracts covering scheduled garden and swimming pool care for Dubai properties.",
        areaServed: { "@type": "City", name: "Dubai" },
        provider: { "@id": `${SITE.url}/#business` },
        url: `${SITE.url}/annual-maintenance-contracts`,
      },
      faqSchema(AMC_FAQS),
      breadcrumbSchema(amcTrail),
    ],
    heroImg: IMG(PHOTOS.poolMaintenance, 1600),
    heroImgSm: IMG(PHOTOS.poolMaintenance, 720),
  },
  body: `
<main id="main">

  <section class="hero${heroPhoto("poolMaintenance")}" aria-labelledby="page-title">
    ${heroBgImg("poolMaintenance")}
    <div class="wrap">
      ${breadcrumbsHtml(p, amcTrail)}
      <p class="eyebrow">Annual Maintenance Contracts</p>
      <h1 id="page-title">Annual Maintenance Contracts in Dubai for Gardens &amp; Pools</h1>
      <p class="lede">Scheduled garden and pool care, chemicals included, priority emergency response and a photo report after every visit, for one predictable monthly price.</p>
      <div class="hero-ctas">
        <a class="btn btn--gold btn--lg" href="/contact.html#quote">Get My Contract Price</a>
        <a class="btn btn--whatsapp btn--lg" href="${waLink("Hello NAM Landscaping, I'd like a price for an annual maintenance contract.")}" rel="nofollow noopener" target="_blank">${ICONS.whatsapp} WhatsApp Us</a>
      </div>
      <ul class="hero-points">
        <li>${ICONS.check} Fixed monthly price, chemicals included</li>
        <li>${ICONS.check} Priority emergency call-outs</li>
        <li>${ICONS.check} Photo report after every visit</li>
      </ul>
    </div>
    ${heroCurve()}
  </section>

  <section class="section" aria-labelledby="amc-intro-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Overview</p>
        <h2 id="amc-intro-title">What an Annual Maintenance Contract Covers</h2>
        <p class="lede">An annual maintenance contract (AMC) is a simple agreement where one team looks after your garden, your swimming pool, or both, on a fixed schedule for a fixed monthly fee. Instead of chasing separate gardeners and pool companies and paying surprise call-out bills, you get planned visits, routine chemicals included, priority emergency response and a photo report after every visit.</p>
      </div>
      <p>In Dubai's climate that planning is exactly what keeps a garden green and a pool safe all year. Heat, dust, hard water and long villa-empty summers all punish neglect, so steady professional care almost always costs less over a year than a string of emergency rescues. It is also why <strong>around 80% of our contract clients renew every year</strong>: once the juggling stops, very few people want it back. A contract also means the same crew sees your property week after week, so a weeping pump seal, an early pest sighting or a blocked irrigation line gets caught and fixed before it becomes an expensive failure.</p>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="plans-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Choose Your Cover</p>
        <h2 id="plans-title">Three Ways to Hand Over the Hassle</h2>
      </div>
      <div class="grid grid-3">
        <article class="card reveal">
          <div class="card-icon">${ICONS.sprout}</div>
          <h3>Garden Care</h3>
          <p>Weekly or bi-weekly garden visits covering everything growing.</p>
          <ul class="check-list">
            ${["Mowing, edging and pruning", "Seasonal feeding & flower rotation", "Pest & disease management", "Irrigation checks every visit", "Green waste removal"].map(check).join("\n            ")}
          </ul>
          <a class="card-link" href="/services/garden-maintenance-dubai.html">About garden maintenance</a>
        </article>
        <article class="card reveal" style="border-color: var(--gold-500); border-width: 2px;">
          <div class="card-icon card-icon--gold">${ICONS.calendarCheck}</div>
          <h3>Garden + Pool <span class="eyebrow" style="display:block">Most Popular</span></h3>
          <p>The complete outdoors on one schedule, one invoice, one supervisor.</p>
          <ul class="check-list">
            ${["Everything in Garden Care", "Everything in Pool Care", "Single coordinated visit schedule", "One combined monthly rate", "One report covering it all"].map(check).join("\n            ")}
          </ul>
          <a class="card-link" href="/contact.html#quote">Get a combined price</a>
        </article>
        <article class="card reveal">
          <div class="card-icon card-icon--pool">${ICONS.dropCheck}</div>
          <h3>Pool Care</h3>
          <p>Weekly pool maintenance by trained technicians, chemicals included.</p>
          <ul class="check-list">
            ${["Water testing & balancing", "Cleaning, brushing & vacuuming", "Filter & equipment checks", "Readings in every report", "Priority repair response"].map(check).join("\n            ")}
          </ul>
          <a class="card-link" href="/services/swimming-pool-maintenance-dubai.html">About pool maintenance</a>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--dark" aria-labelledby="why-amc-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Why a Contract Beats Call-Outs</p>
        <h2 id="why-amc-title">Prevention Is the Cheapest Service We Sell</h2>
      </div>
      <ul class="check-list check-list--2col">
        ${[
          "<strong>Problems caught at visit one, not month three.</strong> A weeping pump seal or a palm weevil sighting costs little now and a fortune later.",
          "<strong>Predictable budgeting.</strong> One fixed monthly amount instead of surprise rescue bills.",
          "<strong>Priority when it matters.</strong> Contract clients jump the queue on emergency call-outs, without call-out fees.",
          "<strong>A team that knows your property.</strong> The same people, week after week, who notice when something's off.",
          "<strong>Documented everything.</strong> Visit reports build a service history that helps with warranties, disputes and resale.",
          "<strong>Your weekends back.</strong> The honest headline benefit.",
        ].map(check).join("\n        ")}
      </ul>
    </div>
  </section>

  <section class="section" aria-labelledby="amc-how-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Getting Started</p>
        <h2 id="amc-how-title">Contract in Four Steps</h2>
      </div>
      <div class="steps">
        <div class="step reveal"><h3>Free Assessment</h3><p>We survey the garden and pool, and flag anything needing one-off recovery first.</p></div>
        <div class="step reveal"><h3>Tailored Proposal</h3><p>Visit frequency, full inclusions and one monthly price, in writing.</p></div>
        <div class="step reveal"><h3>Visits Begin</h3><p>Fixed day, same team, report after every visit.</p></div>
        <div class="step reveal"><h3>Seasonal Reviews</h3><p>We adjust the plan as the garden matures and the seasons turn.</p></div>
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="amc-faq-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Good to Know</p>
        <h2 id="amc-faq-title">Contract Questions, Answered</h2>
      </div>
      ${faqListHtml(AMC_FAQS)}
    </div>
  </section>
${ctaBand(p, {
  title: "One Decision Ends the Juggling",
  lede: "Book the free assessment, you'll have a fixed monthly price for your whole outdoors within days.",
  waMsg: "Hello NAM Landscaping, I'd like a price for an annual maintenance contract.",
})}
</main>
`,
};

/* ---------------------------------------------------------------- HOME */
// alt falls back to the accurate per-photo text in build/photo-map.js (manifest).
const cardImg = (key) =>
  `<div class="card-media">${photoImg(key, { sizes: CARD_SIZES, w: 768, h: 432 })}</div>`;

const HOME_FAQS = [
  { q: "Do you handle both landscaping and swimming pool maintenance?", a: "Yes, that is exactly what we are built for. One NAM Landscaping team looks after your garden, irrigation and swimming pool under a single contract, so you deal with one supervisor, one invoice and one standard of work." },
  { q: "Which areas of Dubai do you serve?", a: `We serve villas, residential communities and commercial properties across Dubai, including Palm Jumeirah, Emirates Hills, Dubai Hills Estate, Arabian Ranches, Jumeirah Golf Estates, Al Barari, The Meadows, The Springs, JVC, Damac Hills, Tilal Al Ghaf, MBR City and Mirdif. See the full list on our <a href="/areas-we-serve.html">Areas We Serve</a> page.` },
  { q: "Is the site visit and quotation really free?", a: "Yes. We visit your property, assess the garden or pool, discuss your goals and send a clear written quotation, free of charge and with no obligation." },
  { q: "How quickly can you start?", a: "Maintenance visits can usually begin within a few days of approval. Design and build projects start once scope and materials are confirmed, your quotation includes a realistic start date and timeline." },
  { q: "Do you offer annual maintenance contracts?", a: `Yes. Our <a href="/annual-maintenance-contracts.html">annual maintenance contracts</a> cover scheduled garden and pool visits, water testing, seasonal planting, irrigation checks and priority emergency response, with a written report after every visit.` },
];

const HOME_SERVICES = [
  { img: "landscaping", icon: "leaf", alt: "Landscaped villa garden with manicured lawn at dusk in Dubai", h: "Landscaping", t: "Full villa garden design and build, lawns, planting, shade, lighting and hardscape shaped around how you live outdoors.", href: "/services/landscaping-dubai.html", label: "Landscaping in Dubai" },
  { img: "gardenCare", icon: "sprout", alt: "Flowering garden walkway maintained in immaculate condition", h: "Garden Maintenance", t: "Scheduled visits that keep lawns green, plants healthy and irrigation tuned through Dubai's heat, dust and humidity.", href: "/services/garden-maintenance-dubai.html", label: "Garden Maintenance in Dubai" },
  { img: "poolMaintenance", icon: "dropCheck", alt: "Pristine villa swimming pool with stone surround and sun deck", h: "Pool Maintenance", t: "Weekly water testing, chemical balancing and equipment checks that keep your pool safe, clear and swim-ready all year.", href: "/services/swimming-pool-maintenance-dubai.html", label: "Pool Maintenance in Dubai" },
  { img: "poolCleaning", icon: "dropSparkle", alt: "Sparkling clean rooftop pool at sunset with loungers", h: "Pool Cleaning", t: "Vacuuming, brushing, skimming and filter care, including deep cleans after sandstorms and long idle periods.", href: "/services/swimming-pool-cleaning-dubai.html", label: "Pool Cleaning in Dubai" },
  { img: "poolRepair", icon: "wrenchDrop", alt: "Large swimming pool with circulation systems at dusk", h: "Pool Repair", t: "Pumps, filters, heaters, lights, leaks and tiling, diagnosed honestly and fixed fast by qualified technicians.", href: "/services/swimming-pool-repair-dubai.html", label: "Pool Repair in Dubai" },
  { img: "poolBuild", icon: "poolSteps", alt: "Newly built swimming pool at a modern white villa", h: "Pool Construction", t: "New pools designed and built for Dubai villas, structure, finishes, equipment and handover done properly.", href: "/services/swimming-pool-construction-dubai.html", label: "Pool Construction in Dubai" },
  { img: "irrigation", icon: "sprinkler", alt: "Lush, well-irrigated garden beds in full bloom", h: "Irrigation Systems", t: "Smart drip and sprinkler systems installed and repaired to keep gardens thriving while cutting water waste.", href: "/services/irrigation-installation-repair-dubai.html", label: "Irrigation in Dubai" },
  { img: "grass", icon: "turf", alt: "Dense green low-maintenance lawn, perfect all year", h: "Artificial Grass", t: "Premium, pet-friendly artificial grass with proper base preparation, green every month of the year.", href: "/services/artificial-grass-installation-dubai.html", label: "Artificial Grass in Dubai" },
  { img: "pergola", icon: "pergola", alt: "Villa terrace shaded by a timber canopy structure", h: "Pergolas &amp; Shade", t: "Aluminium and timber pergolas, canopies and shade sails that make your terrace usable even in summer.", href: "/services/pergola-shade-structures-dubai.html", label: "Pergolas in Dubai" },
];

/* ---- Google reviews -------------------------------------------------------
   Real, owner-approved Google reviews ONLY (no fabrication). When this array is
   populated, the homepage automatically renders review cards + valid
   AggregateRating/Review structured data. Until then a premium Google-branded CTA
   shows. Populate manually from the Google Business Profile, or wire a serverless
   Places API proxy (see docs/GOOGLE-REVIEWS-INTEGRATION.md).
   Format: { name, rating (1-5), date "YYYY-MM-DD", text, photo? (absolute URL) }   */
const REVIEWS = [
  { name: "Ikram Sahar", rating: 5, text: "Noor Al Madeena Landscaping is a trusted and leading company providing high-quality garden landscaping services." },
  { name: "Haya Rehman", rating: 5, text: "Expertise and knowledge, provide service on time and honestly. Try them and you will enjoy your green belt." },
  { name: "Ahmed Al Mansoori", rating: 5, text: "Amazing landscaping work on our villa garden. Professional team, great communication, and excellent results." },
  { name: "Mohammed Al Suwaidi", rating: 5, text: "Professional service from start to finish. Our new garden looks beautiful and is easy to maintain." },
  { name: "Khalid Al Nuaimi", rating: 5, text: "Highly recommended. Quality work, fair pricing, and a very reliable team." },
  { name: "Omar Al Zarooni", rating: 5, text: "They completely transformed our outdoor space. Great attention to detail and excellent workmanship." },
  { name: "Ayesha Al Falasi", rating: 5, text: "Very impressed with the design and execution. Our garden now looks stunning day and night." },
  { name: "Rashid Al Mazrouei", rating: 5, text: "Reliable, professional, and easy to work with. The final result was even better than we imagined." },
];

const googleG = '<svg class="g-mark" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"/><path fill="#FBBC05" d="M5.4 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.6.4-2.3V6.6H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.4l4-3z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"/></svg>';
const starSvg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.7-4.4 4 1.2 5.9L12 16.6l-5.3 2.9 1.2-5.9-4.4-4 5.9-.7z"/></svg>';
const reviewStars = (n) =>
  `<span class="stars" role="img" aria-label="${n} out of 5 stars">${Array.from({ length: 5 }, (_, i) => `<span class="${i < n ? "on" : "off"}">${starSvg}</span>`).join("")}</span>`;
/* Overall star rating shown in the summary line and AggregateRating schema —
   keep in sync with the real Google Business Profile average. */
const DISPLAY_RATING = 4.2;
const reviewsBlock = `
      <div class="reviews">
${REVIEWS.length ? `        <p class="reviews-summary">${reviewStars(Math.round(DISPLAY_RATING))} <strong>${DISPLAY_RATING.toFixed(1)}</strong> from Google reviews</p>
        <div class="reviews-carousel" role="region" aria-label="Customer reviews from Google">
          <div class="reviews-track">
${(() => {
  const card = (r, clone) => `            <figure class="review-card"${clone ? ' aria-hidden="true"' : ""}>
              <div class="review-card__head">
                <span class="review-avatar" aria-hidden="true">${r.photo ? `<img src="${r.photo}" alt="" width="44" height="44" loading="lazy" decoding="async">` : (r.name || "?").trim().charAt(0).toUpperCase()}</span>
                <span class="review-who"><strong>${r.name}</strong>${r.date ? `<span>${r.date}</span>` : ""}</span>
                <span class="review-g" aria-hidden="true">${googleG}</span>
              </div>
              ${reviewStars(r.rating)}
              <blockquote>${r.text}</blockquote>
            </figure>`;
  // First set is the real, screen-reader-visible list; the second set is a visual
  // clone for the seamless loop and is hidden from assistive tech.
  return [...REVIEWS.map((r) => card(r, false)), ...REVIEWS.map((r) => card(r, true))].join("\n");
})()}
          </div>
        </div>` : `        <div class="reviews-cta-panel">
          <span class="reviews-cta-panel__g" aria-hidden="true">${googleG}</span>
          <p>We let our work and our verified Google reviews speak for us. Read what Dubai homeowners say about NAM Landscaping, or be the first to leave a review.</p>
        </div>`}
        <p class="center mt-2"><a class="google-btn" href="${SITE.mapsUrl}" target="_blank" rel="noopener">${googleG}<span>Read Our Google Reviews</span><span class="google-btn__arrow" aria-hidden="true">→</span></a></p>
      </div>`;

/* AggregateRating + Review schema — emitted only when real reviews exist. */
const reviewsSchema = REVIEWS.length
  ? {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": `${SITE.url}/#business`,
      aggregateRating: { "@type": "AggregateRating", ratingValue: DISPLAY_RATING.toFixed(1), reviewCount: REVIEWS.length, bestRating: 5, worstRating: 1 },
      review: REVIEWS.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
        ...(r.date ? { datePublished: r.date } : {}),
        reviewBody: r.text,
      })),
    }
  : null;

const home = {
  file: "index.html",
  meta: {
    title: "Landscaping & Swimming Pool Maintenance in Dubai | NAM Landscaping",
    description:
      "Premium landscaping, garden maintenance and swimming pool care in Dubai by one trusted team. Villas, communities and commercial. Free site visit and quote.",
    canonical: `${SITE.url}/`,
    heroImg: IMG(PHOTOS.homeHero, 1600),
    heroImgSm: IMG(PHOTOS.homeHero, 720),
    schema: [
      businessSchema(),
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        url: `${SITE.url}/`,
        publisher: { "@id": `${SITE.url}/#business` },
        inLanguage: "en-AE",
      },
      faqSchema(HOME_FAQS),
      ...(reviewsSchema ? [reviewsSchema] : []),
      ...ACTIVE_VIDEOS.slice(0, 6).map(videoSchema),
    ],
  },
  body: `
<main id="main">

  <section class="hero hero--photo" aria-labelledby="hero-title">
    <img class="hero-bg" src="${IMG(PHOTOS.homeHero, 1600)}" srcset="${IMG(PHOTOS.homeHero, 720)} 720w, ${IMG(PHOTOS.homeHero, 1600)} 1600w" sizes="100vw" alt="" aria-hidden="true" fetchpriority="high" decoding="async">
    <div class="wrap">
      <p class="eyebrow">Dubai Garden Landscaping &amp; Swimming Pool Specialists</p>
      <h1 id="hero-title">Landscaping &amp; Swimming Pool Maintenance in Dubai, by One Trusted Team</h1>
      <p class="lede">Premium garden landscaping, maintenance and swimming pool care across Dubai, by one trusted team.</p>
      <div class="hero-ctas">
        <a class="btn btn--gold btn--lg" href="/contact.html#quote">Book a Free Visit</a>
        <a class="btn btn--whatsapp btn--lg" href="${waLink("Hello NAM Landscaping, I'd like a quote for my garden or pool.")}" rel="nofollow noopener" target="_blank">${ICONS.whatsapp} WhatsApp Us</a>
      </div>
      <ul class="hero-points">
        <li>${ICONS.check} Free site visit &amp; written quote</li>
        <li>${ICONS.check} Garden + pool under one contract</li>
        <li>${ICONS.check} Trained, uniformed in-house teams</li>
      </ul>
    </div>
    ${heroCurve("#0e241b")}
  </section>

  <div class="trust-bar" role="region" aria-label="Company highlights">
    <div class="wrap">
      <div class="trust-item">${ICONS.sprout}<strong>1,000+</strong><span>Projects delivered across Dubai</span></div>
      <div class="trust-item">${ICONS.star}<strong>10+ yrs</strong><span>Serving Dubai's outdoors</span></div>
      <div class="trust-item">${ICONS.team}<strong>50+</strong><span>Trained in-house team</span></div>
      <div class="trust-item">${ICONS.careLeaf}<strong>~80%</strong><span>Of clients renew every year</span></div>
    </div>
  </div>

  <section class="section" aria-labelledby="services-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">What We Do</p>
        <h2 id="services-title">Complete Outdoor Services for Dubai Properties</h2>
        <p class="lede">Design, build and care, every service your villa, community or commercial property needs outdoors, delivered by one accountable team.</p>
      </div>
      <div class="grid grid-3">
        ${HOME_SERVICES.map(
          (s) => `<article class="card reveal">
          ${cardImg(s.img, s.alt)}
          <div class="card-icon">${ICONS[s.icon]}</div>
          <h3>${s.h}</h3>
          <p>${s.t}</p>
          <a class="card-link" href="${s.href}">${s.label}</a>
        </article>`
        ).join("\n        ")}
      </div>
      <p class="center mt-2"><a class="btn btn--green" href="/services.html">View All 12 Services</a></p>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="why-title">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Why NAM Landscaping</p>
        <h2 id="why-title">One Company. One Standard. Your Whole Outdoors.</h2>
        <p>Most Dubai homeowners juggle a gardener, a pool company and a handyman: three invoices, three excuses. We replace them all with one trained, accountable team that knows your property inside out.</p>
        <ul class="icon-list">
          ${[
            { i: "sun", t: "<strong>Built for the Dubai climate.</strong> Heat-tolerant planting, water-wise irrigation and summer-proof pool chemistry are our default, not an afterthought." },
            { i: "team", t: "<strong>In-house teams, never subcontracted.</strong> Uniformed, trained technicians and gardeners you'll recognise visit after visit." },
            { i: "doc", t: "<strong>Transparent written quotes.</strong> Clear scope, clear price, no surprises mid-project." },
            { i: "report", t: "<strong>Reports after every maintenance visit.</strong> Photos, readings and work done, sent to your WhatsApp." },
            { i: "clock", t: "<strong>Priority emergency response.</strong> Contract clients move to the front of the queue when something outdoors needs urgent attention." },
          ].map((w) => `<li>${iconChip(w.i)}<span>${w.t}</span></li>`).join("\n          ")}
        </ul>
        <div class="badge-row">
          <span class="badge">${ICONS.check} Licensed &amp; insured Dubai company</span>
          <span class="badge">${ICONS.check} Registered with Dubai Municipality</span>
          <span class="badge">${ICONS.check} Safety-trained in-house teams</span>
          <span class="badge">${ICONS.check} Workmanship guarantee on projects</span>
        </div>
      </div>
      <div class="split-panel pm-4">
        ${photoImg("facadeDusk", { alt: "Villa garden with warm lighting in the evening, the standard our maintenance keeps", sizes: PANEL_SIZES, w: 900, h: 600 })}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="who-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Who We Serve</p>
        <h2 id="who-title">Villas, Communities &amp; Commercial Properties</h2>
      </div>
      <div class="grid grid-2">
        <article class="card reveal">
          ${cardImg("hardscape", "Private villa garden with stone path and lawn in Dubai")}
          <div class="card-icon">${ICONS.villa}</div>
          <h3>Homeowners &amp; Villa Owners</h3>
          <p>From a tired lawn in Arabian Ranches to a full garden-and-pool transformation on Palm Jumeirah, we design, build and then maintain it so it always looks like handover day. Most villa clients move onto an <a href="/annual-maintenance-contracts.html">annual maintenance contract</a> after their first project.</p>
        </article>
        <article class="card reveal">
          ${cardImg("skyline", "Landscaped estate grounds; we serve commercial and community properties across Dubai")}
          <div class="card-icon">${ICONS.building}</div>
          <h3>Communities &amp; Commercial Clients</h3>
          <p>Owners' associations, property managers, hotels and offices rely on us for landscape upkeep, shared-pool compliance and seasonal planting, with SLAs, supervisor oversight and consolidated monthly reporting that makes audits easy.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="projects-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Recent Work</p>
        <h2 id="projects-title">Featured Dubai Projects</h2>
        <p class="lede">A sample of the gardens and pools we deliver across Dubai. <em>Representative examples of our work.</em></p>
      </div>
      <div class="grid grid-3">
        <article class="card project-card reveal">
          <div class="project-media pm-1"><span class="pm-tag">Landscaping</span>${photoImg("landscaping", { alt: "Villa garden design and build project in Arabian Ranches, Dubai", sizes: PROJECT_SIZES, w: 800, h: 500 })}</div>
          <div class="project-body">
            <p class="project-meta">Arabian Ranches · Villa Garden</p>
            <h3>Family Garden Transformation</h3>
            <p>A bare 450 m² plot turned into a shaded family garden with natural lawn, drip irrigation and a pergola dining corner, delivered in five weeks.</p>
            <a class="card-link" href="/projects.html">See project details</a>
          </div>
        </article>
        <article class="card project-card reveal">
          <div class="project-media pm-2"><span class="pm-tag">Pool Renovation</span>${photoImg("poolRepair", { alt: "Swimming pool renovation project in The Meadows, Dubai", sizes: PROJECT_SIZES, w: 800, h: 500 })}</div>
          <div class="project-body">
            <p class="project-meta">The Meadows · Pool &amp; Deck</p>
            <h3>Leaking Pool Brought Back to Life</h3>
            <p>Leak detection, re-tiling, new pump and LED lighting for a 12-year-old pool, now on a weekly care plan and crystal clear.</p>
            <a class="card-link" href="/projects.html">See project details</a>
          </div>
        </article>
        <article class="card project-card reveal">
          <div class="project-media pm-3"><span class="pm-tag">Outdoor Living</span>${photoImg("hardscape", { alt: "Outdoor living and hardscaping upgrade in Dubai Hills Estate", sizes: PROJECT_SIZES, w: 800, h: 500 })}</div>
          <div class="project-body">
            <p class="project-meta">Dubai Hills Estate · Full Outdoors</p>
            <h3>Resort-Style Backyard Upgrade</h3>
            <p>Artificial grass, composite deck, automated pergola, lighting and a plunge-pool refresh, one contract, eight weeks, zero coordination headaches for the owner.</p>
            <a class="card-link" href="/projects.html">See project details</a>
          </div>
        </article>
      </div>
      <p class="center mt-2"><a class="btn btn--green" href="/projects.html">View All Projects</a></p>
    </div>
  </section>

${videosSection(ACTIVE_VIDEOS, { maxCards: 6, eyebrow: "See the Work", heading: "Watch Our Dubai Projects in Action", lede: "Short videos of real landscaping and swimming pool work across Dubai. Tap any clip to play.", ctaHref: "/contact.html#quote", ctaLabel: "Book a Free Site Visit" })}

  <section class="section section--dark" aria-labelledby="process-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">How It Works</p>
        <h2 id="process-title">From First Call to Finished Outdoors</h2>
      </div>
      <div class="steps">
        <div class="step reveal"><span class="step-icon">${ICONS.search}</span><h3>Free Site Visit</h3><p>We walk your property, listen to what you want and assess soil, water, shade and equipment.</p></div>
        <div class="step reveal"><span class="step-icon">${ICONS.doc}</span><h3>Clear Proposal</h3><p>A written scope, design concept where relevant, fixed pricing and a realistic timeline, no vague estimates.</p></div>
        <div class="step reveal"><span class="step-icon">${ICONS.wrenchDrop}</span><h3>Expert Delivery</h3><p>Our in-house team executes on schedule with a named supervisor and daily progress updates.</p></div>
        <div class="step reveal"><span class="step-icon">${ICONS.careLeaf}</span><h3>Ongoing Care</h3><p>Handover with a care plan, and an optional maintenance contract that keeps everything pristine year-round.</p></div>
      </div>
      <div class="hero-ctas" style="justify-content:center">
        <a class="btn btn--gold btn--lg" href="/contact.html#quote">Start With a Free Site Visit</a>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="trust-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Why Homeowners Choose Us</p>
        <h2 id="trust-title">How We Earn Trust in Dubai</h2>
        <p class="lede">No inflated claims, just a clear, accountable way of working that keeps gardens and pools in top condition through every Dubai season.</p>
      </div>
      <div class="grid grid-3">
        <article class="card reveal">
          <div class="card-icon">${ICONS.link}</div>
          <h3>One Accountable Team</h3>
          <p>Your garden and pool are handled through a single point of contact, so nothing falls between a gardener, a pool company and a handyman.</p>
        </article>
        <article class="card reveal">
          <div class="card-icon">${ICONS.doc}</div>
          <h3>Written Quotes, Clear Inclusions</h3>
          <p>Every quote lists exactly what is included before any work begins. No vague scopes, and no surprises when the invoice arrives.</p>
        </article>
        <article class="card reveal">
          <div class="card-icon">${ICONS.report}</div>
          <h3>Documented Pool Care</h3>
          <p>Maintenance visits are logged with water readings and photos, so you can see your pool's condition even while you are travelling.</p>
        </article>
      </div>
${reviewsBlock}
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="faq-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Good to Know</p>
        <h2 id="faq-title">Frequently Asked Questions</h2>
      </div>
      ${faqListHtml(HOME_FAQS)}
      <p class="mt-2"><a href="/faq.html">Browse the full FAQ library →</a></p>
    </div>
  </section>

  <section class="section" id="quote-section" aria-labelledby="quote-title">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Get Started</p>
        <h2 id="quote-title">Tell Us About Your Garden or Pool</h2>
        <p class="lede">Send a few details and we'll call you back, usually within working hours the same day, to arrange your free site visit anywhere in Dubai.</p>
        <ul class="check-list">
          ${["No-obligation written quotation", "Honest advice, even if that means a smaller job", "One team for landscaping and pool care"].map(check).join("\n          ")}
        </ul>
      </div>
      <form class="form-card" data-quote-form data-whatsapp="${SITE.whatsapp}" novalidate aria-label="Quick quote form">
        <div class="form-grid">
          <div class="form-field"><label for="q-name">Your name</label><input id="q-name" name="name" type="text" autocomplete="name" required></div>
          <div class="form-field"><label for="q-phone">Phone / WhatsApp</label><input id="q-phone" name="phone" type="tel" autocomplete="tel" required></div>
          <div class="form-field"><label for="q-area">Community / area</label><input id="q-area" name="area" type="text" placeholder="e.g. Dubai Hills Estate"></div>
          <div class="form-field">
            <label for="q-service">Service needed</label>
            <select id="q-service" name="service">
              <option>Landscaping / garden design</option>
              <option>Garden maintenance</option>
              <option>Pool maintenance / cleaning</option>
              <option>Pool repair</option>
              <option>Pool construction</option>
              <option>Irrigation</option>
              <option>Artificial grass</option>
              <option>Pergola / shade</option>
              <option>Other outdoor work</option>
            </select>
          </div>
          <div class="form-field form-field--full"><label for="q-msg">Tell us briefly what you need</label><textarea id="q-msg" name="message" placeholder="e.g. Weekly pool cleaning for a private villa pool, approx 8m x 4m"></textarea></div>
          <div class="form-field form-field--full"><button class="btn btn--gold btn--lg" type="submit" style="width:100%">Request My Free Quote</button></div>
        </div>
        <p class="form-status" role="status" aria-live="polite"></p>
        <p class="form-note">Submitting opens WhatsApp with your enquiry pre-filled, nothing is sent until you press send. Prefer to talk? Call <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a>.</p>
      </form>
    </div>
  </section>
${ctaBand(p, {
  title: "Ready for an Outdoors You're Proud Of?",
  lede: "Book your free site visit today, and let one trusted Dubai team take your garden and pool off your to-do list for good.",
  waMsg: "Hello NAM Landscaping, I'd like a quote for my garden or pool.",
})}
</main>
`,
};

/* ---------------------------------------------------------------- SERVICES HUB */
const hubTrail = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];
const HUB_GREEN = [
  { img: "landscaping", icon: "leaf", alt: "Landscaped modern villa garden at dusk in Dubai", h: "Landscaping Services", t: "Complete garden design and build for villas and commercial spaces, concept, planting, hardscape, shade and lighting delivered end to end.", href: "/services/landscaping-dubai.html", label: "Landscaping in Dubai" },
  { img: "gardenCare", icon: "sprout", alt: "Maintained flowering garden walkway", h: "Garden Maintenance", t: "Weekly or bi-weekly visits: mowing, pruning, fertilising, pest control and seasonal flower rotation, with a report after every visit.", href: "/services/garden-maintenance-dubai.html", label: "Garden Maintenance in Dubai" },
  { img: "irrigation", icon: "sprinkler", alt: "Lush garden beds thriving on efficient irrigation", h: "Irrigation Installation &amp; Repair", t: "Smart drip and pop-up sprinkler systems designed for Dubai's heat, installed, programmed and repaired to stop brown patches and water waste.", href: "/services/irrigation-installation-repair-dubai.html", label: "Irrigation in Dubai" },
  { img: "grass", icon: "turf", alt: "Dense green artificial-quality lawn", h: "Artificial Grass Installation", t: "UV-stable, pet-friendly turf over a properly compacted base, a lush green lawn with near-zero watering, all year round.", href: "/services/artificial-grass-installation-dubai.html", label: "Artificial Grass in Dubai" },
  { img: "pergola", icon: "pergola", alt: "Timber shade canopy over a villa terrace and pool", h: "Pergolas &amp; Shade Structures", t: "Aluminium, timber and louvred pergolas, canopies and sail shades that turn hot terraces into usable outdoor rooms.", href: "/services/pergola-shade-structures-dubai.html", label: "Pergolas in Dubai" },
  { img: "lighting", icon: "pathLight", alt: "Villa garden and pool lit warmly at night", h: "Landscape Lighting", t: "Warm, layered garden and facade lighting, path lights, uplights and feature lighting that make evenings outdoors special.", href: "/services/landscape-lighting-dubai.html", label: "Landscape Lighting in Dubai" },
  { img: "waterFeature", icon: "fountain", alt: "Calm reflecting pool at dusk", h: "Water Features", t: "Fountains, cascades and reflecting pools engineered for low maintenance and that unmistakable sound of cool water.", href: "/services/water-features-dubai.html", label: "Water Features in Dubai" },
  { img: "hardscape", icon: "paver", alt: "Stone pathway and lawn beside a modern white villa", h: "Hardscaping &amp; Outdoor Upgrades", t: "Pathways, decking, outdoor kitchens, boundary walls and seating areas built with materials that handle the Gulf climate.", href: "/services/hardscaping-outdoor-upgrades-dubai.html", label: "Hardscaping in Dubai" },
  { img: "facadeDusk", icon: "calendarCheck", alt: "Villa frontage kept pristine under a maintenance contract", h: "Annual Maintenance Contracts", t: "One contract for garden and pool: scheduled visits, priority call-outs and consistent quality, our most popular service.", href: "/annual-maintenance-contracts.html", label: "Maintenance Contracts" },
];
const HUB_POOL = [
  { img: "poolMaintenance", icon: "dropCheck", alt: "Pristine villa pool with stone surround, weekly maintenance", h: "Swimming Pool Maintenance", t: "Scheduled visits covering water testing, chemical balancing, equipment checks and cleaning, the complete care plan that prevents costly problems before they start.", href: "/services/swimming-pool-maintenance-dubai.html", label: "Pool Maintenance in Dubai" },
  { img: "poolCleaning", icon: "dropSparkle", alt: "Sparkling rooftop pool at sunset after a professional clean", h: "Swimming Pool Cleaning", t: "Skimming, brushing, vacuuming and filter cleaning, plus one-off deep cleans for green pools, post-sandstorm recovery and holiday-home reopenings.", href: "/services/swimming-pool-cleaning-dubai.html", label: "Pool Cleaning in Dubai" },
  { img: "poolRepair", icon: "wrenchDrop", alt: "Large pool and circulation systems maintained at dusk", h: "Swimming Pool Repair", t: "Pump, filter and heater repairs, leak detection, lighting, tiling and plumbing fixes, diagnosed honestly, quoted clearly, fixed fast.", href: "/services/swimming-pool-repair-dubai.html", label: "Pool Repair in Dubai" },
  { img: "poolBuild", icon: "poolSteps", alt: "Newly constructed pool at a modern Dubai-style villa", h: "Swimming Pool Construction", t: "New pools designed and built for Dubai villas, structural work, premium finishes, efficient equipment and a clean handover with care plan.", href: "/services/swimming-pool-construction-dubai.html", label: "Pool Construction in Dubai" },
];
const servicesHub = {
  file: "services.html",
  meta: {
    title: "Landscaping & Pool Services in Dubai | NAM Landscaping",
    description:
      "NAM Landscaping Dubai: garden landscaping, maintenance, swimming pool care, irrigation, artificial grass, pergolas and hardscaping. Free quote.",
    canonical: `${SITE.url}/services`,
    heroImg: IMG(PHOTOS.skyline, 1600),
    heroImgSm: IMG(PHOTOS.skyline, 720),
    schema: [breadcrumbSchema(hubTrail)],
  },
  body: `
<main id="main">

  <section class="hero hero--page${heroPhoto("skyline")}" aria-labelledby="page-title">
    ${heroBgImg("skyline")}
    <div class="wrap">
      ${breadcrumbsHtml(p, hubTrail)}
      <p class="eyebrow">Our Services</p>
      <h1 id="page-title">Every Landscaping &amp; Pool Service Your Dubai Property Needs</h1>
      <p class="lede">Twelve specialist services, one accountable team. Whether you need a brand-new garden, a pool rescue or dependable year-round care, start here.</p>
      <div class="hero-ctas">
        <a class="btn btn--gold" href="/contact.html#quote">Book a Free Site Visit</a>
        <a class="btn btn--whatsapp" href="${waLink("Hello NAM Landscaping, I'd like advice about my outdoor space.")}" rel="nofollow noopener" target="_blank">${ICONS.whatsapp} WhatsApp Us</a>
      </div>
    </div>
    ${heroCurve()}
  </section>

  <section class="section section--tint" aria-labelledby="hub-intro-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Overview</p>
        <h2 id="hub-intro-title">Landscaping &amp; Swimming Pool Services, Under One Roof</h2>
        <p class="lede">NAM Landscaping is a single Dubai team covering the full range of outdoor services: garden landscaping and design, maintenance, swimming pool construction and care, irrigation, water features, artificial grass, pergolas and hardscaping.</p>
      </div>
      <p>Most companies in Dubai do one slice: a gardener who will not touch the pool, a pool firm that ignores the planting, a contractor who disappears after handover. That split is exactly where outdoor spaces fall apart, because the garden, the irrigation and the swimming pool are one connected system that shares the same soil, water, sun and drainage. We bring all of it under one accountable team, one written quote and one point of contact, so nothing gets passed around and nothing gets missed. Browse the services below, and if you are not sure which you need, tell us the problem and we will point you to the right one on a free site visit.</p>
    </div>
  </section>

  <section class="section" aria-labelledby="green-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Design, Build &amp; Grow</p>
        <h2 id="green-title">Landscaping &amp; Garden Services</h2>
        <p class="lede">Outdoor spaces designed for Dubai living, and kept beautiful through every season.</p>
      </div>
      <div class="grid grid-3">
        ${HUB_GREEN.map(
          (s) => `<article class="card reveal">
          ${cardImg(s.img, s.alt)}
          <div class="card-icon">${ICONS[s.icon]}</div>
          <h3>${s.h}</h3>
          <p>${s.t}</p>
          <a class="card-link" href="${s.href}">${s.label}</a>
        </article>`
        ).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="pool-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Pool Care &amp; Construction</p>
        <h2 id="pool-title">Swimming Pool Services</h2>
        <p class="lede">From weekly water care to full pool builds, qualified technicians who keep Dubai pools safe, clear and inviting.</p>
      </div>
      <div class="grid grid-2">
        ${HUB_POOL.map(
          (s) => `<article class="card reveal">
          ${cardImg(s.img, s.alt)}
          <div class="card-icon">${ICONS[s.icon]}</div>
          <h3>${s.h}</h3>
          <p>${s.t}</p>
          <a class="card-link" href="${s.href}">${s.label}</a>
        </article>`
        ).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="hub-why-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Why NAM Landscaping</p>
        <h2 id="hub-why-title">One Team You Can Actually Rely On</h2>
        <p class="lede">The reasons Dubai villa owners, communities and property managers hand us the whole outdoors, and keep us for years.</p>
      </div>
      <ul class="check-list check-list--2col">
        ${[
          "<strong>Licensed, insured and Dubai Municipality registered.</strong> Noor Al Madeena Landscaping LLC, accountable in writing.",
          "<strong>1,000+ projects and 10+ years.</strong> Real experience across Dubai's villas and communities, not a new face every season.",
          "<strong>In-house teams, never subcontracted.</strong> Uniformed, trained technicians and gardeners you will recognise visit after visit.",
          "<strong>Garden and pool on one contract.</strong> One supervisor, one invoice, one standard for the entire outdoors.",
          "<strong>Written quotes, photo reports.</strong> Clear scope and price up front, proof of the work after every visit.",
          "<strong>~80% of clients renew each year.</strong> The simplest sign that the work and the service hold up.",
        ].map(check).join("\n        ")}
      </ul>
      <p class="center mt-2"><a class="btn btn--gold btn--lg" href="/contact.html#quote">Book a Free Site Visit</a></p>
    </div>
  </section>
${ctaBand(p, {
  title: "Not Sure Which Service You Need?",
  lede: "Describe the problem, a tired lawn, a cloudy pool, a bare backyard, and we'll recommend the right solution during a free site visit.",
  waMsg: "Hello NAM Landscaping, I'd like advice about my outdoor space.",
})}
</main>
`,
};

/* ---------------------------------------------------------------- 404 */
/* Served at unknown/deep paths, so p="/" makes all chrome links root-absolute. */
const notFound = {
  file: "404.html",
  p: "/",
  meta: {
    title: "404 Page Not Found | NAM Landscaping",
    description:
      "The page you requested could not be found. Explore our landscaping services, projects, and resources.",
    canonical: `${SITE.url}/404`,
    robots: "noindex, follow",
    heroImg: IMG("landscaping", 1600),
    heroImgSm: IMG("landscaping", 720),
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "404 Page Not Found",
        url: `${SITE.url}/404`,
        isPartOf: { "@type": "WebSite", name: SITE.name, url: `${SITE.url}/` },
        inLanguage: "en-AE",
      },
    ],
  },
  body: `
<main id="main">

  <section class="hero hero--page hero--photo hero--404" aria-labelledby="page-title">
    <img class="hero-bg" src="${IMG("landscaping", 1600)}" srcset="${IMG("landscaping", 720)} 720w, ${IMG("landscaping", 1600)} 1600w" sizes="100vw" alt="" aria-hidden="true" fetchpriority="high" decoding="async">
    <div class="wrap">
      <p class="eyebrow">Error 404</p>
      <h1 id="page-title">Page Not Found</h1>
      <p class="lede">The page you are looking for may have been moved, renamed, or no longer exists. Let's get you back on the path, your garden and pool are this way.</p>
      <div class="hero-ctas">
        <a class="btn btn--gold btn--lg" href="/index.html">${ICONS.leaf} Return Home</a>
        <a class="btn btn--ghost btn--lg" href="/services.html">View Our Services</a>
        <a class="btn btn--ghost btn--lg" href="/contact.html">${ICONS.email} Contact Us</a>
      </div>

      <form class="site-search" role="search" action="https://www.google.com/search" method="get" data-site-search aria-label="Search the website">
        <input type="hidden" name="as_sitesearch" value="namlandscaping.ae">
        <label class="visually-hidden" for="site-q">Search for landscaping services</label>
        <span class="site-search__icon" aria-hidden="true">${ICONS.search}</span>
        <input type="search" id="site-q" name="q" placeholder="Search for landscaping services..." autocomplete="off" enterkeyhint="search" aria-describedby="site-q-results">
        <button class="btn btn--gold" type="submit">Search</button>
      </form>
      <ul id="site-q-results" class="search-results" aria-live="polite" aria-label="Search results"></ul>
    </div>
    ${heroCurve()}
  </section>

  <section class="section" aria-labelledby="popular-title">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Popular Services</p>
        <h2 id="popular-title">Or Jump Straight to What You Need</h2>
        <p class="lede">Six of the services Dubai homeowners ask us for most. Pick one, or use the search above.</p>
      </div>
      <div class="grid grid-3">
        <article class="card"><div class="card-icon">${ICONS.leaf}</div><h3>Landscaping</h3><p>Full villa garden design, build and planting shaped around how you live outdoors.</p><a class="card-link" href="/services/landscaping-dubai.html">Landscaping in Dubai</a></article>
        <article class="card"><div class="card-icon">${ICONS.sprout}</div><h3>Garden Maintenance</h3><p>Scheduled visits that keep lawns green and plants healthy through Dubai's heat.</p><a class="card-link" href="/services/garden-maintenance-dubai.html">Garden Maintenance</a></article>
        <article class="card"><div class="card-icon card-icon--pool">${ICONS.dropCheck}</div><h3>Pool Maintenance</h3><p>Weekly water testing, chemical balancing and equipment checks all year.</p><a class="card-link" href="/services/swimming-pool-maintenance-dubai.html">Pool Maintenance</a></article>
        <article class="card"><div class="card-icon">${ICONS.sprinkler}</div><h3>Irrigation Systems</h3><p>Smart drip and sprinkler systems installed and repaired to cut water waste.</p><a class="card-link" href="/services/irrigation-installation-repair-dubai.html">Irrigation Systems</a></article>
        <article class="card"><div class="card-icon">${ICONS.turf}</div><h3>Artificial Grass</h3><p>Premium, pet-friendly artificial grass that stays green every month of the year.</p><a class="card-link" href="/services/artificial-grass-installation-dubai.html">Artificial Grass</a></article>
        <article class="card"><div class="card-icon card-icon--gold">${ICONS.pathLight}</div><h3>Landscape Lighting</h3><p>Warm, layered garden and path lighting that makes evenings outdoors special.</p><a class="card-link" href="/services/landscape-lighting-dubai.html">Landscape Lighting</a></article>
      </div>
      <p class="center mt-2"><a class="btn btn--green" href="/services.html">View All Services</a></p>
    </div>
  </section>
</main>

<script>
(function () {
  var PAGES = [
    { t: "Landscaping Services", u: "/services/landscaping-dubai", k: "garden design build planting villa" },
    { t: "Garden Maintenance", u: "/services/garden-maintenance-dubai", k: "lawn mowing pruning upkeep plant care" },
    { t: "Swimming Pool Maintenance", u: "/services/swimming-pool-maintenance-dubai", k: "pool water chemical balance weekly clean" },
    { t: "Swimming Pool Cleaning", u: "/services/swimming-pool-cleaning-dubai", k: "pool vacuum brush skim filter algae" },
    { t: "Swimming Pool Repair", u: "/services/swimming-pool-repair-dubai", k: "pool pump filter heater leak tiling fix" },
    { t: "Swimming Pool Construction", u: "/services/swimming-pool-construction-dubai", k: "new pool build design" },
    { t: "Irrigation Installation & Repair", u: "/services/irrigation-installation-repair-dubai", k: "drip sprinkler watering system water" },
    { t: "Artificial Grass Installation", u: "/services/artificial-grass-installation-dubai", k: "fake synthetic turf lawn" },
    { t: "Pergolas & Shade Structures", u: "/services/pergola-shade-structures-dubai", k: "pergola canopy shade sail gazebo terrace" },
    { t: "Landscape Lighting", u: "/services/landscape-lighting-dubai", k: "garden lights led outdoor uplight path" },
    { t: "Water Features", u: "/services/water-features-dubai", k: "fountain pond cascade water" },
    { t: "Hardscaping & Outdoor Upgrades", u: "/services/hardscaping-outdoor-upgrades-dubai", k: "paving decking patio walls outdoor" },
    { t: "All Services", u: "/services", k: "services list everything" },
    { t: "Projects", u: "/projects", k: "work portfolio gallery recent" },
    { t: "Areas We Serve", u: "/areas-we-serve", k: "dubai communities locations coverage" },
    { t: "Annual Maintenance Contracts", u: "/annual-maintenance-contracts", k: "amc contract plan package" },
    { t: "About Us", u: "/about", k: "company who we are team" },
    { t: "Contact", u: "/contact", k: "quote phone whatsapp email site visit booking" },
    { t: "FAQ", u: "/faq", k: "questions answers help cost price" }
  ];
  var form = document.querySelector("[data-site-search]");
  if (!form) return;
  var input = document.getElementById("site-q");
  var out = document.getElementById("site-q-results");
  function match(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    return PAGES.filter(function (p) { return (p.t + " " + p.k).toLowerCase().indexOf(q) > -1; });
  }
  function render(q) {
    out.innerHTML = "";
    var hits = match(q).slice(0, 6);
    if (!q.trim()) return;
    if (!hits.length) {
      out.innerHTML = '<li class="search-empty">No matches yet. Try “pool”, “garden”, “irrigation” or “grass”, or press Search.</li>';
      return;
    }
    hits.forEach(function (p) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = p.u; a.textContent = p.t;
      li.appendChild(a); out.appendChild(li);
    });
  }
  input.addEventListener("input", function () { render(input.value); });
  form.addEventListener("submit", function (e) {
    var v = input.value.trim();
    if (!v) { e.preventDefault(); input.focus(); return; }
    var hits = match(v);
    if (hits.length) { e.preventDefault(); if (hits.length === 1) { window.location.href = hits[0].u; } else { render(v); } }
    // no on-site match -> let the form fall through to a domain-scoped Google search
  });
})();
</script>
`,
};

module.exports = [home, servicesHub, about, projects, areas, contact, faqPage, amc, notFound];
