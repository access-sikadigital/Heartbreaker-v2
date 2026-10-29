import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement> & { name: string; [data: `data-${string}`]: unknown };

/** One of the identity's line-drawn flash motifs (public/icons/*.svg), tinted with currentColor. */
export function FlashIcon({ name, className = "", style, ...rest }: Props) {
  const url = `url(/icons/${name}.svg)`;
  return (
    <span
      aria-hidden
      {...rest}
      className={`icon-mask inline-block ${className}`}
      style={{ maskImage: url, WebkitMaskImage: url, ...style }}
    />
  );
}
