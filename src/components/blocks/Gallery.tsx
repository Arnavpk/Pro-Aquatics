"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Expand } from "lucide-react";
import { useState } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";
import { Lightbox } from "./Lightbox";

/**
 * Editorial bento gallery with hover reveals and a lightbox.
 * `layout` picks a tiling pattern so pages don't repeat the same grid.
 */
const LAYOUTS = {
  /** 7 tiles */
  bento: [
    "lg:col-span-6 lg:row-span-2",
    "lg:col-span-3",
    "lg:col-span-3 lg:row-span-2",
    "lg:col-span-3",
    "lg:col-span-5 lg:row-span-2",
    "lg:col-span-7",
    "lg:col-span-7",
  ],
  /** 6 tiles */
  mosaic: [
    "lg:col-span-5 lg:row-span-2",
    "lg:col-span-4",
    "lg:col-span-3 lg:row-span-2",
    "lg:col-span-4",
    "lg:col-span-7",
    "lg:col-span-5",
  ],
} as const;

const MOBILE = (i: number) => (i % 3 === 0 ? "col-span-2" : "col-span-1");

export function Gallery({
  items,
  layout = "bento",
  tone = "navy",
  className,
}: {
  items: GalleryItem[];
  layout?: keyof typeof LAYOUTS;
  tone?: "navy" | "aqua";
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const pattern = LAYOUTS[layout];

  return (
    <>
      <motion.ul
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={cn(
          "grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-2 sm:auto-rows-[14rem] sm:gap-3 lg:auto-rows-[15rem] lg:grid-cols-12",
          className,
        )}
      >
        {items.map((item, i) => (
          <motion.li key={`${item.src}-${i}`} variants={fadeUp} className={cn(MOBILE(i), pattern[i % pattern.length])}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative block size-full overflow-hidden bg-navy text-left"
              aria-label={`Open image: ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.07]"
              />
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  tone === "aqua"
                    ? "bg-linear-to-t from-aqua/80 via-aqua/10 to-transparent mix-blend-multiply opacity-60 group-hover:opacity-90"
                    : "bg-linear-to-t from-navy/85 via-navy/10 to-transparent opacity-50 group-hover:opacity-90",
                )}
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-5">
                <span className="flex flex-col gap-1.5">
                  {item.tag && (
                    <span className="eyebrow translate-y-2 text-[0.6rem] text-gold opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                      {item.tag}
                    </span>
                  )}
                  <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] sm:text-base">
                    {item.caption}
                  </span>
                </span>
                <span className="grid size-9 shrink-0 translate-y-2 place-items-center border border-white/40 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand strokeWidth={1.5} className="size-4" />
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <Lightbox items={items} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </>
  );
}
