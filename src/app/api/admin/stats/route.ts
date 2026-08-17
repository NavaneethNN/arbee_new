import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    totalProjects,
    completedProjects,
    ongoingProjects,
    totalImages,
    galleryImages,
    projectImages,
    totalBlogs,
    publishedBlogs,
    draftBlogs,
    newContacts,
    totalContacts,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "completed" } }),
    prisma.project.count({ where: { status: "ongoing" } }),
    prisma.projectImage.count(),
    prisma.projectImage.count({ where: { projectId: null } }),
    prisma.projectImage.count({ where: { projectId: { not: null } } }),
    prisma.blog.count(),
    prisma.blog.count({ where: { status: "published" } }),
    prisma.blog.count({ where: { status: "draft" } }),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.contactSubmission.count(),
  ]);

  const projectsByCategory = await prisma.project.groupBy({
    by: ["category"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });

  return NextResponse.json({
    totalProjects,
    completedProjects,
    ongoingProjects,
    totalImages,
    galleryImages,
    projectImages,
    totalBlogs,
    publishedBlogs,
    draftBlogs,
    newContacts,
    totalContacts,
    projectsByCategory: projectsByCategory.map((p) => ({
      category: p.category,
      count: p._count.id,
    })),
  });
}
