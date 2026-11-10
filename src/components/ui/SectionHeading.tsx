import type { ReactNode } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

/**
 * Eyebrow + campaign-style heading + optional intro.
 * Heading lines are passed as an array so each line can reveal separately.
 */
export function SectionHeading({
  eyebrow,
  lines,
  intro,
  tone = "dark",
  align = "left",
  size = "headline",
  as: Tag = "h2",
  className,
  accentLast = false,
  accentClassName,
  eyebrowLine = true,
}: {
  eyebrow?: string;
  lines: string[];
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  size?: "headline" | "display";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Colour the final line with the accent colour. */
  accentLast?: boolean;
  /** Override the accent colour (e.g. "text-gold"). */
  accentClassName?: string;
  /** Show the small line before the eyebrow text. */
  eyebrowLine?: boolean;
}) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow flex items-center gap-3",
            light ? "text-gold" : "text-aqua",
          )}
        >
          {eyebrowLine && <span aria-hidden className="h-px w-8 bg-current" />}
          {eyebrow}
        </p>
      )}
      <TextReveal
        as={Tag}
        lines={lines}
        className={cn(
          size === "display" ? "text-display" : "text-headline",
          "uppercase",
          light ? "text-white" : "text-navy",
        )}
        accentLine={accentLast ? lines.length - 1 : undefined}
        accentClassName={accentClassName ?? (light ? "text-gold" : "text-aqua")}
      />
      {intro && (
        <div
          className={cn(
            "max-w-xl text-lead",
            light ? "text-white/75" : "text-navy/70",
          )}
        >
          {intro}
        </div>
      )}
    </div>
  );
}