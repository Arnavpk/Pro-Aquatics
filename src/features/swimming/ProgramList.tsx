"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Editable } from "@/components/ui/Editable";
import { swimmingPrograms } from "@/content/swimming";
import { easeOutExpo } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** Expanding program list with a sticky image that dissolves between programs. */
export function ProgramList() {
  const [active, setActive] = useState(0);
  const current = swimmingPrograms[active];

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="relative hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-aqua">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: easeOutExpo }}
              className="absolute inset-0"
            >
              <Image src={current.image.src} alt={current.image.alt} fill sizes="40vw" className="object-cover" />
              <span className="absolute inset-0 bg-linear-to-t from-navy/70 to-transparent" />
            </motion.div>
          </AnimatePresence>
          <p className="absolute bottom-6 left-6 font-display text-[6rem] font-extrabold leading-none text-white/90">
            {current.level}
          </p>
        </div>
      </div>

      <ul className="flex flex-col border-t border-navy/15 lg:col-span-7">
        {swimmingPrograms.map((p, i) => {
          const open = active === i;
          return (
            <li key={p.slug} className="border-b border-navy/15">
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-expanded={open}
                aria-controls={`program-${p.slug}`}
                className="on-light group flex w-full items-center gap-6 py-6 text-left"
              >
                <span className={cn("eyebrow w-6 transition-colors", open ? "text-aqua" : "text-navy/40")}>{p.level}</span>
                <span
                  className={cn(
                    "flex-1 font-display text-[clamp(1.25rem,2.4vw,2rem)] font-extrabold uppercase transition-colors duration-300",
                    open ? "text-navy" : "text-navy/45 group-hover:text-navy/80",
                  )}
                >
                  {p.title}
                </span>
                <ArrowRight
                  strokeWidth={1.5}
                  className={cn("size-6 transition-all duration-500 ease-out-expo", open ? "rotate-90 text-aqua" : "text-navy/30")}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`program-${p.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: easeOutExpo }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-6 pb-8 sm:pl-12">
                      <div className="relative aspect-[16/9] overflow-hidden lg:hidden">
                        <Image src={p.image.src} alt={p.image.alt} fill sizes="100vw" className="object-cover" />
                      </div>
                      <p className="max-w-xl text-navy/70">{p.summary}</p>
                      {p.focus.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                          {p.focus.map((f) => (
                            <li key={f} className="border border-aqua/30 bg-ice/20 px-3 py-1.5 text-xs font-medium text-navy">
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                        {p.details.map((d) => (
                          <div key={d.label} className="flex flex-col gap-1">
                            <dt className="eyebrow text-[0.6rem] text-navy/45">{d.label}</dt>
                            <dd className="text-sm font-semibold">
                              <Editable value={d.value} />
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <ButtonLink href="/booking?sport=swimming&type=coaching" variant="aqua" className="w-fit">
                        Enquire about this program
                      </ButtonLink>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
