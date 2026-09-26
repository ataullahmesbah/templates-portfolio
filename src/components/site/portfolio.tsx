import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { ProjectCard } from "./project-card";
import type { Project } from "@/types/content";

export function Portfolio({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  // Featured projects first, then the rest (already sorted by sort_order).
  const shown = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)].slice(0, 6);
  return (
    <section id="portfolio" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Visit my portfolio and keep your feedback" title="My Portfolio" center />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {shown.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 0.1}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-14 text-center">
          <Link href="/work" className="neu btn">
            View all projects <ArrowRight size={16} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
