import { SportsCard } from "@/components/blocks/SportsCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sportsSelection } from "@/content/home";

export function SportsSelection() {
  return (
    <section className="section-y relative bg-white" aria-labelledby="find-your-game">
      <div className="container-site flex flex-col gap-14">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={sportsSelection.eyebrow} lines={[sportsSelection.heading]} size="display" />
          <p className="max-w-sm text-navy/65 lg:pb-3 lg:text-right">
            Choose your discipline — or make room for both. Every program is built on the same standard of
            facilities and coaching.
          </p>
        </div>
        <div id="find-your-game" className="grid gap-3 lg:grid-cols-2">
          {sportsSelection.cards.map((card, i) => (
            <Reveal key={card.sport} delay={i * 0.12} className={i === 1 ? "lg:mt-24" : undefined}>
              <SportsCard {...card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
