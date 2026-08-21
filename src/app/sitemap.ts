import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: new Date(p.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
