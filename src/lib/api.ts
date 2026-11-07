import type {
  BookingRequest,
  BookingRequestResult,
  ContactFormValues,
  ContactResult,
} from "@/types/booking";

/**
 * Client-side API calls. Components never call fetch directly, so swapping
 * the backend (CRM, Strapi, a booking engine…) only touches this file and
 * the route handlers in src/app/api.
 */

async function post<TBody, TResult>(url: string, body: TBody): Promise<TResult> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as TResult;
  if (!res.ok && !(data as { message?: string }).message) {
    throw new Error("Something went wrong. Please try again.");
  }
  return data;
}

export function submitBookingRequest(payload: BookingRequest) {
  return post<BookingRequest, BookingRequestResult>("/api/booking", payload);
}

export function submitContactMessage(payload: ContactFormValues) {
  return post<ContactFormValues, ContactResult>("/api/contact", payload);
}
