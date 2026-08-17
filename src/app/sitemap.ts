import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const BASE = "https://arbeeconstructions.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                           lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/projects/completed`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/projects/ongoing`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/gallery`,              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/blog`,                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/privacy`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,                lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  // Dynamic project pages
  const projects = await prisma.project.findMany({
    select: { id: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/project/${p.id}`,
    lastModified: p.createdAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic blog posts
  const blogs = await prisma.blog.findMany({
    where: { status: "published" },
    select: { slug: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
  });
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${BASE}/blog/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
