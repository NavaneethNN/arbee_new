import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  const images = await prisma.projectImage.findMany({
    where: projectId === "null"
      ? { projectId: null }
      : projectId
      ? { projectId: parseInt(projectId, 10) }
      : undefined,
    orderBy: { displayOrder: "asc" },
    include: { project: { select: { id: true, name: true } } },
  });
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { imagePath, projectId, displayOrder } = await req.json();
  if (!imagePath?.trim()) return NextResponse.json({ error: "imagePath required" }, { status: 400 });

  const image = await prisma.projectImage.create({
    data: {
      imagePath: imagePath.trim(),
      projectId: projectId ?? null,
      displayOrder: displayOrder ?? 0,
    },
  });
  return NextResponse.json(image, { status: 201 });
}
