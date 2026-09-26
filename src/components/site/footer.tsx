import Image from "next/image";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/brand-icon";
import { ThemeSwitcher } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/config/site";
import type { Profile, SiteSettings } from "@/types/content";
import { isSectionVisible, type NavItem } from "@/lib/sections";

export function Footer({ profile, settings, nav }: { profile: Profile; settings: SiteSettings; nav: NavItem[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="pt-16 pb-10">
      <div className="container-x">
        <div className="grid gap-10 border-b border-line pb-12 md:grid-cols-3">
          <div>
            <Link href="/#home" className="inline-flex items-center gap-3">
              <span className="neu relative block h-14 w-14 overflow-hidden rounded-full">
                <Image src={settings.logo_url || profile.profile_image_url} alt="" fill sizes="56px" className="object-cover object-top" />
              </span>
              <span className="font-heading text-xl font-semibold uppercase text-heading">{settings.website_name}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm">{profile.professional_title}. {profile.location}.</p>
          </div>
          <nav aria-label="Footer">
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[2px] text-heading">Quick links</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-accent-ink">
                    {n.label}
                  </Link>
                </li>
              ))}
              {isSectionVisible(settings.sections, "portfolio") && (
                <li>
                  <Link href="/work" className="hover:text-accent-ink">All work</Link>
                </li>
              )}
              {isSectionVisible(settings.sections, "blog") && (
                <li>
                  <Link href="/blog" className="hover:text-accent-ink">All articles</Link>
                </li>
              )}
            </ul>
          </nav>
          <div>
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[2px] text-heading">Get in touch</p>
            <a href={`mailto:${settings.contact_email}`} className="block break-all text-sm hover:text-accent-ink">
              {settings.contact_email}
            </a>
            {settings.public_phone && (
              <a href={`tel:${settings.public_phone.replace(/\s/g, "")}`} className="mt-1 block text-sm hover:text-accent-ink">
                {settings.public_phone}
              </a>
            )}
            <ul className="mt-5 flex gap-3">
              {profile.social_links.map((s) => (
                <li key={s.platform + s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="neu icon-box !h-11 !w-11" aria-label={s.platform}>
                    <BrandIcon name={s.platform} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-sm sm:flex-row">
          <p>
            © {year} {settings.website_name}. Developed by{" "}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener"
              className="font-medium text-heading underline-offset-4 transition-colors hover:text-accent-ink hover:underline"
            >
              {siteConfig.developer.name}
            </a>
          </p>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
