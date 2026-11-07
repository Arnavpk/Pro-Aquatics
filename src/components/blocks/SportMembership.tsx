import { MembershipCard } from "@/components/blocks/MembershipCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { membershipPlans } from "@/content/membership";
import { cn } from "@/lib/utils";

/** Single-sport membership preview used on the Badminton and Swimming pages. */
export function SportMembership({
  sport,
  id = "membership",
}: {
  sport: "badminton" | "swimming";
  id?: string;
}) {
  const plans = membershipPlans.filter((p) => p.category === sport);
  const swim = sport === "swimming";
  return (
    <section id={id} className={cn("section-y scroll-mt-20", swim ? "bg-ice/35" : "bg-soft")}>
      <div className="container-site flex flex-col gap-14">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Membership"
            lines={swim ? ["SWIM", "MORE OFTEN."] : ["PLAY", "MORE OFTEN."]}
            accentLast
            intro="Plans, durations and prices shown here are placeholders until confirmed by the club."
          />
          <TextLink href="/membership" className="text-navy">
            Compare all memberships
          </TextLink>
        </div>
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <RevealItem key={plan.id}>
              <MembershipCard plan={plan} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
