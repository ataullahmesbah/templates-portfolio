import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BrandIcon } from "@/components/ui/brand-icon";
import { SectionHeading } from "./section-heading";
import { ContactForm } from "./contact-form";
import type { Profile, Service } from "@/types/content";

export function Contact({ profile, services, email, phone }: { profile: Profile; services: Service[]; email: string; phone: string | null }) {
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Contact" title="Contact With Me" center />
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <aside className="neu h-full p-6 sm:p-8">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[10px] bg-[linear-gradient(135deg,var(--card-from),var(--card-to))]">
                <Image src={profile.profile_image_url} alt={`Photo of ${profile.full_name}`} fill sizes="(min-width: 1024px) 460px, 90vw" className="object-contain object-bottom" />
              </div>
              <h3 className="mt-7 font-heading text-2xl font-semibold sm:text-[28px]">{profile.full_name}</h3>
              <p className="mt-1 text-muted">{profile.professional_title}</p>
              <p className="mt-5">{profile.bio}</p>
              <ul className="mt-6 space-y-3">
                {phone && (
                  <li>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-3 hover:text-accent-ink">
                      <Phone size={18} className="text-accent-ink" aria-hidden /> {phone}
                    </a>
                  </li>
                )}
                <li>
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-3 break-all hover:text-accent-ink">
                    <Mail size={18} className="shrink-0 text-accent-ink" aria-hidden /> {email}
                  </a>
                </li>
                <li className="inline-flex items-center gap-3">
                  <MapPin size={18} className="text-accent-ink" aria-hidden /> {profile.location}
                </li>
              </ul>
              <p className="mt-8 mb-4 text-[13px] font-medium uppercase tracking-[2px] text-heading">Find with me</p>
              <ul className="flex flex-wrap gap-4">
                {profile.social_links.map((s) => (
                  <li key={s.platform + s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="neu icon-box" aria-label={s.platform}>
                      <BrandIcon name={s.platform} size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
          <Reveal delay={0.15} className="relative lg:col-span-7">
            <ContactForm services={services.map((s) => s.title)} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
