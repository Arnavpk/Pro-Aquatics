"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Layered wave edge for swimming sections. The layers drift sideways only
 * while the section is scrolled (scrubbed) — no idle looping animation.
 */
export function WaveEdge({
  className,
  fill = "currentColor",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOK, () => {
        gsap.utils.toArray<SVGPathElement>("[data-wave]", ref.current).forEach((p, i) => {
          gsap.to(p, {
            xPercent: i % 2 ? 6 : -6,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("block h-[60px] w-full overflow-visible md:h-[100px]", flip && "rotate-180", className)}
    >
      <path
        data-wave
        d="M-120 70C120 30 300 30 540 62s420 40 660 6 360-40 480-12v80H-120Z"
        fill={fill}
        opacity="0.35"
      />
      <path
        data-wave
        d="M-120 84c200-40 380-34 600-6s420 30 640 0 300-34 440-8v66H-120Z"
        fill={fill}
        opacity="0.6"
      />
      <path d="M0 98c220-26 420-26 640-4s420 24 600 4 140-14 200-10v40H0Z" fill={fill} />
    </svg>
  );
}

/** Thin animated wave rule — a swimming-section divider. */
export function WaveRule({ className }: { className?: string }) {
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
            duration: 1.8,
            ease: "expo.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <svg ref={ref} viewBox="0 0 240 16" fill="none" aria-hidden className={cn("h-4 w-60", className)}>
      <path
        d="M0 8c15 0 15-6 30-6s15 12 30 12 15-12 30-12 15 12 30 12 15-12 30-12 15 12 30 12 15-12 30-12 15 6 30 6"
        stroke="currentColor"
        strokeWidth="1.5"
        pathLength={1}
        strokeDasharray="1 1"
      />
    </svg>
  );
}
