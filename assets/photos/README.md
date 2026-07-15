# Project photos

The website uses the company's **own real project photos**, served as WebP from our own
domain (`/assets/photos/*.webp`). **No external image hosts are used anywhere.**

## How it works
- `originals/` holds the source JPGs (build-time only — not served; robots-disallowed).
- `build/photo-map.js` maps each image slot → source filename, output name, responsive
  widths, and alt text.
- `npm run photos` (sharp) converts every original to responsive WebP here + writes
  `manifest.json`, which the build reads to serve the local photos.

## To change or add a photo
1. Drop/replace the JPG in `originals/` using the slot filename (see `build/photo-map.js`,
   e.g. `home-hero.jpg`, `swimming-pool-construction.jpg`).
2. Run:
   ```
   npm run photos     # JPG -> responsive WebP + manifest.json (EXIF stripped)
   npm run build      # regenerate pages
   ```
3. Update the matching `alt` line in `build/photo-map.js` to describe the new photo.

Outputs use descriptive lowercase-hyphen names (e.g. `garden-maintenance-lawn-care-768.webp`).
Heroes get 1600/1024/720; cards 1600/1024/768/480 (or the source's native width, never upscaled).
