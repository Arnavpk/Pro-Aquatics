import type { Metadata } from "next";
import Image from "next/image";
import { Faq } from "@/components/blocks/Faq";
import { CourtLines } from "@/components/graphics/CourtLines";
import { WaveRule } from "@/components/graphics/Waves";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
import { membershipFaq } from "@/content/membership";
import { ComparisonTable } from "@/features/membership/ComparisonTable";
import { MembershipExplorer } from "@/features/membership/MembershipExplorer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Membership",
  description:
    "Badminton, swimming and combined sports memberships at Pro Aquatics, Keshavnagar, Pune. Compare categories and send a membership enquiry.",
  path: "/membership",
  image: media.badmintonDoubles,
});

export default function MembershipPage() {
  return (
    <>
      {/* Hero — typographic, with a split photo strip */}
      <section className="relative isolate overflow-hidden bg-navy pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
        <CourtLines trigger="load" className="absolute -right-[30%] top-10 -z-10 w-[90%] opacity-15" strokeWidth={2} />
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-8 lg:col-span-8">
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold" />
              Membership
            </p>
            <TextReveal
              as="h1"
              trigger="load"
              lines={["FIND THE", "MEMBERSHIP", "THAT MOVES YOU."]}
              className="text-display uppercase"
              accentLine={2}
              accentClassName="text-gold"
            />
            <Reveal>
              <p className="max-w-lg text-lead text-white/75">
                Three ways to belong — badminton, swimming, or both. Pick a category, compare what&apos;s included and
                send us an enquiry.
              </p>
            </Reveal>
          </div>
          <Reveal className="grid grid-cols-2 gap-2 lg:col-span-4" delay={0.3}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={media.badmintonJumpAlt.src} alt={media.badmintonJumpAlt.alt} fill priority sizes="20vw" className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden">
              <Image src={media.swimGoggles.src} alt={media.swimGoggles.alt} fill priority sizes="20vw" className="object-cover" />
              <span className="absolute inset-0 bg-aqua/30 mix-blend-multiply" />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="plans" className="section-y bg-soft">
        <div className="container-site flex flex-col gap-14">
          <SectionHeading
            eyebrow="Plans"
            lines={["CHOOSE YOUR", "CATEGORY."]}
            align="center"
            accentLast
            intro="All prices, durations and benefits are placeholders until confirmed by the club."
          />
          <MembershipExplorer />
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-site flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Compare" lines={["SIDE BY SIDE."]} />
            <WaveRule className="text-aqua" />
          </div>
          <ComparisonTable />
        </div>
      </section>

      <section className="section-y bg-soft">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-4">
            <SectionHeading eyebrow="FAQ" lines={["GOOD", "QUESTIONS."]} accentLast />
            <Reveal className="flex flex-col gap-5">
              <p className="text-navy/70">Still deciding? Send an enquiry and the team will help you choose.</p>
              <ButtonLink href="/booking?type=membership" variant="navy" className="w-fit">
                Membership enquiry
              </ButtonLink>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq items={membershipFaq} />
          </div>
        </div>
      </section>
    </>
  );
}
