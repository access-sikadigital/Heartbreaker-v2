"use client";

import { useEffect, useRef, useState } from "react";
import { Swallow } from "@/components/brand/Logo";
import { useLenis } from "@/components/providers/SmoothScroll";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { INTRO_KEY, markIntroDone } from "@/lib/intro";

/** Runs before paint (inline in <head>) so returning visitors never see the curtain flash. */
export const introSkipScript = `try{if(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const finished = useRef(false);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  // Lenis mounts after us; hold the page still until the curtain lifts.
  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && !finished.current) lenis.stop();
  }, [lenis]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const skip = document.documentElement.dataset.intro === "skip" || prefersReducedMotion();
      if (skip) {
        finished.current = true;
        markIntroDone();
        setGone(true);
        return;
      }

      window.scrollTo(0, 0);
      const count = { v: 0 };
      const counter = el.querySelector<HTMLElement>("[data-count]");

      const tl = gsap.timeline({
        defaults: { ease: "hb.inOut" },
        onComplete: () => {
          try {
            sessionStorage.setItem(INTRO_KEY, "1");
          } catch {}
          finished.current = true;
          lenisRef.current?.start();
          setGone(true);
        },
      });

      tl.set(el, { autoAlpha: 1 })
        .fromTo("[data-bird]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 }, 0.1)
        .fromTo("[data-bird]", { y: 30, rotate: -8 }, { y: 0, rotate: 0, duration: 1.5, ease: "hb.out" }, 0.1)
        .to(
          count,
          {
            v: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(count.v)).padStart(3, "0");
            },
          },
          0.05,
        )
        .fromTo("[data-line]", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.05)
        .from("[data-meta]", { yPercent: 110, duration: 0.9, ease: "hb.out", stagger: 0.06 }, 0.2)
        .to("[data-meta], [data-count]", { yPercent: -110, duration: 0.6, stagger: 0.03 }, 1.65)
        .to("[data-bird]", { y: -60, x: 80, rotate: -14, autoAlpha: 0, duration: 0.8, ease: "power3.in" }, 1.6)
        .add(() => markIntroDone(), 2.05)
        .to("[data-panel='front']", { yPercent: -100, duration: 1.1 }, 2.0)
        .to("[data-panel='back']", { yPercent: -100, duration: 1.1 }, 2.12);

      return () => {
        tl.kill();
        lenisRef.current?.start();
      };
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="hb-preloader pointer-events-auto fixed inset-0 z-[120]"
    >
      <div data-panel="back" className="absolute inset-0 bg-chilli" />
      <div data-panel="front" className="absolute inset-0 flex flex-col bg-maroon text-paper">
        <div className="flex flex-1 items-center justify-center">
          <div data-bird className="w-[min(34vw,180px)]">
            <Swallow className="w-full" />
          </div>
        </div>
        <div className="gutter pb-6 sm:pb-8">
          <div className="flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <p data-meta className="label">Fine line tattoo studio</p>
            </div>
            <div className="overflow-hidden">
              <p data-meta className="label hidden sm:block">Mornington, Victoria</p>
            </div>
            <div className="overflow-hidden">
              <span data-count className="display block text-d3 tabular-nums">
                000
              </span>
            </div>
          </div>
          <div data-line className="mt-4 h-px origin-left bg-paper/60" />
        </div>
      </div>
    </div>
  );
}
