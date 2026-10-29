"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { home, reviews } from "@/content/site";

export function Reviews() {
  const bounds = useRef<HTMLDivElement>(null);

  return (
    <section data-header="light" className="relative overflow-hidden bg-paper-dim py-[clamp(5rem,10vw,9rem)]" aria-labelledby="reviews-title">
      <div className="gutter mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <div className="space-y-6">
          <SectionLabel index="07">Reviews</SectionLabel>
          <SplitReveal as="h2" className="display text-d1">
            <span id="reviews-title">{home.reviews.title}</span>
          </SplitReveal>
        </div>
        <Button href={home.reviews.cta.href} variant="outline">
          {home.reviews.cta.label}
        </Button>
      </div>

      <div ref={bounds} className="gutter">
        <motion.ul
          drag="x"
          dragConstraints={bounds}
          dragElastic={0.08}
          data-cursor="Drag"
          className="flex w-max cursor-grab gap-[var(--gutter)] active:cursor-grabbing"
        >
          {reviews.map((r, i) => (
            <li
              key={i}
              className="relative flex w-[82vw] shrink-0 select-none flex-col justify-between gap-10 bg-paper p-[clamp(1.25rem,2.5vw,2.5rem)] sm:w-[56vw] lg:w-[34vw]"
            >
              <div className="flex items-start justify-between">
                <FlashIcon name="envelope" className="h-10 w-14" />
                {r.placeholder ? (
                  <span className="label bg-chilli px-2 py-1 text-paper">Placeholder</span>
                ) : null}
              </div>
              <blockquote className="display text-d4 leading-[1.15]">&ldquo;{r.quote}&rdquo;</blockquote>
              <div className="label flex justify-between border-t border-maroon/20 pt-4">
                <span>{r.name}</span>
                <span className="opacity-60">{r.detail}</span>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
