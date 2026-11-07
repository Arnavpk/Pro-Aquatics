import Image from "next/image";
import { CourtLines } from "@/components/graphics/CourtLines";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Editable } from "@/components/ui/Editable";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { badmintonAbout, badmintonFacilities } from "@/content/badminton";
import { cn, pad } from "@/lib/utils";

export function BadmintonAbout() {
  const { images } = badmintonAbout;
  return (
    <section className="section-y relative bg-white">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <SectionHeading eyebrow={badmintonAbout.eyebrow} lines={["SPEED.", "PRECISION.", "CONTROL."]} accentLast />
          <Reveal className="flex flex-col gap-5 text-navy/75">
            {badmintonAbout.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </Reveal>
          <RevealGroup as="ul" className="grid grid-cols-2 gap-px bg-navy/10">
            {badmintonAbout.highlights.map((h) => (
              <RevealItem as="li" key={h} className="flex items-center gap-3 bg-white p-4 font-display text-sm font-semibold">
                <span aria-hidden className="size-1.5 rotate-45 bg-gold ring-1 ring-navy" />
                {h}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <ImageReveal className="aspect-[4/5]" from="right" parallax={6}>
            <Image src={images.main.src} alt={images.main.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </ImageReveal>
          {/* Court-line frame offset behind the photo */}
          <span aria-hidden className="absolute -right-4 -top-4 -z-10 hidden size-full border border-gold lg:block" />
          <ImageReveal className="absolute -bottom-10 -left-6 hidden aspect-[4/3] w-[46%] border-8 border-white sm:block lg:-left-16" from="bottom">
            <Image src={images.detail.src} alt={images.detail.alt} fill sizes="22vw" className="object-cover" />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}

/** Facilities laid out like court zones on a navy surface. */
export function BadmintonFacilities() {
  return (
    <section id="facilities" className="section-y relative isolate scroll-mt-20 overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-court-lines opacity-60" />
      <div className="container-site flex flex-col gap-14">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Facilities" lines={["THE COURTS."]} tone="light" size="display" />
          <p className="max-w-sm text-white/65">
            Everything you need to play at your best. Final specifications are being confirmed and will appear here.
          </p>
        </div>

        <div className="relative">
          <CourtLines className="pointer-events-none absolute inset-0 hidden size-full opacity-40 lg:block" strokeWidth={2} />
          <RevealGroup as="ul" className="relative grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-6 lg:bg-transparent">
            {badmintonFacilities.map(({ icon: Icon, label, value, note }, i) => (
              <RevealItem
                as="li"
                key={label}
                className={cn(
                  "group relative flex min-h-56 flex-col justify-between gap-8 bg-navy p-7 transition-colors duration-500 hover:bg-white/[0.06] lg:bg-navy/80 lg:backdrop-blur-[2px]",
                  i < 2 ? "lg:col-span-3" : "lg:col-span-2",
                  i === 4 && "sm:col-span-2 lg:col-span-2",
                )}
              >
                <div className="flex items-start justify-between">
                  <Icon strokeWidth={1.5} className="size-7 text-gold transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" />
                  <span className="eyebrow text-white/35">{pad(i + 1)}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="eyebrow text-white/60">{label}</h3>
                  <p className="font-display text-xl font-bold">
                    <Editable value={value} />
                  </p>
                  {note && <p className="text-sm text-white/50">{note}</p>}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
