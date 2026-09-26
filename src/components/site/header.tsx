"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeSwitcher, ThemeToggle } from "@/components/ui/theme-toggle";
import { BrandIcon } from "@/components/ui/brand-icon";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types/content";
import type { NavItem } from "@/lib/sections";

type Props = {
  name: string;
  avatar: string;
  logo: string | null;
  hireLabel: string;
  socials: SocialLink[];
  nav: NavItem[];
  contactHref: string;
};

export function Header({ name, avatar, logo, hireLabel, socials, nav, contactHref }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section indicator (home page only)
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = nav.map((n) => n.href.split("#")[1]);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, nav]);

  // Drawer: lock scroll, close on Escape, trap focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const drawer = drawerRef.current;
    const focusables = () =>
      Array.from(drawer?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const trigger = menuButtonRef.current;
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const isActive = (href: string) => pathname === "/" && href.endsWith(`#${active}`);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "bg-[var(--header-bg)] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)] backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className={cn("container-x flex items-center justify-between gap-4 transition-all", scrolled ? "h-[76px]" : "h-[96px]")}>
          <Link href="/#home" className="flex items-center gap-3" aria-label={`${name} — home`}>
            <span className="neu relative block h-12 w-12 overflow-hidden rounded-full border-2 border-[var(--border)] sm:h-14 sm:w-14">
              <Image src={logo || avatar} alt="" fill sizes="56px" className="object-cover object-top" />
            </span>
            <span className="font-heading text-lg font-semibold uppercase tracking-wide text-heading sm:text-xl">
              {name.split(" ")[0]}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative block px-3.5 py-2 text-[14px] font-medium uppercase tracking-wide transition-colors",
                      isActive(item.href) ? "text-heading" : "text-text hover:text-heading"
                    )}
                    aria-current={isActive(item.href) ? "true" : undefined}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left bg-accent transition-transform duration-300",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href={contactHref} className="neu btn hidden !py-3 sm:inline-flex">
              {hireLabel}
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="neu icon-box !h-11 !w-11 !rounded-full xl:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 left-0 z-[70] flex w-[min(360px,88vw)] flex-col overflow-y-auto bg-[var(--bg)] p-6 shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b border-line pb-5">
                <div className="flex items-center gap-3">
                  <span className="neu relative block h-12 w-12 overflow-hidden rounded-full">
                    <Image src={logo || avatar} alt="" fill sizes="48px" className="object-cover object-top" />
                  </span>
                  <span className="font-heading font-semibold uppercase text-heading">{name}</span>
                </div>
                <button type="button" className="neu icon-box !h-10 !w-10 !rounded-full" aria-label="Close menu" onClick={() => setOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <motion.ul
                className="mt-4 flex flex-col"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                {nav.map((item) => (
                  <motion.li key={item.href} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block border-b border-line py-3.5 text-[15px] font-medium uppercase tracking-wide transition-colors hover:text-accent-ink",
                        isActive(item.href) ? "text-accent-ink" : "text-heading"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-8 space-y-6">
                <ThemeSwitcher />
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a key={s.platform + s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="neu icon-box !h-12 !w-12" aria-label={s.platform}>
                      <BrandIcon name={s.platform} size={18} />
                    </a>
                  ))}
                </div>
                <Link href={contactHref} onClick={() => setOpen(false)} className="btn btn-accent w-full">
                  {hireLabel}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
