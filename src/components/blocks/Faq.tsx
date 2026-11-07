"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { easeOutExpo } from "@/lib/animations";
import { cn, pad } from "@/lib/utils";
import type { FaqItem } from "@/types/content";

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <ul className="border-t border-navy/15">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <li key={item.question} className="border-b border-navy/15">
            <h3>
              <button
                type="button"
                id={`${id}-q-${i}`}
                aria-expanded={expanded}
                aria-controls={`${id}-a-${i}`}
                onClick={() => setOpen(expanded ? null : i)}
                className="on-light group flex w-full items-center gap-5 py-6 text-left sm:gap-8 sm:py-7"
              >
                <span className="eyebrow w-6 shrink-0 text-aqua">{pad(i + 1)}</span>
                <span className="flex-1 font-display text-lg font-semibold sm:text-xl">{item.question}</span>
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center border transition-colors duration-300",
                    expanded ? "border-navy bg-navy text-gold" : "border-navy/20 group-hover:border-navy",
                  )}
                >
                  <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.4, ease: easeOutExpo }}>
                    <Plus strokeWidth={1.5} className="size-5" />
                  </motion.span>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={`${id}-a-${i}`}
                  role="region"
                  aria-labelledby={`${id}-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 pl-11 text-navy/70 sm:pl-14">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
