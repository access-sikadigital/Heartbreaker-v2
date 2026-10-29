"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Swallow, Wordmark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { useLenis } from "@/components/providers/SmoothScroll";
import { cta, headerNav, serviceList, studio } from "@/content/site";
import { Menu } from "./Menu";

const ease = [0.16, 1, 0.3, 1] as const;

// Flash motif per "More" link
const moreIcons = ["envelope", "rose", "anchor", "ace", "diamond", "dice", "sun", "swallow"];

/**
 * One navigation per breakpoint:
 * - lg+: Fine Line (services panel) + inline links + "More" dropdown + Book CTA. No menu button.
 * - below lg: logo + Book + Menu button → full-screen menu.
 *
 * At the top of a page the bar is transparent; once scrolled it floats as a frosted off-white panel.
 * Sections opt into light-on-dark colours with `data-header="dark"`.
 */
export function Header() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [more, setMore] = useState(false);
  const moreTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [preview, setPreview] = useState(0);
  const lastY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lenis = useLenis();

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const probe = document.elementsFromPoint(window.innerWidth / 2, 70);
      const section = probe.find((el) => el instanceof HTMLElement && el.dataset.header) as HTMLElement | undefined;
      setDark(section?.dataset.header === "dark");
      setScrolled(y > 40);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 320);
      lastY.current = y;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI state when the route changes
    setOpen(false);
    setMega(false);
    setMore(false);
  }, [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMore(false);
    setMega(true);
  };
  const openMore = () => {
    clearTimeout(moreTimer.current);
    setMega(false);
    setMore(true);
  };
  const closeMore = () => {
    clearTimeout(moreTimer.current);
    moreTimer.current = setTimeout(() => setMore(false), 160);
  };
  const closeMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), 160);
  };

  // Panel can't stay open while the bar is tucked away
  const megaOpen = mega && !open && !hidden;
  const moreOpen = more && !open && !hidden;
  const floating = scrolled && !open;
  const panel = floating || megaOpen || moreOpen;
  const light = open || (!panel && dark);
  const tone = light ? "text-paper" : "text-maroon";

  return (
    <>
      <a href="#main" className="label fixed left-4 top-4 z-[130] -translate-y-24 bg-chilli px-4 py-3 text-paper focus:translate-y-0">
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[110] transition-transform duration-700 ease-[var(--ease-out-expo)] ${hidden && !open ? "-translate-y-[130%]" : "translate-y-0"}`}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setMega(false);
            setMore(false);
          }
        }}
      >
        {/* ── Utility strip */}
        <div className={`overflow-hidden bg-maroon text-paper transition-[height,opacity] duration-500 ease-[var(--ease-out-expo)] ${scrolled || open ? "h-0 opacity-0" : "h-8 opacity-100"}`}>
          <div className="gutter label flex h-8 items-center justify-between gap-6 !text-[0.625rem]">
            <span className="flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chilli opacity-90" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-chilli" />
              </span>
              Bookings are open
            </span>
            <span className="hidden opacity-80 lg:block">
              {studio.address.street}, {studio.address.locality} · By appointment
            </span>
            <span className="flex items-center gap-5">
              <Link href={cta.voucher.href} className="hidden opacity-80 transition-opacity hover:opacity-100 sm:block">
                {cta.voucher.label}
              </Link>
              <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100">
                <InstagramGlyph className="h-3 w-3" />
                <span className="hidden sm:inline">@{studio.instagram}</span>
                <span className="sr-only sm:hidden">Instagram</span>
              </a>
            </span>
          </div>
        </div>

        {/* ── Main bar */}
        <div className={`transition-[padding] duration-700 ease-[var(--ease-out-expo)] ${floating ? "px-[calc(var(--gutter)*0.5)] pt-2.5" : "px-0 pt-0"}`}>
          <div
            onMouseLeave={closeMega}
            className={`relative border transition-[background-color,border-color,box-shadow] duration-500 ${
              panel ? "border-maroon/12 bg-paper/85 shadow-[0_12px_40px_-18px_rgba(38,38,38,0.35)] backdrop-blur-xl" : "border-transparent bg-transparent"
            }`}
          >
            <div className={`grid h-[4.25rem] grid-cols-[1fr_auto] items-center gap-6 transition-[color,padding] duration-500 lg:grid-cols-[1fr_auto_1fr] ${floating ? "px-[calc(var(--gutter)*0.6)]" : "gutter"} ${tone}`}>
              {/* Logo lockup */}
              <Link href="/" aria-label="Heartbreaker Ink — home" className="group relative z-10 flex w-max items-center gap-3">
                <span className="block w-9 sm:w-10">
                  <span className="block transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:-rotate-12">
                    <Swallow className="w-full" body={light ? "var(--color-chilli)" : "none"} />
                  </span>
                </span>
                <span className="block w-[8.5rem] sm:w-[11rem]">
                  <Wordmark className="w-full" title="" />
                </span>
              </Link>

              {/* Desktop nav */}
              <nav aria-label="Primary" className="hidden lg:block">
                <ul className="flex items-center">
                  <li>
                    <button
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls="services-panel"
                      onMouseEnter={openMega}
                      onFocus={openMega}
                      onClick={() => setMega((v) => !v)}
                      className="group label flex items-center gap-2 px-4 py-2.5"
                    >
                      <Roll>Fine Line</Roll>
                      <span aria-hidden className={`block h-1.5 w-1.5 border-b border-r border-current transition-transform duration-500 ${megaOpen ? "translate-y-0.5 rotate-[225deg]" : "-translate-y-0.5 rotate-45"}`} />
                    </button>
                  </li>
                  {headerNav.inline.map((item) => {
                    const active = pathname.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onMouseEnter={() => {
                            closeMega();
                            closeMore();
                          }}
                          aria-current={active ? "page" : undefined}
                          className="group label relative block px-4 py-2.5"
                        >
                          <Roll>{item.label}</Roll>
                          <span className={`absolute inset-x-4 bottom-1 h-px origin-left bg-current transition-transform duration-500 ${active ? "scale-x-100" : "scale-x-0"}`} />
                        </Link>
                      </li>
                    );
                  })}
                  {/* More */}
                  <li className="relative" onMouseLeave={closeMore}>
                    <button
                      type="button"
                      aria-expanded={moreOpen}
                      aria-controls="more-panel"
                      onMouseEnter={openMore}
                      onFocus={openMore}
                      onClick={() => setMore((v) => !v)}
                      className="group label flex items-center gap-2 px-4 py-2.5"
                    >
                      <Roll>More</Roll>
                      <span aria-hidden className={`block h-1.5 w-1.5 border-b border-r border-current transition-transform duration-500 ${moreOpen ? "translate-y-0.5 rotate-[225deg]" : "-translate-y-0.5 rotate-45"}`} />
                    </button>
                    <AnimatePresence>
                      {moreOpen ? (
                        <motion.div
                          id="more-panel"
                          onMouseEnter={openMore}
                          className="absolute left-1/2 top-[calc(100%+1.1rem)] w-[22rem] -translate-x-1/2 border border-maroon/12 bg-paper p-2 text-maroon shadow-[0_30px_60px_-30px_rgba(38,38,38,0.45)]"
                          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
                          transition={{ duration: 0.45, ease }}
                        >
                          <ul className="grid grid-cols-2">
                            {headerNav.more.map((item, i) => (
                              <motion.li key={item.href} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.08 + i * 0.03, duration: 0.4, ease } }}>
                                <Link href={item.href} className="group flex items-center gap-3 px-3 py-3 transition-colors hover:bg-maroon hover:text-paper">
                                  <FlashIcon name={moreIcons[i % moreIcons.length]} className="h-6 w-6 shrink-0 transition-transform duration-500 group-hover:-rotate-12" />
                                  <span className="text-[0.8125rem] uppercase leading-tight tracking-[0.06em]">{item.label}</span>
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                </ul>
              </nav>

              {/* Actions */}
              <div className="relative z-10 flex items-center justify-end gap-2 sm:gap-3">
                <span className="hidden sm:block">
                  <Button href={cta.book.href} variant={light ? "paper" : "solid"} size="sm">
                    {cta.book.label}
                  </Button>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls="site-menu"
                  className={`group flex h-9 items-center gap-3 border px-3 transition-colors duration-500 lg:hidden ${light ? "border-paper/40 hover:border-paper" : "border-maroon/30 hover:border-maroon"}`}
                >
                  <span className="label hidden sm:block">{open ? "Close" : "Menu"}</span>
                  <span className="relative block h-2.5 w-5" aria-hidden>
                    <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
                    <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
                  </span>
                  <span className="sr-only sm:hidden">{open ? "Close menu" : "Open menu"}</span>
                </button>
              </div>
            </div>

            {/* ── Services mega panel (desktop) */}
            <AnimatePresence>
              {megaOpen ? (
                <motion.div
                  id="services-panel"
                  onMouseEnter={openMega}
                  className="absolute inset-x-[-1px] top-full hidden overflow-hidden border border-t-0 border-maroon/12 bg-paper text-maroon shadow-[0_30px_60px_-30px_rgba(38,38,38,0.45)] lg:block"
                  initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  transition={{ duration: 0.55, ease }}
                >
                  <div className="grid grid-cols-12 gap-8 border-t border-maroon/12 p-8">
                    <div className="col-span-3 flex flex-col justify-between gap-8">
                      <div className="space-y-4">
                        <p className="label opacity-60">Fine line tattoos</p>
                        <p className="display text-d4 leading-[1.05]">Fine line is what we do.</p>
                        <p className="text-sm opacity-80">Single needle, drawn by hand, sized for the body it&apos;s going on.</p>
                      </div>
                      <div>
                        <Button href="/fine-line-tattoos" variant="outline" size="sm">
                          All services
                        </Button>
                      </div>
                    </div>

                    <ul className="col-span-6 grid grid-cols-2 gap-x-6">
                      {serviceList.map((s, i) => (
                        <motion.li key={s.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.12 + i * 0.035, duration: 0.5, ease } }}>
                          <Link href={s.href} onMouseEnter={() => setPreview(i)} onFocus={() => setPreview(i)} className="group flex items-center gap-4 border-b border-maroon/12 py-3.5">
                            <FlashIcon name={s.icon} className="h-8 w-8 shrink-0 transition-[color,transform] duration-500 group-hover:-rotate-12 group-hover:text-chilli" />
                            <span className="min-w-0 flex-1">
                              {/* Mono, not Bold Money: the display face smudges at this size */}
                              <span className="block text-[0.9375rem] uppercase leading-tight tracking-[0.06em] transition-[transform,color] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-chilli">
                                {s.title}
                              </span>
                              <span className="label mt-1.5 block text-maroon/70">{s.price}</span>
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="relative col-span-3 aspect-[4/5] overflow-hidden bg-paper-dim">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={serviceList[preview].image}
                          className="absolute inset-0"
                          initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 }}
                          animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.3 } }}
                          transition={{ duration: 0.7, ease }}
                        >
                          <Image src={serviceList[preview].image} alt="" fill sizes="320px" className="object-cover" />
                        </motion.div>
                      </AnimatePresence>
                      <p className="label absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 pt-10 text-paper">{serviceList[preview].body}</p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

      </header>

      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/** Text that rolls up to a chilli copy on hover. The clip box is exactly one line tall. */
function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="relative block h-[1.3em] overflow-hidden">
      <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">{children}</span>
      <span aria-hidden className="absolute inset-0 block translate-y-full text-chilli transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
