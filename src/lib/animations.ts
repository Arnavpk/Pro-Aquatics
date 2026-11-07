import type { Transition, Variants } from "motion/react";

/**
 * Motion for React — shared variants
 * Motion owns UI-level motion: entrances, hovers, menus, modals, tabs.
 * GSAP (see lib/gsap.ts) owns scroll-linked storytelling.
 */

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const;

export const spring: Transition = { type: "spring", stiffness: 380, damping: 32 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: easeOutExpo } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Line-by-line masked text rise. Use inside an overflow-hidden wrapper. */
export const lineRise: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease: easeOutExpo } },
};

/** Image unveiled from the bottom edge using clip-path. */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: easeInOutQuart },
  },
};

/** Full-screen mobile menu */
export const menuPanel: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, ease: easeInOutQuart },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.55, ease: easeInOutQuart, delay: 0.1 },
  },
};

export const menuItem: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: easeOutExpo, delay: 0.25 + i * 0.06 },
  }),
  exit: { y: "60%", opacity: 0, transition: { duration: 0.3 } },
};

export const modal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
};

/** Slide between booking-form steps. `custom` = direction (1 forward, -1 back). */
export const stepSlide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOutExpo } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.25 } }),
};

export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
