"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { UserRound } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Editable } from "@/components/ui/Editable";
import { badmintonCoaches, badmintonPrograms } from "@/content/badminton";
import { easeOutExpo } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** Level selector (Beginner → Advanced) with an animated content panel. */
export function TrainingTabs() {
  const [active, setActive] = useState(0);
  const program = badmintonPrograms[active];

  return (
    <div className="flex flex-col gap-10">
      <div role="tablist" aria-label="Training levels" className="grid grid-cols-3 border-b border-navy/15">
        {badmintonPrograms.map((p, i) => (
          <button
            key={p.slug}
            role="tab"
            id={`tab-${p.slug}`}
            aria-selected={active === i}
            aria-controls={`panel-${p.slug}`}
            onClick={() => setActive(i)}
            className={cn(
              "on-light relative flex flex-col items-start gap-1 pb-5 pt-2 text-left transition-colors duration-300",
              active === i ? "text-navy" : "text-navy/45 hover:text-navy/80",
            )}
          >
            <span className="eyebrow text-[0.62rem] text-aqua">{p.level}</span>
            <span className="font-display text-base font-extrabold uppercase sm:text-2xl">
              {p.title.replace(" Training", "")}
            </span>
            {active === i && (
              <motion.span
                layoutId="training-tab"
                className="absolute inset-x-0 -bottom-px h-[3px] bg-gold"
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={program.slug}
          role="tabpanel"
          id={`panel-${program.slug}`}
          aria-labelledby={`tab-${program.slug}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
          className="grid gap-10 lg:grid-cols-12"
        >
          <div className="relative aspect-[4/3] overflow-hidden lg:col-span-6 lg:aspect-auto lg:min-h-[30rem]">
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: easeOutExpo }}
              className="absolute inset-0"
            >
              <Image src={program.image.src} alt={program.image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </motion.div>
            <span className="absolute left-0 top-0 bg-navy px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {program.level}
            </span>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-6 lg:py-4">
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-headline font-extrabold uppercase">{program.title}</h3>
              <p className="max-w-lg text-lead text-navy/70">{program.summary}</p>
            </div>
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {program.focus.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium">
                  <span aria-hidden className="h-px w-4 bg-gold ring-1 ring-navy/40" />
                  {f}
                </li>
              ))}
            </ul>
            <dl className="grid grid-cols-2 border-l border-t border-navy/12">
              {program.details.map((d) => (
                <div key={d.label} className="flex flex-col gap-1.5 border-b border-r border-navy/12 p-4">
                  <dt className="eyebrow text-[0.62rem] text-navy/50">{d.label}</dt>
                  <dd className="text-sm font-semibold">
                    <Editable value={d.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <ButtonLink href="/booking?sport=badminton&type=coaching" variant="navy" className="w-fit">
              Request coaching
            </ButtonLink>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Coach profiles — placeholders until confirmed */}
      <div className="flex flex-col gap-6 border-t border-navy/12 pt-10">
        <p className="eyebrow text-aqua">Coaching team</p>
        <ul className="grid gap-4 sm:grid-cols-3">
          {badmintonCoaches.map((c, i) => (
            <li key={i} className="flex items-center gap-4 border border-dashed border-navy/20 p-5">
              <span className="grid size-14 shrink-0 place-items-center bg-soft text-navy/40" aria-hidden>
                <UserRound strokeWidth={1.25} className="size-7" />
              </span>
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-display font-bold">
                  <Editable value={c.name} />
                </span>
                <span className="text-navy/60">{c.role}</span>
                <span className="text-xs text-navy/50">
                  <Editable value={c.qualifications} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
