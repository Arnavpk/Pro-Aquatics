import Image from "next/image";
import { CourtLines } from "@/components/graphics/CourtLines";
import { WaveEdge } from "@/components/graphics/Waves";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Shuttlecock } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { MediaImage } from "@/types/content";

/** Closing booking call-to-action — court (badminton) or water (swimming) treatment. */
export function CtaBanner({
  variant,
  heading,
  text,
  cta,
  image,
}: {
  variant: "court" | "water";
  heading: string;
  text: string;
  cta: { label: string; href: string };
  image?: MediaImage;
}) {
  const water = variant === "water";
  const words = heading.split(" ");
  const mid = Math.ceil(words.length / 2);
  const lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];

  return (
    <section className={cn("relative isolate overflow-hidden text-white", water ? "bg-aqua" : "bg-navy")}>
      {water && <WaveEdge className="absolute inset-x-0 top-0 z-10 text-white" flip />}

      {image && (
        <Image
          src={image.src}
          alt=""
          fill
          sizes="100vw"
          className={cn("-z-20 object-cover", water ? "opacity-35 mix-blend-luminosity" : "opacity-20")}
        />
      )}

      {water ? (
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-br from-aqua/70 via-aqua/60 to-navy" />
      ) : (
        <CourtLines className="absolute left-1/2 top-1/2 -z-10 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-20 lg:w-[90%]" />
      )}

      <div className="container-site section-y relative flex flex-col items-center gap-10 text-center">
        {water ? (
          <span aria-hidden className="relative grid size-16 place-items-center">
            <span className="absolute inset-0 rounded-full border border-ice/60" />
            <span className="absolute -inset-4 rounded-full border border-ice/30" />
            <span className="absolute -inset-8 rounded-full border border-ice/15" />
            <span className="size-2 rounded-full bg-ice" />
          </span>
        ) : (
          <Shuttlecock size={44} className="rotate-[-35deg] text-gold" />
        )}

        <TextReveal
          as="h2"
          lines={lines}
          className="text-display uppercase"
          accentLine={1}
          accentClassName={water ? "text-ice" : "text-gold"}
        />
        <Reveal className="flex max-w-xl flex-col items-center gap-9">
          <p className="text-lead text-white/80">{text}</p>
          <ButtonLink href={cta.href} size="lg" variant={water ? "navy" : "gold"}>
            {cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
