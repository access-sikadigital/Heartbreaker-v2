import type { MetadataRoute } from "next";
import { studio } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${studio.url}/sitemap.xml`,
  };
}
