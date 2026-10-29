"use client";

import Image from "next/image";
import { motion, type PanInfo } from "motion/react";
import { useEffect, useState } from "react";
import { AutoVideo } from "@/components/ui/AutoVideo";
import { Button } from "@/components/ui/Button";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { home } from "@/content/site";

type Shot = { kind: "image" | "video"; src: string; poster?: string; alt: string; note: string };

// Vinehop 2025 — the artist and her booth, no other identifiable studio staff
const shots: Shot[] = [
  { kind: "video", src: "/video/vinehop.mp4", poster: "/video/vinehop.jpg", alt: "Footage from the Heartbreaker Ink activation at Vinehop 2025", note: "On the day" },
  { kind: "image", src: "/images/events/artist-at-work.jpg", alt: "Artist tattooing a guest inside the Heartbreaker Ink booth at Vinehop", note: "Fine line, on site" },
  { kind: "image", src: "/images/events/get-your-tatts-out.jpg", alt: "Heartbreaker Ink event signage reading Get your tatts out", note: "The booth" },
  { kind: "image", src: "/images/events/flash-table.jpg", alt: "Flash sheet, wine and red heart sunglasses on the event table", note: "Pick off the sheet" },
  { kind: "image", src: "/images/events/artist-smile.jpg", alt: "Heartbreaker Ink artist smiling between guests at Vinehop", note: "Vinehop · 2025" },
];

// Resting pose for each depth in the pile (0 = top)
const pose = [
  { rotate: -3, x: 0, y: 0 },
  { rotate: 5, x: 18, y: 10 },
  { rotate: -8, x: -20, y: 16 },
  { rotate: 9, x: 26, y: 22 },
  { rotate: -5, x: -10, y: 28 },
];

const SHUFFLE_MS = 3600;

/**
 * Collabs & events — a pile of polaroids from Vinehop that shuffles itself. Toss the top one
 * aside (drag) or click it to send it to the back of the pile.
 */
export function Events() {
  const { events } = home;
  const [order, setOrder] = useState(() => shots.map((_, i) => i));
  const [hover, setHover] = useState(false);

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);

  useEffect(() => {
    if (hover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(next, SHUFFLE_MS);
    return () => clearTimeout(t);
  }, [order, hover]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) next();
  };

  return (
    <section data-header="light" className="gutter relative overflow-hidden bg-paper py-[clamp(4rem,8vw,7rem)]" aria-labelledby="events-title">
      <div className="grid grid-cols-12 items-center gap-x-[var(--gutter)] gap-y-14">
        {/* ── Polaroid pile */}
        <div className="order-2 col-span-12 flex justify-center lg:order-1 lg:col-span-6">
          <div
            className="relative aspect-[0.84] w-[min(78vw,27rem)]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            data-cursor="Toss"
          >
            {order.map((shotIndex, depth) => {
              const shot = shots[shotIndex];
              const top = depth === 0;
              const p = pose[depth] ?? pose[pose.length - 1];
              return (
                <motion.figure
                  key={shot.src}
                  className={`absolute inset-0 select-none bg-[#faf9f6] p-[5%] pb-[17%] shadow-[0_24px_50px_-22px_rgba(38,38,38,0.55)] ring-1 ring-ink/5 ${top ? "cursor-grab active:cursor-grabbing" : ""}`}
                  style={{ zIndex: shots.length - depth }}
                  initial={false}
                  animate={{ rotate: p.rotate, x: p.x, y: p.y, scale: 1 - depth * 0.025, opacity: depth > 3 ? 0 : 1 }}
                  transition={{ type: "spring", stiffness: 160, damping: 20 }}
                  drag={top ? "x" : false}
                  dragSnapToOrigin
                  dragElastic={0.6}
                  onDragEnd={top ? onDragEnd : undefined}
                  whileDrag={{ rotate: 0, scale: 1.04 }}
                  onTap={top ? next : undefined}
                >
                  <div className="relative h-full w-full overflow-hidden bg-ink">
                    {shot.kind === "video" ? (
                      <AutoVideo className="pointer-events-none h-full w-full object-cover" src={shot.src} poster={shot.poster} aria-label={shot.alt} />
                    ) : (
                      <Image src={shot.src} alt={shot.alt} fill draggable={false} sizes="(min-width: 1024px) 27rem, 78vw" className="pointer-events-none object-cover" />
                    )}
                  </div>
                  <figcaption className="absolute inset-x-[5%] bottom-[4%] flex items-end justify-between gap-3">
                    <span className="display text-[clamp(1.05rem,1.6vw,1.4rem)] leading-none text-maroon">{shot.note}</span>
                    <span className="label !text-[0.5625rem] text-maroon/60">
                      {String(shotIndex + 1).padStart(2, "0")}/{String(shots.length).padStart(2, "0")}
                    </span>
                  </figcaption>
                </motion.figure>
              );
            })}

            {/* tape */}
            <span aria-hidden className="absolute -top-4 left-1/2 z-20 h-8 w-28 -translate-x-1/2 rotate-[-4deg] bg-chilli/80 mix-blend-multiply" />
            <p className="label absolute -bottom-12 left-0 right-0 text-center opacity-60">Drag or tap to shuffle</p>
          </div>
        </div>

        {/* ── Copy */}
        <div className="order-1 col-span-12 flex flex-col gap-7 lg:order-2 lg:col-span-6">
          <SectionLabel index="06">{events.eyebrow}</SectionLabel>
          <h2 id="events-title" className="display text-d2">
            {events.title}
          </h2>
          <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed">
            {events.body} {events.detail}
          </p>

          <ul className="grid grid-cols-2 gap-px bg-maroon/15 sm:grid-cols-4">
            {events.types.map((t) => (
              <li key={t.label} className="group flex flex-col items-start gap-4 bg-paper p-4 transition-colors duration-500 hover:bg-maroon hover:text-paper">
                <FlashIcon name={t.icon} className="h-9 w-9 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-12 group-hover:scale-110" />
                <span className="text-[0.875rem] uppercase leading-tight tracking-[0.06em]">{t.label}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-start gap-4 border-l-2 border-chilli pl-4">
            <div>
              <p className="label mb-2 text-chilli">What&apos;s included</p>
              <p className="max-w-[32rem] text-[0.9375rem] leading-relaxed">{events.included}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href={events.cta.href}>{events.cta.label}</Button>
            <Button href="/flash" variant="outline">
              See the flash
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
