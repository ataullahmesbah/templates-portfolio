export const siteConfig = {
  /** Developer credit shown at the end of the footer (not editable from the dashboard). */
  developer: { name: "Ataullah Mesbah", url: "https://www.ataullahmesbah.com" },
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",
  // Navbar links come from Admin → Settings → Page sections (src/lib/sections.ts).
  /** Accent presets offered in Admin → Settings (any custom hex is also allowed). */
  accentPresets: [
    { name: "InBio Pink", value: "#ff014f" },
    { name: "Crimson", value: "#e11d48" },
    { name: "Sunset", value: "#f97316" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Emerald", value: "#10b981" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Royal Blue", value: "#3b82f6" },
    { name: "Violet", value: "#8b5cf6" },
  ],
} as const;
