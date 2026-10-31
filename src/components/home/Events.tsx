import { Button } from "@/components/ui/Button";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content/site";

/** Collabs & events: copy with event-type tags, beside an overlapping photo pair. */
export function Events() {
  const { events } = home;
  return (
    <section aria-labelledby="events-title" className="section-y">
      <div className="wrap grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label text-maroon/70">{events.eyebrow}</p>
            <h2 id="events-title" className="display text-h2 mt-5">
              {events.title}
            </h2>
            <p className="mt-6 text-[1.125rem]">{events.body}</p>
            <p className="mt-4 text-maroon/85">{events.detail}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {events.types.map((t) => (
                <li key={t.label} className="flex items-center gap-2 rounded-full border border-maroon/25 py-1.5 pl-2 pr-4 text-[0.875rem]">
                  <FlashIcon name={t.icon} className="h-5 w-5" />
                  {t.label}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-maroon/15 pt-5 text-[0.9375rem] text-maroon/80">{events.included}</p>
            <div className="mt-8">
              <Button href={events.cta.href} variant="solid">
                {events.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="relative pb-20 lg:col-span-6 lg:col-start-7">
          <ImageReveal
            src="/images/events/artist-at-work.jpg"
            alt="Tattooing a guest inside the Heartbreaker Ink booth at an event"
            sizes="(min-width: 1024px) 34vw, 78vw"
            className="ml-auto aspect-[4/5] w-[78%]"
          />
          <figure className="absolute bottom-0 left-0 w-[44%]">
            <ImageReveal
              src="/images/events/flash-table.jpg"
              alt="Flash sheet and table at a Heartbreaker Ink event"
              sizes="(min-width: 1024px) 20vw, 44vw"
              className="aspect-square ring-[6px] ring-paper sm:ring-8"
              delay={0.25}
            />
            <figcaption className="label mt-3 text-maroon/70">{events.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
