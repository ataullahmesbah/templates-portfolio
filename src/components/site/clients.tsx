import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { Tabs } from "./tabs";
import type { Client } from "@/types/content";

function LogoGrid({ clients }: { clients: Client[] }) {
  return (
    <ul className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
      {clients.map((c) => {
        const inner = (
          <>
            <div className="relative h-14 w-full">
              {c.logo_url ? (
                <Image src={c.logo_url} alt={`${c.name} logo`} fill sizes="200px" className="object-contain opacity-80 transition-opacity group-hover:opacity-100" />
              ) : (
                <span className="flex h-full items-center justify-center font-heading text-xl font-bold text-muted">{c.name}</span>
              )}
            </div>
            <p className="mt-5 text-center text-sm font-medium text-muted transition-colors group-hover:text-heading">{c.name}</p>
          </>
        );
        return (
          <li key={c.id}>
            {c.website_url ? (
              <a href={c.website_url} target="_blank" rel="noopener noreferrer" className="neu neu-hover group block px-5 py-8 transition-transform hover:-translate-y-1">
                {inner}
              </a>
            ) : (
              <div className="neu neu-hover group px-5 py-8 transition-transform hover:-translate-y-1">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Clients({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;
  const categories = Array.from(new Set(clients.map((c) => c.category).filter(Boolean)));
  return (
    <section id="clients" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Popular clients" title="Awesome Clients" center />
        <Reveal>
          {categories.length > 1 ? (
            <Tabs
              className="mx-auto max-w-5xl"
              items={[
                { key: "all", label: "All", content: <LogoGrid clients={clients} /> },
                ...categories.map((cat) => ({
                  key: cat,
                  label: cat,
                  content: <LogoGrid clients={clients.filter((c) => c.category === cat)} />,
                })),
              ]}
            />
          ) : (
            <div className="mx-auto max-w-5xl">
              <LogoGrid clients={clients} />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
