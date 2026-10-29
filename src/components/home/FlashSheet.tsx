"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { flashSheet, home } from "@/content/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const label = (name: string) => (name === "rocknroll" ? "Rock 'n' roll" : name.replace(/^\w/, (c) => c.toUpperCase()));

export function FlashSheet() {
  const root = useRef<HTMLElement>(null);
  const { flash } = home;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const grid = root.current!.querySelector("[data-grid]");
      gsap.from("[data-flash]", {
        autoAlpha: 0,
        scale: 0.4,
        rotate: () => gsap.utils.random(-40, 40),
        y: () => gsap.utils.random(40, 120),
        duration: 1.3,
        ease: "back.out(1.6)",
        stagger: { each: 0.045, from: "random" },
        scrollTrigger: { trigger: grid, start: "top 78%", once: true },
      });
      gsap.from("[data-rule-x]", {
        scaleX: 0,
        duration: 1.6,
        ease: "hb.inOut",
        stagger: 0.08,
        scrollTrigger: { trigger: grid, start: "top 85%", once: true },
      });
      gsap.from("[data-rule-y]", {
        scaleY: 0,
        duration: 1.6,
        ease: "hb.inOut",
        stagger: 0.08,
        scrollTrigger: { trigger: grid, start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-header="light" className="gutter relative bg-paper py-[clamp(5rem,10vw,10rem)]" aria-labelledby="flash-title">
      <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 pb-12 md:pb-16">
        <div className="col-span-12 space-y-6 lg:col-span-7">
          <SectionLabel index="04">{flash.eyebrow}</SectionLabel>
          <SplitReveal as="h2" className="display text-d1">
            <span id="flash-title">{flash.title}</span>
          </SplitReveal>
        </div>
        <div className="col-span-12 flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9">
          <p className="max-w-[24rem] text-[1.0625rem]">{flash.body}</p>
          <div>
            <Button href={flash.cta.href}>{flash.cta.label}</Button>
          </div>
        </div>
      </div>

      {/* The sheet */}
      <div data-grid className="relative border-maroon/25">
        {/* rules drawn in separately so they can animate */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span data-rule-x className="absolute inset-x-0 top-0 h-px origin-left bg-maroon/25" />
          <span data-rule-x className="absolute inset-x-0 bottom-0 h-px origin-right bg-maroon/25" />
          <span data-rule-y className="absolute inset-y-0 left-0 w-px origin-top bg-maroon/25" />
          <span data-rule-y className="absolute inset-y-0 right-0 w-px origin-bottom bg-maroon/25" />
        </div>

        <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
          {flashSheet.map((name, i) => {
            const no = String(i + 1).padStart(2, "0");
            return (
              <li key={name} className="border-b border-r border-maroon/15 [&:nth-child(3n)]:border-r-0 sm:[&:nth-child(3n)]:border-r sm:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(4n)]:border-r lg:[&:nth-child(6n)]:border-r-0">
                <Link
                  href={flash.cta.href}
                  data-cursor={`No. ${no}`}
                  aria-label={`Flash design No. ${no}, ${label(name)}`}
                  className="group relative flex aspect-square flex-col justify-between p-3 sm:p-4"
                >
                  <span className="label flex justify-between tabular-nums opacity-60 transition-opacity group-hover:opacity-100">
                    <span>No. {no}</span>
                  </span>
                  <span data-flash className="flex flex-1 items-center justify-center p-[12%]">
                    <FlashIcon
                      name={name}
                      className="h-full w-full transition-[color,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110 group-hover:text-chilli"
                    />
                  </span>
                  <span className="label relative h-[1.3em] overflow-hidden">
                    <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
                      {label(name)}
                    </span>
                    <span className="absolute inset-0 block translate-y-full text-chilli transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
                      Ask for No. {no}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
