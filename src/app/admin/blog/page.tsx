export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import AdminBlogClient from "@/components/admin/AdminBlogClient";

export const metadata: Metadata = { title: "Blog" };

export default async function AdminBlogPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  return <AdminBlogClient initialBlogs={blogs} />;
}
