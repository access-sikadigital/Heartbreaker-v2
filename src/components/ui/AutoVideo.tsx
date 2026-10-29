"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

/** Muted loop that only downloads and plays while on screen. Stays on the poster for reduced motion. */
export function AutoVideo(props: VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <video ref={ref} muted loop playsInline preload="none" {...props} />;
}
