"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { home, work } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;
const ZOOM = 2.6;
const LENS = 190; // px diameter
const ADVANCE = 5000; // ms per piece when nobody's looking

/**
 * "The Loupe" — healed work on a light table. A large viewer plus a numbered contact sheet.
 * Over the viewer the cursor becomes a jeweller's loupe that magnifies the linework itself
 * (copy deck, Gallery: "Fine line comes down to the line itself. Worth seeing it at full size.").
 * Auto-advances while idle; pauses while you're looking.
 */
export function Work() {
  const [index, setIndex] = useState(0);
  const [lens, setLens] = useState(false);
  const [paused, setPaused] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const viewer = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.4 });
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);
  const six = useSpring(ix, { stiffness: 420, damping: 36, mass: 0.4 });
  const siy = useSpring(iy, { stiffness: 420, damping: 36, mass: 0.4 });

  const item = work[index];
  const count = String(work.length).padStart(2, "0");

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % work.length), ADVANCE);
    return () => clearTimeout(t);
  }, [index, paused]);

  // Track viewer size for the magnified layer
  useEffect(() => {
    const el = viewer.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    x.set(px - LENS / 2);
    y.set(py - LENS / 2);
    // shift the zoomed copy so the point under the cursor sits in the lens centre
    ix.set(-(px * ZOOM - LENS / 2));
    iy.set(-(py * ZOOM - LENS / 2));
  };

  const go = (i: number) => setIndex((i + work.length) % work.length);

  return (
    <section data-header="dark" className="relative overflow-hidden bg-maroon text-paper" aria-labelledby="work-title">
      <div className="gutter py-[clamp(4rem,8vw,7rem)]">
        {/* Heading row */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8 md:pb-10">
          <div className="space-y-4">
            <SectionLabel index="03">Selected work</SectionLabel>
            <h2 id="work-title" className="display text-d2">
              {home.work.title}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="text-[0.9375rem] uppercase tracking-[0.08em]">{home.work.subtitle}</p>
            <Button href={home.work.cta.href} variant="paper">
              {home.work.cta.label}
            </Button>
          </div>
        </div>

        {/* lg: one shared height so the viewer and the contact sheet always line up top and bottom */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6 lg:h-[min(82svh,54rem)]">
          {/* ── Viewer */}
          <div className="col-span-12 lg:col-span-7 lg:h-full">
            <div
              ref={viewer}
              data-cursor="hide"
              onPointerEnter={(e) => {
                setPaused(true);
                if (e.pointerType === "mouse") setLens(true);
              }}
              onPointerMove={onMove}
              onPointerLeave={() => {
                setLens(false);
                setPaused(false);
              }}
              className="relative aspect-[4/5] overflow-hidden bg-maroon-deep sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:cursor-none"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={item.src}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0.999, transition: { duration: 0.9 } }}
                  transition={{ duration: 0.9, ease }}
                >
                  <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease }}>
                    <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" quality={85} className="object-cover" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Light-table frame marks */}
              <div aria-hidden className="pointer-events-none absolute inset-3 border border-paper/25" />
              {["left-3 top-3", "right-3 top-3 rotate-90", "bottom-3 right-3 rotate-180", "bottom-3 left-3 -rotate-90"].map((pos) => (
                <span key={pos} aria-hidden className={`pointer-events-none absolute h-5 w-5 border-l-2 border-t-2 border-paper ${pos}`} />
              ))}

              {/* Readout */}
              <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={item.caption}
                    className="label bg-paper px-2.5 py-1.5 text-maroon"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    {String(index + 1).padStart(2, "0")} / {count} — {item.caption}
                  </motion.p>
                </AnimatePresence>
                <p className="label hidden bg-ink/60 px-2.5 py-1.5 backdrop-blur-sm lg:block">Hover to see the line</p>
              </div>

              {/* The loupe */}
              <AnimatePresence>
                {lens && size.w > 0 ? (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 z-10"
                    style={{ x: sx, y: sy, width: LENS, height: LENS }}
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.3, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-ink shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] ring-2 ring-paper">
                      <motion.div className="absolute left-0 top-0" style={{ x: six, y: siy, width: size.w * ZOOM, height: size.h * ZOOM }}>
                        <Image src={item.src} alt="" fill sizes="150vw" quality={90} className="object-cover" />
                      </motion.div>
                      {/* crosshair */}
                      <span className="absolute left-1/2 top-[18%] h-[18%] w-px -translate-x-1/2 bg-chilli" />
                      <span className="absolute bottom-[18%] left-1/2 h-[18%] w-px -translate-x-1/2 bg-chilli" />
                      <span className="absolute left-[18%] top-1/2 h-px w-[18%] -translate-y-1/2 bg-chilli" />
                      <span className="absolute right-[18%] top-1/2 h-px w-[18%] -translate-y-1/2 bg-chilli" />
                      <span className="absolute inset-[10px] rounded-full border border-paper/30" />
                    </div>
                    <span className="label absolute -bottom-7 left-1/2 -translate-x-1/2 bg-chilli px-1.5 py-0.5 !text-[0.625rem] text-paper">×{ZOOM}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Contact sheet */}
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-5 lg:h-full lg:min-h-0">
            <div className="hidden space-y-3 lg:block">
              <p className="label opacity-70">Shown big on purpose</p>
              <p className="max-w-[26rem] text-[1.0625rem] leading-relaxed">
                Fine line comes down to the line itself. Worth seeing it at full size.
              </p>
            </div>

            <ul
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
              className="flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-3 lg:grid-rows-3 lg:gap-2.5 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              {work.map((w, i) => {
                const on = i === index;
                return (
                  <li key={w.src} className="w-[26vw] shrink-0 snap-start sm:w-[18vw] lg:h-full lg:min-h-0 lg:w-auto">
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show ${w.caption}`}
                      aria-pressed={on}
                      className="group relative block aspect-square w-full overflow-hidden bg-maroon-deep lg:aspect-auto lg:h-full"
                    >
                      <Image
                        src={w.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 12vw, 26vw"
                        className={`object-cover transition-[filter,opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${
                          on ? "scale-105 opacity-100 grayscale-0" : "opacity-55 grayscale group-hover:opacity-90 group-hover:grayscale-0"
                        }`}
                      />
                      <span className={`label absolute left-2 top-2 tabular-nums ${on ? "bg-chilli px-1.5 text-paper" : "text-paper/80"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`pointer-events-none absolute inset-0 ring-2 ring-inset transition-colors duration-500 ${on ? "ring-chilli" : "ring-transparent"}`} />
                      {/* auto-advance progress */}
                      {on ? (
                        <span
                          key={`${index}-${paused}`}
                          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-chilli"
                          style={{ animation: paused ? "none" : `hb-progress ${ADVANCE}ms linear forwards`, transform: paused ? "scaleX(1)" : undefined }}
                        />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-paper/20 pt-4">
              <p className="label opacity-70">
                <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span> / {count} · Healed, photographed after the session
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(index - 1)} aria-label="Previous piece" className="flex h-10 w-10 items-center justify-center border border-paper/40 transition-colors hover:border-paper hover:bg-paper hover:text-maroon">
                  ←
                </button>
                <button type="button" onClick={() => go(index + 1)} aria-label="Next piece" className="flex h-10 w-10 items-center justify-center border border-paper/40 transition-colors hover:border-paper hover:bg-paper hover:text-maroon">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
