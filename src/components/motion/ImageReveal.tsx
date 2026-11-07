"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * GSAP image mask reveal + optional scroll parallax.
 * The wrapper is clipped open as it enters the viewport while the inner
 * media settles from a slight zoom. `parallax` drifts the media on scroll.
 */
export function ImageReveal({
  children,
  className,
  from = "bottom",
  parallax = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right" | "top";
  /** Percentage of drift while scrolling (e.g. 8). 0 disables parallax. */
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelector<HTMLElement>("[data-reveal-inner]");
      const start = {
        bottom: "inset(100% 0% 0% 0%)",
        top: "inset(0% 0% 100% 0%)",
        left: "inset(0% 100% 0% 0%)",
        right: "inset(0% 0% 0% 100%)",
      }[from];

      const mm = gsap.matchMedia();
      mm.add(MQ.motionOK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        tl.fromTo(
          el,
          { clipPath: start },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
        ).fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);

        if (parallax && inner) {
          gsap.fromTo(
            inner,
            { yPercent: -parallax },
            {
              yPercent: parallax,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div data-reveal-inner className={cn("absolute inset-0", parallax && "-inset-y-[10%]")}>
        {children}
      </div>
    </div>
  );
}
