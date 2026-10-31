import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { Events } from "@/components/home/Events";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Visit } from "@/components/home/Visit";
import { Work } from "@/components/home/Work";
import { faqs, home } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: home.seo.title },
  description: home.seo.description,
  alternates: { canonical: "/" },
};

// Mirrors the visible FAQ so search engines and AI answers can lift the same text
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

// Reviews section returns once real, consented Google / Instagram reviews are supplied (no placeholders on a live site).
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <Marquee items={home.marquee} />
      <About />
      <Services />
      <Work />
      <Process />
      <Events />
      <Faq />
      <Visit />
    </>
  );
}
