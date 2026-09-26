import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal, SplitWords } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export function FinalCta({ email, contactHref = "/#contact" }: { email: string; contactHref?: string }) {
  return (
    <section className="section grain relative overflow-hidden" aria-labelledby="cta-title">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]" aria-hidden />
      <div className="container-x relative text-center">
        <p className="eyebrow">Have a project in mind?</p>
        <h2 id="cta-title" className="mx-auto mt-5 max-w-4xl text-[clamp(2.2rem,6vw,4.75rem)] font-bold leading-[1.1]">
          <SplitWords text="Let's build something memorable." />
        </h2>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link href={contactHref} className="btn btn-accent">
              Start a project <ArrowRight size={16} aria-hidden />
            </Link>
          </Magnetic>
          <Magnetic>
            <a href={`mailto:${email}`} className="neu btn">
              <Mail size={16} aria-hidden /> Email me
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
