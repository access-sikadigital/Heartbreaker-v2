import type { ReactNode } from "react";

/** "(01) — The studio" style kicker used at the top of each section. */
export function SectionLabel({ index, children, className = "" }: { index: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      <span className="tabular-nums opacity-60">({index})</span>
      <span aria-hidden className="h-px w-6 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
