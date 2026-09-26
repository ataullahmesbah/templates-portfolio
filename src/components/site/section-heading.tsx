import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  center = false,
  className,
}: {
  eyebrow: string;
  title: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 md:mb-16", center && "text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
    </Reveal>
  );
}
