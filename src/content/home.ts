import {
  Building2,
  CalendarCheck,
  GraduationCap,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import { tbc } from "@/lib/placeholder";
import { media } from "./media";
import type { Feature, GalleryItem, Stat } from "@/types/content";

export const homeHero = {
  heading: ["A NEW", "STANDARD", "IN SPORT."],
  text: "Where passion meets performance. Discover a sporting experience built around movement, discipline and growth.",
  panels: {
    badminton: { image: media.badmintonJump, label: "Badminton", href: "/badminton", cta: "Explore Badminton" },
    swimming: { image: media.swimButterfly, label: "Swimming", href: "/swimming", cta: "Explore Swimming" },
  },
};

export const sportsSelection = {
  eyebrow: "Two sports. One standard.",
  heading: "FIND YOUR GAME.",
  cards: [
    {
      sport: "badminton" as const,
      // index: "01",
      heading: "OWN THE COURT.",
      text: "Indoor courts built for fast rallies and focused practice  with structured coaching for every level, from first serve to competitive play.",
      cta: "Explore Badminton",
      href: "/badminton",
      image: media.badmintonDoubles,
    },
    {
      sport: "swimming" as const,
      // index: "02",
      heading: "MAKE WAVES.",
      text: "A pool designed for confident, consistent swimming from learn-to-swim programs to lap training and personal coaching.",
      cta: "Explore Swimming",
      href: "/swimming",
      image: media.swimCompetition,
    },
  ],
};

export const aboutIntro = {
  eyebrow: "About Pro Aquatics",
  heading: "MORE THAN A SPORTS CLUB.",
  lead: "Pro Aquatics brings swimming and badminton together in one sporting destination in Keshavnagar, Pune — a place to train with purpose, play with energy and grow alongside people who share the same drive.",
  pillars: [
    { title: "Sports & fitness", text: "Two complete disciplines that build strength, stamina and coordination." },
    { title: "Skill development", text: "Clear progression for every level, from fundamentals to refined technique." },
    { title: "Training opportunities", text: "Coaching, group sessions and programs designed around real goals." },
    { title: "Community", text: "A welcoming club where families, juniors and adults train side by side." },
    { title: "Active lifestyles", text: "Routines that fit around school, work and life and stay with you." },
  ],
  images: { primary: media.swimLanes, secondary: media.shuttleInHand },
};

export const whyChooseUs: { heading: string; eyebrow: string; items: Feature[] } = {
  eyebrow: "Why Pro Aquatics",
  heading: "BUILT AROUND THE WAY YOU TRAIN.",
  items: [
    {
      icon: Building2,
      title: "Sports Facilities",
      description: "Purpose-built badminton courts and a swimming pool, maintained for quality play and training.",
    },
    {
      icon: GraduationCap,
      title: "Training Opportunities",
      description: "Beginner to advanced programs, group sessions and one-to-one coaching across both sports.",
    },
    {
      icon: HeartHandshake,
      title: "Welcoming Community",
      description: "An inclusive club for juniors, adults and families wherever you are starting from.",
    },
    {
      icon: TrendingUp,
      title: "Skill Development",
      description: "Structured progression that turns practice into measurable improvement.",
    },
    {
      icon: CalendarCheck,
      title: "Convenient Bookings",
      description: "Request courts, pool sessions and coaching online in a few simple steps.",
    },
  ],
};

/** Replace tbc() values with confirmed numbers to enable the count-up. */
export const stats: Stat[] = [
  { label: "Sports", value: 2 },
  { label: "Facilities", value: tbc("Facilities") },
  { label: "Members", value: tbc("Members"), suffix: "+" },
  { label: "Training programs", value: tbc("Programs") },
];

export const homeGallery: GalleryItem[] = [
  { ...media.badmintonMatch, caption: "Badminton action", tag: "Badminton" },
  { ...media.poolBlue, caption: "The pool", tag: "Swimming" },
  { ...media.badmintonJuniors, caption: "Training sessions", tag: "Training" },
  { ...media.swimDive, caption: "Off the blocks", tag: "Swimming" },
  { ...media.badmintonCourtsEmpty, caption: "Sports facilities", tag: "Facilities" },
  { ...media.swimLanes, caption: "Lane training", tag: "Training" },
  { ...media.shuttleOnNet, caption: "Club environment", tag: "Club" },
];

export const finalCta = {
  heading: "YOUR GAME. YOUR GROWTH.",
  text: "Take the first step towards a more active lifestyle.",
  primary: { label: "Book Your Session", href: "/booking" },
  secondary: { label: "Explore Our Facilities", href: "/about#facilities" },
  images: { left: media.badmintonNight, right: media.swimSpray },
};
