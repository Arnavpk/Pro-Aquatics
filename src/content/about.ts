import { Compass, Flag, HeartHandshake, Repeat, Target } from "lucide-react";
import { media } from "./media";
import type { GalleryItem } from "@/types/content";

/**
 * About page copy. Vision / mission / philosophy are DRAFT brand copy —
 * review with the client before launch.
 */
export const aboutHero = {
  eyebrow: "About Us",
  heading: ["YOUR GAME", "YOUR GROWTH."],
  text: "Pro Aquatics is a sporting destination in Keshavnagar, Pune, bringing badminton and swimming together under one roof with one standard for both.",
  images: [media.badmintonJumpAlt, media.swimDive, media.shuttleOnNet],
};

export const aboutIntroduction = {
  heading: "ONE CLUB. TWO DISCIPLINES. ONE STANDARD.",
  body: [
    "We created Pro Aquatics for people who take their sport seriously and for people who are just getting started. On the court and in the pool, the expectation is the same: show up, work with purpose and leave a little better than you arrived.",
    "Badminton sharpens speed, reflexes and decision-making. Swimming builds endurance, strength and calm. Together they make a complete sporting life, and our club is designed so you can pursue either, or both, with the same quality of facilities, coaching and care.",
  ],
};

export const philosophy = {
  eyebrow: "Brand philosophy",
  quote: "Your game. Your growth.",
  text: "Every player arrives with a different goal fitness, confidence, competition or simply joy. Our role is to give that goal structure: the right space, the right guidance and a community that holds you to a higher standard.",
};

export const visionMission = {
  vision: {
    title: "Vision",
    text: "To set a new standard for community sport in Pune a club where every member has the facilities, coaching and encouragement to keep moving and keep improving.",
  },
  mission: {
    title: "Mission",
    text: "To deliver well-run badminton and swimming programs for every age and ability, in a welcoming environment built on discipline, respect and consistent quality.",
  },
};

export const approach = [
  { icon: Compass, title: "Start where you are", text: "Every program begins with your current level no assumptions, no pressure." },
  { icon: Target, title: "Train with intent", text: "Sessions have a clear focus, so practice becomes progress." },
  { icon: Repeat, title: "Build the habit", text: "Consistent routines that fit around school, work and family life." },
  { icon: HeartHandshake, title: "Grow together", text: "Juniors, adults and families share one club and one culture." },
  { icon: Flag, title: "Raise the standard", text: "We hold our facilities, coaching and service to the same high bar." },
];

export const sportsOffered = [
  {
    sport: "badminton" as const,
    title: "Badminton",
    text: "Indoor courts, group play and coaching from beginner to advanced.",
    href: "/badminton",
    image: media.badmintonCourtBlue,
  },
  {
    sport: "swimming" as const,
    title: "Swimming",
    text: "Pool sessions, learn-to-swim, stroke development and personal training.",
    href: "/swimming",
    image: media.poolBlue,
  },
];

export const facilitiesOverview = [
  { title: "Badminton courts", text: "Dedicated indoor courts for play and coaching.", href: "/badminton#facilities" },
  { title: "Swimming pool", text: "A pool for lessons, laps and training programs.", href: "/swimming#facilities" },
  { title: "Coaching programs", text: "Beginner to advanced pathways in both sports.", href: "/membership" },
  { title: "Online booking requests", text: "Request sessions, coaching and memberships online.", href: "/booking" },
];

export const aboutGallery: GalleryItem[] = [
  { ...media.badmintonDoubles, caption: "Doubles on court" },
  { ...media.swimButterfly, caption: "Butterfly" },
  { ...media.badmintonJuniors, caption: "Junior training" },
  { ...media.poolLadder, caption: "Poolside" },
  { ...media.racketAndShuttles, caption: "Ready to play" },
  { ...media.swimRacers, caption: "Lane work" },
];