export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const images = await prisma.projectImage.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        project: {
          select: { id: true, name: true, category: true },
        },
      },
    });
    return NextResponse.json(images);
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
