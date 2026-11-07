import Image from "next/image";
import { WaveRule } from "@/components/graphics/Waves";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Editable } from "@/components/ui/Editable";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
import { poolFacilities, swimmingAbout } from "@/content/swimming";
import { WordFill } from "./WordFill";

export function SwimmingAbout() {
  return (
    <section className="section-y bg-white">
      <div className="container-site flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <p className="eyebrow flex items-center gap-3 text-aqua">
            <span className="h-px w-8 bg-current" />
            {swimmingAbout.eyebrow}
          </p>
          <WordFill
            text={swimmingAbout.statement}
            className="max-w-5xl font-display text-[clamp(1.6rem,3.4vw,3.25rem)] font-semibold leading-[1.18] tracking-[-0.02em] text-navy"
          />
          <WaveRule className="text-aqua" />
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <ImageReveal className="aspect-[16/10] lg:col-span-7" parallax={6}>
            <Image src={swimmingAbout.image.src} alt={swimmingAbout.image.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
          </ImageReveal>
          <RevealGroup as="ol" className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
            {swimmingAbout.points.map((p) => (
              <RevealItem as="li" key={p.title} className="flex flex-col gap-2 border-l-2 border-ice pl-6">
                <h3 className="font-display text-title font-extrabold uppercase text-aqua">{p.title}</h3>
                <p className="text-navy/70">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/** Each specification is a "lane": rope dividers, lane number, and a stroke that swims across on hover. */
export function PoolFacilities() {
  return (
    <section id="facilities" className="section-y relative scroll-mt-20 overflow-hidden bg-soft">
      <div aria-hidden className="absolute inset-0 bg-lanes" />
      <div className="container-site relative grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-10 lg:col-span-4">
          <SectionHeading
            eyebrow="Pool facilities"
            lines={["THE", "POOL."]}
            size="display"
            accentLast
            intro="Built for lessons, laps and training. Specifications will be published once confirmed."
          />
          <ImageReveal className="hidden aspect-[3/4] lg:block" from="top">
            <Image src={media.poolLadder.src} alt={media.poolLadder.alt} fill sizes="30vw" className="object-cover" />
          </ImageReveal>
        </div>

        <RevealGroup as="ol" className="flex flex-col lg:col-span-8">
          {poolFacilities.map(({ icon: Icon, label, value, note }, i) => (
            <RevealItem as="li" key={label} className="group relative">
              {/* lane rope */}
              <span
                aria-hidden
                className="block h-[3px] w-full bg-[repeating-linear-gradient(90deg,var(--color-aqua)_0_10px,var(--color-white)_10px_20px,var(--color-ice)_20px_30px)] opacity-70"
              />
              <div className="relative grid grid-cols-[3.5rem_1fr] items-center gap-x-6 gap-y-2 overflow-hidden py-8 sm:grid-cols-[4.5rem_1fr_auto] sm:py-10">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-ice/30 transition-transform duration-[1.1s] ease-out-expo group-hover:scale-x-100"
                />
                <span className="relative font-display text-[2.75rem] font-extrabold leading-none text-aqua/25 transition-colors duration-500 group-hover:text-aqua">
                  {i + 1}
                </span>
                <div className="relative flex flex-col gap-1.5">
                  <h3 className="eyebrow text-aqua">{label}</h3>
                  <p className="font-display text-xl font-bold text-navy sm:text-2xl">
                    <Editable value={value} />
                  </p>
                  {note && <p className="text-sm text-navy/55">{note}</p>}
                </div>
                <Icon
                  strokeWidth={1.25}
                  className="relative col-start-2 size-9 text-aqua transition-transform duration-700 ease-out-expo group-hover:translate-x-2 sm:col-start-3"
                />
              </div>
            </RevealItem>
          ))}
          <span
            aria-hidden
            className="block h-[3px] w-full bg-[repeating-linear-gradient(90deg,var(--color-aqua)_0_10px,var(--color-white)_10px_20px,var(--color-ice)_20px_30px)] opacity-70"
          />
        </RevealGroup>
      </div>
    </section>
  );
}
