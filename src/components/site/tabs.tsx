"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type TabItem = { key: string; label: string; content: React.ReactNode };

/** Accessible tabs (arrow-key navigation) with the InBio neumorphic tab bar. */
export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.key);
  const id = useId();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = items[(index + dir + items.length) % items.length];
    setActive(next.key);
    refs.current[next.key]?.focus();
  }

  const current = items.find((i) => i.key === active) ?? items[0];

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Sections"
        className="neu mx-auto flex max-w-full gap-1 overflow-x-auto rounded-[10px] p-1.5 [scrollbar-width:none]"
      >
        {items.map((item, index) => {
          const selected = item.key === current?.key;
          return (
            <button
              key={item.key}
              ref={(el) => {
                refs.current[item.key] = el;
              }}
              role="tab"
              id={`${id}-tab-${item.key}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${item.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.key)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={cn(
                "relative min-w-fit flex-1 whitespace-nowrap rounded-[8px] px-4 py-4 text-sm font-medium transition-colors sm:px-6 sm:text-[15px]",
                selected ? "text-accent-ink" : "text-heading hover:text-accent-ink"
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${id}-pill`}
                  className="neu absolute inset-0 rounded-[8px]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.key}
            role="tabpanel"
            id={`${id}-panel-${current.key}`}
            aria-labelledby={`${id}-tab-${current.key}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-12 md:mt-16"
          >
            {current.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
