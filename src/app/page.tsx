import { Events } from "@/components/home/Events";
import { FlashSheet } from "@/components/home/FlashSheet";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Marquee } from "@/components/home/Marquee";
import { Process } from "@/components/home/Process";
import { Reviews } from "@/components/home/Reviews";
import { Services } from "@/components/home/Services";
import { Work } from "@/components/home/Work";
import { home } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div data-header="dark" className="bg-maroon text-paper">
        <Marquee items={home.marquee} />
      </div>
      <Intro />
      <Services />
      <Work />
      <FlashSheet />
      <Process />
      <Events />
      <Reviews />
    </>
  );
}
