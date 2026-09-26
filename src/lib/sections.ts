/**
 * Home page sections: which ones are shown and in what order.
 * Stored in site_settings.sections and edited in Admin → Settings.
 * The hero is always first and cannot be hidden.
 */
export type SectionKey =
  | "services"
  | "portfolio"
  | "resume"
  | "testimonials"
  | "clients"
  | "awards"
  | "pricing"
  | "blog"
  | "cta"
  | "contact";

export type SectionSetting = { key: SectionKey; visible: boolean };

type SectionDef = { key: SectionKey; label: string; nav: string | null; description: string };

export const SECTION_DEFS: SectionDef[] = [
  { key: "services", label: "Services (What I Do)", nav: "Services", description: "Service cards" },
  { key: "portfolio", label: "Portfolio", nav: "Portfolio", description: "Projects grid, /work pages" },
  { key: "resume", label: "Resume", nav: "Resume", description: "Education, skills, experience" },
  { key: "testimonials", label: "Testimonials", nav: null, description: "Client quotes slider" },
  { key: "clients", label: "Clients", nav: "Clients", description: "Client logos" },
  { key: "awards", label: "Awards", nav: "Awards", description: "Award slider (hidden when empty)" },
  { key: "pricing", label: "Pricing", nav: "Pricing", description: "Pricing plans" },
  { key: "blog", label: "Blog", nav: "Blog", description: "Latest posts, /blog pages" },
  { key: "cta", label: "Call to action", nav: null, description: "“Let's build something” banner" },
  { key: "contact", label: "Contact", nav: "Contact", description: "Contact card and form" },
];

export const SECTION_KEYS = SECTION_DEFS.map((d) => d.key);

export const defaultSections: SectionSetting[] = SECTION_DEFS.map((d) => ({ key: d.key, visible: true }));

/** Merges saved settings with the known sections: keeps saved order, drops unknown keys, appends new ones. */
export function normalizeSections(saved: unknown): SectionSetting[] {
  // Older saves may have stored the list as a JSON string — accept both.
  if (typeof saved === "string") {
    try {
      saved = JSON.parse(saved);
    } catch {
      saved = [];
    }
  }
  const list = Array.isArray(saved) ? saved : [];
  const seen = new Set<string>();
  const result: SectionSetting[] = [];
  for (const item of list) {
    const key = (item as SectionSetting)?.key;
    if (!SECTION_KEYS.includes(key) || seen.has(key)) continue;
    seen.add(key);
    result.push({ key, visible: (item as SectionSetting).visible !== false });
  }
  for (const d of SECTION_DEFS) if (!seen.has(d.key)) result.push({ key: d.key, visible: true });
  return result;
}

export function isSectionVisible(saved: unknown, key: SectionKey) {
  return normalizeSections(saved).find((s) => s.key === key)?.visible ?? true;
}

export type NavItem = { label: string; href: string };

/** Navbar / footer links, following the saved order and visibility. */
export function navItems(saved: unknown): NavItem[] {
  const items: NavItem[] = [{ label: "Home", href: "/#home" }];
  for (const s of normalizeSections(saved)) {
    const def = SECTION_DEFS.find((d) => d.key === s.key);
    if (s.visible && def?.nav) items.push({ label: def.nav, href: `/#${s.key}` });
  }
  return items;
}

export function sectionLabel(key: SectionKey) {
  return SECTION_DEFS.find((d) => d.key === key)?.label ?? key;
}

export function sectionDescription(key: SectionKey) {
  return SECTION_DEFS.find((d) => d.key === key)?.description ?? "";
}
