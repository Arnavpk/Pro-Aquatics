"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav, site } from "@/content/site";
import { menuItem, menuPanel } from "@/lib/animations";
import { cn, pad } from "@/lib/utils";

export function MobileMenu({
  isActive,
  onNavigate,
}: {
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      variants={menuPanel}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy pt-24 text-white lg:hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-court-lines opacity-60" />
      <nav aria-label="Mobile" className="container-site relative flex flex-1 flex-col">
        <ul className="flex flex-col border-t border-white/10">
          {mainNav.map((item, i) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="overflow-hidden border-b border-white/10">
                <motion.div custom={i} variants={menuItem}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 font-display text-[clamp(1.75rem,8vw,2.75rem)] font-extrabold uppercase leading-none tracking-tight",
                      active ? "text-gold" : "text-white",
                    )}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="eyebrow text-[0.65rem] text-white/40">{pad(i + 1)}</span>
                      {item.label}
                    </span>
                    <ArrowUpRight strokeWidth={1.5} className="size-6 opacity-50" />
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ul>

        <motion.div
          custom={mainNav.length}
          variants={menuItem}
          className="mt-auto flex flex-col gap-6 py-10"
        >
          <ButtonLink href="/booking" onClick={onNavigate} size="lg" className="w-full">
            Book Now
          </ButtonLink>
          <a
            href={site.address.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 text-sm text-white/60"
          >
            <MapPin strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-gold" />
            {site.address.oneLine}
          </a>
        </motion.div>
      </nav>
    </motion.div>
  );
}
