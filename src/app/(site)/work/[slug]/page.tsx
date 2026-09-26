import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { ClipReveal, Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/site/page-hero";
import { JsonLd } from "@/components/site/json-ld";
import { getProfile, getProjectBySlug, getProjects, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  const isRaster = !project.cover_image_url.endsWith(".svg");
  return {
    title: project.title,
    description: project.intro,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.intro,
      url: `/work/${project.slug}`,
      images: [{ url: isRaster ? project.cover_image_url : "/opengraph-image" }],
    },
    twitter: { card: "summary_large_image", title: project.title, description: project.intro },
  };
}

function Block({ title, text }: { title: string; text: string | null }) {
  if (!text) return null;
  return (
    <Reveal className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10">
      <h2 className="font-heading text-2xl font-semibold md:col-span-4">{title}</h2>
      <p className="text-[17px] leading-[1.9] md:col-span-8">{text}</p>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, projects, profile, settings] = await Promise.all([getProjectBySlug(slug), getProjects(), getProfile(), getSettings()]);
  if (!project || !isSectionVisible(settings.sections, "portfolio")) notFound();

  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  const meta = [
    { label: "Client", value: project.client },
    { label: "Year", value: String(project.year) },
    { label: "Role", value: project.role },
    { label: "Category", value: project.category },
  ].filter((m) => m.value);

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.intro,
          dateCreated: String(project.year),
          url: `${siteConfig.url}/work/${project.slug}`,
          image: new URL(project.cover_image_url, siteConfig.url).toString(),
          creator: { "@type": "Person", name: profile.full_name },
        }}
      />
      <PageHero
        eyebrow={`${String(index + 1).padStart(2, "0")} / ${project.category}`}
        title={project.title}
        intro={project.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: project.title }]}
      />

      <section className="pb-10">
        <div className="container-x">
          <ClipReveal className="neu relative aspect-[16/10] overflow-hidden p-0 sm:aspect-[16/8]">
            <Image src={project.cover_image_url} alt={`${project.title} cover`} fill preload sizes="(min-width: 1320px) 1224px, 100vw" className="object-cover" />
          </ClipReveal>

          <dl className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="neu p-5 sm:p-6">
                <dt className="text-[12px] font-medium uppercase tracking-[2px] text-accent-ink">{m.label}</dt>
                <dd className="mt-2 font-heading text-base font-semibold text-heading sm:text-lg">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section !pt-10">
        <div className="container-x">
          <div className="mx-auto max-w-5xl">
            <Block title="The challenge" text={project.challenge} />
            <Block title="The approach" text={project.solution} />
            <Block title="The result" text={project.result} />
            {project.live_url && (
              <Reveal className="border-t border-line pt-10">
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                  Visit live project <ExternalLink size={16} aria-hidden />
                </a>
              </Reveal>
            )}
          </div>

          {project.gallery.length > 0 && (
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {project.gallery.map((src, i) => (
                <ClipReveal key={src + i} className={`neu relative overflow-hidden ${i % 3 === 0 && project.gallery.length > 2 ? "aspect-[16/8] md:col-span-2" : "aspect-[4/3]"}`}>
                  <Image src={src} alt={`${project.title} — image ${i + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </ClipReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {projects.length > 1 && (
        <nav aria-label="More projects" className="section">
          <div className="container-x grid gap-6 sm:grid-cols-2">
            <Link href={`/work/${prev.slug}`} className="neu neu-hover group flex items-center gap-5 p-6 sm:p-8">
              <ArrowLeft className="shrink-0 text-accent-ink transition-transform group-hover:-translate-x-1" aria-hidden />
              <span>
                <span className="block text-[12px] uppercase tracking-[2px] text-muted">Previous project</span>
                <span className="mt-1 block font-heading text-lg font-semibold text-heading">{prev.title}</span>
              </span>
            </Link>
            <Link href={`/work/${next.slug}`} className="neu neu-hover group flex items-center justify-end gap-5 p-6 text-right sm:p-8">
              <span>
                <span className="block text-[12px] uppercase tracking-[2px] text-muted">Next project</span>
                <span className="mt-1 block font-heading text-lg font-semibold text-heading">{next.title}</span>
              </span>
              <ArrowRight className="shrink-0 text-accent-ink transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </nav>
      )}
    </article>
  );
}
