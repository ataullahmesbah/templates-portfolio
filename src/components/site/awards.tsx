"use client";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Trophy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "./section-heading";
import type { Award } from "@/types/content";

const AUTOPLAY_MS = 6000;

export function Awards({ awards }: { awards: Award[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = awards.length;

  const go = useCallback(
    (step: number) => {
      setDir(step);
      setIndex((i) => (i + step + count) % count);
    },
    [count]
  );

  // Auto-advance; pauses on hover/focus and when the visitor prefers reduced motion.
  useEffect(() => {
    if (count < 2 || paused || reduce) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduce, count, go]);

  if (!count) return null;
  const a = awards[index];

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <section id="awards" className="section" aria-roledescription="carousel" aria-label="Awards">
      <div className="container-x">
        <SectionHeading eyebrow="Recognition" title="Awards & Honors" center />

        <div
          className="relative mx-auto max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="overflow-hidden px-1 py-2" aria-live={paused ? "polite" : "off"}>
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.article
                key={a.id}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={onDragEnd}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className="neu grid cursor-grab items-center gap-6 p-5 active:cursor-grabbing sm:p-7 md:grid-cols-2 md:gap-10 md:p-9"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-[var(--bg)]">
                  <Image
                    src={a.image_url}
                    alt={`${a.title}${a.organization ? ` — ${a.organization}` : ""}`}
                    fill
                    sizes="(min-width: 768px) 460px, 90vw"
                    className="pointer-events-none object-cover"
                    draggable={false}
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[13px]">
                    <span className="neu inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-medium text-accent-ink">
                      <Trophy size={14} aria-hidden /> {a.year ?? "Award"}
                    </span>
                    {a.organization && <span className="font-medium uppercase tracking-[1.5px] text-muted">{a.organization}</span>}
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-semibold leading-snug sm:text-3xl">{a.title}</h3>
                  <p className="mt-4 text-[16px] leading-[1.85]">{a.short_description}</p>
                  {a.link_url && (
                    <a href={a.link_url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink hover:underline">
                      View award <ArrowUpRight size={16} aria-hidden />
                    </a>
                  )}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {count > 1 && (
            <div className="mt-10 flex items-center justify-center gap-5">
              <button type="button" onClick={() => go(-1)} className="neu icon-box" aria-label="Previous award">
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                {awards.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDir(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Show award ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-2.5 bg-[var(--muted)]/40"}`}
                  />
                ))}
              </div>
              <button type="button" onClick={() => go(1)} className="neu icon-box" aria-label="Next award">
                <ArrowRight size={20} />
              </button>
            </div>
          )}
          <p className="mt-4 text-center font-heading text-sm font-semibold tracking-[2px] text-muted" aria-hidden>
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
