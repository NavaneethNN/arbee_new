"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  Plus, Pencil, Trash2, Eye, Search,
  FileText, Globe, FileEdit,
} from "lucide-react";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featuredImage: string | null;
  category: string;
  author: string;
  status: "draft" | "published";
  views: number;
  createdAt: Date;
  updatedAt: Date;
};

const CATEGORIES = ["General", "Company News", "Construction Tips", "Industry News", "Project Updates", "Sustainability"];

export default function AdminBlogClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [deleting, setDeleting] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);

  const filtered = blogs.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this blog post permanently?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      router.refresh();
    } finally { setDeleting(null); }
  };

  const toggleStatus = async (blog: Blog) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    const res = await fetch(`/api/admin/blogs/${blog.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setBlogs((prev) => prev.map((b) => b.id === blog.id ? { ...b, status: newStatus } : b));
    }
  };

  const handleSaved = (saved: Blog) => {
    setBlogs((prev) => {
      const idx = prev.findIndex((b) => b.id === saved.id);
      if (idx >= 0) { const n = [...prev]; n[idx] = saved; return n; }
      return [saved, ...prev];
    });
    setShowForm(false); setEditBlog(null);
    router.refresh();
  };

  function formatDate(d: Date) {
    return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(d));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-0.5">{blogs.length} posts total</p>
        </div>
        <button onClick={() => { setEditBlog(null); setShowForm(true); }} className="btn-primary self-start">
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${filterStatus === s ? "bg-brand text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-brand/30"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No posts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Post</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Views</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex-shrink-0 flex items-center justify-center">
                          {b.status === "published" ? <Globe size={14} className="text-brand-green" /> : <FileEdit size={14} className="text-gray-400" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm line-clamp-1 max-w-[220px]">{b.title}</p>
                          <p className="text-xs text-gray-400">by {b.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs font-semibold bg-purple-100 text-brand px-2.5 py-1 rounded-full">{b.category}</span>
                    </td>
                    <td className="px-4 py-4">
                      <button onClick={() => toggleStatus(b)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all hover:opacity-80 ${b.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {b.status}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 hidden lg:table-cell">{b.views}</td>
                    <td className="px-4 py-4 text-sm text-gray-400 hidden lg:table-cell">{formatDate(b.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {b.status === "published" && (
                          <Link href={`/blog/${b.slug}`} target="_blank" className="p-2 rounded-lg text-gray-400 hover:text-brand hover:bg-purple-50 transition-colors" title="View post">
                            <Eye size={15} />
                          </Link>
                        )}
                        <button onClick={() => { setEditBlog(b); setShowForm(true); }}
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDelete(b.id)} disabled={deleting === b.id}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <BlogFormModal blog={editBlog} onClose={() => { setShowForm(false); setEditBlog(null); }} onSaved={handleSaved} />
      )}
    </div>
  );
}

// ── Blog Form Modal ───────────────────────────────────────────────────────────
function BlogFormModal({
  blog,
  onClose,
  onSaved,
}: {
  blog: Blog | null;
  onClose: () => void;
  onSaved: (b: Blog) => void;
}) {
  const isEdit = !!blog;
  const [form, setForm] = useState({
    title: blog?.title ?? "",
    excerpt: blog?.excerpt ?? "",
    content: blog?.content ?? "",
    featuredImage: blog?.featuredImage ?? "",
    category: blog?.category ?? "General",
    author: blog?.author ?? "Arbee Structures",
    status: blog?.status ?? "draft",
  });
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title is required."); return; }
    setLoading(true); setError("");
    try {
      const url = isEdit ? `/api/admin/blogs/${blog!.id}` : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          excerpt: form.excerpt || null,
          content: form.content || null,
          featuredImage: form.featuredImage || null,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Save failed");
      onSaved(await res.json());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-black text-gray-900">{isEdit ? "Edit Post" : "New Blog Post"}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Main editor — 2/3 width */}
            <div className="lg:col-span-2 px-6 py-5 space-y-4 border-r border-gray-100">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-2.5">{error}</div>}

              <div>
                <label className="admin-label">Title *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field text-lg font-semibold" placeholder="Post title..." />
              </div>

              <div>
                <label className="admin-label">Excerpt / Summary</label>
                <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="input-field resize-none" placeholder="Brief summary shown on the blog list page..." />
              </div>

              {/* Content with write/preview tabs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="admin-label mb-0">Content (Markdown)</label>
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                    <button type="button" onClick={() => setTab("write")}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${tab === "write" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>Write</button>
                    <button type="button" onClick={() => setTab("preview")}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${tab === "preview" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>Preview</button>
                  </div>
                </div>
                {tab === "write" ? (
                  <textarea rows={16} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="input-field resize-none font-mono text-sm leading-relaxed" placeholder="# Your blog title&#10;&#10;Write your content in Markdown here..." />
                ) : (
                  <div className="min-h-[300px] p-4 bg-gray-50 border border-gray-200 rounded-xl prose-arbee overflow-auto">
                    {form.content ? <ReactMarkdown>{form.content}</ReactMarkdown> : <p className="text-gray-400 italic text-sm">Nothing to preview yet.</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar — 1/3 width */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="admin-label">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })} className="input-field">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="admin-label">Author</label>
                <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="admin-label">Featured Image</label>
                <input
                  value={form.featuredImage}
                  onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                  className="input-field"
                  placeholder="https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/img42.jpeg"
                />

                {/* Upload directly to R2 */}
                <label className="flex items-center gap-2 mt-2 border border-dashed border-gray-200 rounded-xl px-3 py-2 cursor-pointer hover:border-brand/40 hover:bg-gray-50 transition-all text-xs text-gray-500 font-semibold">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const fd = new FormData();
                      fd.append("file", file);
                      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                      if (res.ok) {
                        const { url } = await res.json();
                        setForm((prev) => ({ ...prev, featuredImage: url }));
                      } else {
                        const err = await res.json().catch(() => ({}));
                        alert("Upload failed: " + (err.error ?? "unknown error"));
                      }
                      e.target.value = "";
                    }}
                  />
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Upload to Cloudflare R2
                </label>

                {/* Preview — works for both full CDN URLs and legacy filenames */}
                {form.featuredImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={
                      form.featuredImage.startsWith("http")
                        ? form.featuredImage
                        : `https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/${form.featuredImage}`
                    }
                    alt="preview"
                    className="mt-2 w-full h-28 object-cover rounded-xl border border-gray-100"
                  />
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <button type="button" onClick={onClose} className="btn-outline px-5 py-2.5 text-sm">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="btn-primary px-5 py-2.5 text-sm disabled:opacity-60">
            {loading ? "Saving..." : isEdit ? "Save Changes" : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
