"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Swallow, Wordmark } from "@/components/brand/Logo";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Button } from "@/components/ui/Button";
import { cta, mapsUrl, siteNav, studio } from "@/content/site";

/** Live local time at the studio (Australia/Melbourne). Client-only to avoid a hydration mismatch. */
function useStudioTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Melbourne", hour: "numeric", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()).toLowerCase());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * Footer: "Chair's yours.", the practical details, and the official wordmark to close the page.
 */
export function Footer() {
  const lenis = useLenis();
  const time = useStudioTime();
  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer data-header="dark" className="relative overflow-hidden bg-maroon text-paper">
      {/* ── Headline row */}
      <div className="gutter flex flex-wrap items-end justify-between gap-x-10 gap-y-6 pt-[clamp(3.5rem,7vw,6rem)]">
        <div className="space-y-4">
          <p className="label flex items-center gap-3 opacity-80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chilli opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-chilli" />
            </span>
            Bookings open · Studio time {time ?? "—"}
          </p>
          {/* copy deck, How it works 03: "Chair's yours." */}
          <h2 className="display text-d1">Chair&apos;s yours.</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button href={cta.book.href} variant="paper" size="lg">
            {cta.book.label}
          </Button>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="group relative hidden h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-full border border-paper/30 transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-maroon sm:flex"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite]" aria-hidden>
              <defs>
                <path id="hb-top-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-current font-[family-name:var(--font-mono)] text-[9px] uppercase">
                <textPath href="#hb-top-path" textLength="235" lengthAdjust="spacing">
                  Back to top · Back to top ·
                </textPath>
              </text>
            </svg>
            <span className="text-xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1">↑</span>
          </button>
        </div>
      </div>

      {/* ── Details */}
      <div className="gutter mt-[clamp(2rem,4vw,3rem)] grid grid-cols-2 gap-x-[var(--gutter)] gap-y-10 border-t border-paper/15 py-[clamp(2.5rem,5vw,3.5rem)] lg:grid-cols-12">
        <div className="col-span-1 space-y-3 lg:col-span-3">
          <p className="label text-chilli">Visit</p>
          <address className="text-[1rem] not-italic leading-relaxed">
            {studio.address.street}
            <br />
            {studio.address.locality}, Victoria
          </address>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-2 border-b border-paper/40 pb-1 transition-colors hover:border-paper">
            Get directions ↗
          </a>
        </div>

        <div className="col-span-1 space-y-3 lg:col-span-3">
          <p className="label text-chilli">Hours</p>
          <p className="text-[1rem] leading-relaxed">{studio.hours}</p>
          <p className="label opacity-60">Reply · {studio.replyTime}</p>
        </div>

        <nav aria-label="Footer" className="col-span-2 lg:col-span-4">
          <p className="label mb-3 text-chilli">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
            {siteNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group relative inline-block text-[0.9375rem]">
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 space-y-2.5 lg:col-span-2">
          <p className="label mb-3 text-chilli">Follow</p>
          {[
            { k: "Studio", v: `@${studio.instagram}`, href: studio.instagramUrl },
            { k: "Artist", v: `@${studio.founder.instagram}`, href: studio.founder.instagramUrl },
            { k: "Shop", v: "Buy aftercare", href: studio.aftercareShopUrl },
          ].map((l) => (
            <a key={l.k} href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between gap-3 text-[0.9375rem]">
              <span>
                <span className="label mr-2 opacity-60">{l.k}</span>
                {l.v}
              </span>
              <span className="label transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Sign-off */}
      <div className="px-[calc(var(--gutter)*0.5)]">
        <Wordmark className="w-full text-paper" title="Heartbreaker Ink" />
      </div>
      <div className="gutter">
        <div className="label flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <Swallow className="w-6" body="var(--color-chilli)" />© {new Date().getFullYear()} Heartbreaker Ink Group Pty Ltd
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
