import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const body = await req.json();
  const updated = await prisma.blog.update({
    where: { id },
    data: {
      ...(body.title && { title: body.title.trim() }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt?.trim() ?? null }),
      ...(body.content !== undefined && { content: body.content?.trim() ?? null }),
      ...(body.featuredImage !== undefined && { featuredImage: body.featuredImage?.trim() ?? null }),
      ...(body.category && { category: body.category.trim() }),
      ...(body.author && { author: body.author.trim() }),
      ...(body.status && { status: body.status }),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  await prisma.blog.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
