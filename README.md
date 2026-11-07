# PRO AQUATICS — Website

Seven-page website for PRO AQUATICS (badminton + swimming), Keshavnagar, Pune.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion for React · GSAP + ScrollTrigger · Lenis · Lucide · React Hook Form · Zod

```bash
npm install
npm run dev         # http://localhost:3000
npm run build && npm start
npm run typecheck && npm run lint
```

## Folder structure

```
src/
├─ app/                    Routes only — each page.tsx composes sections
│  ├─ page.tsx (home), badminton/, swimming/, membership/, booking/, about/, contact/
│  ├─ api/booking, api/contact   Route handlers (server-side validation)
│  ├─ layout.tsx, template.tsx   Shell (nav, footer, smooth scroll) + page transitions
│  └─ globals.css                Brand tokens (@theme) and shared utilities
├─ assets/fonts/           Montserrat + Inter (self-hosted via next/font/local)
├─ components/
│  ├─ layout/              Navbar, MobileMenu, Footer, SmoothScroll (Lenis), PageTransition
│  ├─ ui/                  Button, Logo, SectionHeading, Editable, form fields, custom icons
│  ├─ motion/              Reveal (Motion), TextReveal / ImageReveal / Parallax / LineDraw (GSAP), CountUp
│  ├─ graphics/            CourtLines (badminton motif), Waves (swimming motif)
│  └─ blocks/              Reusable sections: SportsCard, MembershipCard, Gallery, Lightbox,
│                          HorizontalGallery, CtaBanner, Faq, StatsBand, SportMembership
├─ features/               Page-specific sections, one folder per page
│  └─ home/ badminton/ swimming/ membership/ booking/ about/ contact/
├─ content/                ALL copy, business info, images and form options
├─ lib/                    utils, animations (Motion variants), gsap (registration),
│                          placeholder, seo, api (client fetch), validation/ (Zod)
└─ types/                  Shared TypeScript interfaces
```

## Updating content — everything lives in `src/content`

| File | What it holds |
|---|---|
| `site.ts` | Phone, email, hours, address, socials, logo settings, navigation |
| `media.json` | Every photograph (id, alt text, credit) |
| `home.ts`, `badminton.ts`, `swimming.ts`, `about.ts` | Page copy, programs, facilities, galleries |
| `membership.ts` | Plans, prices, comparison table, FAQ |
| `booking.ts` | Booking form options and limits (also drive validation) |

### Placeholders (unconfirmed facts)

Nothing has been invented — unconfirmed values are written as `tbc("Label")` and render as a dashed
`[Label]` on the site. List every outstanding value with:

```bash
grep -rn "tbc(" src/content
```

Replace `tbc("Price")` with the real value, e.g. `"₹2,500"`. Stats count up automatically once a number
replaces the placeholder. Membership plan **names** and the About page **vision / mission / philosophy**
are draft copy — confirm with the client.

### Logo

The official logo file was not supplied, so a clearly marked typographic placeholder is shown.
Copy the brand-book artwork to `public/brand/logo-on-dark.svg` and `public/brand/logo-on-light.svg`,
then set `logo.placeholder: false` in `src/content/site.ts`.

### Photography

Temporary Unsplash photos are referenced in `src/content/media.json`.
- **Client photos:** put files in `public/images/club/` and change an entry's `id` to `"/images/club/file.jpg"`.
- **Self-host the stock photos:** `npm run images:localize`, then set `NEXT_PUBLIC_LOCAL_IMAGES=true` in `.env.local`.

## Booking flow

`/booking` is a three-step request form (React Hook Form + Zod). Fields change with the chosen sport and
booking type; query strings pre-fill it (`/booking?sport=swimming&type=coaching`). The same Zod schema
validates on the server in `src/app/api/booking/route.ts`.

It sends a **request**, never a confirmed booking. Connection points for a database, email notifications,
admin dashboard and availability engine are marked `INTEGRATE` in the route handler.

## Animation architecture

- **Motion for React** — UI motion: entrances, hovers, nav indicator, mobile menu, tabs, accordions, modals, form steps, page transitions.
- **GSAP + ScrollTrigger** — scroll storytelling: hero timelines, masked text and image reveals, parallax, court-line drawing, pinned horizontal gallery.
- **Lenis** — smooth scrolling, driven by GSAP's ticker so it stays in sync with ScrollTrigger.
- `prefers-reduced-motion` disables Lenis and GSAP motion (`gsap.matchMedia`) and Motion transforms (`MotionConfig reducedMotion="user"`).

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL, used for canonical / Open Graph / sitemap |
| `NEXT_PUBLIC_LOCAL_IMAGES` | `true` to serve stock photos from `public/images/stock` |
