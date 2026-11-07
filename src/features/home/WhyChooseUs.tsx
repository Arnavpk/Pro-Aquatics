import { CourtLines } from "@/components/graphics/CourtLines";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/content/home";
import { pad } from "@/lib/utils";

/** Sticky heading beside an expanding feature list (navy, court-line motif). */
export function WhyChooseUs() {
  return (
    <section className="section-y relative isolate overflow-hidden bg-navy text-white">
      <CourtLines className="absolute -right-[20%] bottom-0 -z-10 w-[80%] opacity-[0.12]" />
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow={whyChooseUs.eyebrow}
              lines={["BUILT AROUND", "THE WAY", "YOU TRAIN."]}
              tone="light"
              accentLast
              intro="Five reasons members choose Pro Aquatics — whichever side of the net, or the lane rope, they play on."
            />
          </div>
        </div>

        <RevealGroup as="ul" className="flex flex-col border-t border-white/15 lg:col-span-7" gap={0.1}>
          {whyChooseUs.items.map(({ icon: Icon, title, description }, i) => (
            <RevealItem as="li" key={title} className="group relative border-b border-white/15">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-white/[0.04] transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
              />
              <div className="relative grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-2 py-8 sm:grid-cols-[4rem_auto_1fr] sm:py-10">
                <span className="eyebrow hidden pt-3 text-white/40 sm:block">{pad(i + 1)}</span>
                <span className="grid size-14 place-items-center border border-gold/40 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                  <Icon strokeWidth={1.5} className="size-6" />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-title font-extrabold uppercase">{title}</h3>
                  <p className="max-w-md text-white/65">{description}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
