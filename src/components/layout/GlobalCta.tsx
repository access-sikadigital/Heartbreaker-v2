import { Button } from "@/components/ui/Button";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { cta, globalCta } from "@/content/site";

const strip = ["/images/work/floral-ankle.jpg", "/images/work/lion.jpg", "/images/work/bow-script.jpg"];

/** Appears at the foot of every page (copy deck: "Global CTA block"). */
export function GlobalCta() {
  return (
    <section aria-labelledby="cta-title" className="section-y">
      <div className="wrap">
        <div className="grid items-center gap-12 bg-maroon p-[clamp(1.75rem,4vw,3.5rem)] text-paper lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="label inline-flex items-center gap-2.5 text-paper/70">
              <span className="h-1.5 w-1.5 rounded-full bg-chilli" />
              {globalCta.eyebrow}
            </p>
            <h2 id="cta-title" className="display text-h2 mt-5">
              {globalCta.title}
            </h2>
            <p className="mt-6 max-w-[30rem] text-[1.0625rem] text-paper/85">{globalCta.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={cta.book.href} variant="chilli" size="lg">
                {cta.book.label}
              </Button>
              <Button href={cta.voucher.href} variant="outline-paper" size="lg">
                {cta.voucher.label}
              </Button>
            </div>
          </Reveal>
          <ul aria-hidden className="grid grid-cols-3 gap-3 lg:col-span-6">
            {strip.map((src, i) => (
              <li key={src} className={i === 1 ? "translate-y-6" : ""}>
                <ImageReveal src={src} alt="" sizes="(min-width: 1024px) 15vw, 30vw" className="aspect-[3/4] rounded-t-full" delay={i * 0.1} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
