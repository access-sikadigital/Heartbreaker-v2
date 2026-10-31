import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "chilli" | "outline" | "paper" | "outline-paper";

const variants: Record<Variant, string> = {
  // Red is reserved for booking
  // Hover darkens the red rather than going maroon, so it never disappears into a maroon section
  chilli: "bg-chilli text-paper border-chilli hover:bg-[#b00101] hover:border-[#b00101]",
  solid: "bg-maroon text-paper border-maroon hover:bg-maroon-deep hover:border-maroon-deep",
  outline: "bg-transparent text-maroon border-maroon hover:bg-maroon hover:text-paper",
  paper: "bg-paper text-maroon border-paper hover:bg-white hover:border-white",
  "outline-paper": "bg-transparent text-paper border-paper/70 hover:bg-paper hover:text-maroon hover:border-paper",
};

const sizes = {
  sm: "h-10 px-5 text-[0.75rem]",
  md: "h-12 px-6 text-[0.8125rem]",
  lg: "h-14 px-8 text-[0.875rem]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
};

/** Plain rectangular button from the identity: hairline border, mono caps. External links open in a new tab. */
export function Button({ href, children, variant = "solid", size = "md", className = "" }: Props) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center whitespace-nowrap border uppercase tracking-[var(--tracking-label)] transition-colors duration-200 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
