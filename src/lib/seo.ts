import type { Metadata } from "next";
import { site } from "@/content/site";
import type { MediaImage } from "@/types/content";

/** Build consistent per-page metadata (title, description, Open Graph, Twitter). */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: MediaImage;
}): Metadata {
  const images = image ? [{ url: image.src, alt: image.alt, width: 1200, height: 630 }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      url: path,
      title: `${title} | ${site.name}`,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: images?.map((i) => i.url),
    },
  };
}
