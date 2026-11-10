import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CourtLines } from "@/components/graphics/CourtLines";
import { WaveRule } from "@/components/graphics/Waves";
import { cn } from "@/lib/utils";
import type { MediaImage, Sport } from "@/types/content";

/**
 * Large interactive sport card. Badminton gets a dark, court-lined treatment;
 * swimming gets a blue-toned water treatment. Whole card is one link.
 */
export function SportsCard({
  sport,
  heading,
  text,
  cta,
  href,
  image,
  className,
}: {
  sport: Sport;
  index?: string;
  heading: string;
  text: string;
  cta: string;
  href: string;
  image: MediaImage;
  className?: string;
}) {
  const swim = sport === "swimming";

  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate flex min-h-[32rem] flex-col justify-between overflow-hidden p-6 text-white sm:p-10 lg:min-h-[44rem]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="-z-20 object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.08]"
      />

      {/* Tonal treatment */}
      {swim ? (
        <>
          <span aria-hidden className="absolute inset-0 -z-10 bg-aqua/55 mix-blend-multiply" />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/30 to-aqua/10 transition-opacity duration-700 group-hover:opacity-80"
          />
        </>
      ) : (
        <>
          <span aria-hidden className="absolute inset-0 -z-10 bg-navy/55" />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/40 to-transparent transition-opacity duration-700 group-hover:opacity-80"
          />
          <CourtLines className="absolute -right-24 top-10 -z-10 w-[34rem] rotate-90 opacity-25 transition-opacity duration-700 group-hover:opacity-50" />
        </>
      )}

      <div className="flex items-start justify-end">
        <span
          aria-hidden
          className={cn(
            "grid size-14 place-items-center border transition-all duration-700 ease-out-expo group-hover:rotate-45",
            swim
              ? "border-ice/50 group-hover:border-ice group-hover:bg-ice group-hover:text-navy"
              : "border-gold/50 group-hover:border-gold group-hover:bg-gold group-hover:text-navy",
          )}
        >
          <ArrowUpRight strokeWidth={1.5} className="size-6 -rotate-45 transition-transform duration-700 group-hover:rotate-0" />
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {swim && <WaveRule className="text-ice" />}
        <h3 className="text-display uppercase transition-transform duration-700 ease-out-expo lg:translate-y-6 lg:group-hover:translate-y-0">
          {heading}
        </h3>
        <div className="grid transition-all duration-700 ease-out-expo lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-visible:grid-rows-[1fr] lg:group-focus-visible:opacity-100">
          <div className="overflow-hidden">
            <p className="max-w-md pb-6 text-white/80">{text}</p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex w-fit items-center gap-3 font-display text-[0.75rem] font-semibold uppercase tracking-[0.18em]",
            swim ? "text-ice" : "text-gold",
          )}
        >
          {cta}
          <span className="h-px w-10 bg-current transition-all duration-700 ease-out-expo group-hover:w-20" />
        </span>
      </div>
    </Link>
  );
}