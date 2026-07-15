/* Real-photo pipeline config — single source of truth for image slots.
   Originals live in assets/photos/originals/ (named per `file`). Run:
     npm run photos      (node scripts/process-photos.js)
   That writes responsive WebP into assets/photos/ + manifest.json; the build
   (build/templates.js IMG()) then serves the local photos from our own domain.

   alt text describes what is actually shown in each selected photo (these are the
   company's own project photos). No external image hosts are used. */
module.exports = {
  srcDir: "assets/photos/originals",
  outDir: "assets/photos",
  quality: 72,
  slots: {
    homeHero:        { file: "home-hero.jpg",          base: "villa-garden-pool-landscaping-dubai", widths: [1600, 1024, 720], og: true, alt: "Designed villa garden with a lawn, paved pathway and planting" },
    landscaping:     { file: "landscaping.jpg",        base: "villa-garden-landscaping-design",      widths: [1600, 1024, 768, 480], alt: "Designed villa garden with raised stone planters, a lawn and stepping stones" },
    gardenCare:      { file: "garden-maintenance.jpg", base: "garden-maintenance-lawn-care",          widths: [1280, 1024, 768, 480], alt: "Well-maintained villa garden with a tidy lawn, hedges and seating" },
    poolMaintenance: { file: "pool-maintenance.jpg",   base: "swimming-pool-maintenance",             widths: [1024, 768, 480], alt: "Clean villa swimming pool with sun loungers and a dining area" },
    poolCleaning:    { file: "pool-cleaning.jpg",      base: "swimming-pool-cleaning",                widths: [1600, 1024, 768, 480], alt: "Sparkling clean swimming pool with crystal-clear water" },
    poolRepair:      { file: "pool-repair.jpg",        base: "swimming-pool-repair",                  widths: [1600, 1024, 768, 480], alt: "Swimming pool and deck serviced and maintained at a villa" },
    poolBuild:       { file: "pool-construction.jpg",  base: "swimming-pool-construction",            widths: [1600, 1024, 768, 480], alt: "Swimming pool under construction at a villa" },
    irrigation:      { file: "irrigation.jpg",         base: "garden-irrigation-sprinkler",           widths: [1600, 1024, 768, 480], alt: "Garden sprinkler watering a green lawn" },
    grass:           { file: "artificial-grass.jpg",   base: "artificial-grass-installation",         widths: [800, 600, 480], alt: "Rolls of artificial grass being installed over a prepared base" },
    lighting:        { file: "landscape-lighting.jpg", base: "garden-landscape-lighting",             widths: [800, 600, 480], alt: "Garden patio at night with landscape lighting and a fire feature" },
    waterFeature:    { file: "water-feature.jpg",      base: "garden-fountain-water-feature",         widths: [1600, 1024, 768, 480], alt: "Circular garden fountain water feature at a large property" },
    hardscape:       { file: "hardscaping.jpg",        base: "outdoor-hardscaping-paving",            widths: [1600, 1024, 768, 480], alt: "Modern hardscaping with pavers, gravel and grass strips at a villa" },
    skyline:         { file: "dubai-community.jpg",    base: "estate-landscaping-courtyard",          widths: [1600, 1024, 768, 480], alt: "Landscaped estate courtyard with lawns, palms and paved walkways" },
    facadeDusk:      { file: "villa-evening.jpg",      base: "villa-garden-evening",                  widths: [1600, 1024, 768, 480], alt: "Landscaped villa garden with warm lighting in the evening" },
    pergola:         { file: "pergola.jpg",            base: "pergola-shade-structure",               widths: [1244, 1024, 768, 480], alt: "Timber pergola with shaded seating and a fire feature in a villa backyard" },
  },
};
