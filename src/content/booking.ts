import { media } from "./media";

/**
 * Booking form options. These drive both the UI and the Zod schema, so
 * changing an option here updates validation automatically.
 */
export const bookingOptions = {
  sports: [
    { value: "badminton", label: "Badminton", hint: "Courts, group play & coaching", image: media.badmintonJump },
    { value: "swimming", label: "Swimming", hint: "Pool sessions & programs", image: media.swimButterfly },
  ],
  bookingTypes: [
    { value: "single", label: "Single Session", hint: "One session for you" },
    { value: "group", label: "Group Session", hint: "Play or swim together" },
    { value: "coaching", label: "Coaching Session", hint: "Guided by a coach" },
    { value: "membership", label: "Membership Inquiry", hint: "Ask about plans" },
  ],
  /** Broad windows — exact slots are confirmed by the club. */
  timeWindows: [
    { value: "early-morning", label: "Early morning" },
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
  ],
  badminton: {
    courtPreference: [
      { value: "no-preference", label: "No preference" },
      { value: "specific", label: "Specific court (add in notes)" },
    ],
    playStyle: [
      { value: "singles", label: "Singles" },
      { value: "doubles", label: "Doubles" },
      { value: "practice", label: "Practice / drills" },
    ],
  },
  swimming: {
    sessionPreference: [
      { value: "lap", label: "Lap swimming" },
      { value: "recreational", label: "Recreational swim" },
      { value: "lesson", label: "Lesson / program" },
    ],
    program: [
      { value: "beginner", label: "Beginner Swimming" },
      { value: "intermediate", label: "Intermediate Swimming" },
      { value: "advanced", label: "Advanced Swimming" },
      { value: "personal-training", label: "Personal Training" },
      { value: "not-sure", label: "Not sure yet" },
    ],
  },
  skillLevel: [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ],
  membershipInterest: [
    { value: "badminton", label: "Badminton Membership" },
    { value: "swimming", label: "Swimming Membership" },
    { value: "combined", label: "Combined Sports Membership" },
  ],
  limits: {
    /** Adjust to the club's actual policy. */
    maxParticipants: 12,
    minGroupSize: 2,
    maxDaysAhead: 90,
  },
} as const;

export const bookingSteps = [
  { title: "Choose", text: "Pick your sport and the kind of session you want." },
  { title: "Schedule", text: "Tell us your preferred date, time and group size." },
  { title: "Request", text: "Share your details. We confirm availability with you." },
] as const;
