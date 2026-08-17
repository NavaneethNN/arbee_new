import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, COOKIE_NAME, EXPIRES_IN } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const validUser = process.env.ADMIN_USERNAME ?? "admin";
    const validPass = process.env.ADMIN_PASSWORD ?? "arbee@admin2026";

    if (username !== validUser || password !== validPass) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signAdminToken();

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: EXPIRES_IN,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
