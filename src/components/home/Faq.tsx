import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs, home } from "@/content/site";

/** Common questions as a native disclosure list (works without JS). Mirrored in FAQPage JSON-LD on the page. */
export function Faq() {
  const { faq } = home;
  return (
    <section aria-labelledby="faq-title" className="section-y bg-maroon text-paper">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading eyebrow={faq.eyebrow} id="faq-title" title={faq.title} intro={faq.intro} light />
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-paper/20">
            {faqs.map((f) => (
              <li key={f.q} className="border-b border-paper/20">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.0625rem] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="relative block h-3.5 w-3.5 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                      <span className="absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <div className="pb-6 pr-10 text-paper/85">
                    <p>{f.a}</p>
                    {"source" in f && f.source ? (
                      <p className="label mt-3 text-paper/55">
                        Source:{" "}
                        <a href={f.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                          {new URL(f.source).hostname.replace("www.", "")}
                        </a>
                        , checked Oct 2026
                      </p>
                    ) : null}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
