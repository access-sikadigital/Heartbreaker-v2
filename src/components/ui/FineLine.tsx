"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** A single-needle hairline that draws itself across the page as it scrolls in. */
export function FineLine({ className = "", from = "left" }: { className?: string; from?: "left" | "right" | "center" }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: "hb.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        },
      );
    },
    { scope: ref },
  );

  const origin = from === "left" ? "origin-left" : from === "right" ? "origin-right" : "origin-center";
  return <div ref={ref} aria-hidden className={`h-px w-full bg-current ${origin} ${className}`} />;
}
