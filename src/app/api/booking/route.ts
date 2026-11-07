import { NextResponse } from "next/server";
import { bookingFormSchema } from "@/lib/validation/booking";
import type { BookingRequest, BookingRequestResult } from "@/types/booking";

/**
 * POST /api/booking
 * Receives a booking REQUEST. Nothing here confirms a slot — there is no
 * availability system yet. Integration points are marked INTEGRATE.
 */
export async function POST(request: Request) {
  let payload: BookingRequest;
  try {
    payload = (await request.json()) as BookingRequest;
  } catch {
    return NextResponse.json<BookingRequestResult>(
      { ok: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  // Re-validate on the server with the same rules the form uses.
  const check = bookingFormSchema.safeParse({
    sport: payload.sport,
    bookingType: payload.bookingType,
    date: payload.schedule?.date,
    timeWindow: payload.schedule?.timeWindow,
    participants: payload.schedule ? String(payload.schedule.participants) : "",
    courtPreference: payload.badminton?.courtPreference,
    playStyle: payload.badminton?.playStyle,
    sessionPreference: payload.swimming?.sessionPreference,
    program: payload.swimming?.program,
    skillLevel: payload.skillLevel,
    membershipInterest: payload.membershipInterest,
    fullName: payload.contact?.fullName,
    mobile: payload.contact?.mobile,
    email: payload.contact?.email,
    notes: payload.notes,
  });

  if (!check.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of check.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json<BookingRequestResult>(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const reference = `PA-${Date.now().toString(36).toUpperCase()}`;

  // INTEGRATE: persist to database      → await db.bookingRequest.create({ data: { reference, ...payload } })
  // INTEGRATE: notify the club by email → await sendMail({ to: CLUB_INBOX, subject: `Booking request ${reference}` })
  // INTEGRATE: acknowledge the visitor  → await sendMail({ to: payload.contact.email, template: "request-received" })
  // INTEGRATE: availability engine      → check slots here before returning "received"

  return NextResponse.json<BookingRequestResult>({ ok: true, reference, status: "received" });
}
