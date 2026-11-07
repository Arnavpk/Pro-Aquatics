import { z } from "zod";
import { bookingOptions as opts } from "@/content/booking";
import type { BookingFormValues, BookingRequest } from "@/types/booking";

/**
 * Booking validation
 * ------------------
 * The base object only checks types so that the single superRefine below
 * always runs. That lets the multi-step form validate one step at a time
 * (react-hook-form `trigger([...fields])`) while sharing one schema with the
 * API route.
 */

export const MOBILE_REGEX = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;

const str = z.string().optional().default("");

const has = <T extends readonly { value: string }[]>(list: T, v: string) =>
  list.some((o) => o.value === v);

export const bookingFormSchema = z
  .object({
    sport: str,
    bookingType: str,
    date: str,
    timeWindow: str,
    participants: str,
    courtPreference: str,
    playStyle: str,
    sessionPreference: str,
    program: str,
    skillLevel: str,
    membershipInterest: str,
    fullName: str,
    mobile: str,
    email: str,
    notes: str,
  })
  .superRefine((d, ctx) => {
    const fail = (path: keyof BookingFormValues, message: string) =>
      ctx.addIssue({ code: "custom", path: [path], message });

    // Step 1 — sport & booking type
    if (!has(opts.sports, d.sport)) fail("sport", "Choose a sport to continue.");
    if (!has(opts.bookingTypes, d.bookingType)) fail("bookingType", "Choose a booking type.");

    const isMembership = d.bookingType === "membership";

    // Step 2 — schedule (not needed for membership enquiries)
    if (!isMembership) {
      if (!d.date) fail("date", "Select your preferred date.");
      else if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date)) fail("date", "Enter a valid date.");
      else {
        const picked = new Date(`${d.date}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const limit = new Date(today);
        limit.setDate(limit.getDate() + opts.limits.maxDaysAhead);
        if (Number.isNaN(picked.getTime())) fail("date", "Enter a valid date.");
        else if (picked < today) fail("date", "The date can’t be in the past.");
        else if (picked > limit)
          fail("date", `Choose a date within the next ${opts.limits.maxDaysAhead} days.`);
      }

      if (!has(opts.timeWindows, d.timeWindow)) fail("timeWindow", "Select a preferred time.");

      const n = Number(d.participants);
      const min = d.bookingType === "group" ? opts.limits.minGroupSize : 1;
      if (!d.participants || !Number.isInteger(n)) fail("participants", "Enter the number of participants.");
      else if (n < min)
        fail("participants", d.bookingType === "group" ? `Group sessions need at least ${min} people.` : "At least 1 participant.");
      else if (n > opts.limits.maxParticipants)
        fail("participants", `For more than ${opts.limits.maxParticipants} people, please contact us directly.`);

      if (d.sport === "badminton") {
        if (!has(opts.badminton.courtPreference, d.courtPreference))
          fail("courtPreference", "Select a court preference.");
        if (!has(opts.badminton.playStyle, d.playStyle)) fail("playStyle", "Select how you’d like to play.");
      }
      if (d.sport === "swimming") {
        if (!has(opts.swimming.sessionPreference, d.sessionPreference))
          fail("sessionPreference", "Select a session preference.");
        if (d.sessionPreference === "lesson" && !has(opts.swimming.program, d.program))
          fail("program", "Select a program.");
      }
      if (d.bookingType === "coaching" && !has(opts.skillLevel, d.skillLevel))
        fail("skillLevel", "Select your current level.");
    } else if (!has(opts.membershipInterest, d.membershipInterest)) {
      fail("membershipInterest", "Select the membership you’re interested in.");
    }

    // Step 3 — contact details
    const name = d.fullName.trim();
    if (name.length < 2) fail("fullName", "Enter your full name.");
    else if (name.length > 80) fail("fullName", "Name is too long.");
    else if (!/^[\p{L}\s.'-]+$/u.test(name)) fail("fullName", "Use letters only.");

    if (!d.mobile.trim()) fail("mobile", "Enter your mobile number.");
    else if (!MOBILE_REGEX.test(d.mobile.trim())) fail("mobile", "Enter a valid 10-digit Indian mobile number.");

    if (!d.email.trim()) fail("email", "Enter your email address.");
    else if (!z.email().safeParse(d.email.trim()).success) fail("email", "Enter a valid email address.");

    if (d.notes.length > 600) fail("notes", "Keep additional requirements under 600 characters.");
  });

/** Field groups used for step-by-step validation in the form. */
export const bookingStepFields: (keyof BookingFormValues)[][] = [
  ["sport", "bookingType"],
  [
    "date",
    "timeWindow",
    "participants",
    "courtPreference",
    "playStyle",
    "sessionPreference",
    "program",
    "skillLevel",
    "membershipInterest",
  ],
  ["fullName", "mobile", "email", "notes"],
];

/** Convert validated form values into the normalised API payload. */
export function toBookingRequest(d: BookingFormValues): BookingRequest {
  const isMembership = d.bookingType === "membership";
  return {
    sport: d.sport as BookingRequest["sport"],
    bookingType: d.bookingType as BookingRequest["bookingType"],
    schedule: isMembership
      ? null
      : {
          date: d.date,
          timeWindow: d.timeWindow as NonNullable<BookingRequest["schedule"]>["timeWindow"],
          participants: Number(d.participants),
        },
    badminton:
      !isMembership && d.sport === "badminton"
        ? { courtPreference: d.courtPreference, playStyle: d.playStyle }
        : undefined,
    swimming:
      !isMembership && d.sport === "swimming"
        ? {
            sessionPreference: d.sessionPreference,
            program: d.sessionPreference === "lesson" ? d.program : undefined,
          }
        : undefined,
    skillLevel: d.bookingType === "coaching" ? (d.skillLevel as BookingRequest["skillLevel"]) : undefined,
    membershipInterest: isMembership
      ? (d.membershipInterest as BookingRequest["membershipInterest"])
      : undefined,
    contact: { fullName: d.fullName.trim(), mobile: d.mobile.trim(), email: d.email.trim() },
    notes: d.notes.trim() || undefined,
  };
}
