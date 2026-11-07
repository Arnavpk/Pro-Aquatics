"use client";

import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { easeInOutQuart, easeOutExpo } from "@/lib/animations";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Route transition (mounted by app/template.tsx on every navigation).
 * The first page load is left untouched for fast LCP; subsequent client
 * navigations get a navy curtain that lifts away while the page settles in.
 */
let hasNavigated = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const animateIn = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {animateIn && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] origin-top bg-navy"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.75, ease: easeInOutQuart }}
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 h-px bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          />
        </motion.div>
      )}
      <motion.div
        initial={animateIn ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easeOutExpo, delay: animateIn ? 0.25 : 0 }}
        onAnimationComplete={() => animateIn && ScrollTrigger.refresh()}
      >
        {children}
      </motion.div>
    </>
  );
}
