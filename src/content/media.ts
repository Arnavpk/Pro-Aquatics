import registry from "./media.json";
import type { MediaImage } from "@/types/content";

/**
 * Single source of truth for every photograph on the site.
 * - `id` starting with "photo-" → Unsplash CDN (temporary stock).
 * - `id` starting with "/"      → local file in /public (client photography).
 * - NEXT_PUBLIC_LOCAL_IMAGES=true serves the copies created by
 *   `npm run images:localize` from /public/images/stock.
 */
const LOCAL = process.env.NEXT_PUBLIC_LOCAL_IMAGES === "true";

type Key = keyof typeof registry.images;

function resolve(key: Key): MediaImage {
  const { id, alt, credit } = registry.images[key];
  let src: string;
  if (id.startsWith("/")) src = id;
  else if (LOCAL) src = `/images/stock/${key}.jpg`;
  else src = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;
  return { src, alt, credit };
}

export const media = Object.fromEntries(
  (Object.keys(registry.images) as Key[]).map((k) => [k, resolve(k)]),
) as Record<Key, MediaImage>;

export type MediaKey = Key;
