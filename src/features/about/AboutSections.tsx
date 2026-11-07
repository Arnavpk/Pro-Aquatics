import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Gallery } from "@/components/blocks/Gallery";
import { CourtLines } from "@/components/graphics/CourtLines";
import { WaveEdge } from "@/components/graphics/Waves";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { LineDraw } from "@/components/motion/LineDraw";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  aboutGallery,
  aboutHero,
  aboutIntroduction,
  approach,
  facilitiesOverview,
  philosophy,
  sportsOffered,
  visionMission,
} from "@/content/about";
import { cn, pad } from "@/lib/utils";

export function AboutHero() {
  const [a, b, c] = aboutHero.images;
  return (
    <section className="relative isolate overflow-hidden bg-navy pb-24 pt-36 text-white lg:pb-32 lg:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-court-lines opacity-50" />
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold" />
            {aboutHero.eyebrow}
          </p>
          <TextReveal
            as="h1"
            trigger="load"
            lines={aboutHero.heading}
            className="text-display uppercase"
            accentLine={1}
            accentClassName="text-gold"
          />
          <Reveal>
            <p className="max-w-md text-lead text-white/75">{aboutHero.text}</p>
          </Reveal>
        </div>

        <div className="relative h-[28rem] sm:h-[34rem] lg:col-span-6 lg:h-[38rem]">
          <ImageReveal className="absolute left-0 top-0 h-[78%] w-[58%]" from="bottom">
            <Image src={a.src} alt={a.alt} fill priority sizes="30vw" className="object-cover" />
          </ImageReveal>
          <Parallax speed={-10} className="absolute bottom-0 right-0 h-[62%] w-[52%]">
            <ImageReveal className="size-full" from="top">
              <Image src={b.src} alt={b.alt} fill priority sizes="28vw" className="object-cover" />
              <span className="absolute inset-0 bg-aqua/35 mix-blend-multiply" />
            </ImageReveal>
          </Parallax>
          <Parallax speed={16} className="absolute right-[8%] top-[4%] hidden w-[26%] sm:block">
            <ImageReveal className="aspect-square border-[6px] border-navy" from="left">
              <Image src={c.src} alt={c.alt} fill sizes="14vw" className="object-cover" />
            </ImageReveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

export function AboutIntroduction() {
  return (
    <section className="section-y bg-white">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow="Who we are" lines={["ONE CLUB.", "TWO DISCIPLINES.", "ONE STANDARD."]} accentLast />
        </div>
        <Reveal className="flex flex-col gap-6 text-lead text-navy/75 lg:col-span-5 lg:col-start-8 lg:pt-16">
          {aboutIntroduction.body.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section className="relative isolate overflow-hidden bg-ice/40">
      <WaveEdge className="absolute inset-x-0 top-0 text-white" flip />
      <div className="container-site flex flex-col items-center gap-10 py-32 text-center lg:py-44">
        <p className="eyebrow text-aqua">{philosophy.eyebrow}</p>
        <TextReveal
          as="p"
          lines={["“YOUR GAME.", "YOUR GROWTH.”"]}
          className="font-display text-mega font-extrabold uppercase text-navy"
          accentLine={1}
          accentClassName="text-aqua"
        />
        <Reveal>
          <p className="max-w-2xl text-lead text-navy/75">{philosophy.text}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function VisionMission() {
  const items = [
    { ...visionMission.vision, cls: "bg-navy", accent: "text-gold" },
    { ...visionMission.mission, cls: "bg-aqua", accent: "text-ice" },
  ];
  return (
    <section className="grid text-white md:grid-cols-2">
      {items.map((it, i) => (
        <Reveal key={it.title} className={cn("relative overflow-hidden p-10 sm:p-16 lg:p-24", it.cls)} delay={i * 0.1}>
          <span aria-hidden className="absolute -right-6 -top-10 font-display text-[12rem] font-extrabold leading-none text-white/[0.05]">
            {pad(i + 1)}
          </span>
          <p className={cn("eyebrow mb-8", it.accent)}>{it.title}</p>
          <p className="relative max-w-md font-display text-[clamp(1.4rem,2.4vw,2.1rem)] font-semibold leading-snug">
            {it.text}
          </p>
        </Reveal>
      ))}
    </section>
  );
}

export function SportsOffered() {
  return (
    <section className="section-y bg-white">
      <div className="container-site flex flex-col gap-12">
        <SectionHeading eyebrow="Sports offered" lines={["TWO WAYS", "TO MOVE."]} accentLast />
        <div className="flex flex-col gap-3">
          {sportsOffered.map((s, i) => (
            <Reveal key={s.sport} delay={i * 0.1}>
              <Link
                href={s.href}
                className="group relative isolate grid min-h-64 overflow-hidden text-white sm:grid-cols-[1fr_auto] sm:items-end"
              >
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="100vw"
                  className="-z-20 object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-105"
                />
                <span
                  className={cn(
                    "absolute inset-0 -z-10 transition-opacity duration-700 group-hover:opacity-80",
                    s.sport === "swimming"
                      ? "bg-linear-to-r from-aqua via-aqua/70 to-aqua/20"
                      : "bg-linear-to-r from-navy via-navy/75 to-navy/20",
                  )}
                />
                <div className="flex flex-col gap-3 p-8 sm:p-12">
                  <span className="eyebrow text-white/70">{pad(i + 1)}</span>
                  <h3 className="text-display uppercase">{s.title}</h3>
                  <p className="max-w-md text-white/80">{s.text}</p>
                </div>
                <span className="m-8 grid size-16 place-items-center border border-white/40 transition-all duration-700 ease-out-expo group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-navy sm:m-12">
                  <ArrowUpRight strokeWidth={1.5} className="size-7 transition-transform duration-700 group-hover:-rotate-45" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Approach() {
  return (
    <section className="section-y relative isolate overflow-hidden bg-navy text-white">
      <CourtLines className="absolute -left-[25%] top-0 -z-10 w-[75%] opacity-10" />
      <div className="container-site flex flex-col gap-16">
        <SectionHeading
          eyebrow="Community & training approach"
          lines={["HOW WE", "WORK WITH YOU."]}
          tone="light"
          accentLast
        />
        <RevealGroup as="ol" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {approach.map(({ icon: Icon, title, text }, i) => (
            <RevealItem as="li" key={title} className="flex flex-col gap-5">
              <div className="flex items-center gap-4 text-gold">
                <span className="eyebrow">{pad(i + 1)}</span>
                <LineDraw className="flex-1 text-white/20" delay={i * 0.12} />
              </div>
              <Icon strokeWidth={1.5} className="size-8 text-gold" />
              <h3 className="font-display text-lg font-extrabold uppercase">{title}</h3>
              <p className="text-sm text-white/65">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function FacilitiesOverview() {
  return (
    <section id="facilities" className="section-y scroll-mt-20 bg-soft">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Facilities overview" lines={["WHAT YOU'LL", "FIND HERE."]} accentLast />
        </div>
        <ul className="border-t border-navy/15 lg:col-span-8">
          {facilitiesOverview.map((f, i) => (
            <li key={f.title} className="border-b border-navy/15">
              <Link href={f.href} className="on-light group flex items-center gap-6 py-7">
                <span className="eyebrow w-6 text-aqua">{pad(i + 1)}</span>
                <span className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="font-display text-xl font-extrabold uppercase transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:w-72">
                    {f.title}
                  </span>
                  <span className="text-sm text-navy/60">{f.text}</span>
                </span>
                <ArrowUpRight
                  strokeWidth={1.5}
                  className="size-6 shrink-0 text-navy/40 transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-navy"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutGallery() {
  return (
    <section id="gallery" className="section-y scroll-mt-20 bg-white">
      <div className="container-site flex flex-col gap-12">
        <SectionHeading eyebrow="Gallery" lines={["LIFE AT", "PRO AQUATICS."]} accentLast />
        <Gallery items={aboutGallery} layout="mosaic" />
      </div>
    </section>
  );
}
