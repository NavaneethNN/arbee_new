import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "published",
        ...(category && category !== "All" ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
      ...(limit ? { take: limit } : {}),
    });
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
