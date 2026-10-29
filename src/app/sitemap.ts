import type { MetadataRoute } from "next";
import { studio } from "@/content/site";

// Add routes here as inner pages ship (full plan: docs/sitemap.md).
const routes = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${studio.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
