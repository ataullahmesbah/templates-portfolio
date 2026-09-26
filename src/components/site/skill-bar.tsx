"use client";
import { motion } from "framer-motion";

export function SkillBar({ name, level }: { name: string; level: number }) {
  const value = Math.max(0, Math.min(100, level));
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[13px] font-medium uppercase tracking-[1px] text-heading">
        <span>{name}</span>
        <span>{value}%</span>
      </div>
      <div
        className="neu h-2.5 overflow-hidden rounded-full !shadow-[inset_2px_2px_4px_var(--shadow-dark),inset_-2px_-2px_4px_var(--shadow-light)]"
        role="progressbar"
        aria-label={name}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="card-accent h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
