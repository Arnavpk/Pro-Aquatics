import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Brand logo. Until the official artwork from the brand book is placed in
 * /public/brand (and `site.logo.placeholder` set to false), a clearly
 * marked typographic placeholder is shown — never a redesigned logo.
 */
export function Logo({
  tone = "onDark",
  className,
  showPlaceholderNote = false,
}: {
  tone?: "onDark" | "onLight";
  className?: string;
  showPlaceholderNote?: boolean;
}) {
  const { logo } = site;

  return (
    <Link href="/" aria-label={`${site.name} — home`} className={cn("inline-flex shrink-0", className)}>
      {logo.placeholder ? (
        <span className="flex flex-col items-start gap-1">
          <span
            className={cn(
              "border border-dashed px-2.5 py-1.5 font-display text-[0.95rem] font-extrabold leading-none tracking-[0.08em]",
              tone === "onDark" ? "border-gold/50 text-white" : "border-navy/40 text-navy",
            )}
            title="Logo placeholder — replace with the official PRO AQUATICS artwork"
          >
            PRO <span className={tone === "onDark" ? "text-gold" : "text-aqua"}>AQUATICS</span>
          </span>
          {showPlaceholderNote && (
            <span className="eyebrow text-[0.55rem] opacity-50">Logo placeholder</span>
          )}
        </span>
      ) : (
        <Image
          src={tone === "onDark" ? logo.onDark : logo.onLight}
          alt={site.name}
          width={logo.width}
          height={logo.height}
          priority
          className="h-10 w-auto"
        />
      )}
    </Link>
  );
}
