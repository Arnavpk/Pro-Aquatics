import { Grid2x2, Layers, Lightbulb, Ruler, Users } from "lucide-react";
import { tbc } from "@/lib/placeholder";
import { media } from "./media";
import type { CoachProfile, GalleryItem, Program, SpecItem } from "@/types/content";

export const badmintonHero = {
  eyebrow: "Badminton at Pro Aquatics",
  heading: ["OWN", "EVERY", "RALLY."],
  text: "Fast footwork, sharp reflexes and total focus. Step onto courts built for players who want every point to count.",
  cta: { label: "Book a Court", href: "/booking?sport=badminton" },
  image: media.badmintonJump,
};

export const badmintonAbout = {
  eyebrow: "The badminton experience",
  heading: "SPEED. PRECISION. CONTROL.",
  body: [
    "Badminton at Pro Aquatics is built around the game as it should be played — on dedicated indoor courts, with room to move and conditions that let you focus on the shot in front of you.",
    "Whether you are picking up a racket for the first time, sharpening your doubles game or preparing for competition, you will find sessions, coaching and a community that pushes you forward.",
  ],
  highlights: ["Indoor courts", "Coaching for all levels", "Singles & doubles play", "Junior & adult sessions"],
  images: { main: media.badmintonPlayer, detail: media.racketAndShuttles },
};

export const badmintonFacilities: SpecItem[] = [
  { icon: Grid2x2, label: "Courts", value: tbc("Number of courts"), note: "Dedicated indoor badminton courts" },
  { icon: Ruler, label: "Court specifications", value: tbc("Flooring & court spec"), note: "Surface, markings and ceiling height" },
  { icon: Users, label: "Playing arrangements", value: tbc("Singles / doubles / group format"), note: "Casual play, group and coaching sessions" },
  { icon: Layers, label: "Equipment", value: tbc("Racket & shuttle availability"), note: "Rental and purchase options" },
  { icon: Lightbulb, label: "Lighting & amenities", value: tbc("Lighting, changing rooms, seating"), note: "Glare-controlled lighting and player amenities" },
];

const sharedDetails = () => [
  { label: "Coach", value: tbc("Coach name") },
  { label: "Schedule", value: tbc("Days & timings") },
  { label: "Duration", value: tbc("Program duration") },
  { label: "Fee", value: tbc("Program fee") },
];

export const badmintonPrograms: Program[] = [
  {
    slug: "beginner",
    level: "Level 01",
    title: "Beginner Training",
    summary: "Grip, footwork, serve and the basic strokes — the foundations that make every rally easier and more enjoyable.",
    focus: ["Grip & ready position", "Basic footwork patterns", "Serve & return", "Clears and drops"],
    image: media.badmintonJuniors,
    details: sharedDetails(),
  },
  {
    slug: "intermediate",
    level: "Level 02",
    title: "Intermediate Training",
    summary: "Build consistency and court craft. Sharpen technique under pressure and learn to construct points with intent.",
    focus: ["Smash & net play", "Defensive positioning", "Doubles rotation", "Match-play drills"],
    image: media.badmintonDoubles,
    details: sharedDetails(),
  },
  {
    slug: "advanced",
    level: "Level 03",
    title: "Advanced Training",
    summary: "High-intensity sessions for competitive players — speed, deception, tactics and the physical edge to finish points.",
    focus: ["Attacking combinations", "Deception & disguise", "Multi-shuttle feeding", "Tournament preparation"],
    image: media.badmintonMatch,
    details: sharedDetails(),
  },
];

/** Coach profiles — replace every tbc() with confirmed details. */
export const badmintonCoaches: CoachProfile[] = [
  { name: tbc("Coach name"), role: "Head Coach", qualifications: tbc("Qualifications") },
  { name: tbc("Coach name"), role: "Coach", qualifications: tbc("Qualifications") },
  { name: tbc("Coach name"), role: "Junior Coach", qualifications: tbc("Qualifications") },
];

export const badmintonGallery: GalleryItem[] = [
  { ...media.badmintonMatch, caption: "Match intensity" },
  { ...media.badmintonCourtBlue, caption: "Indoor court" },
  { ...media.shuttleOnNet, caption: "At the net" },
  { ...media.badmintonDoubles, caption: "Doubles rally" },
  { ...media.racketFlatlay, caption: "Equipment" },
  { ...media.badmintonJumpAlt, caption: "The jump smash" },
  { ...media.courtShoe, caption: "On the line" },
  { ...media.badmintonNight, caption: "Late session" },
];

export const badmintonCta = {
  heading: "READY TO HIT YOUR FIRST SHOT?",
  text: "Send a booking request for a court, group session or coaching. Our team will get back to you to confirm availability.",
  cta: { label: "Book Badminton Session", href: "/booking?sport=badminton" },
};
