"use client";

import Image from "next/image";
import { useRef } from "react";
import { WaveEdge } from "@/components/graphics/Waves";
import { ButtonLink } from "@/components/ui/Button";
import { swimmingHero } from "@/content/swimming";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Calm, fluid hero: the photo surfaces from a soft blur, ripple rings spread
 * once from behind the headline, and lines rise like they're coming up for air.
 */
export function SwimmingHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-intro]"), { visibility: "visible" });
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(q("[data-photo]"), { scale: 1.2, filter: "blur(14px)" }, { scale: 1, filter: "blur(0px)", duration: 2.4, ease: "power3.out" })
          .fromTo(q("[data-ripple]"), { scale: 0.2, autoAlpha: 0.9 }, { scale: 1, autoAlpha: 0, duration: 3.2, stagger: 0.45, ease: "power2.out" }, 0.3)
          .fromTo(q("[data-line]"), { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.6, stagger: 0.14, ease: "power4.out" }, 0.45)
          .fromTo(q("[data-fade]"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.12 }, 1.1);

        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-photo]"), { yPercent: 14, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-copy]"), { yPercent: -20, autoAlpha: 0.3, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const { heading, image } = swimmingHero;

  return (
    <section ref={root} className="relative isolate flex min-h-svh items-center overflow-hidden bg-navy text-white">
      <div data-photo className="absolute inset-0 -z-20">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-aqua/40 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-navy/70 via-navy/30 to-aqua/50" />

      {/* Ripples */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            data-ripple
            className="absolute left-1/2 top-1/2 size-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ice/60 opacity-0"
          />
        ))}
      </div>

      <div data-copy className="container-site flex flex-col items-center gap-8 pb-28 pt-36 text-center">
        <p data-intro data-fade className="eyebrow flex items-center gap-3 text-ice">
          {swimmingHero.eyebrow}
        </p>
        <h1 data-intro className="text-mega uppercase" aria-label={heading.join(" ")}>
          {heading.map((line, i) => (
            <span key={line} className="line-mask" aria-hidden>
              <span data-line className={cn("block", i === 2 && "text-gold")}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p data-intro data-fade className="max-w-lg text-lead text-white/85">
          {swimmingHero.text}
        </p>
        <div data-intro data-fade>
          <ButtonLink href={swimmingHero.cta.href} size="lg">
            {swimmingHero.cta.label}
          </ButtonLink>
        </div>
      </div>

      <WaveEdge className="absolute inset-x-0 bottom-0 text-white" />
    </section>
  );
}