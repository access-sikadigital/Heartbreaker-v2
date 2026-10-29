"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Travel as a % of the frame height. */
  amount?: number;
  priority?: boolean;
  /** Clip-wipe the frame open when it enters view. */
  reveal?: boolean;
};

/** Image that drifts inside its frame on scroll — the frame stays put, the picture moves. */
export function ParallaxImage({ src, alt, className = "", sizes = "50vw", amount = 12, priority, reveal = true }: Props) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!frame.current || prefersReducedMotion()) return;
      const img = frame.current.querySelector("img");
      gsap.fromTo(
        img,
        { yPercent: -amount / 2, scale: 1 + amount / 100 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      if (reveal) {
        gsap.fromTo(
          frame.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "hb.inOut",
            scrollTrigger: { trigger: frame.current, start: "top 90%", once: true },
          },
        );
      }
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
