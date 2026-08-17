import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: { default: "Admin Panel", template: "%s | Arbee Admin" },
  robots: { index: false, follow: false },
};

/**
 * Admin layout — wraps all /admin/* pages.
 * The root layout still injects <Navbar> and <Footer> into <body>,
 * so we use a full-viewport overlay approach: AdminShell renders as
 * `fixed inset-0 z-[9999]` to sit on top of everything.
 * The login page renders bare (no shell) using its own full-screen styles.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await isAdminAuthenticated();

  if (!auth) {
    // Login page — just pass through. It has its own full-screen gradient bg.
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
