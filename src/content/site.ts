import { tbc, type Editable } from "@/lib/placeholder";
import type { NavItem } from "@/types/content";

/**
 * Centralised business information.
 * Everything wrapped in tbc() still needs confirmation from the client.
 */

const address = {
  lines: [
    "Rockfold Health & Wellness Centre",
    "Opposite New Orbis School",
    "Keshavnagar",
    "Pune – 411036",
  ],
  oneLine:
    "Rockfold Health & Wellness Centre, Opposite New Orbis School, Keshavnagar, Pune 411036",
};

const mapsQuery = encodeURIComponent(address.oneLine);

export const site = {
  name: "PRO AQUATICS",
  tagline: "A NEW STANDARD IN SPORT.",
  phrase: "YOUR GAME. YOUR GROWTH.",
  description:
    "PRO AQUATICS brings badminton and swimming together under one roof in Keshavnagar, Pune — courts, a pool, coaching and a community built around movement, discipline and growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /**
   * Logo — the official artwork has not been supplied yet.
   * Drop the brand-book files into /public/brand and set `placeholder: false`.
   *   onDark  → logo variant used on navy / photography
   *   onLight → logo variant used on white / soft backgrounds
   */
  logo: {
    placeholder: true,
    onDark: "/brand/logo-on-dark.svg",
    onLight: "/brand/logo-on-light.svg",
    width: 180,
    height: 48,
  },

  contact: {
    phone: tbc("Phone number") as Editable,
    phoneHref: null as string | null, // e.g. "tel:+9190000XXXXX"
    email: tbc("Email address") as Editable,
    emailHref: null as string | null, // e.g. "mailto:hello@…"
    whatsapp: tbc("WhatsApp number") as Editable,
  },

  address: {
    ...address,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    mapsEmbed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
  },

  hours: [
    { days: "Monday – Friday", time: tbc("Opening hours") as Editable },
    { days: "Saturday – Sunday", time: tbc("Opening hours") as Editable },
    { days: "Public holidays", time: tbc("Holiday hours") as Editable },
  ],

  /** Leave href null until the club's profiles are confirmed. */
  social: [
    { label: "Instagram", href: null as string | null },
    { label: "Facebook", href: null as string | null },
    { label: "YouTube", href: null as string | null },
    { label: "LinkedIn", href: null as string | null },
  ],
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Badminton", href: "/badminton" },
  { label: "Swimming", href: "/swimming" },
  { label: "Membership", href: "/membership" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Membership", href: "/membership" },
    { label: "Contact", href: "/contact" },
  ],
  badminton: [
    { label: "Courts & facilities", href: "/badminton#facilities" },
    { label: "Training & coaching", href: "/badminton#training" },
    { label: "Badminton membership", href: "/badminton#membership" },
    { label: "Book a court", href: "/booking?sport=badminton" },
  ],
  swimming: [
    { label: "Pool facilities", href: "/swimming#facilities" },
    { label: "Swimming programs", href: "/swimming#programs" },
    { label: "Swimming membership", href: "/swimming#membership" },
    { label: "Book a session", href: "/booking?sport=swimming" },
  ],
} satisfies Record<string, NavItem[]>;
