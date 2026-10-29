"use client";

import { useRef } from "react";
import { Swallow } from "@/components/brand/Logo";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Endless ticker. Speeds up with scroll velocity and reverses when you scroll back up. */
export function Marquee({ items, className = "" }: { items: readonly string[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = root.current!.querySelector("[data-track]")!;
      const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      let dir = 1;

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const v = self.getVelocity();
          if (Math.abs(v) > 30) dir = v > 0 ? 1 : -1;
          const boost = 1 + Math.min(Math.abs(v) / 260, 7);
          gsap.to(loop, { timeScale: dir * boost, duration: 0.25, overwrite: true });
          gsap.to(loop, { timeScale: dir, duration: 1.1, delay: 0.25, ease: "power2.out" });
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span className="display whitespace-nowrap px-[2.2vw] text-d3">{item}</span>
          <Swallow className="w-[clamp(1.6rem,2.6vw,2.6rem)] shrink-0" body="var(--color-chilli)" />
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={root} className={`relative overflow-hidden py-[clamp(1rem,2vw,1.75rem)] ${className}`}>
      <div data-track className="flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
