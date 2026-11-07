import type { Metadata } from "next";
import { AboutIntro } from "@/features/home/AboutIntro";
import { HomeHero } from "@/features/home/HomeHero";
import { FinalCta, GalleryPreview, StatsSection } from "@/features/home/HomeSections";
import { SportsSelection } from "@/features/home/SportsSelection";
import { WhyChooseUs } from "@/features/home/WhyChooseUs";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Badminton & Swimming in Keshavnagar, Pune",
    description: site.description,
    path: "/",
    image: media.badmintonJump,
  }),
  title: { absolute: `${site.name} — ${site.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <SportsSelection />
      <AboutIntro />
      <WhyChooseUs />
      <StatsSection />
      <GalleryPreview />
      <FinalCta />
    </>
  );
}
