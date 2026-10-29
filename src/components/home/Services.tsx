"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Swallow } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { serviceList } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;
const COPIES = 3; // the hand is repeated so the loop never shows a gap
const AUTO_SPEED = 0.55; // px per frame (~33px/s)

type Service = (typeof serviceList)[number];

/**
 * "Pick where to start" — the services as an endless hand of flash cards on a wheel.
 * Cards drift continuously; each one rises and straightens as it passes the centre and tilts away
 * at the edges. Drag (mouse or touch) to spin it with momentum; scrolling the page nudges it too.
 * Hovering a card slows the wheel to a stop, lifts the card and shows its details below.
 */
export function Services() {
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  const drag = useRef({ down: false, moved: 0, lastX: 0, lastT: 0, v: 0 });
  const current = active === null ? null : serviceList[active];

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = cards.current.filter(Boolean) as HTMLLIElement[];
    let offset = 0;
    let velocity = 0; // momentum from drags / scroll
    let speed = reduce ? 0 : AUTO_SPEED;
    let lastScroll = window.scrollY;
    let raf = 0;
    let visible = true;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const w = items[0]?.offsetWidth ?? 0;
      if (!w) return;
      const step = w * 0.86;
      const total = step * items.length;
      const half = el.clientWidth / 2;
      const arc = el.clientWidth < 768 ? 0.1 : 0.22; // flatter on phones so edge cards stay above the copy

      // ease the auto-drift to a stop while a card is hovered or held
      const target = reduce || activeRef.current !== null || drag.current.down ? 0 : AUTO_SPEED;
      speed += (target - speed) * 0.06;

      // page scroll nudges the wheel
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (!reduce) velocity += dy * 0.12;

      if (!drag.current.down) {
        offset -= speed + velocity;
        velocity *= 0.94;
        if (Math.abs(velocity) < 0.01) velocity = 0;
      }

      for (let i = 0; i < items.length; i++) {
        // position along the loop, wrapped to [-total/2, total/2) around the centre
        let x = (((i * step + offset) % total) + total) % total;
        if (x >= total / 2) x -= total;
        const t = Math.max(-1.4, Math.min(1.4, x / Math.max(half, 1))); // -1 left edge … 1 right edge
        const y = Math.min(t * t, 1) * w * arc; // arc
        const r = t * 9; // tilt
        const s = 1 - Math.min(Math.abs(t), 1) * 0.1;
        const card = items[i];
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`;
        card.style.zIndex = String(1000 - Math.round(Math.abs(x)));
      }
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);

    // Drag with momentum
    const onDown = (e: PointerEvent) => {
      drag.current = { down: true, moved: 0, lastX: e.clientX, lastT: performance.now(), v: 0 };
      velocity = 0;
    };
    const onMove = (e: PointerEvent) => {
      const d = drag.current;
      if (!d.down) return;
      const now = performance.now();
      const dx = e.clientX - d.lastX;
      offset += dx;
      d.moved += Math.abs(dx);
      d.v = dx / Math.max(1, now - d.lastT);
      d.lastX = e.clientX;
      d.lastT = now;
      if (d.moved > 6) el.classList.add("is-dragging");
    };
    const onUp = () => {
      const d = drag.current;
      if (!d.down) return;
      d.down = false;
      velocity = -d.v * 16; // fling
      el.classList.remove("is-dragging");
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  // A drag should never count as a click on the card underneath
  const guardClick = (e: ReactMouseEvent) => {
    if (drag.current.moved > 6) e.preventDefault();
  };

  const hand = Array.from({ length: COPIES }).flatMap((_, copy) => serviceList.map((s, i) => ({ s, i, key: `${copy}-${s.href}`, copy })));

  return (
    <section data-header="light" className="relative overflow-hidden bg-paper py-[clamp(4rem,8vw,7rem)]" aria-labelledby="services-title">
      {/* Heading */}
      <div className="gutter flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-4">
          <SectionLabel index="02">Services</SectionLabel>
          <h2 id="services-title" className="display text-d2">
            Pick where to start
          </h2>
        </div>
        <p className="max-w-[24rem] text-[0.9375rem] leading-relaxed">
          Fine line is what we do. Single needle, drawn by hand, sized for the body it&apos;s going on.
        </p>
      </div>

      {/* The wheel */}
      <div
        ref={stage}
        data-cursor="Drag"
        onMouseLeave={() => setActive(null)}
        // `isolate`: cards juggle z-index up to 1000 among themselves — keep that inside the wheel so they
        // never paint over the header or the custom cursor's "Drag" disc
        className="relative isolate mt-[clamp(1.5rem,3vw,2.5rem)] h-[calc(min(64vw,20rem)*1.6+9rem)] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[calc(min(40vw,20rem)*1.6+8rem)] lg:h-[calc(min(19vw,20rem)*1.6+9rem)] [&.is-dragging_a]:pointer-events-none"
      >
        {/* Drag affordance — visible on touch too, where there's no custom cursor */}
        <p
          aria-hidden
          className={`label pointer-events-none absolute left-1/2 top-0 z-[1100] flex -translate-x-1/2 items-center gap-3 bg-maroon px-3 py-1.5 text-paper transition-opacity duration-300 ${
            active === null ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="animate-[nudge-l_1.6s_ease-in-out_infinite]">←</span>
          Drag to spin
          <span className="animate-[nudge-r_1.6s_ease-in-out_infinite]">→</span>
        </p>
        <ul aria-label="Services">
          {hand.map(({ s, i, key, copy }, n) => (
            <li
              key={key}
              ref={(el) => {
                cards.current[n] = el;
              }}
              aria-hidden={copy > 0 || undefined}
              onMouseEnter={() => setActive(i)}
              className="group/card absolute left-1/2 top-[3.5rem] -ml-[calc(min(64vw,20rem)/2)] w-[min(64vw,20rem)] will-change-transform before:absolute before:inset-x-0 before:-top-16 before:bottom-0 before:content-[''] sm:-ml-[calc(min(40vw,20rem)/2)] sm:w-[min(40vw,20rem)] lg:-ml-[calc(min(19vw,20rem)/2)] lg:w-[min(19vw,20rem)]"
            >
              <Card s={s} i={i} tabIndex={copy > 0 ? -1 : undefined} onClick={guardClick} onFocus={() => setActive(i)} />
            </li>
          ))}
        </ul>
      </div>

      {/* Detail bar */}
      <div className="gutter">
        <div className="grid min-h-[5.5rem] grid-cols-12 items-center gap-6">
          <div className="col-span-12 md:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current?.href ?? "none"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-2"
              >
                {current ? (
                  <>
                    <span className="display text-d4">{current.title}</span>
                    <span className="text-[0.9375rem]">{current.body}</span>
                    <span className="label text-chilli">{current.price}</span>
                  </>
                ) : (
                  <>
                    <span className="display text-d4">Seven ways in</span>
                    <span className="text-[0.9375rem] opacity-80">Drag the cards, or hover one to see what it covers. Guide prices, quoted properly before you commit.</span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="col-span-12 flex md:col-span-4 md:justify-end">
            <Button href={current?.href ?? "/fine-line-tattoos"} variant={current ? "solid" : "outline"}>
              {current ? "View service" : "All services"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  s,
  i,
  tabIndex,
  onClick,
  onFocus,
}: {
  s: Service;
  i: number;
  tabIndex?: number;
  onClick: (e: ReactMouseEvent) => void;
  onFocus: () => void;
}) {
  const no = String(i + 1).padStart(2, "0");
  return (
    <Link
      href={s.href}
      // The wheel constantly moves cards in and out of view, which would re-trigger viewport prefetching on every pass
      prefetch={false}
      tabIndex={tabIndex}
      onClick={onClick}
      onFocus={onFocus}
      draggable={false}
      aria-label={`${s.title} — ${s.price}`}
      className="group relative block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/card:-translate-y-10 group-hover/card:scale-[1.05] focus-visible:-translate-y-10"
    >
      <div className="relative aspect-[5/8] bg-paper p-[7%] shadow-[0_28px_60px_-28px_rgba(38,38,38,0.6)] ring-1 ring-maroon/25 [container-type:inline-size]">
        <div className="flex h-full flex-col border border-maroon/60 p-[6%] transition-colors duration-500 group-hover:border-chilli">
          <div className="flex items-start justify-between">
            <span className="leading-none">
              <span className="block font-[family-name:var(--font-display)] text-[8cqw] tabular-nums">{no}</span>
              <FlashIcon name={s.icon} className="mt-[1.5cqw] h-[8cqw] w-[8cqw] text-chilli" />
            </span>
            <Swallow className="w-[10cqw] opacity-70" />
          </div>

          {/* Arched window */}
          <div className="relative mx-auto mt-[6%] aspect-[4/5] w-[80%] shrink-0 overflow-hidden rounded-t-full bg-ink">
            <Image
              src={s.image}
              alt=""
              fill
              draggable={false}
              sizes="(min-width: 1024px) 18vw, 60vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
            />
          </div>

          <div className="mt-auto pt-[5%] text-center">
            <p className="text-[7.2cqw] uppercase leading-tight tracking-[0.06em]">{s.title}</p>
            <p className="mt-[2cqw] text-[5.4cqw] uppercase tracking-[0.1em] text-maroon/70">{s.price}</p>
          </div>

          <span className="mt-[4%] flex rotate-180 items-start justify-between leading-none">
            <span>
              <span className="block font-[family-name:var(--font-display)] text-[8cqw] tabular-nums">{no}</span>
              <FlashIcon name={s.icon} className="mt-[1.5cqw] h-[8cqw] w-[8cqw] text-chilli" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
