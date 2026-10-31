"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** Frame classes: size / aspect / rounding */
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Image that wipes up into view and settles from a slight zoom the first time it scrolls in. */
export function ImageReveal({ src, alt, sizes, className = "", imgClassName = "", priority, delay = 0 }: Props) {
  return (
    <motion.div
      className={`relative overflow-hidden bg-paper-dim ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.6, ease, delay }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
      </motion.div>
    </motion.div>
  );
}
