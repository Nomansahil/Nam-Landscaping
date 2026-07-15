/* Generates maskable PWA app icons + apple-touch-icon from the NAM brand mark.
   Brand green background + gold leaf, centered well inside the maskable safe zone.
   Run: node scripts/make-icons.js   (sharp is a build-time devDependency)        */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const out = path.join(__dirname, "..", "assets");

// Gold leaf paths (from BRAND_MARK), recoloured for the icon, on a green field.
const leaf = `
  <g transform="translate(112 94) scale(1.7)" fill="#d8b765">
    <path d="M22 142c-4 18 28 34 66 32 36-2 64-18 60-34-3-11-20-16-40-14 16 3 25 9 23 15-3 10-24 16-44 16-30 0-58-8-65-15z"/>
    <path d="M44 168c14 9 42 12 64 6-20 11-54 9-64-6z" opacity="0.85"/>
    <path d="M92 150C86 118 90 84 112 50" stroke="#d8b765" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M114 48C97 45 86 34 83 17c17 3 28 14 31 31z"/>
    <path d="M104 62C87 65 73 60 64 46c17-3 31 2 40 16z"/>
    <path d="M112 66c17-6 33-3 44 8-17 6-33 3-44-8z"/>
    <path d="M96 92C79 95 65 90 56 76c17-3 31 2 40 16z"/>
    <path d="M100 98c17-6 33-3 44 8-17 6-33 3-44-8z"/>
  </g>`;

const svg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#143527"/>
  <circle cx="256" cy="256" r="232" fill="none" stroke="#d8b765" stroke-width="6" opacity="0.28"/>
  ${leaf}
</svg>`;

async function gen(size, name) {
  await sharp(Buffer.from(svg(size))).resize(size, size).png().toFile(path.join(out, name));
  console.log("wrote assets/" + name + " (" + size + "x" + size + ")");
}

(async () => {
  await gen(192, "icon-192.png");
  await gen(512, "icon-512.png");
  await gen(180, "apple-touch-icon.png");
  await gen(512, "maskable-512.png");
})().catch((e) => { console.error(e); process.exit(1); });
