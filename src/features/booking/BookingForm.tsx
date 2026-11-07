"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Info, LoaderCircle, Minus, Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import { ChoiceTile, Field, FieldError, Input, Select, Textarea, describe } from "@/components/ui/form";
import { bookingOptions as opts, bookingSteps } from "@/content/booking";
import { stepSlide, easeOutExpo } from "@/lib/animations";
import { submitBookingRequest } from "@/lib/api";
import { cn, pad, todayISO } from "@/lib/utils";
import { bookingFormSchema, bookingStepFields, toBookingRequest } from "@/lib/validation/booking";
import type { BookingFormValues, BookingRequest } from "@/types/booking";
import { BookingSuccess } from "./BookingSuccess";

type FormInput = z.input<typeof bookingFormSchema>;

const EMPTY: BookingFormValues = {
  sport: "",
  bookingType: "",
  date: "",
  timeWindow: "",
  participants: "1",
  courtPreference: "no-preference",
  playStyle: "",
  sessionPreference: "",
  program: "",
  skillLevel: "",
  membershipInterest: "",
  fullName: "",
  mobile: "",
  email: "",
  notes: "",
};

const pick = <T extends readonly { value: string }[]>(list: T, v: string | null) =>
  v && list.some((o) => o.value === v) ? v : "";

const scrollToPanel = () =>
  document.getElementById("booking-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function BookingForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<{ reference: string; request: BookingRequest } | null>(null);
  const [today] = useState(todayISO);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    mode: "onTouched",
    defaultValues: {
      ...EMPTY,
      sport: pick(opts.sports, params.get("sport")),
      bookingType: pick(opts.bookingTypes, params.get("type")),
      membershipInterest: pick(opts.membershipInterest, params.get("plan")),
    },
  });

  const [sport, bookingType, participants, sessionPreference] = useWatch({
    control,
    name: ["sport", "bookingType", "participants", "sessionPreference"],
  });
  const isMembership = bookingType === "membership";
  const sportImage = opts.sports.find((s) => s.value === sport)?.image ?? opts.sports[0].image;

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    scrollToPanel();
  };

  const next = async () => {
    const ok = await trigger(bookingStepFields[step], { shouldFocus: true });
    if (ok) goTo(step + 1);
  };

  const onSubmit = async (values: BookingFormValues) => {
    setServerError(null);
    const request = toBookingRequest(values);
    try {
      const res = await submitBookingRequest(request);
      if (res.ok && res.reference) {
        setResult({ reference: res.reference, request });
        scrollToPanel();
        return;
      }
      if (res.fieldErrors) {
        const keys = Object.keys(res.fieldErrors) as (keyof BookingFormValues)[];
        keys.forEach((k) => setError(k, { message: res.fieldErrors![k] }));
        const firstStep = bookingStepFields.findIndex((fields) => fields.some((f) => keys.includes(f)));
        if (firstStep >= 0) goTo(firstStep);
      }
      setServerError(res.message ?? "We couldn't send your request. Please try again.");
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again.");
    }
  };

  const stepParticipants = (delta: number) => {
    const n = Math.min(opts.limits.maxParticipants, Math.max(1, (Number(participants) || 0) + delta));
    setValue("participants", String(n), { shouldValidate: true, shouldTouch: true });
  };

  const startOver = () => {
    reset(EMPTY);
    setResult(null);
    setStep(0);
  };

  return (
    <div id="booking-panel" className="grid scroll-mt-24 lg:grid-cols-12">
      {/* Aside — sport imagery + progress */}
      <aside className="relative isolate overflow-hidden bg-navy p-7 text-white sm:p-10 lg:col-span-5">
        <AnimatePresence initial={false}>
          <motion.div
            key={sportImage.src}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: easeOutExpo }}
            className="absolute inset-0 -z-20"
          >
            <Image src={sportImage.src} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 transition-colors duration-700",
            sport === "swimming" ? "bg-aqua/70 mix-blend-multiply" : "bg-navy/70",
          )}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/60 to-navy/20" />

        <div className="flex h-full flex-col justify-between gap-12 lg:min-h-[38rem]">
          <div className="flex flex-col gap-3">
            <p className="eyebrow text-gold">Booking request</p>
            <p className="font-display text-title font-extrabold uppercase">
              {sport ? (sport === "swimming" ? "Into the water." : "Onto the court.") : "Your session starts here."}
            </p>
          </div>

          <ol className="flex flex-col gap-5" aria-label="Booking steps">
            {bookingSteps.map((s, i) => {
              const state = result ? "done" : i < step ? "done" : i === step ? "current" : "todo";
              return (
                <li key={s.title} className="flex gap-4" aria-current={state === "current" ? "step" : undefined}>
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center border font-display text-xs font-bold transition-colors duration-500",
                      state === "current" && "border-gold bg-gold text-navy",
                      state === "done" && "border-gold text-gold",
                      state === "todo" && "border-white/25 text-white/50",
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className={cn("font-display text-sm font-bold uppercase tracking-wide", state === "todo" && "text-white/50")}>
                      {s.title}
                    </span>
                    <span className="hidden text-sm text-white/60 sm:block">{s.text}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          <p className="flex gap-3 border-t border-white/15 pt-6 text-sm text-white/70">
            <Info strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-gold" />
            Submitting sends a request, not a confirmed booking. Our team checks availability and contacts you to
            confirm. No payment is taken online.
          </p>
        </div>
      </aside>

      {/* Form */}
      <div className="relative border border-t-0 border-navy/10 bg-white p-6 sm:p-10 lg:col-span-7 lg:border-l-0 lg:border-t lg:p-14">
        {result ? (
          <BookingSuccess reference={result.reference} request={result.request} onReset={startOver} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
            {/* Progress bar */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-aqua">
                  Step {step + 1} of {bookingSteps.length}
                </p>
                <p className="eyebrow text-navy/50">{bookingSteps[step].title}</p>
              </div>
              <div className="h-[3px] w-full bg-navy/10">
                <motion.div
                  className="h-full origin-left bg-navy"
                  animate={{ scaleX: (step + 1) / bookingSteps.length }}
                  transition={{ duration: 0.7, ease: easeOutExpo }}
                />
              </div>
            </div>

            <div className="relative min-h-[22rem]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.fieldset
                  key={step}
                  custom={direction}
                  variants={stepSlide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-8"
                >
                  {step === 0 && (
                    <>
                      <legend className="sr-only">Choose your sport and booking type</legend>
                      <div className="flex flex-col gap-3">
                        <p className="eyebrow text-[0.68rem] text-navy/70">
                          Select sport <span className="text-aqua">*</span>
                        </p>
                        <div role="radiogroup" aria-label="Sport" className="grid gap-3 sm:grid-cols-2">
                          {opts.sports.map((s) => (
                            <label key={s.value} className="group relative block cursor-pointer">
                              <input type="radio" value={s.value} className="sr-only" {...register("sport")} />
                              <span className="on-light relative isolate flex h-40 flex-col justify-end overflow-hidden border border-navy/15 p-5 text-white transition-all duration-500 group-has-checked:border-navy group-has-checked:ring-2 group-has-checked:ring-gold group-has-focus-visible:ring-2 group-has-focus-visible:ring-aqua">
                                <Image
                                  src={s.image.src}
                                  alt=""
                                  fill
                                  sizes="(min-width: 640px) 25vw, 100vw"
                                  className="-z-10 object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                                />
                                <span
                                  className={cn(
                                    "absolute inset-0 -z-10 transition-colors duration-500",
                                    s.value === "swimming"
                                      ? "bg-aqua/60 group-has-checked:bg-aqua/40"
                                      : "bg-navy/65 group-has-checked:bg-navy/45",
                                  )}
                                />
                                <span className="flex items-end justify-between gap-3">
                                  <span className="flex flex-col gap-1">
                                    <span className="font-display text-2xl font-extrabold uppercase">{s.label}</span>
                                    <span className="text-xs text-white/75">{s.hint}</span>
                                  </span>
                                  <span
                                    aria-hidden
                                    className="size-5 shrink-0 rounded-full border-2 border-white/70 transition-colors group-has-checked:border-gold group-has-checked:bg-gold"
                                  />
                                </span>
                              </span>
                            </label>
                          ))}
                        </div>
                        <FieldError id="sport-error" message={errors.sport?.message} />
                      </div>

                      <div className="flex flex-col gap-3">
                        <p className="eyebrow text-[0.68rem] text-navy/70">
                          Booking type <span className="text-aqua">*</span>
                        </p>
                        <div role="radiogroup" aria-label="Booking type" className="grid gap-3 sm:grid-cols-2">
                          {opts.bookingTypes.map((t) => (
                            <ChoiceTile key={t.value} value={t.value} label={t.label} hint={t.hint} {...register("bookingType")} />
                          ))}
                        </div>
                        <FieldError id="bookingType-error" message={errors.bookingType?.message} />
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <legend className="sr-only">Schedule and preferences</legend>
                      {isMembership ? (
                        <Field id="membershipInterest" label="Membership of interest" required error={errors.membershipInterest?.message}>
                          <Select
                            {...describe("membershipInterest", errors.membershipInterest?.message)}
                            {...register("membershipInterest")}
                            placeholder="Select a membership"
                            options={opts.membershipInterest}
                          />
                        </Field>
                      ) : (
                        <>
                          <div className="grid gap-6 sm:grid-cols-2">
                            <Field id="date" label="Preferred date" required error={errors.date?.message}>
                              <Input
                                type="date"
                                min={today}
                                max={addDays(today, opts.limits.maxDaysAhead)}
                                {...describe("date", errors.date?.message)}
                                {...register("date")}
                              />
                            </Field>
                            <Field
                              id="timeWindow"
                              label="Preferred time"
                              required
                              error={errors.timeWindow?.message}
                              hint="Exact slot is confirmed by the club."
                            >
                              <Select
                                {...describe("timeWindow", errors.timeWindow?.message, true)}
                                {...register("timeWindow")}
                                placeholder="Select a time"
                                options={opts.timeWindows}
                              />
                            </Field>
                          </div>

                          <Field
                            id="participants"
                            label="Number of participants"
                            required
                            error={errors.participants?.message}
                            hint={bookingType === "group" ? `Group sessions: ${opts.limits.minGroupSize}–${opts.limits.maxParticipants} people.` : undefined}
                          >
                            <div className="flex w-full max-w-60">
                              <button
                                type="button"
                                onClick={() => stepParticipants(-1)}
                                aria-label="Decrease participants"
                                className="on-light grid size-14 shrink-0 place-items-center border border-r-0 border-navy/20 transition-colors hover:bg-soft"
                              >
                                <Minus strokeWidth={1.5} className="size-4" />
                              </button>
                              <Input
                                type="number"
                                inputMode="numeric"
                                min={1}
                                max={opts.limits.maxParticipants}
                                className="text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                                {...describe("participants", errors.participants?.message, bookingType === "group")}
                                {...register("participants")}
                              />
                              <button
                                type="button"
                                onClick={() => stepParticipants(1)}
                                aria-label="Increase participants"
                                className="on-light grid size-14 shrink-0 place-items-center border border-l-0 border-navy/20 transition-colors hover:bg-soft"
                              >
                                <Plus strokeWidth={1.5} className="size-4" />
                              </button>
                            </div>
                          </Field>

                          <AnimatePresence initial={false}>
                            {sport === "badminton" && (
                              <motion.div
                                key="badminton"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="grid gap-6 border-l-2 border-gold pl-5 sm:grid-cols-2">
                                  <p className="eyebrow text-navy sm:col-span-2">Badminton preferences</p>
                                  <Field id="courtPreference" label="Court preference" required error={errors.courtPreference?.message}>
                                    <Select
                                      {...describe("courtPreference", errors.courtPreference?.message)}
                                      {...register("courtPreference")}
                                      options={opts.badminton.courtPreference}
                                    />
                                  </Field>
                                  <Field id="playStyle" label="Playing session" required error={errors.playStyle?.message}>
                                    <Select
                                      {...describe("playStyle", errors.playStyle?.message)}
                                      {...register("playStyle")}
                                      placeholder="Select format"
                                      options={opts.badminton.playStyle}
                                    />
                                  </Field>
                                </div>
                              </motion.div>
                            )}
                            {sport === "swimming" && (
                              <motion.div
                                key="swimming"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="grid gap-6 border-l-2 border-aqua pl-5 sm:grid-cols-2">
                                  <p className="eyebrow text-aqua sm:col-span-2">Swimming preferences</p>
                                  <Field id="sessionPreference" label="Session preference" required error={errors.sessionPreference?.message}>
                                    <Select
                                      {...describe("sessionPreference", errors.sessionPreference?.message)}
                                      {...register("sessionPreference")}
                                      placeholder="Select session"
                                      options={opts.swimming.sessionPreference}
                                    />
                                  </Field>
                                  {sessionPreference === "lesson" && (
                                    <Field id="program" label="Program preference" required error={errors.program?.message}>
                                      <Select
                                        {...describe("program", errors.program?.message)}
                                        {...register("program")}
                                        placeholder="Select program"
                                        options={opts.swimming.program}
                                      />
                                    </Field>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {bookingType === "coaching" && (
                            <Field id="skillLevel" label="Current level" required error={errors.skillLevel?.message}>
                              <Select
                                {...describe("skillLevel", errors.skillLevel?.message)}
                                {...register("skillLevel")}
                                placeholder="Select your level"
                                options={opts.skillLevel}
                              />
                            </Field>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <legend className="sr-only">Your details</legend>
                      <Field id="fullName" label="Full name" required error={errors.fullName?.message}>
                        <Input autoComplete="name" placeholder="Your full name" {...describe("fullName", errors.fullName?.message)} {...register("fullName")} />
                      </Field>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field id="mobile" label="Mobile number" required error={errors.mobile?.message}>
                          <Input
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="98XXX XXXXX"
                            {...describe("mobile", errors.mobile?.message)}
                            {...register("mobile")}
                          />
                        </Field>
                        <Field id="email" label="Email address" required error={errors.email?.message}>
                          <Input
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            {...describe("email", errors.email?.message)}
                            {...register("email")}
                          />
                        </Field>
                      </div>
                      <Field
                        id="notes"
                        label="Additional requirements"
                        error={errors.notes?.message}
                        hint="Anything we should know — equipment, accessibility, a specific court or coach."
                      >
                        <Textarea rows={4} {...describe("notes", errors.notes?.message, true)} {...register("notes")} />
                      </Field>
                    </>
                  )}
                </motion.fieldset>
              </AnimatePresence>
            </div>

            {serverError && (
              <p role="alert" className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">
                {serverError}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-navy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="on-light inline-flex h-12 items-center justify-center gap-2 font-display text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy/70 hover:text-navy"
                >
                  <ArrowLeft strokeWidth={1.5} className="size-4" />
                  Back
                </button>
              ) : (
                <span />
              )}
              {step < bookingSteps.length - 1 ? (
                <Button type="button" variant="navy" size="lg" onClick={next}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" size="lg" variant="navy" disabled={isSubmitting} icon={!isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <LoaderCircle strokeWidth={1.75} className="size-4 animate-spin" />
                      Sending request…
                    </span>
                  ) : (
                    "Submit Booking Request"
                  )}
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
