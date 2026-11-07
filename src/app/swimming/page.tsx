import type { Metadata } from "next";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { Gallery } from "@/components/blocks/Gallery";
import { SportMembership } from "@/components/blocks/SportMembership";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
import { poolGallery, swimmingCta } from "@/content/swimming";
import { ProgramList } from "@/features/swimming/ProgramList";
import { SwimmingHero } from "@/features/swimming/SwimmingHero";
import { PoolFacilities, SwimmingAbout } from "@/features/swimming/SwimmingSections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Swimming Pool & Programs",
  description:
    "Swimming lessons, lap swimming, stroke development and personal training at Pro Aquatics, Keshavnagar, Pune. Request a swimming session online.",
  path: "/swimming",
  image: media.swimOlympicPool,
});

export default function SwimmingPage() {
  return (
    <>
      <SwimmingHero />
      <SwimmingAbout />
      <PoolFacilities />
      <section id="programs" className="section-y scroll-mt-20 bg-white">
        <div className="container-site flex flex-col gap-14">
          <SectionHeading
            eyebrow="Swimming programs"
            lines={["FIND YOUR", "STROKE."]}
            accentLast
            intro="From first float to race pace. Program availability, schedules and fees are editable and will be confirmed by the club."
          />
          <ProgramList />
        </div>
      </section>
      <SportMembership sport="swimming" />
      <section className="section-y bg-white">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading eyebrow="Pool gallery" lines={["BELOW &", "ABOVE THE SURFACE."]} accentLast />
          <Gallery items={poolGallery} layout="bento" tone="aqua" />
        </div>
      </section>
      <CtaBanner variant="water" {...swimmingCta} image={media.poolWater} />
    </>
  );
}
