"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Swallow, Wordmark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { useLenis } from "@/components/providers/SmoothScroll";
import { MobileMenu } from "./MobileMenu";
import { cta, headerNav, serviceList, type NavItem } from "@/content/site";

const fineLineLinks: NavItem[] = [{ label: "All fine line tattoos", href: "/fine-line-tattoos" }, ...serviceList.map((s) => ({ label: s.title, href: s.href }))];

/** Sticky header: logo, plain links with two dropdowns, red Book button. Phones get a simple drop-down menu. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu when the route changes
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  return (
    <>
      <a href="#main" className="label fixed left-4 top-4 z-[130] -translate-y-24 bg-maroon px-4 py-3 text-paper focus:translate-y-0">
        Skip to content
      </a>

      <header className={`sticky top-0 z-[110] border-b bg-paper transition-shadow ${scrolled ? "border-maroon/15 shadow-[0_6px_24px_-14px_rgba(38,38,38,0.35)]" : "border-maroon/10"}`}>
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="Heartbreaker Ink — home" className="flex shrink-0 items-center gap-3 text-maroon">
            <Swallow className="w-11 sm:w-12" body="var(--color-paper)" />
            <Wordmark className="w-[11rem] sm:w-[14rem]" title="" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <Dropdown label="Fine Line" items={fineLineLinks} />
              </li>
              {headerNav.inline.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                    className="block px-3 py-2 text-[0.8125rem] uppercase tracking-[var(--tracking-label)] transition-colors hover:text-chilli aria-[current=page]:text-chilli"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Dropdown label="More" items={headerNav.more} />
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <Button href={cta.book.href} variant="chilli" size="sm">
                {cta.book.label}
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 items-center gap-2 border border-maroon/30 px-3 text-[0.75rem] uppercase tracking-[var(--tracking-label)] lg:hidden"
            >
              {open ? "Close" : "Menu"}
              <span aria-hidden className="relative block h-2.5 w-4">
                <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </div>
        </div>

      </header>

      <MobileMenu open={open} onClose={closeMenu} />
    </>
  );
}

function Dropdown({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && hide()}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 text-[0.8125rem] uppercase tracking-[var(--tracking-label)] transition-colors hover:text-chilli"
      >
        {label}
        <svg viewBox="0 0 10 6" aria-hidden className={`w-2.5 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      {open ? (
        <ul className="absolute left-0 top-full z-10 mt-2 min-w-[15rem] border border-maroon/15 bg-paper py-2 shadow-[0_16px_40px_-20px_rgba(38,38,38,0.45)]">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block px-5 py-2.5 text-[0.9375rem] transition-colors hover:bg-maroon hover:text-paper">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
