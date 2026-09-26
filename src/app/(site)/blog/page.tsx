import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { BlogCard } from "@/components/site/blog-card";
import { Reveal } from "@/components/motion/reveal";
import { notFound } from "next/navigation";
import { getPosts, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on design, motion, branding and building digital products.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  if (!isSectionVisible((await getSettings()).sections, "blog")) notFound();
  const posts = await getPosts();
  return (
    <>
      <PageHero eyebrow="Blog" title="Notes on design & motion" crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <section className="section !pt-4">
        <div className="container-x">
          {posts.length ? (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {posts.map((p, i) => (
                <Reveal as="li" key={p.id} delay={(i % 3) * 0.1}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="py-20 text-center text-muted">No articles yet — check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
