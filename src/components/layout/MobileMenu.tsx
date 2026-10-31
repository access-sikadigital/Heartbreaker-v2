"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Swallow } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cta, mapsUrl, menuGroups, studio } from "@/content/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Phone / tablet menu: a full-screen maroon panel under the header.
 * One GSAP timeline plays forward to open and backwards (faster) to close; groups expand with a height tween.
 * Always mounted so the close animation can run; hidden from focus and screen readers while closed.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Open / close timeline
  useGSAP(
    () => {
      const t = gsap.timeline({ paused: true, defaults: { ease: "hb.out" } });
      t.set(root.current, { autoAlpha: 1 })
        .fromTo(root.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "hb.inOut" })
        .from("[data-mi]", { yPercent: 115, duration: 0.8, stagger: 0.06 }, "-=0.35")
        .from("[data-mi-line]", { scaleX: 0, duration: 0.7, stagger: 0.06, ease: "hb.inOut" }, "<")
        .from("[data-mi-num]", { autoAlpha: 0, x: -8, duration: 0.5, stagger: 0.06 }, "<0.15")
        .from("[data-mi-foot]", { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, "-=0.55")
        .from("[data-mi-bird]", { rotate: -25, scale: 0.7, autoAlpha: 0, duration: 1 }, "<");
      t.eventCallback("onReverseComplete", () => {
        gsap.set(root.current, { autoAlpha: 0 });
        setExpanded(null);
      });
      if (prefersReducedMotion()) t.timeScale(20);
      tl.current = t;
    },
    { scope: root },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) t.timeScale(prefersReducedMotion() ? 20 : 1).play();
    else if (t.progress() > 0) t.timeScale(prefersReducedMotion() ? 20 : 1.7).reverse();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="mobile-menu"
      data-lenis-prevent
      inert={!open}
      aria-hidden={!open}
      className="invisible fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[105] overflow-y-auto overflow-x-hidden overscroll-contain bg-maroon text-paper lg:hidden"
    >
      {/* Decoration sits in its own clipped layer so it can never widen the panel (no sideways scroll) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Swallow data-mi-bird className="absolute -bottom-10 -right-12 w-[70vw] max-w-[22rem] text-paper/[0.06]" body="transparent" />
      </div>

      <nav aria-label="Menu" className="wrap relative flex min-h-full flex-col pb-8 pt-4">
        <ol>
          {menuGroups.map((g, i) => (
            <MenuRow
              key={g.label}
              index={i}
              group={g}
              isOpen={expanded === g.label}
              onToggle={() => setExpanded((cur) => (cur === g.label ? null : g.label))}
              onNavigate={onClose}
            />
          ))}
        </ol>

        <div className="mt-auto pt-10">
          <div data-mi-foot className="flex flex-wrap gap-3">
            <Button href={cta.book.href} variant="chilli">
              {cta.book.label}
            </Button>
            <Button href={cta.voucher.href} variant="outline-paper">
              {cta.voucher.label}
            </Button>
          </div>
          <div data-mi-foot className="mt-8 grid grid-cols-2 gap-6 border-t border-paper/15 pt-6 text-[0.9375rem]">
            <div>
              <p className="label mb-1.5 text-paper/55">Studio</p>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="leading-snug">
                {studio.address.street}
                <br />
                {studio.address.locality} ↗
              </a>
            </div>
            <div>
              <p className="label mb-1.5 text-paper/55">Instagram</p>
              <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer">
                @{studio.instagram}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

type Group = (typeof menuGroups)[number];

function MenuRow({ index, group, isOpen, onToggle, onNavigate }: { index: number; group: Group; isOpen: boolean; onToggle: () => void; onNavigate: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Height tween for the sub-menu, links stagger in after it
  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      if (first.current) {
        first.current = false;
        gsap.set(el, { height: 0 });
        return;
      }
      const links = el.querySelectorAll("[data-sub]");
      if (isOpen) {
        gsap.to(el, { height: "auto", duration: 0.55, ease: "hb.inOut" });
        gsap.fromTo(links, { x: -14, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.45, stagger: 0.045, delay: 0.12, ease: "hb.out" });
      } else {
        gsap.to(el, { height: 0, duration: 0.4, ease: "hb.inOut" });
      }
    },
    { dependencies: [isOpen] },
  );

  const num = String(index + 1).padStart(2, "0");
  const label = (
    <span className="flex items-center gap-4 py-[1.1rem]">
      <span data-mi-num className="label w-6 tabular-nums text-paper/45">
        {num}
      </span>
      <span className="block overflow-hidden pb-[0.06em]">
        <span data-mi className="display block text-[clamp(1.7rem,7.6vw,2.4rem)]">
          {group.label}
        </span>
      </span>
      {group.children ? (
        <span aria-hidden className={`relative ml-auto block h-4 w-4 transition-[transform,color] duration-500 ${isOpen ? "rotate-[135deg] text-chilli" : ""}`}>
          <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current" />
        </span>
      ) : (
        <span aria-hidden className="ml-auto text-lg text-paper/60">
          →
        </span>
      )}
    </span>
  );

  return (
    <li className="relative">
      {group.children ? (
        <button type="button" aria-expanded={isOpen} onClick={onToggle} className="block w-full text-left">
          {label}
        </button>
      ) : (
        <Link href={group.href!} onClick={onNavigate} className="block">
          {label}
        </Link>
      )}

      {group.children ? (
        <div ref={panel} className="overflow-hidden" aria-hidden={!isOpen} inert={!isOpen}>
          <ul className="pb-4 pl-10">
            {group.children.map((c) => (
              <li key={c.href} data-sub>
                <Link href={c.href} onClick={onNavigate} className="flex items-center gap-3 py-2 text-[1.0625rem] text-paper/85 active:text-white">
                  <span aria-hidden className="h-px w-4 bg-paper/40" />
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <span data-mi-line aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-paper/15" />
    </li>
  );
}
