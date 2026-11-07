import { CountUp } from "@/components/motion/CountUp";
import { LineDraw } from "@/components/motion/LineDraw";
import { Editable } from "@/components/ui/Editable";
import { isPlaceholder } from "@/lib/placeholder";
import { cn, pad } from "@/lib/utils";
import type { Stat } from "@/types/content";

/**
 * Animated statistics. Confirmed numbers count up when visible;
 * unconfirmed ones render as an editable placeholder (no invented figures).
 */
export function StatsBand({ stats, tone = "light" }: { stats: Stat[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <dl className={cn("grid grid-cols-2 lg:grid-cols-4", dark ? "text-white" : "text-navy")}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            "flex flex-col gap-4 py-8 pr-4 sm:py-10",
            i % 2 === 1 && "pl-4 sm:pl-8",
            i > 0 && "lg:pl-8",
            i < stats.length - 1 && (dark ? "lg:border-r lg:border-white/15" : "lg:border-r lg:border-navy/12"),
          )}
        >
          <LineDraw className={dark ? "text-gold/60" : "text-aqua/50"} delay={i * 0.1} />
          <dt className={cn("eyebrow flex items-center justify-between", dark ? "text-white/60" : "text-navy/55")}>
            {s.label}
            <span className={dark ? "text-gold" : "text-aqua"}>{pad(i + 1)}</span>
          </dt>
          <dd className="font-display text-[clamp(3rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.04em]">
            {isPlaceholder(s.value) ? (
              <span className="flex flex-col gap-3">
                <span aria-hidden className="opacity-25">
                  00
                </span>
                <Editable value={s.value} className="font-sans text-xs font-normal tracking-normal" />
              </span>
            ) : (
              <CountUp value={s.value} suffix={s.suffix} />
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
