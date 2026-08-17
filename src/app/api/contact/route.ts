import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, message } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!mobile || !/^(\+\d{1,3})?\d{10}$/.test(mobile.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Valid mobile number is required" }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        message: message?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 });
  }
}
