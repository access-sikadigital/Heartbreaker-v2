import { Button } from "@/components/ui/Button";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { cta, home } from "@/content/site";

/** Editorial split hero: headline + facts on the left, a framed portrait on the right. */
export function Hero() {
  const { hero } = home;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="wrap grid items-center gap-14 pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label inline-flex items-center gap-2.5 border border-maroon/20 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-chilli" />
              {hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-title" className="display text-h1 mt-7">
              {hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[30rem] text-[1.125rem] text-maroon/85">{hero.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={cta.book.href} variant="chilli" size="lg">
                {cta.book.label}
              </Button>
              <Button href={hero.secondary.href} variant="outline" size="lg">
                {hero.secondary.label}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <dl className="mt-12 grid max-w-[34rem] grid-cols-3 border-t border-maroon/15">
              {hero.facts.map((f, i) => (
                <div key={f.k} className={`pt-4 ${i > 0 ? "border-l border-maroon/15 pl-4" : ""}`}>
                  <dt className="label text-maroon/60">{f.k}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] uppercase tracking-[0.06em]">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Photo pair */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto w-[86%] sm:w-[70%] lg:ml-auto lg:mr-6 lg:w-[86%]">
            {/* offset frame */}
            <span aria-hidden className="absolute -right-4 -top-4 h-full w-full border border-maroon/25 sm:-right-6 sm:-top-6" />
            <ImageReveal
              src="/images/studio/chair.jpg"
              alt="Heartbreaker Ink artist in a black suit, seated in a chrome chair in the studio"
              sizes="(min-width: 1024px) 32vw, 82vw"
              className="aspect-[4/5]"
              imgClassName="object-[50%_25%]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
