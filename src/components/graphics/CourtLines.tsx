"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Regulation badminton court markings (13.4 m × 6.1 m, 1 unit = 1 cm),
 * drawn stroke-by-stroke with GSAP. Used as the badminton graphic motif.
 */
const LINES = [
  "M0 0H1340V610H0Z", // outer boundary (doubles)
  "M0 46H1340", // singles sideline
  "M0 564H1340", // singles sideline
  "M670 0V610", // net
  "M472 0V610", // short service line
  "M868 0V610", // short service line
  "M76 0V610", // doubles long service line
  "M1264 0V610", // doubles long service line
  "M0 305H472", // centre line
  "M868 305H1340", // centre line
];

export function CourtLines({
  className,
  trigger = "scroll",
  delay = 0,
  strokeWidth = 4,
}: {
  className?: string;
  trigger?: "scroll" | "load";
  delay?: number;
  strokeWidth?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOK, () => {
        gsap.fromTo(
          "path",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            stagger: 0.08,
            delay,
            ease: "expo.inOut",
            scrollTrigger:
              trigger === "scroll" ? { trigger: ref.current, start: "top 85%", once: true } : undefined,
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox="-4 -4 1348 618"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      className={cn("text-gold", className)}
    >
      {LINES.map((d) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray="1 1"
        />
      ))}
    </svg>
  );
}
