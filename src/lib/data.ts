import "server-only";
import { cache } from "react";
import { getPublicClient } from "@/lib/supabase/public";
import {
  demoAwards,
  demoClients,
  demoPosts,
  demoPricing,
  demoProfile,
  demoProjects,
  demoResume,
  demoServices,
  demoSettings,
  demoSkills,
  demoTestimonials,
} from "@/data/demo";
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

/**
 * Public read layer. When Supabase is not configured every getter returns the
 * built-in demo content, so the site never renders empty.
 */

async function list<T>(table: string, fallback: T[], filter: (q: any) => any, order = "sort_order"): Promise<T[]> {
  const db = getPublicClient();
  if (!db) return fallback;
  const { data, error } = await filter(db.from(table).select("*")).order(order, { ascending: order === "sort_order" });
  if (error) {
    console.error(`[data] ${table}:`, error.message);
    return [];
  }
  return (data ?? []) as T[];
}

async function single<T>(table: string, fallback: T): Promise<T> {
  const db = getPublicClient();
  if (!db) return fallback;
  const { data, error } = await db
    .from(table)
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) console.error(`[data] ${table}:`, error.message);
  return data ? ({ ...fallback, ...data } as T) : fallback;
}

export const getSettings = cache(() => single<SiteSettings>("site_settings", demoSettings));
export const getProfile = cache(() => single<Profile>("profile", demoProfile));

export const getServices = cache(() =>
  list<Service>("services", demoServices, (q) => q.eq("active", true))
);

export const getProjects = cache(() =>
  list<Project>("projects", demoProjects, (q) => q.eq("status", "published"))
);

export const getProjectBySlug = cache(async (slug: string) => {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
});

export const getResume = cache(() =>
  list<ResumeItem>("resume_items", demoResume, (q) => q.eq("active", true))
);

export const getSkills = cache(() =>
  list<Skill>("skills", demoSkills, (q) => q.eq("active", true))
);

export const getTestimonials = cache(() =>
  list<Testimonial>("testimonials", demoTestimonials, (q) => q.eq("active", true))
);

export const getClients = cache(() =>
  list<Client>("clients", demoClients, (q) => q.eq("active", true))
);

export const getAwards = cache(() =>
  list<Award>("awards", demoAwards, (q) => q.eq("active", true))
);

export const getPricing = cache(() =>
  list<PricingPlan>("pricing_plans", demoPricing, (q) => q.eq("active", true))
);

export const getPosts = cache(() =>
  list<BlogPost>("blog_posts", demoPosts, (q) => q.eq("status", "published"), "published_at")
);

export const getPostBySlug = cache(async (slug: string) => {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
});
