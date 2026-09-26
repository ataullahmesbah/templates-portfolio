"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Magnetic } from "@/components/motion/magnetic";
import type { Profile } from "@/types/content";

const ease = [0.22, 1, 0.36, 1] as const;

function useTypewriter(words: string[], reduce: boolean | null) {
  const [text, setText] = useState(words[0] ?? "");
  useEffect(() => {
    if (reduce || words.length === 0) return;
    let word = 0;
    let char = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = words[word];
      char += deleting ? -1 : 1;
      setText(current.slice(0, char));
      let delay = deleting ? 45 : 95;
      if (!deleting && char === current.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && char === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [words, reduce]);
  return text;
}

export function Hero({ profile, showWork = true, contactHref = "/#contact" }: { profile: Profile; showWork?: boolean; contactHref?: string }) {
  const reduce = useReducedMotion();
  const roles = useMemo(
    () => (profile.typed_roles?.length ? profile.typed_roles : [profile.professional_title]),
    [profile.typed_roles, profile.professional_title]
  );
  const typed = useTypewriter(roles, reduce);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  const [first, ...rest] = profile.full_name.split(" ");
  const nameWords = [first, rest.join(" ")].filter(Boolean);

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section ref={ref} id="home" className="section grain relative overflow-hidden !pt-[110px] lg:!pt-[150px]">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <motion.p {...item(0.1)} className="text-[13px] font-medium uppercase tracking-[3px] text-heading sm:text-sm">
            Welcome to my world
          </motion.p>

          <h1 className="mt-5 text-[clamp(2.4rem,6.5vw,4.25rem)] font-bold leading-[1.15] text-heading">
            <span className="block overflow-hidden pb-1">
              <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.2 }}>
                Hi, I&rsquo;m{" "}
                {nameWords.map((w, i) => (
                  <span key={i} className="text-accent-ink">
                    {w}
                    {i < nameWords.length - 1 ? " " : ""}
                  </span>
                ))}
              </motion.span>
            </span>
            <span className="mt-2 block overflow-hidden pb-1 text-[clamp(1.75rem,4.5vw,3.25rem)]">
              <motion.span className="inline-flex flex-wrap items-baseline" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.35 }}>
                <span className="mr-3">a</span>
                <span aria-hidden>{typed}</span>
                <span className="caret h-[0.9em] self-center" aria-hidden />
                <span className="sr-only">{roles.join(", ")}</span>
              </motion.span>
            </span>
          </h1>

          <motion.p {...item(0.55)} className="mt-6 max-w-[620px] text-[16px] leading-[1.9] sm:text-[17px]">
            {profile.short_intro}
          </motion.p>

          <motion.div {...item(0.7)} className="mt-9 flex flex-wrap items-center gap-4">
            {showWork && (
              <Magnetic>
                <Link href="/#portfolio" className="btn btn-accent">
                  View Work <ArrowRight size={16} aria-hidden />
                </Link>
              </Magnetic>
            )}
            <Magnetic>
              <Link href={contactHref} className={showWork ? "neu btn" : "btn btn-accent"}>
                Contact Me
              </Link>
            </Magnetic>
            {profile.resume_url && (
              <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-heading underline-offset-4 hover:text-accent-ink hover:underline">
                <Download size={16} aria-hidden /> Download CV
              </a>
            )}
          </motion.div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20">
            <motion.div {...item(0.85)}>
              <h2 className="mb-5 font-body text-[13px] font-medium uppercase tracking-[2px] text-heading">Find with me</h2>
              <ul className="flex flex-wrap gap-4 sm:gap-6">
                {profile.social_links.map((s) => (
                  <li key={s.platform + s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="neu icon-box" aria-label={s.platform}>
                      <BrandIcon name={s.platform} size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...item(1)}>
              <h2 className="mb-5 font-body text-[13px] font-medium uppercase tracking-[2px] text-heading">Best skill on</h2>
              <ul className="flex flex-wrap gap-4 sm:gap-6">
                {profile.skill_tools.map((t) => (
                  <li key={t.name}>
                    <span className="neu icon-box" title={t.name}>
                      <BrandIcon name={t.icon} size={24} colored />
                      <span className="sr-only">{t.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Portrait */}
        <motion.div
          className="order-1 lg:order-2 lg:col-span-5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
        >
          <div className="relative mx-auto aspect-[5/6] w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px]">
            <div className="neu absolute inset-x-0 bottom-0 top-[28%]" />
            {profile.availability_status && (
              <div className="neu absolute -left-2 bottom-8 z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-heading sm:-left-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                {profile.availability_status}
              </div>
            )}
            <motion.div className="absolute inset-x-[6%] bottom-0 top-0" style={{ y: imgY }}>
              <Image
                src={profile.hero_image_url || profile.profile_image_url}
                alt={`Portrait of ${profile.full_name}`}
                fill
                preload
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-contain object-bottom"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
