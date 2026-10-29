"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "lines" slides masked lines up; "words" fades words in as you scroll past (scrubbed). */
  mode?: "lines" | "words";
  delay?: number;
  /** Start immediately instead of on scroll (e.g. above the fold, after the preloader). */
  immediate?: boolean;
};

export function SplitReveal({ as: Tag = "div", children, className = "", mode = "lines", delay = 0, immediate = false }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const split = SplitText.create(el, {
        type: mode === "lines" ? "lines" : "words",
        mask: mode === "lines" ? "lines" : undefined,
        linesClass: "hb-line",
        autoSplit: true,
        onSplit(self) {
          if (mode === "lines") {
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.25,
              stagger: 0.09,
              delay: immediate ? delay + 0.15 : delay,
              ease: "hb.out",
              scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
            });
          }
          return gsap.fromTo(
            self.words,
            { opacity: 0.12 },
            {
              opacity: 1,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
            },
          );
        },
      });
      gsap.set(el, { autoAlpha: 1 });
      return () => split.revert();
    },
    { scope: ref, dependencies: [mode, delay, immediate] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
