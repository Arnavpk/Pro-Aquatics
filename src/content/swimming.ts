import { ArrowDownToLine, Ruler, ShowerHead, Thermometer, Waves } from "lucide-react";
import { tbc } from "@/lib/placeholder";
import { media } from "./media";
import type { GalleryItem, Program, SpecItem } from "@/types/content";

export const swimmingHero = {
  eyebrow: "Swimming at Pro Aquatics",
  heading: ["DIVE INTO", "SOMETHING", "BETTER."],
  text: "Clear water, calm focus and programs that move at your pace. Learn, train and swim with confidence.",
  cta: { label: "Book a Swimming Session", href: "/booking?sport=swimming" },
  image: media.swimOlympicPool,
};

export const swimmingAbout = {
  eyebrow: "The swimming experience",
  statement:
    "Swimming is the one sport that works every part of you: strength, breath, rhythm and calm. At Pro Aquatics, the pool is a place to learn it properly, train it seriously and enjoy it every time you get in.",
  points: [
    { title: "Learn", text: "Structured lessons that build water confidence and correct technique from day one." },
    { title: "Train", text: "Lap swimming and stroke development for fitness, endurance and performance." },
    { title: "Enjoy", text: "A clean, welcoming environment for swimmers of every age and ability." },
  ],
  image: media.swimSpray,
};

export const poolFacilities: SpecItem[] = [
  { icon: Waves, label: "Pool specifications", value: tbc("Pool type & lanes"), note: "Lane layout and pool type" },
  { icon: Ruler, label: "Dimensions", value: tbc("Length × width"), note: "Overall pool dimensions" },
  { icon: ArrowDownToLine, label: "Depth", value: tbc("Shallow to deep end"), note: "Depth profile across the pool" },
  { icon: Thermometer, label: "Temperature", value: tbc("Water temperature, if applicable"), note: "Water temperature management" },
  { icon: ShowerHead, label: "Amenities", value: tbc("Changing rooms, showers, lockers"), note: "Poolside and changing facilities" },
];

const details = () => [
  { label: "Age group", value: tbc("Age group") },
  { label: "Schedule", value: tbc("Days & timings") },
  { label: "Batch size", value: tbc("Batch size") },
  { label: "Fee", value: tbc("Program fee") },
];

/** Program availability is editable — remove or add entries as confirmed. */
export const swimmingPrograms: Program[] = [
  {
    slug: "beginner",
    level: "01",
    title: "Beginner Swimming",
    summary: "Water confidence, floating, breathing and the first strokes; taught patiently, step by step.",
    focus: ["Water confidence", "Breathing & floating", "Kicking technique", "Freestyle basics"],
    image: media.swimGoggles,
    details: details(),
  },
  {
    slug: "intermediate",
    level: "02",
    title: "Intermediate Swimming",
    summary: "Refine technique across strokes and build the stamina to swim continuous lengths with ease.",
    focus: ["Stroke refinement", "Backstroke & breaststroke", "Turns", "Endurance sets"],
    image: media.swimFreestyle,
    details: details(),
  },
  {
    slug: "advanced",
    level: "03",
    title: "Advanced Swimming",
    summary: "Performance focused training: race pace, efficient turns and starts, and structured sets.",
    focus: ["All four strokes", "Starts & tumble turns", "Interval training", "Race preparation"],
    image: media.swimRacers,
    details: details(),
  },
  {
    slug: "personal-training",
    level: "04",
    title: "Personal Training",
    summary: "One-to-one coaching built around your goals, schedule and current ability.",
    focus: ["Individual assessment", "Goal-based plans", "Technique correction", "Flexible timing"],
    image: media.swimButterfly,
    details: details(),
  },
  {
    slug: "other",
    level: "05",
    title: "Other Programs",
    summary: "Additional programs such as fitness swimming or holiday batches can be listed here once confirmed.",
    focus: [],
    image: media.poolWater,
    details: [{ label: "Programs", value: tbc("Additional programs") }],
  },
];

export const poolGallery: GalleryItem[] = [
  { ...media.poolBlue, caption: "Clear water" },
  { ...media.swimLanes, caption: "Lane training" },
  { ...media.poolWater, caption: "Surface light" },
  { ...media.swimDive, caption: "The dive" },
  { ...media.poolLadder, caption: "Poolside" },
  { ...media.swimCompetition, caption: "Freestyle" },
  { ...media.poolTiles, caption: "Below the surface" },
];

export const swimmingCta = {
  heading: "MAKE YOUR NEXT MOVE.",
  text: "Request a swimming session, a program enrolment or personal training. We’ll confirm the details with you directly.",
  cta: { label: "Book Swimming Session", href: "/booking?sport=swimming" },
};
