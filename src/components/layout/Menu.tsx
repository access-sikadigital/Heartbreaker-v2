"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { Button } from "@/components/ui/Button";
import { cta, mapsUrl, menuGroups, studio } from "@/content/site";

const ease = [0.76, 0, 0.24, 1] as const;
const out = [0.16, 1, 0.3, 1] as const;

/**
 * Phone / tablet menu (desktop uses the header's inline nav). The sitemap is folded into six rows;
 * groups open inline, one at a time.
 */
export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 450);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence onExitComplete={() => setExpanded(null)}>
      {open ? (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          className="fixed inset-0 z-[105] overflow-y-auto bg-maroon text-paper"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.9, ease } }}
          exit={{ clipPath: "inset(100% 0% 0% 0%)", transition: { duration: 0.8, ease, delay: 0.15 } }}
        >
          <div className="gutter flex min-h-full flex-col pb-8 pt-[calc(var(--header-h)_+_1.5rem)]">
            <nav aria-label="Menu" className="flex-1">
              <ul>
                {menuGroups.map((g, i) => {
                  const isOpen = expanded === g.label;
                  const row = (
                    <span className="flex items-center gap-4 py-4">
                      <FlashIcon name={g.icon} className={`h-7 w-7 shrink-0 transition-colors duration-300 ${isOpen ? "text-chilli" : "text-paper/70"}`} />
                      <span className="display flex-1 text-[clamp(1.5rem,6.4vw,2.4rem)] leading-none">{g.label}</span>
                      {g.children ? (
                        <span aria-hidden className="relative mr-1 block h-3.5 w-3.5">
                          <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current" />
                          <span className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-500 ${isOpen ? "scale-y-0" : "scale-y-100"}`} />
                        </span>
                      ) : (
                        <span aria-hidden className="mr-1 text-lg opacity-60">→</span>
                      )}
                    </span>
                  );

                  return (
                    // Clip only the entrance (motion wrapper); the row itself never moves sideways, so nothing gets cut
                    <li key={g.label} className="border-b border-paper/15">
                      <div className="overflow-hidden">
                        <motion.div
                          initial={{ y: "105%" }}
                          animate={{ y: "0%", transition: { duration: 0.9, ease: out, delay: 0.2 + i * 0.05 } }}
                          exit={{ y: "-105%", transition: { duration: 0.45, ease, delay: i * 0.02 } }}
                        >
                          {g.children ? (
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={() => setExpanded(isOpen ? null : g.label)}
                              className="block w-full text-left"
                            >
                              {row}
                            </button>
                          ) : (
                            <Link ref={i === 0 ? firstLink : undefined} href={g.href!} onClick={onClose} className="block">
                              {row}
                            </Link>
                          )}
                        </motion.div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && g.children ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.5, ease: out }, opacity: { duration: 0.3, delay: 0.1 } } }}
                            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.4, ease }, opacity: { duration: 0.15 } } }}
                            className="overflow-hidden"
                          >
                            <ul className="grid gap-px pb-4 pl-11 sm:grid-cols-2">
                              {g.children.map((c, k) => (
                                <motion.li key={c.href} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.08 + k * 0.03, duration: 0.35, ease: out } }}>
                                  <Link href={c.href} onClick={onClose} className="flex items-center gap-3 py-2.5 text-paper/85 transition-colors active:text-chilli">
                                    <FlashIcon name={c.icon} className="h-5 w-5 shrink-0 opacity-70" />
                                    <span className="flex-1 text-[0.9375rem] uppercase tracking-[0.06em]">{c.label}</span>
                                    {c.note ? <span className="label !text-[0.625rem] text-paper/55">{c.note}</span> : null}
                                  </Link>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              className="mt-10 space-y-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: out, delay: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-wrap gap-3">
                <Button href={cta.book.href} variant="paper">
                  {cta.book.label}
                </Button>
                <Button href={cta.voucher.href} variant="outline-paper">
                  {cta.voucher.label}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6 border-t border-paper/15 pt-6 text-[0.875rem]">
                <div className="space-y-1">
                  <p className="label opacity-60">Studio</p>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block leading-snug">
                    {studio.address.street}
                    <br />
                    {studio.address.locality}, Victoria ↗
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="label opacity-60">Instagram</p>
                  <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer" className="block">
                    @{studio.instagram}
                  </a>
                  <p className="pt-2 text-paper/70">{studio.hours}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
