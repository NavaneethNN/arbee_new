export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: params.slug },
    });

    if (!blog || blog.status !== "published") {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Increment views
    await prisma.blog.update({
      where: { id: blog.id },
      data: { views: { increment: 1 } },
    });

    // Related posts
    const related = await prisma.blog.findMany({
      where: {
        status: "published",
        category: blog.category,
        id: { not: blog.id },
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ...blog, related });
  } catch {
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}
