"use client";

import { useRef } from "react";
import { Swallow } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { cta, globalCta } from "@/content/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Appears at the foot of every page (copy deck: "Global CTA block"). */
export function GlobalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // The swallow crosses the block as you scroll through it
      gsap.fromTo(
        "[data-fly]",
        { xPercent: -140, yPercent: 60, rotate: 14 },
        {
          xPercent: 140,
          yPercent: -70,
          rotate: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} data-header="dark" className="gutter relative overflow-hidden bg-chilli py-[clamp(5rem,12vw,11rem)] text-paper" aria-labelledby="cta-title">
      <div aria-hidden data-fly className="pointer-events-none absolute left-1/2 top-[12%] w-[clamp(8rem,22vw,22rem)] -translate-x-1/2 text-paper/25">
        <Swallow className="w-full" />
      </div>

      <div className="relative mx-auto flex max-w-[86rem] flex-col items-center text-center">
        <p className="label mb-8 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-paper" />
          </span>
          {globalCta.eyebrow}
        </p>
        <SplitReveal as="h2" className="display text-d1">
          <span id="cta-title">{globalCta.title}</span>
        </SplitReveal>
        <p className="mt-8 max-w-[34rem] text-[1.0625rem]">{globalCta.body}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={cta.book.href} variant="paper" size="lg">
            {cta.book.label}
          </Button>
          <Button href={cta.voucher.href} variant="outline-paper" size="lg">
            {cta.voucher.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
