/**
 * DEMO CONTENT
 * Used when Supabase is not configured, and mirrored by supabase/seed.sql.
 * Everything here is placeholder content meant to be replaced by the client
 * from the admin dashboard.
 */
import type {
  Award,
  BlogPost,
  Client,
  PricingPlan,
  Profile,
  Project,
  ResumeItem,
  Service,
  SiteSettings,
  Skill,
  Testimonial,
} from "@/types/content";

export const demoSettings: SiteSettings = {
  website_name: "Adrian Vale",
  logo_url: null,
  accent_color: "#ff014f",
  default_theme: "dark",
  contact_email: "hello@adrianvale.demo",
  public_phone: "+44 20 7946 0000",
  seo_title: "Adrian Vale — Creative Designer & Digital Maker",
  seo_description:
    "Portfolio of Adrian Vale, a creative designer crafting visual identities, interfaces and digital experiences for ambitious brands.",
  footer_text: "",
  hire_label: "Hire Me",
  // Empty = every section visible in the default order (see src/lib/sections.ts).
  sections: [],
};

export const demoProfile: Profile = {
  full_name: "Adrian Vale",
  professional_title: "Creative Designer & Digital Maker",
  typed_roles: ["Designer.", "Developer.", "Creative Director.", "Digital Maker."],
  short_intro:
    "I create visual identities, interfaces and digital experiences for ambitious brands and modern products. Motion is my third dimension — I use it to make every interaction feel clear and memorable.",
  bio: "I'm a London-based designer with 7+ years of experience helping start-ups and established brands shape how they look, feel and move online. I'm available for freelance work — connect with me via email or phone.",
  email: "hello@adrianvale.demo",
  phone: "+44 20 7946 0000",
  location: "London / Worldwide",
  profile_image_url: "/demo/portrait.svg",
  hero_image_url: "/demo/portrait.svg",
  resume_url: null,
  availability_status: "Available for selected projects",
  social_links: [
    { platform: "facebook", url: "https://facebook.com/" },
    { platform: "instagram", url: "https://instagram.com/" },
    { platform: "linkedin", url: "https://linkedin.com/" },
  ],
  skill_tools: [
    { name: "Figma", icon: "figma" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
  ],
};

export const demoServices: Service[] = [
  { id: "s1", title: "Creative Direction", short_description: "I lead the visual story from first idea to launch, keeping every touchpoint consistent and intentional.", icon_key: "compass", active: true, sort_order: 1 },
  { id: "s2", title: "Web Design", short_description: "Fast, responsive websites with thoughtful layouts, clear hierarchy and motion that guides the eye.", icon_key: "monitor", active: true, sort_order: 2 },
  { id: "s3", title: "Brand Identity", short_description: "Logos, type systems and colour palettes that give your brand a recognisable, confident voice.", icon_key: "pen", active: true, sort_order: 3 },
  { id: "s4", title: "Motion Design", short_description: "Micro-interactions and animated storytelling that make products feel alive — never distracting.", icon_key: "sparkles", active: true, sort_order: 4 },
  { id: "s5", title: "App Development", short_description: "Modern web apps built with React and Next.js, engineered for performance and easy ownership.", icon_key: "code", active: true, sort_order: 5 },
  { id: "s6", title: "AI Product Visuals", short_description: "Art-directed AI imagery and product visuals, refined by hand to match your brand standards.", icon_key: "wand", active: true, sort_order: 6 },
];

const lorem = {
  challenge:
    "The team needed a fresh visual language that could scale across product, marketing and social — without losing the personality that made early customers fall in love with the brand.",
  solution:
    "We ran a two-week discovery sprint, defined a flexible design system, and prototyped key flows with motion from day one so every stakeholder could feel the experience before a line of production code was written.",
  result:
    "A cohesive identity and product experience that launched on time. Conversion on the new landing pages rose by 38% and the design system cut new-page production time in half.",
};

export const demoProjects: Project[] = [
  { id: "p1", title: "Nova Labs — Brand Experience", slug: "nova-labs", category: "Brand Experience", year: 2026, client: "Nova Labs", role: "Creative Direction, UI Design", intro: "A complete brand and product experience for a research lab building tools for the next generation of scientists.", ...lorem, cover_image_url: "/demo/project-nova-labs.svg", gallery: ["/demo/project-nova-labs.svg", "/demo/project-morrow-studio.svg"], live_url: "https://example.com", likes: 600, featured: true, status: "published", sort_order: 1 },
  { id: "p2", title: "Aether Skin — E-commerce Art Direction", slug: "aether-skin", category: "E-commerce", year: 2025, client: "Aether Skin", role: "Art Direction, Web Design", intro: "Art direction and a conversion-focused storefront for a clean-beauty skincare label.", ...lorem, cover_image_url: "/demo/project-aether-skin.svg", gallery: ["/demo/project-aether-skin.svg", "/demo/project-kinetic-house.svg"], live_url: "https://example.com", likes: 750, featured: true, status: "published", sort_order: 2 },
  { id: "p3", title: "Kinetic House — Digital Product", slug: "kinetic-house", category: "Application", year: 2025, client: "Kinetic House", role: "Product Design, Motion", intro: "A mobile-first booking product for a network of independent design studios.", ...lorem, cover_image_url: "/demo/project-kinetic-house.svg", gallery: ["/demo/project-kinetic-house.svg", "/demo/project-pulse-fitness.svg"], live_url: null, likes: 630, featured: true, status: "published", sort_order: 3 },
  { id: "p4", title: "Nord Form — Identity System", slug: "nord-form", category: "Branding", year: 2024, client: "Nord Form", role: "Brand Identity", intro: "A modular identity system for a Scandinavian furniture studio.", ...lorem, cover_image_url: "/demo/project-nord-form.svg", gallery: ["/demo/project-nord-form.svg", "/demo/project-nova-labs.svg"], live_url: null, likes: 360, featured: false, status: "published", sort_order: 4 },
  { id: "p5", title: "Morrow Studio — Campaign Visuals", slug: "morrow-studio", category: "Campaign", year: 2024, client: "Morrow Studio", role: "Creative Direction, AI Visuals", intro: "A launch campaign mixing art-directed AI imagery with bold editorial typography.", ...lorem, cover_image_url: "/demo/project-morrow-studio.svg", gallery: ["/demo/project-morrow-studio.svg", "/demo/project-aether-skin.svg"], live_url: "https://example.com", likes: 280, featured: false, status: "published", sort_order: 5 },
  { id: "p6", title: "Pulse Fitness — Mobile App", slug: "pulse-fitness", category: "Application", year: 2023, client: "Pulse", role: "UI/UX Design", intro: "A workout tracking app with playful motion and a focus on daily habits.", ...lorem, cover_image_url: "/demo/project-pulse-fitness.svg", gallery: ["/demo/project-pulse-fitness.svg", "/demo/project-kinetic-house.svg"], live_url: null, likes: 690, featured: false, status: "published", sort_order: 6 },
];

export const demoResume: ResumeItem[] = [
  { id: "r1", type: "education", title: "BSc in Graphic Design", subtitle: "University of the Arts London", period: "2014 – 2017", badge: "First Class", description: "Focused on typography, interaction design and visual communication. Graduated with a thesis on motion in interfaces.", active: true, sort_order: 1 },
  { id: "r2", type: "education", title: "Interaction Design Specialization", subtitle: "Online — UC San Diego", period: "2018", badge: "Certificate", description: "Human-centred design, prototyping and user research methods applied to digital products.", active: true, sort_order: 2 },
  { id: "r3", type: "education", title: "Advanced Motion Design", subtitle: "School of Motion", period: "2019", badge: "Certificate", description: "Principles of animation, easing and choreography for product and brand work.", active: true, sort_order: 3 },
  { id: "r4", type: "experience", title: "Senior Product Designer", subtitle: "Freelance — Worldwide", period: "2021 – Present", badge: "Remote", description: "Partnering with start-ups and agencies on brand, product and motion design from concept to launch.", active: true, sort_order: 1 },
  { id: "r5", type: "experience", title: "Product Designer", subtitle: "Kinetic Studio, London", period: "2018 – 2021", badge: "Full-time", description: "Designed web and mobile products for clients in fintech, retail and culture. Led the internal design system.", active: true, sort_order: 2 },
  { id: "r6", type: "experience", title: "Junior Designer", subtitle: "Nord Agency, London", period: "2017 – 2018", badge: "Full-time", description: "Brand identity, campaign graphics and website design for local and international brands.", active: true, sort_order: 3 },
];

export const demoSkills: Skill[] = [
  { id: "k1", name: "UI / UX Design", category: "Design Skill", level: 95, active: true, sort_order: 1 },
  { id: "k2", name: "Brand Identity", category: "Design Skill", level: 90, active: true, sort_order: 2 },
  { id: "k3", name: "Motion Design", category: "Design Skill", level: 85, active: true, sort_order: 3 },
  { id: "k4", name: "Figma", category: "Design Skill", level: 95, active: true, sort_order: 4 },
  { id: "k5", name: "React / Next.js", category: "Development Skill", level: 85, active: true, sort_order: 5 },
  { id: "k6", name: "TypeScript", category: "Development Skill", level: 80, active: true, sort_order: 6 },
  { id: "k7", name: "Tailwind CSS", category: "Development Skill", level: 90, active: true, sort_order: 7 },
  { id: "k8", name: "Framer Motion", category: "Development Skill", level: 85, active: true, sort_order: 8 },
];

export const demoTestimonials: Testimonial[] = [
  { id: "t1", name: "Sarah Mitchell", role: "Founder", company: "Nova Labs", project_title: "Brand Experience", quote: "Adrian understood our vision faster than any designer we've worked with. The new identity gave us the confidence to pitch to much bigger partners — and the motion work is simply beautiful.", avatar_url: "/demo/avatar-1.svg", rating: 5, active: true, sort_order: 1 },
  { id: "t2", name: "Daniel Kim", role: "Head of Product", company: "Kinetic House", project_title: "Digital Product", quote: "Clear process, great communication and a final product our users love. Bookings grew noticeably within weeks of launch. I'd happily work with Adrian again.", avatar_url: "/demo/avatar-2.svg", rating: 5, active: true, sort_order: 2 },
  { id: "t3", name: "Laura Reyes", role: "Marketing Director", company: "Aether Skin", project_title: "E-commerce Art Direction", quote: "From the first moodboard to the final storefront, every detail felt considered. Our campaign looked premium across every channel.", avatar_url: "/demo/avatar-3.svg", rating: 5, active: true, sort_order: 3 },
];

export const demoClients: Client[] = [
  { id: "c1", name: "Nova Labs", category: "Brand", logo_url: "/demo/logo-nova.svg", website_url: null, active: true, sort_order: 1 },
  { id: "c2", name: "Aether", category: "Brand", logo_url: "/demo/logo-aether.svg", website_url: null, active: true, sort_order: 2 },
  { id: "c3", name: "Kinetic", category: "Product", logo_url: "/demo/logo-kinetic.svg", website_url: null, active: true, sort_order: 3 },
  { id: "c4", name: "Nord", category: "Brand", logo_url: "/demo/logo-nord.svg", website_url: null, active: true, sort_order: 4 },
  { id: "c5", name: "Morrow", category: "Campaign", logo_url: "/demo/logo-morrow.svg", website_url: null, active: true, sort_order: 5 },
  { id: "c6", name: "Pulse", category: "Product", logo_url: "/demo/logo-pulse.svg", website_url: null, active: true, sort_order: 6 },
  { id: "c7", name: "Lumen", category: "Campaign", logo_url: "/demo/logo-lumen.svg", website_url: null, active: true, sort_order: 7 },
  { id: "c8", name: "Orbit", category: "Product", logo_url: "/demo/logo-orbit.svg", website_url: null, active: true, sort_order: 8 },
];

export const demoPricing: PricingPlan[] = [
  { id: "pr1", name: "Starter", tagline: "Landing Page", price: "$990", period: "per project", description: "A focused one-page website to launch an idea, product or personal brand quickly.", features: ["1 responsive page", "Light & dark mode", "Basic SEO setup", "Contact form", "7-day delivery"], cta_label: "Order Now", highlighted: false, active: true, sort_order: 1 },
  { id: "pr2", name: "Standard", tagline: "Brand + Website", price: "$2,400", period: "per project", description: "A complete identity and a multi-page website with motion and a simple content dashboard.", features: ["Logo & brand guide", "Up to 6 pages", "Motion & micro-interactions", "Admin dashboard", "SEO & analytics", "21-day delivery"], cta_label: "Order Now", highlighted: true, active: true, sort_order: 2 },
  { id: "pr3", name: "Premium", tagline: "Product Design", price: "$4,800", period: "per project", description: "End-to-end product design for web or mobile apps, including prototypes and a design system.", features: ["Research & strategy", "UX flows & wireframes", "High-fidelity UI", "Interactive prototype", "Design system", "Developer handoff"], cta_label: "Order Now", highlighted: false, active: true, sort_order: 3 },
];

export const demoPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Motion principles that make interfaces feel premium",
    slug: "motion-principles-premium-interfaces",
    excerpt: "Animation should explain, not decorate. Here are the five motion rules I use on every product.",
    content:
      "Good motion is invisible. It answers questions before the user asks them: where did that come from, where did it go, what can I do next?\n\n## 1. Motion supports hierarchy\nThe most important element should move first. Supporting content follows with a short stagger so the eye has a clear path.\n\n## 2. Prefer transform and opacity\nThey are cheap for the browser to animate and keep scrolling smooth at 60fps, even on mid-range phones.\n\n## 3. Respect reduced motion\nSome people get dizzy from large movements. When the operating system asks for reduced motion, remove non-essential animation entirely.\n\n## 4. Keep durations short\nMost UI transitions feel best between 200ms and 500ms. Anything longer should be a deliberate storytelling moment.\n\n## 5. Stop when the job is done\nNon-stop animation competes with content. Let things settle so people can read.",
    cover_image_url: "/demo/blog-motion-principles.svg",
    category: "Motion",
    read_time: "4 min read",
    published_at: "2026-05-02",
    status: "published",
  },
  {
    id: "b2",
    title: "Building a brand system that scales with your product",
    slug: "brand-system-that-scales",
    excerpt: "A logo is not a brand. How to design a flexible system that survives real-world use.",
    content:
      "Most brands break the first time they meet a real product. The logo looks great on a poster, but nobody decided how buttons, charts or empty states should feel.\n\n## Start with principles\nWrite three words that describe how the brand should feel. Every later decision gets tested against them.\n\n## Design tokens first\nColour, type, spacing and radius should be defined as tokens so design and code share one source of truth.\n\n## Test in context\nPut the system into real screens early: a pricing table, an error message, a dark mode dashboard. Those are the moments that reveal gaps.",
    cover_image_url: "/demo/blog-brand-systems.svg",
    category: "Branding",
    read_time: "5 min read",
    published_at: "2026-03-18",
    status: "published",
  },
  {
    id: "b3",
    title: "Using AI for product visuals without losing your style",
    slug: "ai-product-visuals-style",
    excerpt: "AI can speed up art direction — if you treat it like a junior assistant, not the designer.",
    content:
      "AI image tools are fast, but speed without direction produces generic results. The trick is to keep the creative decisions human.\n\n## Build a visual brief\nCollect references, lighting notes and colour palettes before you write a single prompt.\n\n## Iterate in small steps\nChange one variable at a time so you learn what actually improves the image.\n\n## Finish by hand\nRetouch, colour-grade and composite the final images so they match the rest of the brand perfectly.",
    cover_image_url: "/demo/blog-ai-visuals.svg",
    category: "AI",
    read_time: "3 min read",
    published_at: "2026-01-09",
    status: "published",
  },
];

export const demoAwards: Award[] = [
  { id: "a1", title: "Design Excellence Award", organization: "Global Web Awards", year: "2026", short_description: "Recognised for the Nova Labs brand experience — praised for its bold typography, cinematic motion and seamless responsive layout.", image_url: "/demo/award-1.svg", link_url: null, active: true, sort_order: 1 },
  { id: "a2", title: "Best UI Design", organization: "CSS Design Honors", year: "2025", short_description: "Awarded for the Kinetic House booking product, selected by a jury of designers for clarity, usability and visual polish.", image_url: "/demo/award-2.svg", link_url: null, active: true, sort_order: 2 },
  { id: "a3", title: "Motion Design of the Year", organization: "Digital Craft Awards", year: "2025", short_description: "Honoured for purposeful micro-interactions that guide users without distraction across web and mobile.", image_url: "/demo/award-3.svg", link_url: null, active: true, sort_order: 3 },
  { id: "a4", title: "Innovation in Branding", organization: "Brand Impact Forum", year: "2024", short_description: "Shortlisted and awarded for the Nord Form modular identity system, built to scale from packaging to product.", image_url: "/demo/award-4.svg", link_url: null, active: true, sort_order: 4 },
];
