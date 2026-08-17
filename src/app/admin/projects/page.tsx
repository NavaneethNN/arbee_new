import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminProjectsClient from "@/components/admin/AdminProjectsClient";

export const metadata: Metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { displayOrder: "asc" }, take: 1 } },
  });

  return <AdminProjectsClient initialProjects={projects} />;
}
