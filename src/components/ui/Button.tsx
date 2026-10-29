"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

type Variant = "solid" | "outline" | "paper" | "outline-paper" | "chilli";

const variants: Record<Variant, string> = {
  solid: "bg-maroon text-paper border-maroon",
  outline: "bg-transparent text-maroon border-maroon/70 hover:border-maroon",
  paper: "bg-paper text-maroon border-paper",
  "outline-paper": "bg-transparent text-paper border-paper/60 hover:border-paper",
  chilli: "bg-chilli text-paper border-chilli",
};

// Fill that wipes up from below on hover
const fills: Record<Variant, string> = {
  solid: "bg-chilli",
  outline: "bg-maroon",
  paper: "bg-chilli",
  "outline-paper": "bg-paper",
  chilli: "bg-maroon",
};

const hoverText: Record<Variant, string> = {
  solid: "group-hover:text-paper",
  outline: "group-hover:text-paper",
  paper: "group-hover:text-paper",
  "outline-paper": "group-hover:text-maroon",
  chilli: "group-hover:text-paper",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-9 px-4 text-[0.6875rem]",
  md: "h-12 px-6 text-xs",
  lg: "h-14 px-8 text-[0.8125rem]",
};

/** Pill-less rectangular button from the identity (hairline border, mono caps) with roll + magnetic hover. */
export function Button({ href, children, variant = "solid", className = "", magnetic = true, size = "md" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent) => {
    if (!magnetic || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const external = href.startsWith("http");

  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={reset}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group relative inline-flex items-center justify-center overflow-hidden border uppercase tracking-[var(--tracking-label)] transition-colors duration-500 ${sizes[size]} ${variants[variant]} ${className}`}
      >
        <span
          aria-hidden
          className={`absolute inset-0 translate-y-[101%] transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover:translate-y-0 ${fills[variant]}`}
        />
        <span className={`relative block overflow-hidden transition-colors duration-300 ${hoverText[variant]}`}>
          <span className="block transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
            {children}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-full transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover:translate-y-0"
          >
            {children}
          </span>
        </span>
      </Link>
    </motion.span>
  );
}
