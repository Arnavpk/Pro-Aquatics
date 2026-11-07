import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "light" | "dark" | "navy" | "aqua";
type Size = "md" | "lg";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-3 overflow-hidden font-display font-semibold uppercase tracking-[0.14em] transition-colors duration-500 ease-out-expo disabled:pointer-events-none disabled:opacity-60 touch-manipulation";

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[0.72rem]",
  lg: "h-14 px-8 text-[0.78rem]",
};

/** Each variant has a resting colour and a "sweep" colour that wipes in on hover. */
const variants: Record<Variant, { root: string; sweep: string }> = {
  gold: { root: "bg-gold text-navy hover:text-navy", sweep: "bg-white" },
  navy: { root: "bg-navy text-white hover:text-navy", sweep: "bg-gold" },
  aqua: { root: "bg-aqua text-white hover:text-navy", sweep: "bg-ice" },
  light: {
    root: "border border-white/40 text-white hover:text-navy hover:border-white",
    sweep: "bg-white",
  },
  dark: {
    root: "border border-navy/25 text-navy hover:text-white hover:border-navy on-light",
    sweep: "bg-navy",
  },
};

interface Shared {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  className?: string;
  children: ReactNode;
}

function Inner({ variant = "gold", icon = true, children }: Shared) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-out-expo group-hover/btn:scale-y-100",
          variants[variant].sweep,
        )}
      />
      <span>{children}</span>
      {icon && (
        <span className="relative size-4 overflow-hidden" aria-hidden>
          <ArrowUpRight
            strokeWidth={1.75}
            className="absolute inset-0 size-4 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-full group-hover/btn:-translate-y-full"
          />
          <ArrowUpRight
            strokeWidth={1.75}
            className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
          />
        </span>
      )}
    </>
  );
}

export function ButtonLink({
  href,
  variant = "gold",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: Shared & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={cn(base, sizes[size], variants[variant].root, className)} {...rest}>
      <Inner variant={variant} icon={icon}>
        {children}
      </Inner>
    </Link>
  );
}

export function Button({
  variant = "gold",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: Shared & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, sizes[size], variants[variant].root, className)} {...rest}>
      <Inner variant={variant} icon={icon}>
        {children}
      </Inner>
    </button>
  );
}

/** Minimal text link with an animated underline. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2 font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em]",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover/link:origin-left group-hover/link:scale-x-100" />
      </span>
      <ArrowUpRight
        strokeWidth={1.75}
        className="size-4 transition-transform duration-500 ease-out-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      />
    </Link>
  );
}
