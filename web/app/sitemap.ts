import type { MetadataRoute } from "next";
import { strapiFetch } from "@/lib/strapi";
import { siteUrl } from "@/lib/render";
import { SERVICES } from "@/lib/site";
import type { StrapiList } from "@/lib/types";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: siteUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: siteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: siteUrl("/industries"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: siteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: siteUrl("/ledger-ae"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: siteUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: siteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: siteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: siteUrl(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data } = await strapiFetch<StrapiList<{ slug: string; updatedAt: string }>>("posts", {
      query: {
        "fields[0]": "slug",
        "fields[1]": "updatedAt",
        "pagination[pageSize]": 500,
        sort: "updatedAt:desc",
      },
      revalidate: 3600,
      tags: ["posts"],
    });
    postRoutes = data.map((p) => ({
      url: siteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    postRoutes = [];
  }

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
