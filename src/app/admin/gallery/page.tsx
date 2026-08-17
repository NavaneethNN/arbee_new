export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import AdminGalleryClient from "@/components/admin/AdminGalleryClient";

export const metadata: Metadata = { title: "Gallery" };

export default async function AdminGalleryPage() {
  const [images, projects] = await Promise.all([
    prisma.projectImage.findMany({
      orderBy: { displayOrder: "asc" },
      include: { project: { select: { id: true, name: true } } },
    }),
    prisma.project.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);
  return <AdminGalleryClient initialImages={images} projects={projects} />;
}
