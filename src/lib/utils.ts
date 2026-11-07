import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** tailwind-merge needs to know the custom type scale, or it treats
 *  `text-display` as a colour and drops it next to `text-navy`. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["mega", "display", "headline", "title", "lead", "eyebrow"] }],
    },
  },
});

/** Merge Tailwind class names, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-pad an index for editorial numbering: 1 → "01". */
export function pad(n: number, size = 2) {
  return String(n).padStart(size, "0");
}

/** Today's date as yyyy-mm-dd in the visitor's local time zone. */
export function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60_000).toISOString().slice(0, 10);
}
