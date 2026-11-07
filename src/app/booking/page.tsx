import type { Metadata } from "next";
import { Suspense } from "react";
import { CourtLines } from "@/components/graphics/CourtLines";
import { TextReveal } from "@/components/motion/TextReveal";
import { media } from "@/content/media";
import { BookingForm } from "@/features/booking/BookingForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a Session",
  description:
    "Request a badminton court, swimming session, coaching or membership at Pro Aquatics, Keshavnagar, Pune. Our team confirms availability with you.",
  path: "/booking",
  image: media.swimDive,
});

export default function BookingPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy pb-40 pt-36 text-white lg:pb-56 lg:pt-44">
        <CourtLines trigger="load" strokeWidth={2} className="absolute -left-[20%] bottom-0 -z-10 w-[80%] opacity-15" />
        <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold" />
              Booking
            </p>
            <TextReveal
              as="h1"
              trigger="load"
              lines={["BOOK YOUR", "SESSION."]}
              className="text-display uppercase"
              accentLine={1}
              accentClassName="text-gold"
            />
          </div>
          <p className="max-w-sm text-white/70 lg:pb-3">
            Three quick steps. Tell us what you&apos;d like to play or swim, when you&apos;d like to come in, and how
            to reach you.
          </p>
        </div>
      </section>

      <section className="relative -mt-28 pb-[var(--spacing-section)] lg:-mt-40">
        <div className="container-site">
          <Suspense fallback={<div className="min-h-[40rem] bg-white" />}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
