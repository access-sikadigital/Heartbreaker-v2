"use client";

import Link from "next/link";
import { useRef } from "react";
import { AutoVideo } from "@/components/ui/AutoVideo";
import { Button } from "@/components/ui/Button";
import { cta, home } from "@/content/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { InkLine } from "./InkLine";

/** Studio reels (Zaya guest spot campaign), trimmed before their end cards. */
const reels = [
  { src: "/video/reel-reveals.mp4", poster: "/video/reel-reveals.jpg", label: "Fresh · Forearm" },
  // centre column — also the only reel shown on phones
  { src: "/video/reel-back.mp4", poster: "/video/reel-back.jpg", label: "Floral · Back" },
  { src: "/video/reel-spine.mp4", poster: "/video/reel-spine.jpg", label: "Script · Spine" },
];

const mobileChips = [
  { label: "Fine line", href: "/fine-line-tattoos" },
  { label: "Script", href: "/fine-line-tattoos/script-lettering" },
  { label: "Custom", href: "/fine-line-tattoos/custom-tattoos" },
  { label: "Flash", href: "/flash" },
];

// "FINE LINES." is drawn as a hairline outline — literally fine lines. "HEAVY FEELINGS." is solid.
const lineA = "Fine lines.";
const lineB = "Heavy feelings.";

const chars = (text: string, cls: string) =>
  text.split("").map((ch, i) => (
    <span key={i} data-char className={`inline-block ${cls}`}>
      {ch === " " ? " " : ch}
    </span>
  ));

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      const intro = gsap.timeline({ paused: true, defaults: { ease: "hb.out" } });

      intro
        // curtains lift off each column (transform only — clip-path on video re-rasterises every frame)
        .fromTo("[data-curtain]", { scaleY: 1 }, { scaleY: 0, duration: 1.5, ease: "hb.inOut", stagger: 0.12 }, 0)
        .fromTo("[data-reel]", { scale: 1.3 }, { scale: 1.08, duration: 2.2 }, 0)
        .fromTo("[data-rule]", { scaleY: 0 }, { scaleY: 1, duration: 1.6, ease: "hb.inOut", stagger: 0.1 }, 0.3)
        .from("[data-char]", { yPercent: 115, rotate: 8, duration: 1.1, stagger: 0.028 }, 0.7)
        .from("[data-rise]", { yPercent: 110, duration: 1.1, stagger: 0.08 }, 1.25)
        .from("[data-fade-in]", { autoAlpha: 0, y: 14, duration: 1, stagger: 0.08 }, 1.4);

      if (reduce) intro.progress(1);
      const stop = onIntroDone(() => intro.play());
      if (reduce) return stop;

      // Scroll: the reels drift down behind the type as it lifts away
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      tl.to("[data-reel]", { yPercent: 10 }, 0)
        .to("[data-shade]", { opacity: 1 }, 0).to("[data-lift]", { y: () => -window.innerHeight * 0.2, autoAlpha: 0, stagger: 0.04 }, 0);

      return stop;
    },
    { scope: root },
  );

  return (
    <section ref={root} data-header="dark" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      {/* ── Reels. Desktop: ONE side-by-side video of all three (one decoder instead of three — the difference
          between 30 and 60fps). The frame keeps the video's aspect while covering the hero, so the column
          rules and labels always sit exactly on the seams. Phones: just the centre reel. */}
      <div className="absolute inset-0 hidden overflow-hidden [container-type:size] md:block">
        <div
          data-reel
          className="absolute left-1/2 top-1/2 aspect-[1620/960] w-[max(100cqw,calc(100cqh*1.6875))] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        >
          <AutoVideo className="absolute inset-0 h-full w-full" src="/video/reels-triptych.mp4" poster="/video/reels-triptych.jpg" preload="auto" aria-hidden />
          <div aria-hidden className="absolute inset-0 grid grid-cols-3">
            {reels.map((r, i) => (
              <div key={r.src} className="relative">
                <span data-curtain className="absolute inset-0 origin-top bg-ink will-change-transform" />
                <span className="label absolute left-[calc(12%_+_0.5rem)] top-[calc(50%_-_50cqh_+_var(--header-h)_+_5.5rem)] text-paper/80">
                  {String(i + 1).padStart(2, "0")} — {r.label}
                </span>
              </div>
            ))}
          </div>
          <span data-rule className="absolute inset-y-0 left-1/3 w-px origin-top bg-paper/35" />
          <span data-rule className="absolute inset-y-0 left-2/3 w-px origin-bottom bg-paper/35" />
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden md:hidden">
        <div data-reel className="absolute inset-0 will-change-transform">
          <AutoVideo className="absolute inset-0 h-full w-full object-cover" src={reels[1].src} poster={reels[1].poster} preload="auto" aria-hidden />
          <span data-curtain className="absolute inset-0 origin-top bg-ink will-change-transform" />
        </div>
      </div>

      {/* ── Overlay: maroon wash + depth */}
      <div aria-hidden className="absolute inset-0 bg-[rgba(48,6,6,0.55)]" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/85" />
      <div aria-hidden data-shade className="absolute inset-0 bg-maroon-deep/70 opacity-0" />

      {/* ── Live needle line */}
      <InkLine />

      {/* Outline filter: traces only the outer edge of solid glyphs. Unlike text-stroke it doesn't draw
          the seams where the font's contours overlap (visible inside the F). */}
      <svg aria-hidden className="absolute h-0 w-0">
        <filter id="hb-outline" x="-20%" y="-10%" width="140%" height="120%">
          <feMorphology in="SourceAlpha" operator="erode" radius="1.5" result="inner" />
          <feComposite in="SourceGraphic" in2="inner" operator="out" />
        </filter>
      </svg>

      {/* ── Type */}
      <div className="gutter relative flex h-full flex-col justify-end pb-[clamp(1.75rem,5vh,3.5rem)]">
        {/* Phones only: what's playing behind + service chips (the utility strip already says bookings are open) */}
        <ul data-lift className="mb-5 flex flex-wrap gap-2 md:hidden">
          <li data-fade-in className="label flex items-center gap-2 bg-paper px-2.5 py-1.5 !text-[0.625rem] text-maroon">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chilli opacity-90" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-chilli" />
            </span>
            Now playing · {reels[1].label}
          </li>
          {mobileChips.map((c) => (
            <li key={c.href} data-fade-in>
              <Link href={c.href} prefetch={false} className="label block border border-paper/45 px-2.5 py-1.5 !text-[0.625rem] backdrop-blur-sm transition-colors active:bg-paper active:text-maroon">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>

        <h2 aria-label={`${lineA} ${lineB}`} className="display pointer-events-none select-none text-[12.2vw] !leading-[0.9] md:text-[clamp(2.4rem,9.4vw,11.5rem)]">
          {/* Side padding + matching negative margin: the mask keeps its rise animation without
              shaving off glyphs (and the outline stroke) that sit past the text box edge, like the F */}
          <span data-lift aria-hidden className="-mx-[0.08em] block overflow-hidden px-[0.08em] pb-[0.04em] will-change-transform">
            <span className="block [filter:url(#hb-outline)]">{chars(lineA, "")}</span>
          </span>
          <span data-lift aria-hidden className="-mx-[0.08em] block overflow-hidden px-[0.08em] pb-[0.04em] will-change-transform">
            {chars(lineB, "")}
          </span>
        </h2>

        <div className="mt-[clamp(1.25rem,3.5vh,2.5rem)] flex flex-col gap-5 border-t border-paper/25 pt-5 md:flex-row md:items-end md:justify-between">
          <h1 id="hero-title" data-lift className="label !text-[clamp(0.75rem,1vw,0.875rem)] !leading-[1.7]">
            <span className="block overflow-hidden">
              <span data-rise className="block">
                Fine line tattoo studio
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-rise className="block">
                on the Mornington Peninsula
              </span>
            </span>
          </h1>

          {/* Phones only: copy deck, Home → The Studio */}
          <p data-lift data-fade-in className="max-w-[22rem] text-[0.9375rem] leading-relaxed text-paper/85 md:hidden">
            {home.intro.lede}
          </p>

          <p data-lift data-fade-in className="label hidden opacity-70 lg:block">
            Move your cursor — leave a fine line
          </p>

          <div data-lift data-fade-in className="flex flex-wrap items-center gap-3">
            <Button href={cta.book.href} variant="paper" size="lg">
              {cta.book.label}
            </Button>
            <Button href="/gallery" variant="outline-paper" size="lg">
              See the work
            </Button>
          </div>
        </div>

        <p data-lift data-fade-in className="label mt-4 opacity-70 md:hidden">
          {home.hero.eyebrow}
        </p>
      </div>
    </section>
  );
}
