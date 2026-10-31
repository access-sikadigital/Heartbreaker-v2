import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home, reviews } from "@/content/site";

/** Reviews — placeholders are flagged until real Google / Instagram reviews are supplied. */
export function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="section-y bg-paper-dim/60">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            id="reviews-title"
            title={home.reviews.title}
            action={
              <Button href={home.reviews.cta.href} variant="outline">
                {home.reviews.cta.label}
              </Button>
            }
          />
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={i} className={i === 1 ? "md:translate-y-8" : ""}>
              <Reveal delay={i * 0.08} className="h-full">
                <figure className="relative flex h-full flex-col gap-8 border border-maroon/15 bg-paper p-7">
                  <span aria-hidden className="display absolute right-6 top-4 text-[4.5rem] text-maroon/10">
                    &rdquo;
                  </span>
                  {r.placeholder ? <span className="label self-start border border-maroon/40 px-2 py-1 text-maroon/70">Placeholder</span> : null}
                  <blockquote className="text-[1.0625rem] leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="label mt-auto flex justify-between border-t border-maroon/15 pt-4">
                    <span>{r.name}</span>
                    <span className="text-maroon/60">{r.detail}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
