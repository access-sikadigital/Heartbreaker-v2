import { Button } from "@/components/ui/Button";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cta, home } from "@/content/site";

/** Booking in three steps as a timeline: one hairline, a marker per step. Horizontal on desktop, vertical on phones. */
export function Process() {
  const { process } = home;
  return (
    <section aria-labelledby="process-title" className="section-y bg-paper-dim/60">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow={process.eyebrow}
            id="process-title"
            title={process.title}
            action={
              <div className="flex flex-wrap gap-3">
                <Button href={cta.book.href} variant="chilli">
                  {cta.book.label}
                </Button>
                <Button href={process.secondary.href} variant="outline">
                  {process.secondary.label}
                </Button>
              </div>
            }
          />
        </Reveal>

        <ol className="relative mt-14 grid gap-10 pl-10 lg:grid-cols-3 lg:gap-12 lg:pl-0 lg:pt-12">
          {/* the line */}
          <span aria-hidden className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-maroon/25 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[0.6875rem] lg:h-px lg:w-auto" />
          {process.steps.map((s, i) => (
            <li key={s.n} className="relative">
              <span aria-hidden className="absolute -left-10 top-1 flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border border-maroon bg-paper lg:-top-12 lg:left-0">
                <span className="h-1.5 w-1.5 rounded-full bg-maroon" />
              </span>
              <Reveal delay={i * 0.1}>
                <div className="flex items-start justify-between gap-4">
                  <span className="display text-[clamp(2.75rem,4vw,3.75rem)] tabular-nums text-maroon/20">{s.n}</span>
                  <FlashIcon name={s.icon} className="mt-1 h-9 w-9" />
                </div>
                <h3 className="display text-h3-lg mt-5">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-maroon/85">{s.body}</p>
                <p className="label mt-4 text-maroon/60">{s.meta}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
