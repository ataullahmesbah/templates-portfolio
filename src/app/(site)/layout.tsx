import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { BackToTop } from "@/components/site/back-to-top";
import { getProfile, getSettings } from "@/lib/data";
import { isSectionVisible, navItems } from "@/lib/sections";

export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [profile, settings] = await Promise.all([getProfile(), getSettings()]);
  const nav = navItems(settings.sections);
  const contactHref = isSectionVisible(settings.sections, "contact") ? "/#contact" : `mailto:${settings.contact_email}`;
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <Header
        name={settings.website_name || profile.full_name}
        avatar={profile.profile_image_url}
        logo={settings.logo_url}
        hireLabel={settings.hire_label}
        socials={profile.social_links}
        nav={nav}
        contactHref={contactHref}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer profile={profile} settings={settings} nav={nav} />
      <BackToTop />
    </>
  );
}
