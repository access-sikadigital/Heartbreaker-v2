import Link from "next/link";
import { Swallow, Wordmark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cta, mapsUrl, siteNav, studio } from "@/content/site";

/** Maroon footer: contact details, every page, socials — signed off with the full-width wordmark. */
export function Footer() {
  return (
    <footer className="bg-maroon text-paper">
      <div className="wrap grid gap-12 pb-12 pt-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-3">
          <Swallow className="w-14 text-maroon" body="var(--color-paper)" />
          <p className="max-w-[20rem] text-paper/85">Fine line tattoo studio in Mornington, on the Mornington Peninsula.</p>
          <Button href={cta.book.href} variant="chilli">
            {cta.book.label}
          </Button>
        </div>

        <div className="space-y-3 lg:col-span-3">
          <p className="label text-paper/60">Visit</p>
          <address className="not-italic">
            {studio.address.street}
            <br />
            {studio.address.locality}, Victoria
          </address>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block underline decoration-paper/40 underline-offset-4 hover:decoration-paper">
            Get directions
          </a>
          <p className="label pt-4 text-paper/60">Hours</p>
          <p>{studio.hours}</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-4">
          <p className="label mb-3 text-paper/60">Pages</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 whitespace-nowrap">
            {siteNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 lg:col-span-2">
          <p className="label text-paper/60">Follow</p>
          <ul className="space-y-2">
            <li>
              <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                @{studio.instagram}
              </a>
            </li>
            <li>
              <a href={studio.founder.instagramUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                @{studio.founder.instagram}
              </a>
            </li>
            <li>
              <a href={studio.aftercareShopUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                Buy aftercare
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap">
        <Link href="/" aria-label="Heartbreaker Ink — home" className="block border-t border-paper/15 pt-8 text-paper">
          <Wordmark className="w-full" title="" />
        </Link>
        <div className="label flex flex-col gap-3 py-6 text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Heartbreaker Ink Group Pty Ltd</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-paper">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-paper">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
