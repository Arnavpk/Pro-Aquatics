import Image from "next/image";
import { Gallery } from "@/components/blocks/Gallery";
import { StatsBand } from "@/components/blocks/StatsBand";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { finalCta, homeGallery, stats } from "@/content/home";

export function StatsSection() {
  return (
    <section className="relative bg-white py-16 sm:py-24" aria-label="Pro Aquatics in numbers">
      <div className="container-site">
        <StatsBand stats={stats} />
      </div>
    </section>
  );
}

export function GalleryPreview() {
  return (
    <section className="bg-white pb-[var(--spacing-section)]">
      <div className="container-site flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Inside the club" lines={["ON COURT.", "IN THE WATER."]} accentLast />
          <TextLink href="/about#gallery" className="text-navy">
            View more
          </TextLink>
        </div>
        <Gallery items={homeGallery} layout="bento" />
      </div>
    </section>
  );
}

/** Split-photo closing statement. */
export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute inset-0 -z-10 grid grid-cols-2">
        <Parallax speed={10} className="relative -my-[10%]">
          <Image src={finalCta.images.left.src} alt="" fill sizes="50vw" className="object-cover" />
        </Parallax>
        <Parallax speed={-10} className="relative -my-[10%]">
          <Image src={finalCta.images.right.src} alt="" fill sizes="50vw" className="object-cover" />
          <span className="absolute inset-0 bg-aqua/50 mix-blend-multiply" />
        </Parallax>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy/75" />
      <span aria-hidden className="absolute inset-y-0 left-1/2 -z-10 w-px bg-gold/40" />

      <div className="container-site flex min-h-[80svh] flex-col items-center justify-center gap-10 py-28 text-center">
        <p className="eyebrow text-gold">Start today</p>
        <TextReveal
          as="h2"
          lines={["YOUR GAME.", "YOUR GROWTH."]}
          className="text-mega uppercase"
          accentLine={1}
          accentClassName="text-gold"
        />
        <Reveal className="flex flex-col items-center gap-9">
          <p className="max-w-md text-lead text-white/80">{finalCta.text}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={finalCta.primary.href} size="lg">
              {finalCta.primary.label}
            </ButtonLink>
            <ButtonLink href={finalCta.secondary.href} size="lg" variant="light">
              {finalCta.secondary.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
