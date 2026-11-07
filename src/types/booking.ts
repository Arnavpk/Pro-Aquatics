import type { bookingOptions } from "@/content/booking";

type Values<T extends readonly { value: string }[]> = T[number]["value"];

export type SportValue = Values<typeof bookingOptions.sports>;
export type BookingType = Values<typeof bookingOptions.bookingTypes>;
export type TimeWindow = Values<typeof bookingOptions.timeWindows>;
export type SkillLevel = Values<typeof bookingOptions.skillLevel>;
export type MembershipInterest = Values<typeof bookingOptions.membershipInterest>;

/** Raw values held by the booking form (all strings, validated by Zod). */
export interface BookingFormValues {
  sport: string;
  bookingType: string;
  date: string;
  timeWindow: string;
  participants: string;
  courtPreference: string;
  playStyle: string;
  sessionPreference: string;
  program: string;
  skillLevel: string;
  membershipInterest: string;
  fullName: string;
  mobile: string;
  email: string;
  notes: string;
}

/** Normalised booking request sent to the API (and later to a database). */
export interface BookingRequest {
  sport: SportValue;
  bookingType: BookingType;
  schedule: { date: string; timeWindow: TimeWindow; participants: number } | null;
  badminton?: { courtPreference: string; playStyle: string };
  swimming?: { sessionPreference: string; program?: string };
  skillLevel?: SkillLevel;
  membershipInterest?: MembershipInterest;
  contact: { fullName: string; mobile: string; email: string };
  notes?: string;
}

/** Response from POST /api/booking. A request is NOT a confirmed booking. */
export interface BookingRequestResult {
  ok: boolean;
  reference?: string;
  status?: "received";
  message?: string;
  fieldErrors?: Record<string, string>;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
  message?: string;
}
