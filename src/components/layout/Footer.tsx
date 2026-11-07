import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Editable } from "@/components/ui/Editable";
import { Logo } from "@/components/ui/Logo";
import { socialIcons } from "@/components/ui/icons";
import { footerNav, site } from "@/content/site";

const columns = [
  { title: "Explore", links: footerNav.explore },
  { title: "Badminton", links: footerNav.badminton },
  { title: "Swimming", links: footerNav.swimming },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-court-lines opacity-40" />

      <div className="container-site relative">
        {/* Statement */}
        <div className="flex flex-col gap-10 border-b border-white/10 py-16 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <p className="font-display text-[clamp(2.25rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em]">
            A new standard
            <br />
            <span className="text-gold">in sport.</span>
          </p>
          <div className="flex flex-col gap-4 lg:items-end">
            <p className="max-w-sm text-white/60 lg:text-right">
              Badminton and swimming in Keshavnagar, Pune. Send a booking request and we&apos;ll take it from
              there.
            </p>
            <Link
              href="/booking"
              className="group inline-flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold"
            >
              Booking
              <span className="h-px w-10 bg-gold transition-all duration-500 ease-out-expo group-hover:w-16" />
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Logo tone="onDark" showPlaceholderNote />
            <address className="flex flex-col gap-4 not-italic text-sm text-white/70">
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 transition-colors hover:text-white"
              >
                <MapPin strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </a>
              <span className="flex gap-3">
                <Phone strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-gold" />
                {site.contact.phoneHref ? (
                  <a href={site.contact.phoneHref} className="hover:text-white">
                    <Editable value={site.contact.phone} />
                  </a>
                ) : (
                  <Editable value={site.contact.phone} />
                )}
              </span>
              <span className="flex gap-3">
                <Mail strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-gold" />
                {site.contact.emailHref ? (
                  <a href={site.contact.emailHref} className="hover:text-white">
                    <Editable value={site.contact.email} />
                  </a>
                ) : (
                  <Editable value={site.contact.email} />
                )}
              </span>
              <span className="flex gap-3">
                <Clock strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {site.hours[0].days}: <Editable value={site.hours[0].time} />
                </span>
              </span>
            </address>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-5 lg:col-span-2 lg:col-start-auto">
              <h2 className="eyebrow text-gold">{col.title}</h2>
              <ul className="flex flex-col gap-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-5 lg:col-span-2">
            <h2 className="eyebrow text-gold">Follow</h2>
            <ul className="flex gap-2">
              {site.social.map((s) => {
                const Icon = socialIcons[s.label as keyof typeof socialIcons];
                const cls =
                  "grid size-11 place-items-center border border-white/15 text-white/80 transition-colors duration-300";
                return (
                  <li key={s.label}>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className={`${cls} hover:border-gold hover:bg-gold hover:text-navy`}
                      >
                        <Icon size={18} />
                      </a>
                    ) : (
                      <span
                        className={`${cls} cursor-help opacity-50`}
                        title={`${s.label} — link to be added`}
                        aria-label={`${s.label} (link to be added)`}
                      >
                        <Icon size={18} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="eyebrow text-[0.62rem] text-white/40">{site.phrase}</p>
        </div>
      </div>
    </footer>
  );
}
