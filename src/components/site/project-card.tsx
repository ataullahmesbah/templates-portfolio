import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import type { Project } from "@/types/content";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="neu neu-hover group h-full p-5 sm:p-7">
      <Link href={`/work/${project.slug}`} className="block focus-visible:outline-none" aria-label={`View case study: ${project.title}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
          <Image
            src={project.cover_image_url}
            alt=""
            fill
            preload={priority}
            sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 text-[13px]">
          <span className="font-medium uppercase tracking-[1.5px] text-accent-ink">{project.category}</span>
          <span className="inline-flex items-center gap-1.5 text-heading">
            <Heart size={14} aria-hidden /> {project.likes}
            <span className="sr-only">likes</span>
          </span>
        </div>
        <h3 className="mt-3 flex items-start gap-2 font-heading text-xl font-medium leading-snug transition-colors group-hover:text-accent-ink sm:text-[22px]">
          <span>{project.title}</span>
          <ArrowUpRight
            size={22}
            className="mt-0.5 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden
          />
        </h3>
      </Link>
    </article>
  );
}
