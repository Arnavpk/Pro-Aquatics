import type { Metadata } from "next";
import { media } from "@/content/media";
import {
  AboutGallery,
  AboutHero,
  AboutIntroduction,
  Approach,
  FacilitiesOverview,
  Philosophy,
  SportsOffered,
  VisionMission,
} from "@/features/about/AboutSections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Pro Aquatics brings badminton and swimming together in Keshavnagar, Pune. Learn about our philosophy, vision, training approach and facilities.",
  path: "/about",
  image: media.badmintonJumpAlt,
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntroduction />
      <Philosophy />
      <VisionMission />
      <SportsOffered />
      <Approach />
      <FacilitiesOverview />
      <AboutGallery />
    </>
  );
}
