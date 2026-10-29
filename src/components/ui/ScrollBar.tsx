"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";

/**
 * Custom scrollbar: a hairline rail with a chilli thumb that widens on hover and shows how far
 * down the page you are. Drag the thumb or click the rail to jump. Mouse/trackpad devices only —
 * touch keeps the native overlay scrollbar (the native one is hidden in CSS via `html.hb-scrollbar`).
 */
export function ScrollBar() {
  const lenis = useLenis();
  const rail = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);
  const idle = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      setEnabled(fine.matches);
      document.documentElement.classList.toggle("hb-scrollbar", fine.matches);
    };
    update();
    fine.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      document.documentElement.classList.remove("hb-scrollbar");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = rail.current;
      const t = thumb.current;
      if (!r || !t) return;
      const doc = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      const max = Math.max(1, doc - vh);
      const railH = r.clientHeight;
      const h = Math.max(48, (vh / doc) * railH);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      t.style.height = `${h}px`;
      t.style.transform = `translate3d(0, ${p * (railH - h)}px, 0)`;
      if (label.current) label.current.textContent = `${String(Math.round(p * 100)).padStart(2, "0")}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
      setActive(true);
      clearTimeout(idle.current);
      idle.current = setTimeout(() => !drag.current && setActive(false), 900);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
    };
  }, [enabled]);

  const scrollTo = (y: number, immediate: boolean) => {
    if (lenis) lenis.scrollTo(y, { immediate, force: true });
    else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
  };

  const onThumbDown = (e: ReactPointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, startScroll: window.scrollY };
    setActive(true);
  };
  const onThumbMove = (e: ReactPointerEvent) => {
    if (!drag.current || !rail.current || !thumb.current) return;
    const travel = rail.current.clientHeight - thumb.current.clientHeight;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollTo(drag.current.startScroll + ((e.clientY - drag.current.startY) / Math.max(1, travel)) * max, true);
  };
  const onThumbUp = () => {
    drag.current = null;
    idle.current = setTimeout(() => setActive(false), 900);
  };
  const onRailDown = (e: ReactPointerEvent) => {
    if (!rail.current) return;
    const r = rail.current.getBoundingClientRect();
    const p = (e.clientY - r.top) / r.height;
    scrollTo(p * (document.documentElement.scrollHeight - window.innerHeight), false);
  };

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={`group fixed bottom-2 right-0 top-2 z-[115] flex w-4 justify-end pr-1 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
    >
      <div ref={rail} onPointerDown={onRailDown} className="relative h-full w-[3px] cursor-pointer rounded-full bg-ink/15 transition-[width] duration-300 group-hover:w-[7px]">
        <div
          ref={thumb}
          onPointerDown={onThumbDown}
          onPointerMove={onThumbMove}
          onPointerUp={onThumbUp}
          onPointerCancel={onThumbUp}
          className="absolute inset-x-0 top-0 cursor-grab rounded-full bg-chilli shadow-[0_0_0_1px_rgba(242,241,238,0.35)] active:cursor-grabbing"
        >
          <span
            ref={label}
            className={`label pointer-events-none absolute right-[calc(100%_+_0.6rem)] top-1/2 -translate-y-1/2 bg-chilli px-1.5 py-0.5 !text-[0.5625rem] tabular-nums text-paper transition-[opacity,transform] duration-300 ${
              active ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            }`}
          >
            00%
          </span>
        </div>
      </div>
    </div>
  );
}
