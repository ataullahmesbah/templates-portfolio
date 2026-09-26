import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SplitWords } from "@/components/motion/reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="section grain relative overflow-hidden !pt-[150px] !pb-16">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[380px] w-[380px] rounded-full bg-accent/15 blur-[120px]" aria-hidden />
      <div className="container-x relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="hover:text-accent-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-heading">
                    {c.label}
                  </span>
                )}
                {i < crumbs.length - 1 && <ChevronRight size={14} aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="mt-4 max-w-5xl text-[clamp(2.4rem,6.5vw,5rem)] font-bold leading-[1.08]">
          <SplitWords text={title} />
        </h1>
        {intro && <p className="mt-6 max-w-[720px] text-[17px] leading-[1.9]">{intro}</p>}
      </div>
    </section>
  );
}
