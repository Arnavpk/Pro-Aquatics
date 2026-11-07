"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { lockScroll } from "@/components/layout/SmoothScroll";
import { modal, modalContent } from "@/lib/animations";
import { pad } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

/** Accessible image viewer: Esc closes, ← → navigate, focus is restored on close. */
export function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeRef.current?.focus();
    return () => {
      lockScroll(false);
      previous?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onChange, onClose]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[70] flex flex-col bg-navy/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="container-site flex h-20 shrink-0 items-center justify-between text-white">
            <p className="eyebrow text-white/60">
              {pad(index + 1)} / {pad(items.length)}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="grid size-12 place-items-center border border-white/20 transition-colors hover:border-gold hover:text-gold"
            >
              <X strokeWidth={1.5} className="size-5" />
            </button>
          </div>

          <div className="relative flex-1 px-4 pb-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={item.src}
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative h-full w-full"
              >
                <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
                <figcaption className="absolute inset-x-0 bottom-0 text-center font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
                  {item.caption}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => onChange((index - 1 + items.length) % items.length)}
                  className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-navy/60 text-white transition-colors hover:bg-gold hover:text-navy sm:left-6"
                >
                  <ChevronLeft strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => onChange((index + 1) % items.length)}
                  className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-navy/60 text-white transition-colors hover:bg-gold hover:text-navy sm:right-6"
                >
                  <ChevronRight strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
