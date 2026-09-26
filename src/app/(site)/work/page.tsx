import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { WorkGrid } from "@/components/site/work-grid";
import { notFound } from "next/navigation";
import { getProjects, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected brand, product and web design projects — case studies with challenge, approach and results.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  if (!isSectionVisible((await getSettings()).sections, "portfolio")) notFound();
  const projects = await getProjects();
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected work & case studies"
        intro="A collection of brand, product and web projects. Filter by category and open any project for the full story."
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
      />
      <section className="section !pt-4">
        <div className="container-x">
          <WorkGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
