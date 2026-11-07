"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { Check, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea, describe } from "@/components/ui/form";
import { easeOutExpo } from "@/lib/animations";
import { submitContactMessage } from "@/lib/api";
import { contactFormSchema, contactSubjects, type ContactFormInput } from "@/lib/validation/contact";
import type { ContactFormValues } from "@/types/booking";

const subjectOptions = contactSubjects.map((s) => ({ value: s, label: s }));
const EMPTY = { name: "", email: "", phone: "", subject: "" as ContactFormInput["subject"], message: "" };

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: EMPTY,
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);
    try {
      const res = await submitContactMessage(values);
      if (res.ok) {
        setSent(true);
        reset(EMPTY);
      } else setServerError(res.message ?? "We couldn't send your message.");
    } catch {
      setServerError("We couldn't reach the server. Please try again.");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="sent"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="flex min-h-[28rem] flex-col items-start justify-center gap-6"
        >
          <span className="grid size-16 place-items-center bg-gold text-navy">
            <Check strokeWidth={2} className="size-8" />
          </span>
          <p className="eyebrow text-aqua">Message sent</p>
          <h3 className="font-display text-headline font-extrabold uppercase">Thanks for reaching out.</h3>
          <p className="max-w-md text-navy/70">
            We&apos;ve received your message and the Pro Aquatics team will get back to you soon.
          </p>
          <Button type="button" variant="dark" onClick={() => setSent(false)}>
            Send another message
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="c-name" label="Name" required error={errors.name?.message}>
              <Input autoComplete="name" {...describe("c-name", errors.name?.message)} {...register("name")} />
            </Field>
            <Field id="c-email" label="Email" required error={errors.email?.message}>
              <Input type="email" autoComplete="email" {...describe("c-email", errors.email?.message)} {...register("email")} />
            </Field>
            <Field id="c-phone" label="Phone" error={errors.phone?.message}>
              <Input type="tel" inputMode="tel" autoComplete="tel" {...describe("c-phone", errors.phone?.message)} {...register("phone")} />
            </Field>
            <Field id="c-subject" label="Subject" required error={errors.subject?.message}>
              <Select
                {...describe("c-subject", errors.subject?.message)}
                {...register("subject")}
                placeholder="Choose a subject"
                options={subjectOptions}
              />
            </Field>
          </div>
          <Field id="c-message" label="Message" required error={errors.message?.message}>
            <Textarea rows={6} {...describe("c-message", errors.message?.message)} {...register("message")} />
          </Field>
          {serverError && (
            <p role="alert" className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">
              {serverError}
            </p>
          )}
          <Button type="submit" variant="navy" size="lg" disabled={isSubmitting} icon={!isSubmitting} className="w-full sm:w-fit">
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <LoaderCircle strokeWidth={1.75} className="size-4 animate-spin" />
                Sending…
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
