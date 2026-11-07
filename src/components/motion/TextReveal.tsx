"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * GSAP masked line reveal. Each line rises out of its own overflow mask.
 * `trigger="scroll"` plays when the block enters the viewport;
 * `trigger="load"` plays immediately (hero headings).
 */
export function TextReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  accentLine,
  accentClassName,
  trigger = "scroll",
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  accentLine?: number;
  accentClassName?: string;
  trigger?: "scroll" | "load";
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (trigger === "load") gsap.set(ref.current, { visibility: "visible" });
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOK, () => {
        const inners = gsap.utils.toArray<HTMLElement>("[data-line]", ref.current);
        gsap.fromTo(
          inners,
          { yPercent: 110, rotate: 2 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.15,
            stagger,
            delay,
            ease: "expo.out",
            scrollTrigger:
              trigger === "scroll" ? { trigger: ref.current, start: "top 88%", once: true } : undefined,
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      className={className}
      aria-label={lines.join(" ")}
      data-intro={trigger === "load" ? "" : undefined}
    >
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="line-mask" aria-hidden>
          <span
            data-line
            className={cn(
              "block origin-top-left will-change-transform",
              lineClassName,
              accentLine === i && accentClassName,
            )}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
