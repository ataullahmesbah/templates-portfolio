import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { BlogCard } from "./blog-card";
import type { BlogPost } from "@/types/content";

export function Blog({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <section id="blog" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Visit my blog and keep your feedback" title="My Blog" center />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.1}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </ul>
        {posts.length > 3 && (
          <Reveal className="mt-14 text-center">
            <Link href="/blog" className="neu btn">
              All articles <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
