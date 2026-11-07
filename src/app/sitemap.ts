import type { MetadataRoute } from "next";
import { mainNav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...mainNav.map((n) => n.href), "/booking"];
  return routes.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
