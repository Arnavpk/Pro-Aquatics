import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact";
import type { ContactResult } from "@/types/booking";

/** POST /api/contact — validates and accepts a contact message. */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const check = contactFormSchema.safeParse(body);

  if (!check.success) {
    return NextResponse.json<ContactResult>(
      { ok: false, message: check.error.issues[0]?.message ?? "Invalid message." },
      { status: 422 },
    );
  }

  // INTEGRATE: forward to the club inbox / CRM here.

  return NextResponse.json<ContactResult>({ ok: true });
}
