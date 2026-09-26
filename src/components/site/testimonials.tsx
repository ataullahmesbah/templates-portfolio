"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "./section-heading";
import type { Testimonial } from "@/types/content";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  if (!items.length) return null;
  const t = items[index];

  const go = (step: number) => {
    setDir(step);
    setIndex((i) => (i + step + items.length) % items.length);
  };

  return (
    <section id="testimonials" className="section" aria-roledescription="carousel" aria-label="Testimonials">
      <div className="container-x">
        <SectionHeading eyebrow="What clients say" title="Testimonial" center />

        <div className="relative mx-auto max-w-5xl">
          <div className="overflow-hidden px-1 py-2" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={t.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${items.length}`}
              >
                <div className="neu p-6 sm:p-8">
                  {t.avatar_url && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                      <Image src={t.avatar_url} alt={`Photo of ${t.name}`} fill sizes="(min-width: 768px) 360px, 90vw" className="object-cover" />
                    </div>
                  )}
                  <p className="mt-6 text-[13px] font-medium uppercase tracking-[2px] text-accent-ink">{t.company}</p>
                  <p className="mt-2 font-heading text-2xl font-semibold text-heading">{t.name}</p>
                  {t.role && <p className="mt-1 text-sm text-muted">{t.role}</p>}
                </div>

                <figure className="neu relative flex flex-col justify-center p-7 sm:p-12">
                  <Quote className="absolute top-8 right-8 h-16 w-16 text-accent-ink opacity-10" aria-hidden />
                  <div className="flex flex-col gap-4 border-b border-line pb-7 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      {t.project_title && <p className="font-heading text-xl font-semibold text-heading sm:text-2xl">{t.project_title}</p>}
                      <p className="mt-1 text-sm text-muted">{t.company ?? t.role}</p>
                    </div>
                    <div className="neu flex w-fit gap-1 rounded-md px-3 py-2" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className={i < t.rating ? "fill-[#ffb400] text-[#ffb400]" : "text-muted"} aria-hidden />
                      ))}
                    </div>
                  </div>
                  <blockquote className="pt-7 text-[17px] leading-[1.9]">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="sr-only">
                    {t.name}, {t.role} {t.company && `at ${t.company}`}
                  </figcaption>
                </figure>
              </motion.div>
            </AnimatePresence>
          </div>

          {items.length > 1 && (
            <div className="mt-10 flex items-center justify-center gap-5">
              <button type="button" onClick={() => go(-1)} className="neu icon-box" aria-label="Previous testimonial">
                <ArrowLeft size={20} />
              </button>
              <div className="flex gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDir(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-2.5 bg-[var(--muted)]/40"}`}
                  />
                ))}
              </div>
              <button type="button" onClick={() => go(1)} className="neu icon-box" aria-label="Next testimonial">
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
