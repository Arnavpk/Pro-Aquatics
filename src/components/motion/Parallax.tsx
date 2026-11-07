"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Scroll-scrubbed vertical drift for decorative layers (GSAP ScrollTrigger). */
export function Parallax({
  children,
  className,
  speed = 12,
}: {
  children: ReactNode;
  className?: string;
  /** yPercent travelled across the element's time in view. Negative = upward. */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOK, () => {
        gsap.fromTo(
          ref.current,
          { yPercent: speed },
          {
            yPercent: -speed,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
