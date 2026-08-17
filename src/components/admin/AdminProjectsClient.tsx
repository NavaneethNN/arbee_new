"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus, Pencil, Trash2, Eye, Search,
  FolderKanban, CheckCircle2, Clock,
} from "lucide-react";

type ProjectImage = { id: number; imagePath: string; displayOrder: number; projectId: number | null };
type Project = {
  id: number;
  name: string;
  description: string;
  highlights: string;
  projectDetails: string;
  completion: string;
  category: string;
  status: "completed" | "ongoing";
  createdAt: Date;
  images: ProjectImage[];
};

const CATEGORIES = ["Residential", "Commercial", "Industrial", "Assembly Building", "Hotel", "Interior Designs", "Private Dwelling", "Institutional Building"];

export default function AdminProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "ongoing">("all");
  const [deleting, setDeleting] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project? This will also delete all its images.")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } finally {
      setDeleting(null);
    }
  };

  const handleFormClose = () => { setShowForm(false); setEditProject(null); };

  const handleSaved = (saved: Project) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === saved.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = saved;
        return next;
      }
      return [saved, ...prev];
    });
    handleFormClose();
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">{projects.length} projects total</p>
        </div>
        <button
          onClick={() => { setEditProject(null); setShowForm(true); }}
          className="btn-primary self-start"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "completed", "ongoing"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${filterStatus === s ? "bg-brand text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-brand/30"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <FolderKanban size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No projects found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Completion</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.images[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.images[0].imagePath} alt={p.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0 bg-gray-100" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-brand/8 flex-shrink-0 flex items-center justify-center">
                            <FolderKanban size={14} className="text-brand/40" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate max-w-[200px]">{p.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[200px]">{p.description.slice(0, 60)}…</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{p.category}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${p.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                        {p.status === "completed" ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 hidden lg:table-cell">{p.completion || "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/project/${p.id}`} target="_blank" className="p-2 rounded-lg text-gray-400 hover:text-brand hover:bg-purple-50 transition-colors" title="View on site">
                          <Eye size={15} />
                        </Link>
                        <button
                          onClick={() => { setEditProject(p); setShowForm(true); }}
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleting === p.id}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
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

      {/* Form Modal */}
      {showForm && (
        <ProjectFormModal
          project={editProject}
          onClose={handleFormClose}
          onSaved={handleSaved}
          categories={CATEGORIES}
        />
      )}
    </div>
  );
}

// ── Project Form Modal ────────────────────────────────────────────────────────
function ProjectFormModal({
  project,
  onClose,
  onSaved,
  categories,
}: {
  project: Project | null;
  onClose: () => void;
  onSaved: (p: Project) => void;
  categories: string[];
}) {
  const isEdit = !!project;
  const [form, setForm] = useState({
    name: project?.name ?? "",
    description: project?.description ?? "",
    highlights: project?.highlights ?? "",
    projectDetails: project?.projectDetails ?? "",
    completion: project?.completion ?? "",
    category: project?.category ?? categories[0],
    status: (project?.status ?? "completed") as "completed" | "ongoing",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Image management state
  const [images, setImages] = useState<{ id?: number; imagePath: string; isNew?: boolean }[]>(
    project?.images.map((i) => ({ id: i.id, imagePath: i.imagePath })) ?? []
  );
  const [newImagePath, setNewImagePath] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim() || !form.category) {
      setError("Name, description, and category are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const url = isEdit ? `/api/admin/projects/${project!.id}` : "/api/admin/projects";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Save failed");
      const saved: Project = await res.json();

      // Handle new images
      for (const img of images) {
        if (img.isNew) {
          await fetch("/api/admin/images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagePath: img.imagePath, projectId: saved.id }),
          });
        }
      }
      onSaved({ ...saved, images: images.filter((i) => !i.isNew).map((i, idx) => ({ id: i.id!, imagePath: i.imagePath, displayOrder: idx, projectId: saved.id })) });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = async (idx: number) => {
    const img = images[idx];
    if (img.id && !img.isNew) {
      if (!confirm("Remove this image?")) return;
      await fetch(`/api/admin/images/${img.id}`, { method: "DELETE" });
    }
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const addImage = () => {
    if (!newImagePath.trim()) return;
    setImages((prev) => [...prev, { imagePath: newImagePath.trim(), isNew: true }]);
    setNewImagePath("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-black text-gray-900">{isEdit ? "Edit Project" : "Add New Project"}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-2.5">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="admin-label">Project Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="e.g. G+2 Commercial Complex" />
            </div>
            <div>
              <label className="admin-label">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-label">Status *</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "completed" | "ongoing" })} className="input-field">
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">Completion</label>
              <input value={form.completion} onChange={(e) => setForm({ ...form, completion: e.target.value })} className="input-field" placeholder="e.g. Completed 2022" />
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">Short Description *</label>
              <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" placeholder="Brief project description" />
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">Highlights <span className="text-gray-400 font-normal">(one per line)</span></label>
              <textarea rows={4} value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} className="input-field resize-none font-mono text-xs" placeholder={"3,000 sq. ft. residence\nVastu-compliant design\nModern aesthetics"} />
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">Project Details</label>
              <textarea rows={5} value={form.projectDetails} onChange={(e) => setForm({ ...form, projectDetails: e.target.value })} className="input-field resize-none" placeholder="Full project description..." />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="admin-label">Images</label>
            <div className="space-y-2 mb-3">
              {images.map((img, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.imagePath} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-gray-200" />
                  <span className="text-xs text-gray-600 flex-1 truncate">{img.imagePath}</span>
                  {img.isNew && <span className="text-[10px] bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded-full">New</span>}
                  <button type="button" onClick={() => removeImage(i)} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Upload to R2 */}
            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-3 mb-2 cursor-pointer hover:border-brand/40 hover:bg-gray-50 transition-all text-xs text-gray-500 font-semibold">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files ?? []);
                  for (const file of files) {
                    const fd = new FormData();
                    fd.append("file", file);
                    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                    if (res.ok) {
                      const { url } = await res.json();
                      setImages((prev) => [...prev, { imagePath: url, isNew: true }]);
                    } else {
                      alert(`Upload failed: ${(await res.json()).error}`);
                    }
                  }
                  e.target.value = "";
                }}
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Upload photo to Cloudflare R2
            </label>

            {/* Or paste URL */}
            <div className="flex gap-2">
              <input
                value={newImagePath}
                onChange={(e) => setNewImagePath(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                className="input-field"
                placeholder="https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/img101.jpg"
              />
              <button type="button" onClick={addImage} className="btn-outline flex-shrink-0 px-4 py-2">
                <Plus size={15} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Upload a photo directly to R2, or paste a full CDN URL.</p>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <button type="button" onClick={onClose} className="btn-outline px-5 py-2.5 text-sm">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="btn-primary px-5 py-2.5 text-sm disabled:opacity-60">
            {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
