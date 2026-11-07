"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { homeHero } from "@/content/home";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Split-screen hero: badminton and swimming share the stage equally.
 * GSAP runs the cinematic entrance timeline and scroll parallax;
 * hovering a side (desktop) widens that panel.
 */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const { panels } = homeHero;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-intro]"), { visibility: "visible" });

      const mm = gsap.matchMedia();
      mm.add(MQ.motionOK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(
          q("[data-panel='badminton']"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
        )
          .fromTo(
            q("[data-panel='swimming']"),
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
            0.08,
          )
          .fromTo(q("[data-panel-media]"), { scale: 1.35 }, { scale: 1, duration: 2.4 }, 0.2)
          .fromTo(q("[data-divider]"), { scaleY: 0 }, { scaleY: 1, duration: 1.4, ease: "expo.inOut" }, 0.6)
          .fromTo(q("[data-line]"), { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.75)
          .fromTo(
            q("[data-fade]"),
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.1 },
            1.05,
          );

        // Scroll: copy lifts away faster than the photography behind it.
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-copy]"), { yPercent: -18, autoAlpha: 0.2, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-panel-media]"), { yPercent: 12, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const panel = (key: "badminton" | "swimming") => {
    const p = panels[key];
    const swim = key === "swimming";
    return (
      <Link
        href={p.href}
        tabIndex={-1}
        aria-hidden
        data-panel={key}
        className="group/panel relative flex-1 overflow-hidden transition-[flex-grow] duration-[1.1s] ease-out-expo lg:hover:flex-grow-[1.45]"
      >
        <div data-panel-media className="absolute inset-0">
          <Image
            src={p.image.src}
            alt={p.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-[1.6s] ease-out-expo group-hover/panel:scale-105"
          />
        </div>
        {swim ? (
          <>
            <span className="absolute inset-0 bg-aqua/45 mix-blend-multiply" />
            <span className="absolute inset-0 bg-navy/45 transition-colors duration-700 group-hover/panel:bg-navy/25" />
          </>
        ) : (
          <span className="absolute inset-0 bg-navy/60 transition-colors duration-700 group-hover/panel:bg-navy/40" />
        )}
        <span
          className={cn(
            "absolute bottom-6 hidden items-center gap-3 text-white sm:flex lg:bottom-10",
            swim ? "right-6 lg:right-10" : "left-6 lg:left-10",
          )}
        >
          <span className={cn("eyebrow", swim ? "text-ice" : "text-gold")}>{swim ? "02" : "01"}</span>
          <span className="h-px w-8 bg-white/50 transition-all duration-700 group-hover/panel:w-14" />
          <span className="eyebrow">{p.label}</span>
        </span>
      </Link>
    );
  };

  return (
    <section ref={root} className="relative h-svh min-h-[40rem] overflow-hidden bg-navy text-white">
      {/* Photography panels */}
      <div className="absolute inset-0 flex flex-col lg:flex-row">
        {panel("badminton")}
        {panel("swimming")}
      </div>
      <span
        data-divider
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px origin-left bg-gold/70 lg:inset-x-auto lg:inset-y-0 lg:left-1/2 lg:top-0 lg:h-auto lg:w-px lg:origin-top"
      />
      {/* Readability gradient */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy/70 via-navy/20 to-transparent" />

      {/* Copy */}
      <div data-copy className="pointer-events-none relative z-10 flex h-full items-center">
        <div className="container-site flex flex-col gap-7 pt-16">
          <p data-intro data-fade className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold" />
            Badminton &amp; Swimming · Keshavnagar, Pune
          </p>
          <h1 data-intro className="text-mega uppercase" aria-label={homeHero.heading.join(" ")}>
            {homeHero.heading.map((line, i) => (
              <span key={line} className="line-mask" aria-hidden>
                <span data-line className={cn("block", i === homeHero.heading.length - 1 && "text-gold")}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p data-intro data-fade className="max-w-md text-lead text-white/85">
            {homeHero.text}
          </p>
          <div data-intro data-fade className="pointer-events-auto flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={panels.badminton.href} size="lg">
              {panels.badminton.cta}
            </ButtonLink>
            <ButtonLink href={panels.swimming.href} size="lg" variant="light">
              {panels.swimming.cta}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-intro
        data-fade
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="eyebrow text-[0.6rem] text-white/60">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-white/20">
          <span className="animate-cue absolute inset-x-0 top-0 h-1/2 bg-gold" />
        </span>
      </div>
    </section>
  );
}
