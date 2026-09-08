import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/components/portfolio/data";

export const dynamic = "force-static";

const SITE_URL = "https://itsneeraj.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about-me.md`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...CASE_STUDIES.map((study) => ({
      url: `${SITE_URL}/work/${study.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
