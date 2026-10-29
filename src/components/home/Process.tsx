"use client";

import { useRef } from "react";
import { Swallow } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cta, home } from "@/content/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Ticket-edge notches where the perforations meet the top / bottom edge
const NOTCH = "radial-gradient(circle at 50% 0, var(--color-ink) 9px, transparent 9.5px)";
const NOTCH_B = "radial-gradient(circle at 50% 100%, var(--color-ink) 9px, transparent 9.5px)";
// Speckled mask so the stamp reads as ink pressed onto paper, not a flat box
const STAMP_TEXTURE = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="140" height="70"><filter id="r"><feTurbulence baseFrequency=".85" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.4 1.75"/></filter><rect width="100%" height="100%" filter="url(#r)"/></svg>',
)}")`;

/**
 * "How it works" as a vintage appointment ticket. Four tear-off stubs, one per step, slide in
 * as the section arrives, then a BOOKED rubber stamp lands on the ticket.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const { process } = home;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-ticket]", start: "top 75%", once: true } });
      tl.from("[data-ticket]", { y: 60, rotate: -1.5, autoAlpha: 0, duration: 1.1, ease: "hb.out" })
        .from("[data-stub]", { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "hb.out" }, "-=0.6")
        .from("[data-perf]", { scaleY: 0, duration: 0.8, stagger: 0.1, ease: "hb.inOut" }, "<")
        .fromTo(
          "[data-stamp]",
          { scale: 2.6, rotate: -32, autoAlpha: 0 },
          { scale: 1, rotate: -14, autoAlpha: 1, duration: 0.45, ease: "back.out(2.4)" },
          "+=0.1",
        )
        .fromTo("[data-ticket]", { x: 0 }, { x: 4, duration: 0.06, repeat: 3, yoyo: true, ease: "none" }, "<+0.18");
    },
    { scope: root },
  );

  return (
    <section ref={root} data-header="dark" className="gutter relative overflow-hidden bg-ink py-[clamp(4rem,8vw,7rem)] text-paper" aria-labelledby="process-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-4">
          <SectionLabel index="05">The process</SectionLabel>
          <h2 id="process-title" className="display text-d2">
            {process.title}
          </h2>
        </div>
        <p className="max-w-[26rem] text-[0.9375rem] leading-relaxed opacity-85">
          Four steps from first message to fully healed. No surprises on price, no rushing on the day.
        </p>
      </div>

      {/* ── The ticket */}
      <div data-ticket className="relative mt-[clamp(2.5rem,5vw,4rem)] flex flex-col bg-paper text-maroon shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] lg:flex-row">
        {/* Spine */}
        <div className="relative flex items-center justify-between gap-4 border-b border-dashed border-maroon/40 bg-maroon px-5 py-4 text-paper lg:w-24 lg:flex-col lg:justify-center lg:border-b-0 lg:border-r lg:px-0 lg:py-8">
          <Swallow className="w-9 shrink-0 lg:w-12" body="var(--color-chilli)" />
          <p className="label whitespace-nowrap lg:[writing-mode:vertical-rl] lg:rotate-180">Heartbreaker Ink · Appointment</p>
        </div>

        {/* Stubs */}
        <ol className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s, i) => (
            <li key={s.n} className="relative">
              {/* perforation + notches between stubs */}
              {i > 0 ? (
                <>
                  <span data-perf aria-hidden className="absolute inset-y-4 left-0 hidden w-0 origin-top border-l-2 border-dotted border-maroon/35 lg:block" />
                  <span aria-hidden className="absolute -left-[9.5px] -top-px hidden h-[10px] w-[19px] lg:block" style={{ background: NOTCH }} />
                  <span aria-hidden className="absolute -bottom-px -left-[9.5px] hidden h-[10px] w-[19px] lg:block" style={{ background: NOTCH_B }} />
                  <span aria-hidden className="absolute inset-x-4 top-0 border-t-2 border-dotted border-maroon/35 lg:hidden" />
                </>
              ) : null}

              {/* outer = GSAP entrance, inner = CSS hover lift (two transforms on one node fight each other) */}
              <div data-stub className="h-full">
              <div className="group grid h-full grid-cols-[3.5rem_1fr] gap-x-4 p-5 transition-[transform,background-color] sm:flex sm:min-h-[19rem] sm:flex-col sm:p-[clamp(1.25rem,2vw,2rem)] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:-rotate-[0.8deg] hover:bg-[#f8f7f4]">
                <div className="row-span-3 flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <span className="display text-[2.6rem] leading-[0.8] tabular-nums sm:text-[clamp(3.25rem,5vw,5rem)]">{s.n}</span>
                  <FlashIcon name={s.icon} className="h-9 w-9 transition-transform sm:h-[clamp(2.75rem,3.6vw,3.75rem)] sm:w-[clamp(2.75rem,3.6vw,3.75rem)] duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-12 group-hover:scale-110" />
                </div>
                <h3 className="display text-d4 sm:mt-8">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed sm:mt-3">{s.body}</p>
                <p className="label mt-3 flex items-start gap-2 text-chilli sm:mt-auto sm:border-t sm:border-maroon/15 sm:pt-4">
                  <span aria-hidden className="mt-[0.35em] block h-1.5 w-1.5 shrink-0 rounded-full bg-chilli" />
                  {s.meta}
                </p>
              </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Barcode end */}
        <div aria-hidden className="relative hidden w-28 flex-col items-center justify-between border-l-2 border-dotted border-maroon/35 py-8 xl:flex">
          <span className="absolute -left-[9.5px] -top-px h-[10px] w-[19px]" style={{ background: NOTCH }} />
          <span className="absolute -bottom-px -left-[9.5px] h-[10px] w-[19px]" style={{ background: NOTCH_B }} />
          <span className="label [writing-mode:vertical-rl]">No. 0001</span>
          <span className="flex h-40 w-12 flex-col justify-between">
            {[3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 2, 4, 1, 2, 1, 3, 1].map((h, k) => (
              <span key={k} className="block w-full bg-maroon" style={{ height: h }} />
            ))}
          </span>
          <span className="label [writing-mode:vertical-rl]">Mornington</span>
        </div>

        {/* Rubber stamp */}
        <div
          data-stamp
          aria-hidden
          style={{ maskImage: STAMP_TEXTURE, WebkitMaskImage: STAMP_TEXTURE }}
          className="pointer-events-none absolute right-3 top-[4.75rem] origin-top-right scale-[0.7] sm:bottom-[24%] sm:right-[6%] sm:top-auto sm:scale-100 z-10 rotate-[-14deg] border-[3px] border-chilli px-4 py-2 text-chilli mix-blend-multiply xl:right-[11%]"
        >
          <span className="display block text-[clamp(1.9rem,3.4vw,3.25rem)] leading-none">Booked</span>
          <span className="label mt-1 block text-center !text-[0.625rem]">Deposit holds the date</span>
        </div>
      </div>

      <div className="mt-[clamp(2rem,4vw,3rem)] flex flex-wrap items-center gap-3">
        <Button href={cta.book.href} variant="paper">
          {cta.book.label}
        </Button>
        <Button href="/aftercare" variant="outline-paper">
          Read the aftercare
        </Button>
      </div>
    </section>
  );
}
