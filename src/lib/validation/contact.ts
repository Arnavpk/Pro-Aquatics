import { z } from "zod";
import { MOBILE_REGEX } from "./booking";

export const contactSubjects = [
  "General enquiry",
  "Badminton",
  "Swimming",
  "Membership",
  "Coaching",
  "Feedback",
] as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(80, "Name is too long."),
  email: z.string().trim().min(1, "Enter your email address.").pipe(z.email("Enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || MOBILE_REGEX.test(v), "Enter a valid 10-digit Indian mobile number."),
  subject: z.enum(contactSubjects, { error: "Choose a subject." }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters).")
    .max(1200, "Keep your message under 1200 characters."),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
