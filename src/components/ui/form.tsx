import { AlertCircle, ChevronDown } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Form primitives shared by the booking and contact forms.
 * Pure presentational components — wire them up with react-hook-form's
 * `register()` spread.
 */

export const inputClass =
  "on-light peer h-14 w-full border border-navy/20 bg-white px-4 text-base text-navy placeholder:text-navy/35 transition-[border-color,box-shadow] duration-300 hover:border-navy/40 focus:border-aqua focus:outline-none focus:ring-2 focus:ring-aqua/25 aria-[invalid=true]:border-red-700 aria-[invalid=true]:ring-red-700/15";

export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="eyebrow flex items-center gap-1 text-[0.68rem] text-navy/70">
        {label}
        {required ? (
          <span aria-hidden className="text-aqua">
            *
          </span>
        ) : (
          <span className="normal-case tracking-normal text-navy/40">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-navy/50">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-sm text-red-700">
      <AlertCircle strokeWidth={1.75} className="size-4 shrink-0" />
      {message}
    </p>
  );
}

/** aria attributes linking an input to its error/hint text. */
export function describe(id: string, error?: string, hint?: boolean) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(inputClass, "h-auto min-h-32 resize-y py-3.5", props.className)} />;
}

export function Select({
  options,
  placeholder,
  ...props
}: ComponentProps<"select"> & {
  options: readonly { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select {...props} className={cn(inputClass, "cursor-pointer appearance-none pr-12", props.className)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        strokeWidth={1.5}
        className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-navy/50"
      />
    </div>
  );
}

/** Radio-button "tile" — large, touch-friendly choice. */
export function ChoiceTile({
  label,
  hint,
  icon,
  className,
  ...props
}: ComponentProps<"input"> & { label: string; hint?: string; icon?: ReactNode }) {
  return (
    <label className={cn("group relative block cursor-pointer", className)}>
      <input type="radio" className="peer sr-only" {...props} />
      <span className="on-light flex h-full items-start gap-4 border border-navy/15 bg-white p-4 transition-all duration-300 group-hover:border-navy/40 group-has-checked:border-navy group-has-checked:bg-navy group-has-checked:text-white group-has-focus-visible:ring-2 group-has-focus-visible:ring-aqua group-has-focus-visible:ring-offset-2">
        {icon}
        <span className="flex flex-1 flex-col gap-1">
          <span className="font-display text-sm font-bold uppercase tracking-wide">{label}</span>
          {hint && <span className="text-xs text-navy/55 group-has-checked:text-white/65">{hint}</span>}
        </span>
        <span
          aria-hidden
          className="mt-0.5 size-4 shrink-0 rounded-full border border-navy/30 transition-colors group-has-checked:border-gold group-has-checked:bg-gold"
        />
      </span>
    </label>
  );
}
