import { Fragment } from "react";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Portfolio } from "@/components/site/portfolio";
import { Resume } from "@/components/site/resume";
import { Testimonials } from "@/components/site/testimonials";
import { Clients } from "@/components/site/clients";
import { Pricing } from "@/components/site/pricing";
import { Blog } from "@/components/site/blog";
import { Contact } from "@/components/site/contact";
import { FinalCta } from "@/components/site/cta";
import { Awards } from "@/components/site/awards";
import { JsonLd } from "@/components/site/json-ld";
import { siteConfig } from "@/config/site";
import { normalizeSections, isSectionVisible, type SectionKey } from "@/lib/sections";
import {
  getAwards,
  getClients,
  getPosts,
  getPricing,
  getProfile,
  getProjects,
  getResume,
  getServices,
  getSettings,
  getSkills,
  getTestimonials,
} from "@/lib/data";
import type { ResumeItem } from "@/types/content";

function experienceLabel(items: ResumeItem[]) {
  const years = items
    .filter((i) => i.type === "experience")
    .map((i) => Number(i.period.match(/\d{4}/)?.[0]))
    .filter(Boolean);
  if (!years.length) return "My journey";
  const total = new Date().getFullYear() - Math.min(...years);
  return `${total}+ Years of Experience`;
}

export default async function HomePage() {
  const [settings, profile, services, projects, resume, skills, testimonials, clients, pricing, posts, awards] = await Promise.all([
    getSettings(),
    getProfile(),
    getServices(),
    getProjects(),
    getResume(),
    getSkills(),
    getTestimonials(),
    getClients(),
    getPricing(),
    getPosts(),
    getAwards(),
  ]);

  const contactHref = isSectionVisible(settings.sections, "contact") ? "/#contact" : `mailto:${settings.contact_email}`;
  const sectionMap: Record<SectionKey, React.ReactNode> = {
    services: <Services services={services} contactHref={contactHref} />,
    portfolio: <Portfolio projects={projects} />,
    resume: <Resume resume={resume} skills={skills} years={experienceLabel(resume)} />,
    testimonials: <Testimonials items={testimonials} />,
    clients: <Clients clients={clients} />,
    awards: <Awards awards={awards} />,
    pricing: <Pricing plans={pricing} contactHref={contactHref} />,
    blog: <Blog posts={posts} />,
    cta: <FinalCta email={settings.contact_email} contactHref={contactHref} />,
    contact: <Contact profile={profile} services={services} email={settings.contact_email} phone={settings.public_phone ?? profile.phone} />,
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${siteConfig.url}/#person`,
              name: profile.full_name,
              jobTitle: profile.professional_title,
              description: profile.short_intro,
              email: `mailto:${settings.contact_email}`,
              image: new URL(profile.profile_image_url, siteConfig.url).toString(),
              url: siteConfig.url,
              address: { "@type": "PostalAddress", addressLocality: profile.location },
              sameAs: profile.social_links.map((s) => s.url),
            },
            {
              "@type": "WebSite",
              "@id": `${siteConfig.url}/#website`,
              url: siteConfig.url,
              name: settings.website_name,
              description: settings.seo_description,
              publisher: { "@id": `${siteConfig.url}/#person` },
            },
          ],
        }}
      />
      <Hero profile={profile} showWork={isSectionVisible(settings.sections, "portfolio")} contactHref={contactHref} />
      {normalizeSections(settings.sections)
        .filter((s) => s.visible)
        .map((s) => (
          <Fragment key={s.key}>{sectionMap[s.key]}</Fragment>
        ))}
    </>
  );
}
