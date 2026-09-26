import type { SectionSetting } from "@/lib/sections";

export type SocialLink = { platform: string; url: string };
export type SkillTool = { name: string; icon: string };

export type Profile = {
  id?: string;
  full_name: string;
  professional_title: string;
  typed_roles: string[];
  short_intro: string;
  bio: string;
  email: string;
  phone: string | null;
  location: string;
  profile_image_url: string;
  hero_image_url: string | null;
  resume_url: string | null;
  availability_status: string;
  social_links: SocialLink[];
  skill_tools: SkillTool[];
};

export type Service = {
  id: string;
  title: string;
  short_description: string;
  icon_key: string | null;
  active: boolean;
  sort_order: number;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: number;
  client: string | null;
  role: string | null;
  intro: string;
  challenge: string | null;
  solution: string | null;
  result: string | null;
  cover_image_url: string;
  gallery: string[];
  live_url: string | null;
  likes: number;
  featured: boolean;
  status: "published" | "draft";
  sort_order: number;
  updated_at?: string;
};

export type ResumeItem = {
  id: string;
  type: "education" | "experience";
  title: string;
  subtitle: string;
  period: string;
  badge: string | null;
  description: string;
  active: boolean;
  sort_order: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  active: boolean;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  project_title: string | null;
  quote: string;
  avatar_url: string | null;
  rating: number;
  active: boolean;
  sort_order: number;
};

export type Client = {
  id: string;
  name: string;
  category: string;
  logo_url: string | null;
  website_url: string | null;
  active: boolean;
  sort_order: number;
};

export type PricingPlan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta_label: string;
  highlighted: boolean;
  active: boolean;
  sort_order: number;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: string;
  read_time: string;
  published_at: string;
  status: "published" | "draft";
  updated_at?: string;
};

export type SiteSettings = {
  id?: string;
  website_name: string;
  logo_url: string | null;
  accent_color: string;
  default_theme: "dark" | "light" | "system";
  contact_email: string;
  public_phone: string | null;
  seo_title: string;
  seo_description: string;
  footer_text: string;
  hire_label: string;
  /** Home page section order + visibility (see src/lib/sections.ts) */
  sections: SectionSetting[];
};

export type Award = {
  id: string;
  title: string;
  organization: string | null;
  year: string | null;
  short_description: string;
  image_url: string;
  link_url: string | null;
  active: boolean;
  sort_order: number;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
