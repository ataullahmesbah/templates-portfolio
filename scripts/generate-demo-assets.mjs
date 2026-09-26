// Generates purpose-made demo visuals (SVG) into public/demo.
// Run: node scripts/generate-demo-assets.mjs
// These are placeholders the client replaces from the admin dashboard.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "public", "demo");
mkdirSync(out, { recursive: true });
const save = (name, svg) => writeFileSync(join(out, name), svg.trim() + "\n");

/* ---------- Project covers: dark stage with device mockups ---------- */
const projects = [
  { file: "project-nova-labs.svg", a: "#ff014f", b: "#7b2ff7", ui: "#ff4d7e", layout: "two" },
  { file: "project-aether-skin.svg", a: "#f7b733", b: "#fc4a1a", ui: "#ffc56b", layout: "two" },
  { file: "project-kinetic-house.svg", a: "#ff014f", b: "#ff6a3d", ui: "#ff5a82", layout: "three" },
  { file: "project-nord-form.svg", a: "#2af598", b: "#009efd", ui: "#5ee7c5", layout: "three" },
  { file: "project-morrow-studio.svg", a: "#4f46e5", b: "#06b6d4", ui: "#7dd3fc", layout: "two" },
  { file: "project-pulse-fitness.svg", a: "#ff014f", b: "#111111", ui: "#ff3366", layout: "three" },
];

function phone(x, y, w, h, ui, rot = 0, seed = 0) {
  const r = 26;
  const rows = [];
  for (let i = 0; i < 5; i++) {
    const ry = i === 0 ? y + 66 : y + 150 + (i - 1) * ((h - 220) / 4);
    const rw = w - 48 - ((i + seed) % 3) * 30;
    rows.push(
      `<rect x="${x + 24}" y="${ry}" width="${rw}" height="${i === 0 ? 70 : 34}" rx="10" fill="${i === 0 ? ui : "#ffffff"}" opacity="${i === 0 ? 0.9 : 0.08}"/>`
    );
  }
  return `
  <g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
    <rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="${r + 6}" fill="#0b0c0e"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#1a1c20"/>
    <rect x="${x + w / 2 - 34}" y="${y + 12}" width="68" height="16" rx="8" fill="#0b0c0e"/>
    <rect x="${x + 24}" y="${y + 40}" width="${w * 0.35}" height="10" rx="5" fill="#ffffff" opacity="0.5"/>
    ${rows.join("\n    ")}
    <circle cx="${x + w / 2}" cy="${y + h - 34}" r="16" fill="${ui}" opacity="0.85"/>
  </g>`;
}

for (const p of projects) {
  const phones =
    p.layout === "two"
      ? phone(250, 90, 250, 480, p.ui, -8, 0) + phone(560, 110, 250, 480, p.ui, 6, 1)
      : phone(150, 130, 230, 440, p.ui, -4, 0) + phone(415, 90, 230, 460, p.ui, 0, 1) + phone(680, 130, 230, 440, p.ui, 4, 2);
  save(
    p.file,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1060 680" width="1060" height="680">
  <defs>
    <radialGradient id="g1" cx="0.85" cy="0.1" r="0.7"><stop offset="0" stop-color="${p.a}" stop-opacity="0.55"/><stop offset="1" stop-color="${p.a}" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0.1" cy="0.95" r="0.6"><stop offset="0" stop-color="${p.b}" stop-opacity="0.45"/><stop offset="1" stop-color="${p.b}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1060" height="680" fill="#121316"/>
  <rect width="1060" height="680" fill="url(#g1)"/>
  <rect width="1060" height="680" fill="url(#g2)"/>
  ${phones}
</svg>`
  );
}

/* ---------- Blog covers: abstract editorial compositions ---------- */
const blogs = [
  { file: "blog-motion-principles.svg", a: "#ff014f", b: "#ffb199" },
  { file: "blog-brand-systems.svg", a: "#06b6d4", b: "#a78bfa" },
  { file: "blog-ai-visuals.svg", a: "#f59e0b", b: "#ef4444" },
];
for (const b of blogs) {
  save(
    b.file,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16181c"/><stop offset="1" stop-color="#26292e"/></linearGradient>
    <linearGradient id="o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${b.a}"/><stop offset="1" stop-color="${b.b}"/></linearGradient>
  </defs>
  <rect width="1200" height="700" fill="url(#bg)"/>
  <circle cx="860" cy="330" r="230" fill="url(#o)" opacity="0.9"/>
  <circle cx="860" cy="330" r="300" fill="none" stroke="${b.a}" stroke-opacity="0.25" stroke-width="2"/>
  <circle cx="860" cy="330" r="370" fill="none" stroke="${b.a}" stroke-opacity="0.12" stroke-width="2"/>
  <rect x="110" y="200" width="380" height="26" rx="13" fill="#ffffff" opacity="0.85"/>
  <rect x="110" y="250" width="300" height="26" rx="13" fill="#ffffff" opacity="0.55"/>
  <rect x="110" y="330" width="420" height="12" rx="6" fill="#ffffff" opacity="0.18"/>
  <rect x="110" y="360" width="390" height="12" rx="6" fill="#ffffff" opacity="0.18"/>
  <rect x="110" y="390" width="340" height="12" rx="6" fill="#ffffff" opacity="0.18"/>
  <rect x="110" y="460" width="150" height="48" rx="24" fill="${b.a}"/>
</svg>`
  );
}

/* ---------- Portrait: flat illustrated placeholder ---------- */
save(
  "portrait.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 760" width="600" height="760">
  <defs>
    <linearGradient id="suit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3350"/><stop offset="1" stop-color="#171c2e"/></linearGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1c7a6"/><stop offset="1" stop-color="#dca583"/></linearGradient>
    <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a3a24"/><stop offset="1" stop-color="#2e1d12"/></linearGradient>
  </defs>
  <path d="M60 760 C70 600 140 540 230 515 L370 515 C460 540 530 600 540 760 Z" fill="url(#suit)"/>
  <path d="M245 515 L300 640 L355 515 Z" fill="#f4f4f2"/>
  <path d="M230 515 L300 650 L262 760 L200 760 L190 560 Z" fill="#232a44"/>
  <path d="M370 515 L300 650 L338 760 L400 760 L410 560 Z" fill="#232a44"/>
  <rect x="262" y="420" width="76" height="110" rx="30" fill="url(#skin)"/>
  <path d="M262 470 Q300 500 338 470 L338 500 Q300 525 262 500 Z" fill="#c98f6c" opacity="0.6"/>
  <ellipse cx="300" cy="320" rx="112" ry="135" fill="url(#skin)"/>
  <ellipse cx="190" cy="330" rx="18" ry="30" fill="#e2ad8b"/>
  <ellipse cx="410" cy="330" rx="18" ry="30" fill="#e2ad8b"/>
  <path d="M186 310 C170 175 245 140 305 142 C385 140 440 195 414 310 C408 262 388 232 345 226 C305 244 240 240 214 230 C198 252 192 280 186 310 Z" fill="url(#hair)"/>
  <g fill="none" stroke="#1b1b1f" stroke-width="7">
    <rect x="218" y="300" width="72" height="54" rx="16"/>
    <rect x="310" y="300" width="72" height="54" rx="16"/>
    <path d="M290 322 Q300 314 310 322"/>
  </g>
  <circle cx="254" cy="328" r="7" fill="#2b2b30"/>
  <circle cx="346" cy="328" r="7" fill="#2b2b30"/>
  <path d="M300 340 Q292 372 302 380" fill="none" stroke="#c98f6c" stroke-width="5" stroke-linecap="round"/>
  <path d="M262 410 Q300 440 338 410" fill="none" stroke="#9c4f3e" stroke-width="7" stroke-linecap="round"/>
</svg>`
);

/* ---------- Avatars for testimonials ---------- */
const avatars = [
  { file: "avatar-1.svg", bg: "#ff014f", initials: "SM" },
  { file: "avatar-2.svg", bg: "#4f46e5", initials: "DK" },
  { file: "avatar-3.svg", bg: "#0ea5e9", initials: "LR" },
];
for (const a of avatars) {
  save(
    a.file,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="24" fill="${a.bg}"/>
  <circle cx="100" cy="82" r="38" fill="#ffffff" opacity="0.9"/>
  <path d="M34 190 C40 140 70 124 100 124 C130 124 160 140 166 190 Z" fill="#ffffff" opacity="0.9"/>
  <text x="100" y="92" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="${a.bg}">${a.initials}</text>
</svg>`
  );
}

/* ---------- Client logos (fictional wordmarks) ---------- */
const logos = [
  ["logo-nova.svg", "NOVA", "circle"],
  ["logo-aether.svg", "AETHER", "triangle"],
  ["logo-kinetic.svg", "KINETIC", "square"],
  ["logo-nord.svg", "NORD", "diamond"],
  ["logo-morrow.svg", "MORROW", "ring"],
  ["logo-pulse.svg", "PULSE", "bolt"],
  ["logo-lumen.svg", "LUMEN", "circle"],
  ["logo-orbit.svg", "ORBIT", "ring"],
];
const marks = {
  circle: `<circle cx="40" cy="40" r="22" fill="currentColor"/>`,
  triangle: `<path d="M40 16 L64 62 L16 62 Z" fill="currentColor"/>`,
  square: `<rect x="18" y="18" width="44" height="44" rx="10" fill="currentColor"/>`,
  diamond: `<path d="M40 14 L66 40 L40 66 L14 40 Z" fill="currentColor"/>`,
  ring: `<circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="9"/>`,
  bolt: `<path d="M46 12 L20 46 L38 46 L32 68 L60 32 L42 32 Z" fill="currentColor"/>`,
};
for (const [file, name, mark] of logos) {
  save(
    file,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80" color="#8a8f98">
  ${marks[mark]}
  <text x="80" y="52" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="4" fill="currentColor">${name}</text>
</svg>`
  );
}

/* ---------- Award visuals (trophy / medal badges) ---------- */
const awards = [
  { file: "award-1.svg", a: "#ff014f", b: "#ff8a00", label: "EXCELLENCE", shape: "trophy" },
  { file: "award-2.svg", a: "#06b6d4", b: "#6366f1", label: "BEST UI", shape: "medal" },
  { file: "award-3.svg", a: "#f59e0b", b: "#ef4444", label: "MOTION", shape: "trophy" },
  { file: "award-4.svg", a: "#10b981", b: "#0ea5e9", label: "BRANDING", shape: "medal" },
];
for (const w of awards) {
  const trophy = `
    <path d="M430 170 H630 V260 C630 330 585 380 530 380 C475 380 430 330 430 260 Z" fill="url(#m)"/>
    <path d="M430 195 H380 C380 260 405 295 440 300" fill="none" stroke="url(#m)" stroke-width="18" stroke-linecap="round"/>
    <path d="M630 195 H680 C680 260 655 295 620 300" fill="none" stroke="url(#m)" stroke-width="18" stroke-linecap="round"/>
    <rect x="505" y="380" width="50" height="60" fill="url(#m)"/>
    <rect x="455" y="440" width="150" height="34" rx="8" fill="url(#m)"/>
    <path d="M530 215 L542 240 L570 244 L550 263 L555 290 L530 277 L505 290 L510 263 L490 244 L518 240 Z" fill="#fff" opacity="0.9"/>`;
  const medal = `
    <path d="M470 120 L530 250 L590 120 L640 120 L560 280 L500 280 L420 120 Z" fill="url(#m)" opacity="0.55"/>
    <circle cx="530" cy="330" r="115" fill="url(#m)"/>
    <circle cx="530" cy="330" r="88" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="6"/>
    <path d="M530 272 L547 307 L585 312 L557 338 L564 376 L530 358 L496 376 L503 338 L475 312 L513 307 Z" fill="#fff" opacity="0.92"/>`;
  save(
    w.file,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1060 620" width="1060" height="620">
  <defs>
    <radialGradient id="glow" cx="0.5" cy="0.45" r="0.6"><stop offset="0" stop-color="${w.a}" stop-opacity="0.45"/><stop offset="1" stop-color="${w.a}" stop-opacity="0"/></radialGradient>
    <linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${w.a}"/><stop offset="1" stop-color="${w.b}"/></linearGradient>
  </defs>
  <rect width="1060" height="620" fill="#15171a"/>
  <rect width="1060" height="620" fill="url(#glow)"/>
  <circle cx="530" cy="310" r="250" fill="none" stroke="${w.a}" stroke-opacity="0.18" stroke-width="2"/>
  <circle cx="530" cy="310" r="290" fill="none" stroke="${w.a}" stroke-opacity="0.08" stroke-width="2"/>
  ${w.shape === "trophy" ? trophy : medal}
  <text x="530" y="545" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="10" fill="#ffffff" opacity="0.85">${w.label}</text>
</svg>`
  );
}

/* ---------- Open Graph default image ---------- */
save(
  "og-default.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#212428"/>
  <circle cx="1000" cy="120" r="260" fill="#ff014f" opacity="0.25"/>
  <text x="90" y="300" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="#ffffff">Adrian Vale</text>
  <text x="90" y="380" font-family="Arial, sans-serif" font-size="36" fill="#c4cfde">Creative Designer &amp; Digital Maker</text>
</svg>`
);

console.log("Demo assets generated in public/demo");
