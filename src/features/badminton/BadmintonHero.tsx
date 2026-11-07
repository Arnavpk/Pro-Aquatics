"use client";

import Image from "next/image";
import { useRef } from "react";
import { CourtLines } from "@/components/graphics/CourtLines";
import { ButtonLink } from "@/components/ui/Button";
import { Shuttlecock } from "@/components/ui/icons";
import { badmintonHero } from "@/content/badminton";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Energetic, angular hero: a diagonal-cut action photo, court lines drawn
 * on load and a shuttlecock that flies in along an arc.
 */
export function BadmintonHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-intro]"), { visibility: "visible" });
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(
          q("[data-photo]"),
          { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
          { clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)", duration: 1.5, ease: "expo.inOut" },
        )
          .fromTo(q("[data-photo] img"), { scale: 1.3 }, { scale: 1, duration: 2.2 }, 0.1)
          .fromTo(q("[data-line]"), { yPercent: 115, skewY: 6 }, { yPercent: 0, skewY: 0, duration: 1.2, stagger: 0.09 }, 0.55)
          .fromTo(q("[data-fade]"), { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 }, 0.95)
          // Shuttle flight: horizontal travel is linear-ish, vertical rises then drops (arc).
          .fromTo(q("[data-shuttle]"), { x: "-60vw", autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.6, ease: "power2.out" }, 0.4)
          .fromTo(q("[data-shuttle-y]"), { y: 160 }, { y: -40, duration: 0.8, ease: "power2.out" }, 0.4)
          .to(q("[data-shuttle-y]"), { y: 0, duration: 0.8, ease: "power2.in" }, 1.2)
          .fromTo(q("[data-shuttle] svg"), { rotate: -80 }, { rotate: -20, duration: 1.6, ease: "power2.out" }, 0.4);

        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-photo] img"), { yPercent: 10, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-copy]"), { yPercent: -14, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const { heading, image } = badmintonHero;

  return (
    <section ref={root} className="relative isolate min-h-svh overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute inset-0 -z-20 bg-court-lines" />

      {/* Diagonal photo */}
      <div
        data-photo
        className="absolute inset-0 -z-10 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] lg:left-[30%] lg:[clip-path:polygon(22%_0,100%_0,100%_100%,0%_100%)]"
      >
        <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
        <span className="absolute inset-0 bg-navy/55 lg:bg-linear-to-r lg:from-navy/80 lg:via-navy/30 lg:to-transparent" />
      </div>

      <CourtLines
        trigger="load"
        delay={0.6}
        strokeWidth={3}
        className="pointer-events-none absolute bottom-[-12%] left-[-10%] -z-10 w-[120%] rotate-[-8deg] opacity-30 lg:left-[8%] lg:w-[70%]"
      />

      <div data-copy className="container-site relative flex min-h-svh flex-col justify-end gap-8 pb-16 pt-32 lg:justify-center lg:pb-0">
        <p data-intro data-fade className="eyebrow flex items-center gap-3 text-gold">
          <span className="h-px w-10 bg-gold" />
          {badmintonHero.eyebrow}
        </p>
        <h1 data-intro className="text-mega uppercase" aria-label={heading.join(" ")}>
          {heading.map((line, i) => (
            <span key={line} className="line-mask" aria-hidden>
              <span data-line className={cn("block origin-bottom-left", i === 1 && "text-white/35 lg:pl-[1.2em]", i === 2 && "text-gold")}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <div data-intro data-fade className="flex max-w-md flex-col gap-8">
          <p className="text-lead text-white/85">{badmintonHero.text}</p>
          <ButtonLink href={badmintonHero.cta.href} size="lg" className="w-fit">
            {badmintonHero.cta.label}
          </ButtonLink>
        </div>
      </div>

      <div data-intro data-shuttle aria-hidden className="absolute right-[8%] top-[22%] hidden lg:block">
        <div data-shuttle-y>
          <Shuttlecock size={88} strokeWidth={1} className="-rotate-[20deg] text-gold" />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 hidden items-center gap-6 bg-gold px-8 py-5 text-navy lg:flex">
        <span className="eyebrow">Singles</span>
        <span className="h-4 w-px bg-navy/30" />
        <span className="eyebrow">Doubles</span>
        <span className="h-4 w-px bg-navy/30" />
        <span className="eyebrow">Coaching</span>
      </div>
    </section>
  );
}
