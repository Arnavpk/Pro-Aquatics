import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { WaveEdge } from "@/components/graphics/Waves";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Editable } from "@/components/ui/Editable";
import { socialIcons } from "@/components/ui/icons";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { ContactForm } from "@/features/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Pro Aquatics at Rockfold Health & Wellness Centre, opposite New Orbis School, Keshavnagar, Pune 411036. Send us a message or find us on Google Maps.",
  path: "/contact",
  image: media.poolBlue,
});

export default function ContactPage() {
  const { contact, address, hours, social } = site;

  const details = [
    {
      icon: Phone,
      label: "Phone",
      content: contact.phoneHref ? (
        <a href={contact.phoneHref} className="hover:text-aqua">
          <Editable value={contact.phone} />
        </a>
      ) : (
        <Editable value={contact.phone} />
      ),
    },
    {
      icon: Mail,
      label: "Email",
      content: contact.emailHref ? (
        <a href={contact.emailHref} className="hover:text-aqua">
          <Editable value={contact.email} />
        </a>
      ) : (
        <Editable value={contact.email} />
      ),
    },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-aqua pb-32 pt-36 text-white lg:pb-40 lg:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-br from-navy via-navy/80 to-aqua" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-court-lines opacity-40" />
        <div className="container-site flex flex-col gap-8">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold" />
            Contact
          </p>
          <TextReveal
            as="h1"
            trigger="load"
            lines={["LET'S TALK", "SPORT."]}
            className="text-mega uppercase"
            accentLine={1}
            accentClassName="text-gold"
          />
          <Reveal>
            <p className="max-w-lg text-lead text-white/80">
              Questions about courts, the pool, coaching or membership? Send a message, call, or drop by the club in
              Keshavnagar.
            </p>
          </Reveal>
        </div>
        <WaveEdge className="absolute inset-x-0 bottom-0 text-white" />
      </section>

      <section className="bg-white pb-[var(--spacing-section)] pt-16">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          {/* Details */}
          <RevealGroup className="flex flex-col gap-8 lg:col-span-5">
            <RevealItem>
              <a
                href={address.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="on-light group flex flex-col gap-5 bg-navy p-8 text-white"
              >
                <span className="flex items-center justify-between">
                  <MapPin strokeWidth={1.5} className="size-7 text-gold" />
                  <span className="eyebrow flex items-center gap-2 text-gold">
                    Open in Google Maps
                    <Navigation strokeWidth={1.5} className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </span>
                <address className="not-italic">
                  {address.lines.map((l, i) => (
                    <span key={l} className={i === 0 ? "block font-display text-xl font-bold" : "block text-white/75"}>
                      {l}
                    </span>
                  ))}
                </address>
              </a>
            </RevealItem>

            <RevealItem className="grid gap-px bg-navy/10 sm:grid-cols-2">
              {details.map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex flex-col gap-3 bg-white p-6">
                  <Icon strokeWidth={1.5} className="size-6 text-aqua" />
                  <span className="eyebrow text-[0.65rem] text-navy/50">{label}</span>
                  <span className="font-semibold">{content}</span>
                </div>
              ))}
            </RevealItem>

            <RevealItem className="flex flex-col gap-4 border border-navy/10 p-6">
              <span className="flex items-center gap-3">
                <Clock strokeWidth={1.5} className="size-6 text-aqua" />
                <span className="eyebrow text-[0.65rem] text-navy/50">Business hours</span>
              </span>
              <dl className="flex flex-col">
                {hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-navy/10 py-3 text-sm last:border-0">
                    <dt className="text-navy/70">{h.days}</dt>
                    <dd className="font-semibold">
                      <Editable value={h.time} />
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealItem>

            <RevealItem className="flex flex-col gap-4">
              <span className="eyebrow text-[0.65rem] text-navy/50">Follow Pro Aquatics</span>
              <ul className="flex gap-2">
                {social.map((s) => {
                  const Icon = socialIcons[s.label as keyof typeof socialIcons];
                  return (
                    <li key={s.label}>
                      {s.href ? (
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                          className="on-light grid size-12 place-items-center border border-navy/15 transition-colors hover:border-navy hover:bg-navy hover:text-gold"
                        >
                          <Icon size={20} />
                        </a>
                      ) : (
                        <span
                          title={`${s.label} — link to be added`}
                          aria-label={`${s.label} (link to be added)`}
                          className="grid size-12 cursor-help place-items-center border border-dashed border-navy/20 text-navy/40"
                        >
                          <Icon size={20} />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </RevealItem>
          </RevealGroup>

          {/* Form */}
          <Reveal className="flex flex-col gap-8 lg:col-span-7" delay={0.1}>
            <div className="flex flex-col gap-3">
              <p className="eyebrow text-aqua">Send a message</p>
              <h2 className="text-headline uppercase">We&apos;ll get back to you.</h2>
              <p className="text-navy/60">
                Looking to book a session?{" "}
                <Link href="/booking" className="font-semibold text-aqua underline underline-offset-4">
                  Use the booking page
                </Link>{" "}
                for a faster response.
              </p>
            </div>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="relative bg-soft">
        <div className="relative h-[28rem] w-full lg:h-[34rem]">
          <iframe
            title="Map showing Pro Aquatics at Rockfold Health & Wellness Centre, Keshavnagar, Pune"
            src={address.mapsEmbed}
            className="absolute inset-0 size-full border-0 grayscale-[35%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-6">
            <ButtonLink href={address.mapsUrl} target="_blank" rel="noreferrer" className="pointer-events-auto">
              Get Directions
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
