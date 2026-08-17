import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  try {
    const projects = await prisma.project.findMany({
      where: status === "completed" || status === "ongoing"
        ? { status: status as "completed" | "ongoing" }
        : undefined,
      include: {
        images: {
          orderBy: { displayOrder: "asc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
