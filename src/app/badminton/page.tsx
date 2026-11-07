import type { Metadata } from "next";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { HorizontalGallery } from "@/components/blocks/HorizontalGallery";
import { SportMembership } from "@/components/blocks/SportMembership";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { badmintonCta, badmintonGallery } from "@/content/badminton";
import { media } from "@/content/media";
import { BadmintonHero } from "@/features/badminton/BadmintonHero";
import { BadmintonAbout, BadmintonFacilities } from "@/features/badminton/BadmintonSections";
import { TrainingTabs } from "@/features/badminton/TrainingTabs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Badminton Courts & Coaching",
  description:
    "Indoor badminton courts, group play and coaching from beginner to advanced at Pro Aquatics, Keshavnagar, Pune. Send a court booking request online.",
  path: "/badminton",
  image: media.badmintonJump,
});

export default function BadmintonPage() {
  return (
    <>
      <BadmintonHero />
      <BadmintonAbout />
      <BadmintonFacilities />
      <section id="training" className="section-y scroll-mt-20 bg-white">
        <div className="container-site flex flex-col gap-14">
          <SectionHeading
            eyebrow="Training & coaching"
            lines={["TRAIN AT", "YOUR LEVEL."]}
            accentLast
            intro="Three clear levels, each with a defined focus. Coach details, schedules and fees will be published once confirmed."
          />
          <TrainingTabs />
        </div>
      </section>
      <SportMembership sport="badminton" />
      <section className="bg-navy text-white">
        <HorizontalGallery
          items={badmintonGallery}
          heading={<SectionHeading eyebrow="Gallery" lines={["ON THE COURT."]} tone="light" />}
        />
      </section>
      <CtaBanner variant="court" {...badmintonCta} />
    </>
  );
}
