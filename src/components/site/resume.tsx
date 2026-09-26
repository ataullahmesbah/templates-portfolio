import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { SkillBar } from "./skill-bar";
import { Tabs } from "./tabs";
import type { ResumeItem, Skill } from "@/types/content";

function Timeline({ items }: { items: ResumeItem[] }) {
  if (!items.length) return <p className="text-center text-muted">Nothing here yet.</p>;
  return (
    <ol className="relative mx-auto max-w-4xl border-l-[5px] border-[var(--border)] pl-6 sm:pl-10">
      {items.map((item, i) => (
        <Reveal as="li" key={item.id} delay={i * 0.08} className="relative mb-10 last:mb-0">
          <span className="absolute top-12 -left-6 h-[5px] w-6 bg-[var(--border)] sm:-left-10 sm:w-10" aria-hidden />
          <span className="absolute top-[42px] -left-[35px] h-[17px] w-[17px] rounded-full border-[4px] border-accent bg-[var(--bg)] sm:-left-[51px]" aria-hidden />
          <article className="neu neu-hover group p-6 sm:p-10">
            <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-heading text-xl font-medium sm:text-2xl">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted">
                  {item.subtitle} <span aria-hidden>·</span> {item.period}
                </p>
              </div>
              {item.badge && (
                <span className="neu w-fit shrink-0 rounded-md px-4 py-2 text-sm font-medium text-accent-ink">{item.badge}</span>
              )}
            </div>
            <p className="pt-6">{item.description}</p>
          </article>
        </Reveal>
      ))}
    </ol>
  );
}

function Skills({ skills }: { skills: Skill[] }) {
  const groups = Array.from(new Set(skills.map((s) => s.category)));
  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
      {groups.map((g) => (
        <div key={g}>
          <p className="eyebrow !text-[13px]">Features</p>
          <h3 className="mt-2 mb-10 font-heading text-3xl font-bold sm:text-4xl">{g}</h3>
          <div className="space-y-9">
            {skills
              .filter((s) => s.category === g)
              .map((s) => (
                <SkillBar key={s.id} name={s.name} level={s.level} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Resume({ resume, skills, years }: { resume: ResumeItem[]; skills: Skill[]; years: string }) {
  const education = resume.filter((r) => r.type === "education");
  const experience = resume.filter((r) => r.type === "experience");
  if (!resume.length && !skills.length) return null;
  return (
    <section id="resume" className="section">
      <div className="container-x">
        <SectionHeading eyebrow={years} title="My Resume" center />
        <Reveal>
          <Tabs
            className="mx-auto max-w-5xl"
            items={[
              { key: "education", label: "Education", content: <Timeline items={education} /> },
              { key: "skills", label: "Professional Skills", content: <Skills skills={skills} /> },
              { key: "experience", label: "Experience", content: <Timeline items={experience} /> },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
