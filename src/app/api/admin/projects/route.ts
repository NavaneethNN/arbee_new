export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { displayOrder: "asc" } } },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { name, description, highlights, projectDetails, completion, category, status } = body;

  if (!name || !description || !category || !status) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      name: name.trim(),
      description: description.trim(),
      highlights: (highlights ?? "").trim(),
      projectDetails: (projectDetails ?? "").trim(),
      completion: (completion ?? "").trim(),
      category: category.trim(),
      status,
    },
  });
  return NextResponse.json(project, { status: 201 });
}
