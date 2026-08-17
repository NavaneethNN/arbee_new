import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  FolderKanban, CheckCircle2, Clock, Images,
  FileText, MessageSquare, ArrowRight, TrendingUp,
} from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  const [
    totalProjects, completedProjects, ongoingProjects,
    totalImages, galleryImages,
    totalBlogs, publishedBlogs, draftBlogs,
    newContacts, totalContacts,
    recentProjects, recentContacts, recentBlogs,
    projectsByCategory,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "completed" } }),
    prisma.project.count({ where: { status: "ongoing" } }),
    prisma.projectImage.count(),
    prisma.projectImage.count({ where: { projectId: null } }),
    prisma.blog.count(),
    prisma.blog.count({ where: { status: "published" } }),
    prisma.blog.count({ where: { status: "draft" } }),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.contactSubmission.count(),
    prisma.project.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { images: { take: 1 } } }),
    prisma.contactSubmission.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.blog.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.project.groupBy({ by: ["category"], _count: { id: true }, orderBy: { _count: { id: "desc" } } }),
  ]);

  const statCards = [
    { label: "Total Projects", value: totalProjects, sub: `${completedProjects} completed · ${ongoingProjects} ongoing`, icon: FolderKanban, color: "bg-brand text-white", href: "/admin/projects" },
    { label: "Gallery Images", value: totalImages, sub: `${galleryImages} standalone · ${totalImages - galleryImages} project`, icon: Images, color: "bg-teal-500 text-white", href: "/admin/gallery" },
    { label: "Blog Posts", value: totalBlogs, sub: `${publishedBlogs} published · ${draftBlogs} draft`, icon: FileText, color: "bg-brand-green text-white", href: "/admin/blog" },
    { label: "New Enquiries", value: newContacts, sub: `${totalContacts} total submissions`, icon: MessageSquare, color: newContacts > 0 ? "bg-amber-500 text-white" : "bg-gray-600 text-white", href: "/admin/contacts" },
  ];

  function formatDate(d: Date) {
    return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(d));
  }

  const statusColors: Record<string, string> = {
    new: "bg-amber-100 text-amber-700",
    read: "bg-blue-100 text-blue-700",
    replied: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back — here&apos;s an overview of your site.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href} className="group">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-200 hover:border-brand/10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                    <Icon size={18} />
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-brand transition-colors mt-1" />
                </div>
                <div className="text-3xl font-black text-gray-900 leading-none mb-1">{s.value}</div>
                <div className="text-sm font-semibold text-gray-700">{s.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects by category */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Projects by Category</h2>
            <TrendingUp size={16} className="text-brand-green" />
          </div>
          <div className="space-y-3">
            {projectsByCategory.map((p) => {
              const pct = totalProjects > 0 ? Math.round((p._count.id / totalProjects) * 100) : 0;
              return (
                <div key={p.category}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 truncate">{p.category}</span>
                    <span className="text-gray-400 ml-2 flex-shrink-0">{p._count.id}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick stats */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 mb-5">Quick Stats</h2>
          {[
            { icon: CheckCircle2, label: "Completed Projects", value: completedProjects, color: "text-green-500" },
            { icon: Clock, label: "Ongoing Projects", value: ongoingProjects, color: "text-amber-500" },
            { icon: FileText, label: "Published Blogs", value: publishedBlogs, color: "text-brand" },
            { icon: Images, label: "Gallery Images", value: galleryImages, color: "text-teal-500" },
            { icon: MessageSquare, label: "Unread Enquiries", value: newContacts, color: "text-red-500" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3">
                <Icon size={16} className={item.color} />
                <span className="text-sm text-gray-600 flex-1">{item.label}</span>
                <span className="text-sm font-bold text-gray-900">{item.value}</span>
              </div>
            );
          })}
        </div>

        {/* Recent contacts */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Recent Enquiries</h2>
            <Link href="/admin/contacts" className="text-xs text-brand font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentContacts.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No enquiries yet</p>
            )}
            {recentContacts.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                  <p className="text-xs text-gray-400">{formatDate(c.createdAt)}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusColors[c.status]}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent projects */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Recent Projects</h2>
            <Link href="/admin/projects" className="text-xs text-brand font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                {p.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0].imagePath} alt={p.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0 bg-gray-100" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex-shrink-0 flex items-center justify-center">
                    <FolderKanban size={14} className="text-brand/40" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.category}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${p.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent blogs */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="text-xs text-brand font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentBlogs.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No blog posts yet</p>
            )}
            {recentBlogs.map((b) => (
              <div key={b.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={13} className="text-brand-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">{b.title}</p>
                  <p className="text-xs text-gray-400">{b.category} · {formatDate(b.createdAt)}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${b.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
