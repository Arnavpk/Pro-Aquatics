"use client";

/**
 * GSAP — single registration point.
 * Import gsap / ScrollTrigger / useGSAP from here, never directly,
 * so plugins are registered exactly once on the client.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

/** Media-query conditions used with gsap.matchMedia(). */
export const MQ = {
  motionOK: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
