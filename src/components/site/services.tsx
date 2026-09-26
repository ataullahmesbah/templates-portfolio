import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import { SectionHeading } from "./section-heading";
import type { Service } from "@/types/content";

export function Services({ services, contactHref = "/#contact" }: { services: Service[]; contactHref?: string }) {
  if (!services.length) return null;
  return (
    <section id="services" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Features" title="What I Do" />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 3) * 0.1}>
              <article className="neu group relative h-full overflow-hidden px-8 py-10 transition-transform duration-500 hover:-translate-y-1.5 sm:px-10 sm:py-12">
                <span className="card-accent absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                <div className="relative">
                  <ServiceIcon name={s.icon_key} className="h-11 w-11 text-accent-ink transition-colors duration-500 group-hover:text-on-accent" />
                  <h3 className="mt-8 font-heading text-2xl font-medium transition-colors duration-500 group-hover:text-on-accent">{s.title}</h3>
                  <p className="mt-4 transition-colors duration-500 group-hover:text-on-accent/90">{s.short_description}</p>
                  <Link
                    href={contactHref}
                    className="mt-6 inline-flex translate-y-2 items-center text-accent-ink opacity-0 transition-all duration-500 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:text-on-accent group-hover:opacity-100"
                    aria-label={`Enquire about ${s.title}`}
                  >
                    <ArrowRight size={26} aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
