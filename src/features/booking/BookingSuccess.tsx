"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { bookingOptions as opts } from "@/content/booking";
import { easeOutExpo, fadeUp, stagger } from "@/lib/animations";
import type { BookingRequest } from "@/types/booking";

const label = <T extends readonly { value: string; label: string }[]>(list: T, v?: string) =>
  list.find((o) => o.value === v)?.label ?? v ?? "—";

/** Shown after a request is received. Deliberately says "request", never "confirmed". */
export function BookingSuccess({
  reference,
  request,
  onReset,
}: {
  reference: string;
  request: BookingRequest;
  onReset: () => void;
}) {
  const rows: [string, string][] = [
    ["Sport", label(opts.sports, request.sport)],
    ["Booking type", label(opts.bookingTypes, request.bookingType)],
  ];
  if (request.schedule) {
    rows.push(
      [
        "Preferred date",
        new Date(`${request.schedule.date}T00:00:00`).toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      ],
      ["Preferred time", label(opts.timeWindows, request.schedule.timeWindow)],
      ["Participants", String(request.schedule.participants)],
    );
  }
  if (request.membershipInterest) rows.push(["Membership", label(opts.membershipInterest, request.membershipInterest)]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      variants={stagger(0.08)}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      <motion.span
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className="grid size-16 place-items-center bg-gold text-navy"
      >
        <Check strokeWidth={2} className="size-8" />
      </motion.span>
      <motion.div variants={fadeUp} className="flex flex-col gap-3">
        <p className="eyebrow text-aqua">Request received</p>
        <h2 className="font-display text-headline font-extrabold uppercase">Thank you, {request.contact.fullName.split(" ")[0]}.</h2>
        <p className="max-w-lg text-navy/70">
          Your booking request has been sent to the Pro Aquatics team. <strong className="text-navy">This is not yet a
          confirmed booking</strong> — we&apos;ll check availability and contact you on {request.contact.mobile} or{" "}
          {request.contact.email} to confirm.
        </p>
      </motion.div>

      <motion.dl variants={fadeUp} className="grid border-l border-t border-navy/12 sm:grid-cols-2">
        <div className="flex flex-col gap-1 border-b border-r border-navy/12 bg-soft p-4 sm:col-span-2">
          <dt className="eyebrow text-[0.62rem] text-navy/50">Request reference</dt>
          <dd className="font-display text-lg font-bold tracking-wider">{reference}</dd>
        </div>
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1 border-b border-r border-navy/12 p-4">
            <dt className="eyebrow text-[0.62rem] text-navy/50">{k}</dt>
            <dd className="text-sm font-semibold">{v}</dd>
          </div>
        ))}
      </motion.dl>

      <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant="navy" onClick={onReset}>
          Make another request
        </Button>
        <ButtonLink href="/" variant="dark">
          Back to home
        </ButtonLink>
      </motion.div>
    </motion.div>
  );
}
