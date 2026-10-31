import { Button } from "@/components/ui/Button";
import { FlashIcon } from "@/components/ui/FlashIcon";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content/site";

/** About the studio: overlapping portrait pair, copy with a pull-quote, then the four promises as a numbered list. */
export function About() {
  const { intro } = home;
  return (
    <section aria-labelledby="about-title" className="section-y">
      <div className="wrap">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Portrait pair */}
          <div className="relative pb-16 lg:col-span-6 lg:pb-20">
            <ImageReveal
              src="/images/studio/crouch.jpg"
              alt="Heartbreaker Ink's lead artist in the studio"
              sizes="(min-width: 1024px) 36vw, 76vw"
              className="aspect-[4/5] w-[76%]"
            />
            <div className="absolute bottom-0 right-0 w-[48%]">
              <ImageReveal
                src="/images/studio/laugh.jpg"
                alt="Heartbreaker Ink's lead artist laughing, in a leather jacket and sunglasses"
                sizes="(min-width: 1024px) 22vw, 48vw"
                className="aspect-[3/4] ring-[6px] ring-paper sm:ring-8"
                delay={0.25}
              />
            </div>
            <span aria-hidden className="label absolute left-[80%] top-6 hidden origin-top-left rotate-90 whitespace-nowrap text-maroon/50 sm:block">
              Est. Mornington Peninsula
            </span>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 lg:pl-8">
            <Reveal>
              <p className="label text-maroon/70">{intro.eyebrow}</p>
              <h2 id="about-title" className="display text-h2 mt-5">
                {intro.title}
              </h2>
              <p className="mt-6 text-[1.125rem]">{intro.lede}</p>
              <p className="mt-4 text-maroon/85">{intro.story[0]}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="relative mt-14 border-l-2 border-maroon pl-6">
                <span aria-hidden className="display absolute -left-1 -top-8 text-[5rem] text-maroon/10">
                  &ldquo;
                </span>
                <p className="text-[1.25rem] leading-snug">{intro.aside}</p>
                <footer className="label mt-3 text-maroon/60">{intro.asideLabel}</footer>
              </blockquote>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={intro.cta.href} variant="chilli">
                  {intro.cta.label}
                </Button>
                <Button href={intro.more.href} variant="outline">
                  {intro.more.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Promises */}
        <ol className="mt-[clamp(4rem,8vw,6.5rem)] grid gap-x-10 border-t border-maroon/15 sm:grid-cols-2 lg:grid-cols-4">
          {intro.promises.map((p, i) => (
            <li key={p.title} className="border-b border-maroon/15 py-8 lg:border-b-0">
              <Reveal delay={i * 0.07}>
                <div className="flex items-center justify-between">
                  <span className="label tabular-nums text-maroon/50">{String(i + 1).padStart(2, "0")}</span>
                  <FlashIcon name={p.icon} className="h-8 w-8" />
                </div>
                <h3 className="display text-h3-lg mt-6">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-maroon/80">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
