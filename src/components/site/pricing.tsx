import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types/content";

export function Pricing({ plans, contactHref = "/#contact" }: { plans: PricingPlan[]; contactHref?: string }) {
  if (!plans.length) return null;
  return (
    <section id="pricing" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Pricing" title="My Pricing" center />
        <ul className="mx-auto grid max-w-6xl items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {plans.map((plan, i) => (
            <Reveal as="li" key={plan.id} delay={i * 0.1}>
              <article
                className={cn(
                  "neu relative flex h-full flex-col p-8 transition-transform duration-500 hover:-translate-y-1.5 sm:p-10",
                  plan.highlighted && "ring-2 ring-accent/70"
                )}
              >
                {plan.highlighted && (
                  <span className="card-accent absolute -top-3.5 right-8 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-on-accent">
                    Popular
                  </span>
                )}
                <p className="eyebrow !text-[13px]">{plan.tagline}</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold">{plan.name}</h3>
                <p className="mt-6 flex items-end gap-2">
                  <span className="font-heading text-4xl font-bold text-heading sm:text-5xl">{plan.price}</span>
                  <span className="pb-1.5 text-sm text-muted">{plan.period}</span>
                </p>
                <p className="mt-5 border-b border-line pb-7">{plan.description}</p>
                <ul className="mt-7 flex-1 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check size={18} className="mt-1 shrink-0 text-accent-ink" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={contactHref} className={cn("btn mt-9 w-full", plan.highlighted ? "btn-accent" : "neu")}>
                  {plan.cta_label}
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
