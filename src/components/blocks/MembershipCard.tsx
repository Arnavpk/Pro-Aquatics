import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Editable } from "@/components/ui/Editable";
import { cn } from "@/lib/utils";
import type { MembershipPlan } from "@/types/content";

const categoryLabel = { badminton: "Badminton", swimming: "Swimming", combined: "Badminton + Swimming" };

export function MembershipCard({ plan, className }: { plan: MembershipPlan; className?: string }) {
  const featured = plan.featured;
  const swim = plan.category === "swimming";
  const accent = swim ? "text-aqua" : "text-navy";

  const bookingHref = `/booking?type=membership${
    plan.category === "combined" ? "" : `&sport=${plan.category}`
  }&plan=${plan.category}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border p-7 transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 sm:p-9",
        featured ? "border-navy bg-navy text-white" : "border-navy/12 bg-white text-navy hover:border-navy/40",
        className,
      )}
    >
      {/* Animated top rule */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover:scale-x-100",
          featured ? "bg-gold" : swim ? "bg-aqua" : "bg-navy",
        )}
      />

      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className={cn("eyebrow", featured ? "text-gold" : swim ? "text-aqua" : "text-aqua")}>
            {categoryLabel[plan.category]}
          </p>
          <h3 className="font-display text-title font-extrabold uppercase">{plan.name}</h3>
        </div>
        {featured && (
          <span className="eyebrow shrink-0 bg-gold px-2.5 py-1.5 text-[0.6rem] text-navy">Popular</span>
        )}
      </header>

      <div className={cn("mt-8 border-y py-6", featured ? "border-white/15" : "border-navy/10")}>
        <p className={cn("font-display text-[2rem] font-extrabold leading-none", featured ? "text-white" : accent)}>
          <Editable value={plan.price} />
        </p>
        <p className={cn("mt-3 text-sm", featured ? "text-white/60" : "text-navy/60")}>
          Duration: <Editable value={plan.duration} />
        </p>
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-6">
        <div>
          <p className={cn("eyebrow mb-3 text-[0.65rem]", featured ? "text-white/50" : "text-navy/50")}>
            Facilities included
          </p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {plan.facilities.map((f) => (
              <li key={f} className="flex gap-3">
                <Check strokeWidth={1.75} className={cn("mt-0.5 size-4 shrink-0", featured ? "text-gold" : "text-aqua")} />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={cn("eyebrow mb-3 text-[0.65rem]", featured ? "text-white/50" : "text-navy/50")}>
            Benefits
          </p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {plan.benefits.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className={cn("mt-2 h-px w-3 shrink-0", featured ? "bg-gold" : "bg-aqua")} />
                <Editable value={b} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ButtonLink
        href={bookingHref}
        variant={featured ? "gold" : "dark"}
        className="mt-9 w-full"
        aria-label={`Enquire about ${plan.name}`}
      >
        Enquire Now
      </ButtonLink>
    </article>
  );
}
