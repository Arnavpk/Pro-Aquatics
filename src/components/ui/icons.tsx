import type { SVGProps } from "react";

/**
 * Custom line icons that Lucide does not provide. Drawn on a 24px grid with
 * the same 1.5 stroke weight used across the site.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export function Shuttlecock(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.4 16.5 6 3.5h12l-3.4 13" />
      <path d="M9.4 16.5h5.2v.6a2.6 2.6 0 0 1-5.2 0z" />
      <path d="M12 16.5v-13M10.6 16.5 9 3.5M13.4 16.5 15 3.5M7.6 10h8.8" />
    </Svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14.5 21v-8h2.7l.4-3.2h-3.1V7.9c0-.9.3-1.6 1.6-1.6h1.7V3.5a22 22 0 0 0-2.5-.1c-2.4 0-4.1 1.5-4.1 4.2v2.2H8.5V13h2.7v8" />
    </Svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="m10 9.2 5 2.8-5 2.8z" />
    </Svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M7.5 10.5v6M7.5 7.5v.01M11 16.5v-6M11 13.2c0-1.5 1-2.7 2.5-2.7s2.5 1 2.5 2.7v3.3" />
    </Svg>
  );
}

export const socialIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
  LinkedIn: LinkedinIcon,
} as const;
