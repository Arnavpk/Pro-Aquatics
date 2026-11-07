"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Thin divider that draws itself across when scrolled into view. */
export function LineDraw({
  className,
  origin = "left",
  delay = 0,
}: {
  className?: string;
  origin?: "left" | "right" | "center";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOK, () => {
        gsap.fromTo(
          ref.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            delay,
            ease: "expo.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "h-px w-full bg-current",
        origin === "left" && "origin-left",
        origin === "right" && "origin-right",
        origin === "center" && "origin-center",
        className,
      )}
    />
  );
}
