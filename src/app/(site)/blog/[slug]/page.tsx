import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { ClipReveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/site/page-hero";
import { RichText } from "@/components/site/rich-text";
import { JsonLd } from "@/components/site/json-ld";
import { getPostBySlug, getPosts, getProfile, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  const isRaster = !post.cover_image_url.endsWith(".svg");
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at,
      images: [{ url: isRaster ? post.cover_image_url : "/opengraph-image" }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, profile, settings] = await Promise.all([getPostBySlug(slug), getProfile(), getSettings()]);
  if (!post || !isSectionVisible(settings.sections, "blog")) notFound();

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.published_at,
          dateModified: post.updated_at ?? post.published_at,
          image: new URL(post.cover_image_url, siteConfig.url).toString(),
          url: `${siteConfig.url}/blog/${post.slug}`,
          author: { "@type": "Person", name: profile.full_name, url: siteConfig.url },
        }}
      />
      <PageHero eyebrow={post.category} title={post.title} crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
      <section className="section !pt-0">
        <div className="container-x">
          <div className="mx-auto max-w-4xl">
            <ClipReveal className="relative aspect-[16/9] overflow-hidden rounded-[10px]">
              <Image src={post.cover_image_url} alt="" fill preload sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
            </ClipReveal>
            <div className="mt-8 flex flex-wrap items-center gap-6 border-b border-line pb-8 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <Calendar size={16} aria-hidden /> <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={16} aria-hidden /> {post.read_time}
              </span>
              <span>By {profile.full_name}</span>
            </div>
            <div className="mx-auto mt-10 max-w-[760px]">
              <RichText content={post.content} />
              <Link href="/blog" className="neu btn mt-12">
                <ArrowLeft size={16} aria-hidden /> All articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
