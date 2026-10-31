import Link from "next/link";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home, serviceList } from "@/content/site";

/** Services as arched, numbered flash-style cards in a staggered grid. */
export function Services() {
  return (
    <section aria-labelledby="services-title" className="section-y bg-paper-dim/60">
      <div className="wrap">
        <Reveal>
          <SectionHeading eyebrow={home.services.eyebrow} id="services-title" title={home.services.title} intro={home.services.intro} />
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4 lg:gap-y-14">
          {serviceList.map((s, i) => (
            // every other column sits lower, so the grid reads like a pinned-up flash wall
            <li key={s.href} className={i % 2 === 1 ? "translate-y-8 lg:translate-y-14" : ""}>
              <Link href={s.href} className="group block">
                <div className="border border-maroon/20 bg-paper p-2.5 transition-colors group-hover:border-maroon">
                  <ImageReveal
                    src={s.image}
                    alt=""
                    sizes="(min-width: 1024px) 22vw, 46vw"
                    className="aspect-[3/4] rounded-t-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                    delay={(i % 4) * 0.08}
                  />
                  <div className="flex items-center justify-between px-1 pb-1 pt-3">
                    <span className="label tabular-nums text-maroon/60">No. {String(i + 1).padStart(2, "0")}</span>
                    <FlashIcon name={s.icon} className="h-5 w-5 text-maroon/70" />
                  </div>
                </div>
                <p className="label mt-5 text-maroon/60">{s.audience}</p>
                <h3 className="display text-h3 mt-2.5 transition-colors group-hover:text-chilli">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-maroon/80">{s.body}</p>
              </Link>
            </li>
          ))}
          <li className="translate-y-8 lg:translate-y-14">
            <Link href={home.services.all.href} className="group flex aspect-[3/4] flex-col items-center justify-center rounded-t-full border border-dashed border-maroon/40 p-6 text-center transition-colors hover:border-maroon hover:bg-paper">
              <span className="display text-h3">{home.services.all.label}</span>
              <span aria-hidden className="mt-5 text-2xl transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
