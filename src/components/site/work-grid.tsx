"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  if (!projects.length) {
    return <p className="py-20 text-center text-muted">No projects published yet — check back soon.</p>;
  }

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-3" role="group" aria-label="Filter projects by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={cn("neu rounded-full px-5 py-2.5 text-sm font-medium transition-colors", filter === c ? "!text-on-accent card-accent" : "text-heading hover:text-accent-ink")}
          >
            {c}
          </button>
        ))}
      </div>
      <motion.ul layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative h-full">
                {p.featured && (
                  <span className="card-accent absolute top-9 left-9 z-10 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-on-accent">
                    Featured
                  </span>
                )}
                <ProjectCard project={p} priority={i < 3} />
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
