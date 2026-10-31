import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { home, studio } from "@/content/site";
import "./globals.css";

const boldMoney = localFont({
  src: "../fonts/BoldMoney.woff2",
  variable: "--font-bold-money",
  display: "swap",
  preload: true,
  fallback: ["Arial Black", "sans-serif"],
});

const lenia = localFont({
  src: "../fonts/LeniaMono-Medium.woff2",
  variable: "--font-lenia",
  weight: "500",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "monospace"],
});

const description = home.seo.description;

export const metadata: Metadata = {
  metadataBase: new URL(studio.url),
  title: {
    default: home.seo.title,
    template: "%s | Heartbreaker Ink",
  },
  description,
  applicationName: studio.name,
  keywords: ["fine line tattoo", "fine line tattoo Mornington", "tattoo Mornington Peninsula", "script tattoo", "flash tattoo", "fine line tattoos Melbourne"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    siteName: studio.name,
    title: home.seo.title,
    description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#570b0b",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: studio.name,
  description,
  url: studio.url,
  image: `${studio.url}/opengraph-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: studio.address.street,
    addressLocality: studio.address.locality,
    addressRegion: studio.address.region,
    addressCountry: studio.address.country,
  },
  areaServed: studio.serviceArea.map((name) => ({ "@type": "Place", name })),
  sameAs: [studio.instagramUrl, studio.linktree],
  founder: { "@type": "Person", name: studio.founder.name, jobTitle: studio.founder.role },
  potentialAction: { "@type": "ReserveAction", target: studio.bookingUrl, name: "Book a tattoo" },
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${boldMoney.variable} ${lenia.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <GlobalCta />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
