"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/content/site";
import { easeOutExpo } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { lockScroll } from "./SmoothScroll";

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 480 && y > prev && !open);
  });

  // Close the menu when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-[background-color,border-color,backdrop-filter] duration-500",
            solid || open
              ? "border-b border-white/10 bg-navy/95 backdrop-blur-md"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <nav
            aria-label="Main"
            className={cn(
              "container-site flex items-center justify-between gap-6 transition-[height] duration-500",
              solid ? "h-[4.5rem]" : "h-20 lg:h-24",
            )}
          >
            <div className="shrink-0">
              <Logo tone="onDark" />
            </div>

            <ul className="hidden items-center gap-1 lg:flex">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative block px-3.5 py-2 font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                        active ? "text-gold" : "text-white/80 hover:text-white",
                      )}
                    >
                      {item.label}
                      {active ? (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      ) : (
                        <span className="absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-white/60 transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <ButtonLink href="/booking" className="hidden sm:inline-flex" size="md">
                Book Now
              </ButtonLink>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative grid size-12 place-items-center text-white lg:hidden"
              >
                <span className="sr-only">Menu</span>
                <span aria-hidden className="relative block h-3 w-7">
                  <motion.span
                    className="absolute left-0 top-0 h-[1.5px] w-full bg-current"
                    animate={open ? { top: "50%", rotate: 45 } : { top: "0%", rotate: 0 }}
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 h-[1.5px] bg-current"
                    animate={
                      open
                        ? { bottom: "50%", rotate: -45, width: "100%" }
                        : { bottom: "0%", rotate: 0, width: "65%" }
                    }
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && <MobileMenu isActive={isActive} onNavigate={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}