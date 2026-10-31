import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  intro?: ReactNode;
  action?: ReactNode;
  /** Use on dark (maroon) sections */
  light?: boolean;
  className?: string;
};

/** Eyebrow + heading + optional intro line, with an optional action aligned right on wide screens. */
export function SectionHeading({ eyebrow, title, id, intro, action, light = false, className = "" }: Props) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-[44rem] space-y-5">
        <p className={`label ${light ? "text-paper/70" : "text-maroon/70"}`}>{eyebrow}</p>
        <h2 id={id} className="display text-h2">
          {title}
        </h2>
        {intro ? <p className={`max-w-[36rem] text-[1.0625rem] ${light ? "text-paper/85" : ""}`}>{intro}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
