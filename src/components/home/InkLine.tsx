"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; t: number };

const LIFE = 1400; // ms a stroke stays on the skin
const IDLE = 1800; // ms without a pointer before the autopilot picks the needle back up

/**
 * A single-needle line drawn live over the hero. The pointer is the needle; the line trails and fades
 * like fresh linework wiping clean. With no pointer (or on touch screens), an autopilot keeps
 * sketching slow looping strokes so the hero is never still.
 */
export function InkLine({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const host = el.parentElement!;
    const pts: Pt[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let cleared = false;
    let lastPointer = -Infinity;
    let seed = Math.random() * 1000;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25); // a soft glowing line doesn't need retina pixels
      const r = host.getBoundingClientRect();
      w = r.width;
      h = r.height;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
    };
    resize();

    const push = (x: number, y: number, t: number) => {
      const last = pts[pts.length - 1];
      if (last && Math.hypot(x - last.x, y - last.y) < 2) return;
      pts.push({ x, y, t });
      if (pts.length > 400) pts.shift();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (y < 0 || y > r.height) return;
      const now = performance.now();
      // break the stroke if the needle jumped (re-entering the hero)
      if (now - lastPointer > 250) pts.length = 0;
      lastPointer = now;
      push(x, y, now);
    };

    // Autopilot: layered sines give a loose, hand-drawn loop that drifts across the frame
    const auto = (now: number) => {
      const t = now / 1000 + seed;
      const x = w * (0.5 + 0.36 * Math.sin(t * 0.53) + 0.08 * Math.sin(t * 1.9 + 1.3));
      const y = h * (0.42 + 0.2 * Math.sin(t * 0.81 + 0.6) + 0.07 * Math.cos(t * 2.3));
      push(x, y, now);
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      if (now - lastPointer > IDLE) auto(now);
      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      if (!pts.length && cleared) return;
      cleared = pts.length === 0;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (pts.length < 3) return;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      // Segment by segment so the tail can thin and fade
      for (let i = 1; i < pts.length - 1; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const c = pts[i + 1];
        const age = 1 - (now - b.t) / LIFE;
        const m1x = (a.x + b.x) / 2;
        const m1y = (a.y + b.y) / 2;
        const m2x = (b.x + c.x) / 2;
        const m2y = (b.y + c.y) / 2;

        // soft bleed under the line
        ctx.strokeStyle = `rgba(222, 2, 2, ${0.18 * age})`;
        ctx.lineWidth = 5 * age + 1;
        ctx.beginPath();
        ctx.moveTo(m1x, m1y);
        ctx.quadraticCurveTo(b.x, b.y, m2x, m2y);
        ctx.stroke();

        // the line itself
        ctx.strokeStyle = `rgba(222, 2, 2, ${0.95 * age})`;
        ctx.lineWidth = 1.6 * age + 0.4;
        ctx.beginPath();
        ctx.moveTo(m1x, m1y);
        ctx.quadraticCurveTo(b.x, b.y, m2x, m2y);
        ctx.stroke();
      }

      // needle tip
      const tip = pts[pts.length - 1];
      ctx.fillStyle = "rgba(242, 241, 238, 0.95)";
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    };
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) seed += 0.001;
    });
    io.observe(host);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}
