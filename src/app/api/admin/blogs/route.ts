import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { title, excerpt, content, featuredImage, category, author, status } = body;

  if (!title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  // Generate unique slug
  let baseSlug = slugify(title);
  let slug = baseSlug;
  let attempt = 0;
  while (await prisma.blog.findUnique({ where: { slug } })) {
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  const blog = await prisma.blog.create({
    data: {
      title: title.trim(),
      slug,
      excerpt: excerpt?.trim() ?? null,
      content: content?.trim() ?? null,
      featuredImage: featuredImage?.trim() ?? null,
      category: category?.trim() ?? "General",
      author: author?.trim() ?? "Arbee Structures",
      status: status ?? "draft",
    },
  });
  return NextResponse.json(blog, { status: 201 });
}
