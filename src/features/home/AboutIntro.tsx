import Image from "next/image";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { LineDraw } from "@/components/motion/LineDraw";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutIntro } from "@/content/home";
import { pad } from "@/lib/utils";

/** Asymmetric layered image composition + editorial pillar list. */
export function AboutIntro() {
  const { images } = aboutIntro;
  return (
    <section className="section-y relative overflow-hidden bg-soft">
      <div className="container-site grid items-start gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Images */}
        <div className="relative lg:col-span-6 lg:pr-10">
          <ImageReveal className="aspect-[4/5] w-[86%]" parallax={8}>
            <Image src={images.primary.src} alt={images.primary.alt} fill sizes="(min-width: 1024px) 45vw, 86vw" className="object-cover" />
          </ImageReveal>
          <Parallax speed={-18} className="absolute -bottom-10 right-0 w-[48%] lg:-bottom-16">
            <ImageReveal className="aspect-square border-[10px] border-soft" from="left">
              <Image src={images.secondary.src} alt={images.secondary.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
            </ImageReveal>
          </Parallax>
          <span
            aria-hidden
            className="absolute -left-4 top-8 hidden font-display text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-navy/40 [writing-mode:vertical-rl] lg:block"
          >
            Keshavnagar · Pune
          </span>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-10 pt-6 lg:col-span-6 lg:pt-20">
          <SectionHeading eyebrow={aboutIntro.eyebrow} lines={["MORE THAN A", "SPORTS CLUB."]} accentLast />
          <Reveal>
            <p className="max-w-xl text-lead text-navy/75">{aboutIntro.lead}</p>
          </Reveal>
          <RevealGroup as="ol" className="flex flex-col text-navy">
            {aboutIntro.pillars.map((p, i) => (
              <RevealItem as="li" key={p.title} className="group">
                <LineDraw className="text-navy/15" delay={i * 0.08} />
                <div className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-1 py-5 sm:grid-cols-[3rem_14rem_1fr]">
                  <span className="eyebrow pt-1 text-aqua">{pad(i + 1)}</span>
                  <span className="font-display text-lg font-semibold transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
                    {p.title}
                  </span>
                  <span className="col-start-2 text-sm text-navy/60 sm:col-start-3 sm:pt-1">{p.text}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <TextLink href="/about" className="text-navy">
            Discover our story
          </TextLink>
        </div>
      </div>
    </section>
  );
}
