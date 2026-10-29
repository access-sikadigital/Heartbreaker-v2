"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { Swallow } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { home } from "@/content/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Three rows of type that slide against each other on scroll
const rows = [
  { words: ["Fine line", "Tattoo studio"], dir: -1, cls: "text-maroon" },
  { words: ["In Mornington", "All drawn by hand"], dir: 1, cls: "text-transparent [-webkit-text-stroke:1.5px_var(--color-maroon)]" },
  { words: ["Small pieces", "Big custom work"], dir: -1, cls: "text-chilli" },
];

// Round flash stickers you can pick up and move
const stickers = [
  { icon: "moth", cls: "left-[3%] top-[-6%] md:left-[6%] md:top-[8%] bg-chilli text-paper", rot: -14, size: "w-[13vw] md:w-[clamp(3.75rem,6vw,5.75rem)]" },
  { icon: "rose", cls: "right-[3%] top-[30%] md:right-[8%] md:top-[4%] bg-paper text-maroon ring-1 ring-maroon", rot: 10, size: "w-[12vw] md:w-[clamp(3.5rem,5.4vw,5.25rem)]" },
  { icon: "snake", cls: "left-[16%] bottom-[6%] hidden md:flex bg-maroon text-paper", rot: 8, size: "w-[clamp(3.5rem,5.8vw,5.5rem)]" },
  { icon: "sun", cls: "right-[18%] bottom-[2%] hidden md:flex bg-paper-dim text-maroon ring-1 ring-maroon", rot: -6, size: "w-[clamp(3rem,4.8vw,4.5rem)]" },
  { icon: "dice", cls: "right-[34%] top-[0%] hidden md:flex bg-ink text-paper", rot: 18, size: "w-[clamp(3rem,4.4vw,4.25rem)]" },
];

export function Intro() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { intro } = home;

  // 3D tilt on the portrait card
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      root.current!.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
        const dir = Number(row.dataset.dir);
        gsap.fromTo(
          row,
          { xPercent: dir < 0 ? 0 : -22 },
          {
            xPercent: dir < 0 ? -22 : 0,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
      gsap.fromTo(
        "[data-card]",
        { yPercent: 14, rotate: -9 },
        { yPercent: -10, rotate: -3, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.from("[data-tile]", {
        y: 40,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-tiles]", start: "top 88%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-header="light" className="relative overflow-hidden bg-paper pb-[clamp(2.5rem,5vw,4.5rem)] pt-[clamp(3rem,6vw,5rem)]" aria-labelledby="intro-title">
      <h2 id="intro-title" className="sr-only">
        {intro.title} {intro.lede}
      </h2>

      <div className="gutter mb-6 flex items-center justify-between gap-6">
        <SectionLabel index="01">The studio</SectionLabel>
        <p className="label hidden opacity-60 sm:block">Drag the flash ↓</p>
      </div>

      {/* ── Stage: type rows + card + stickers */}
      <div ref={stage} className="relative" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div aria-hidden className="select-none">
          {rows.map((row, i) => (
            <div key={i} className="overflow-hidden whitespace-nowrap">
              <div data-row data-dir={row.dir} className={`display flex w-max items-center will-change-transform [backface-visibility:hidden] text-[15vw] !leading-[0.84] md:text-[clamp(2.75rem,10.6vw,12.5rem)] ${row.cls}`}>
                {Array.from({ length: 4 }).flatMap((_, k) =>
                  row.words.map((w, j) => (
                    <span key={`${k}-${j}`} className="flex items-center">
                      <span className="px-[0.12em]">{w}</span>
                      <Swallow className="mx-[0.12em] w-[0.62em] shrink-0 text-maroon" body={i === 2 ? "var(--color-paper)" : "none"} />
                    </span>
                  )),
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Portrait card */}
        <div className="pointer-events-none relative -mt-[9vw] flex flex-col items-center [perspective:1200px] md:absolute md:inset-0 md:mt-0 md:justify-center">
          <motion.div
            data-card
            style={{ rotateX: srx, rotateY: sry }}
            className="pointer-events-auto relative w-[56vw] [transform-style:preserve-3d] md:w-[min(40vw,17.5rem)]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-ink shadow-[0_40px_80px_-30px_rgba(38,38,38,0.6)] ring-[6px] ring-paper">
              <Image
                src="/images/studio/crouch.jpg"
                alt="Heartbreaker Ink artist crouching against a brushed steel wall, chin resting on her hands"
                fill
                sizes="(min-width: 768px) 17.5rem, 56vw"
                className="object-cover"
              />
            </div>

            {/* Spinning badge */}
            <div className="absolute -right-[22%] -top-[14%] w-[44%] [transform:translateZ(40px)]">
              <div className="relative aspect-square rounded-full bg-chilli text-paper shadow-lg">
                <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]" aria-hidden>
                  <defs>
                    <path id="hb-badge" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
                  </defs>
                  <text className="fill-current font-[family-name:var(--font-mono)] text-[15px] uppercase">
                    <textPath href="#hb-badge" textLength="460" lengthAdjust="spacing">
                      Drawn by hand · Single needle · Fine line ·
                    </textPath>
                  </text>
                </svg>
                <Swallow className="absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Paper tag */}
            <div className="relative -mt-5 ml-[8%] w-[92%] rotate-[3deg] border border-maroon bg-paper p-3 shadow-md sm:p-4 md:absolute md:-bottom-[10%] md:-left-[22%] md:ml-0 md:mt-0 md:[transform:translateZ(30px)_rotate(4deg)]">
              <p className="label mb-2 !text-[0.625rem] text-maroon/70">A note from the studio</p>
              <p className="text-[clamp(0.8125rem,1vw,0.9375rem)] leading-snug">{intro.aside}</p>
            </div>
          </motion.div>
        </div>

        {/* Stickers */}
        {stickers.map((s, i) => (
          <motion.button
            key={s.icon}
            type="button"
            aria-label={`Flash sticker: ${s.icon}`}
            data-cursor="Drag"
            drag
            dragConstraints={stage}
            dragElastic={0.18}
            dragTransition={{ bounceStiffness: 260, bounceDamping: 18 }}
            initial={{ scale: 0, rotate: s.rot - 40 }}
            whileInView={{ scale: 1, rotate: s.rot, transition: { type: "spring", stiffness: 220, damping: 14, delay: 0.15 + i * 0.08 } }}
            viewport={{ once: true, margin: "-15% 0px" }}
            whileHover={{ scale: 1.08, rotate: s.rot - 8 }}
            whileDrag={{ scale: 1.15, rotate: s.rot + 12, zIndex: 30 }}
            className={`absolute z-20 flex aspect-square cursor-grab touch-none items-center justify-center rounded-full shadow-[0_14px_30px_-12px_rgba(38,38,38,0.5)] active:cursor-grabbing ${s.size} ${s.cls}`}
          >
            <FlashIcon name={s.icon} className="pointer-events-none h-[58%] w-[58%]" />
          </motion.button>
        ))}
      </div>

      {/* ── Compact strip: story + promises */}
      <div className="gutter mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
        <div className="col-span-12 flex flex-col justify-between gap-6 lg:col-span-4">
          <p className="text-[1.0625rem] leading-relaxed">{intro.story[0]}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={intro.cta.href}>{intro.cta.label}</Button>
            <Button href={intro.more.href} variant="outline">
              {intro.more.label}
            </Button>
          </div>
        </div>

        <ul data-tiles className="col-span-12 grid grid-cols-1 gap-px bg-maroon/20 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
          {intro.promises.map((p, i) => (
            <li key={p.title} data-tile className="group relative overflow-hidden bg-paper p-5 transition-colors duration-500 hover:text-paper">
              <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-maroon transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
              <div className="relative flex items-center justify-between">
                <span className="label tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <FlashIcon name={p.icon} className="h-9 w-9 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-12 group-hover:scale-110" />
              </div>
              <h3 className="relative mt-6 text-[1.0625rem] uppercase leading-tight tracking-[0.06em]">{p.title}</h3>
              <p className="relative mt-3 text-[0.9375rem] leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
