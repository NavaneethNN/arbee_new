export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import AdminContactsClient from "@/components/admin/AdminContactsClient";

export const metadata: Metadata = { title: "Contacts" };

export default async function AdminContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return <AdminContactsClient initialContacts={contacts} />;
}
