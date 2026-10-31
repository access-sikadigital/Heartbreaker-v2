import type { Metadata } from "next";
import { Swallow } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="wrap section-y flex min-h-[70svh] flex-col items-center justify-center text-center">
      <Swallow className="mb-10 w-24 text-maroon" body="var(--color-paper)" />
      <p className="label mb-6 opacity-70">404</p>
      <h1 className="display text-h1">Page not found</h1>
      <p className="mt-6 max-w-[26rem] text-[1.0625rem]">This one&apos;s gone. Everything else is still here.</p>
      <div className="mt-10">
        <Button href="/" variant="solid" size="lg">
          Back to the studio
        </Button>
      </div>
    </section>
  );
}
