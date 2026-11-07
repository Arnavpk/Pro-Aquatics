"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MembershipCard } from "@/components/blocks/MembershipCard";
import { membershipCategories, membershipPlans } from "@/content/membership";
import { easeOutExpo } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { MembershipCategory } from "@/types/content";

/** Category switcher (Badminton / Swimming / Combined) with animated plan cards. */
export function MembershipExplorer() {
  const [category, setCategory] = useState<MembershipCategory>("combined");
  const plans = membershipPlans.filter((p) => p.category === category);

  return (
    <div className="flex flex-col gap-12">
      <div
        role="tablist"
        aria-label="Membership categories"
        className="no-scrollbar mx-auto flex max-w-full overflow-x-auto border border-navy/15 bg-white p-1.5"
      >
        {membershipCategories.map((c) => {
          const active = c.id === category;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c.id)}
              className={cn(
                "on-light relative shrink-0 px-5 py-3.5 font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 sm:px-8",
                active ? "text-white" : "text-navy/60 hover:text-navy",
              )}
            >
              {active && (
                <motion.span
                  layoutId="membership-tab"
                  className="absolute inset-0 bg-navy"
                  transition={{ type: "spring", stiffness: 400, damping: 36 }}
                />
              )}
              <span className="relative">
                <span className="sm:hidden">{c.short}</span>
                <span className="hidden sm:inline">{c.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={category}
          className="grid gap-4 md:grid-cols-3"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
            exit: { opacity: 0, transition: { duration: 0.2 } },
          }}
        >
          {plans.map((plan) => (
            <motion.li
              key={plan.id}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
              }}
            >
              <MembershipCard plan={plan} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
