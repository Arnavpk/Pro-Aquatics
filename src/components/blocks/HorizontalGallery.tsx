"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { pad } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";
import { Lightbox } from "./Lightbox";

/**
 * Filmstrip gallery. On desktop the section pins and vertical scroll drives
 * the strip sideways (GSAP ScrollTrigger). On touch devices it is a native,
 * swipeable scroll-snap row — no scroll hijacking on mobile.
 */
export function HorizontalGallery({ items, heading }: { items: GalleryItem[]; heading: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const el = track.current;
        if (!el) return;
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-film-img]", el).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative flex flex-col justify-center gap-10 overflow-hidden py-20 lg:h-svh lg:py-0">
      <div className="container-site">{heading}</div>
      <ul
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--spacing-gutter)] lg:w-max lg:snap-none lg:overflow-visible lg:gap-5"
      >
        {items.map((item, i) => (
          <li
            key={`${item.src}-${i}`}
            className="relative h-[55vh] w-[80vw] shrink-0 snap-center sm:w-[55vw] lg:h-[58vh] lg:w-[34vw] lg:odd:mt-12"
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open image: ${item.caption}`}
              className="group relative block size-full overflow-hidden bg-navy"
            >
              <div data-film-img className="absolute -inset-x-[10%] inset-y-0">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
                />
              </div>
              <span className="absolute inset-0 bg-linear-to-t from-navy/80 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-baseline justify-between p-5 text-white">
                <span className="font-display text-base font-semibold uppercase tracking-[0.12em]">
                  {item.caption}
                </span>
                <span className="eyebrow text-gold">{pad(i + 1)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </div>
  );
}
