import { Button } from "@/components/ui/Button";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { home, mapsUrl } from "@/content/site";

/** Finding the studio: address, drive times, parking and the suburbs clients come from (local search). */
export function Visit() {
  const { visit } = home;
  return (
    <section aria-labelledby="visit-title" className="section-y bg-paper-dim/60">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <ImageReveal
          src="/images/studio/jacket.jpg"
          alt="Heartbreaker Ink's lead artist in the studio"
          sizes="(min-width: 1024px) 34vw, 90vw"
          className="aspect-[4/5] lg:col-span-5"
        />
        <Reveal className="lg:col-span-6 lg:col-start-7">
          <p className="label text-maroon/70">{visit.eyebrow}</p>
          <h2 id="visit-title" className="display text-h2 mt-5">
            {visit.title}
          </h2>
          <dl className="mt-8 border-t border-maroon/20">
            {visit.rows.map((r) => (
              <div key={r.k} className="grid gap-1 border-b border-maroon/20 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <dt className="label pt-1 text-maroon/60">{r.k}</dt>
                <dd>{r.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[0.9375rem] text-maroon/80">{visit.suburbs}</p>
          <div className="mt-8">
            <Button href={mapsUrl} variant="outline">
              Get directions
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
