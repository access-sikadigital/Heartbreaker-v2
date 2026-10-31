import { Button } from "@/components/ui/Button";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home, work } from "@/content/site";

// Bento layout: feature tiles span two cells so the grid doesn't read as a uniform contact sheet
const spans = [
  "col-span-2 row-span-2", // feature
  "",
  "row-span-2",
  "",
  "",
  "col-span-2",
  "",
];

/** Healed work in a mixed-size grid; captions sit on a paper tag over each photo. */
export function Work() {
  const items = work.slice(0, spans.length);
  return (
    <section aria-labelledby="work-title" className="section-y bg-maroon text-paper">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow={home.work.eyebrow}
            id="work-title"
            title={home.work.title}
            intro={home.work.subtitle}
            light
            action={
              <Button href={home.work.cta.href} variant="outline-paper">
                {home.work.cta.label}
              </Button>
            }
          />
        </Reveal>

        <ul className="mt-12 grid grid-flow-row-dense auto-rows-[clamp(9rem,19vw,17rem)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {items.map((w, i) => (
            <li key={w.src} className={`group relative ${spans[i]}`}>
              <ImageReveal
                src={w.src}
                alt={w.alt}
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                delay={(i % 4) * 0.07}
              />
              <span className="label pointer-events-none absolute bottom-3 left-3 bg-paper/95 px-2 py-1 text-maroon text-[0.6875rem]">{w.caption}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
