"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Images, FolderKanban, Upload, Link as LinkIcon } from "lucide-react";

type ProjectImage = {
  id: number;
  imagePath: string;
  displayOrder: number;
  projectId: number | null;
  project: { id: number; name: string } | null;
};

type Project = { id: number; name: string };

export default function AdminGalleryClient({
  initialImages,
  projects,
}: {
  initialImages: ProjectImage[];
  projects: Project[];
}) {
  const router = useRouter();
  const [images, setImages] = useState(initialImages);
  const [tab, setTab] = useState<"standalone" | "project">("standalone");
  const [deleting, setDeleting] = useState<number | null>(null);

  // Manual URL mode
  const [newPath, setNewPath] = useState("");
  const [adding, setAdding] = useState(false);

  // File upload mode
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [addMode, setAddMode] = useState<"url" | "upload">("upload");

  const standalone = images.filter((i) => i.projectId === null);
  const projectLinked = images.filter((i) => i.projectId !== null);

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this image from the gallery?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/images/${id}`, { method: "DELETE" });
      setImages((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    } finally { setDeleting(null); }
  };

  /** Save a CDN URL as a new project_image row (standalone) */
  const saveImageRow = async (cdnUrl: string) => {
    const res = await fetch("/api/admin/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imagePath: cdnUrl,
        projectId: null,
        displayOrder: images.length,
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setImages((prev) => [...prev, { ...created, project: null }]);
      router.refresh();
    }
  };

  /** Add by URL */
  const handleAddUrl = async () => {
    const url = newPath.trim();
    if (!url) return;
    setAdding(true);
    try {
      await saveImageRow(url);
      setNewPath("");
    } finally { setAdding(false); }
  };

  /** Upload file → R2 → save row */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploading(true);
    setUploadProgress(`Uploading 0 / ${files.length}…`);

    let done = 0;
    for (const file of files) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (res.ok) {
          const { url } = await res.json();
          await saveImageRow(url);
          done++;
          setUploadProgress(`Uploaded ${done} / ${files.length}…`);
        } else {
          const { error } = await res.json();
          alert(`Failed to upload ${file.name}: ${error}`);
        }
      } catch (err) {
        alert(`Error uploading ${file.name}`);
      }
    }

    setUploading(false);
    setUploadProgress("");
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const displayed = tab === "standalone" ? standalone : projectLinked;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Gallery</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {standalone.length} standalone · {projectLinked.length} project-linked · all served from Cloudflare R2
        </p>
      </div>

      {/* R2 badge */}
      <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
        Cloudflare R2 Object Storage — images served via CDN
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-100">
        <button
          onClick={() => setTab("standalone")}
          className={`px-4 py-2.5 text-sm font-semibold transition-all border-b-2 ${tab === "standalone" ? "text-brand border-brand" : "text-gray-500 border-transparent hover:text-gray-700"}`}
        >
          Standalone Gallery ({standalone.length})
        </button>
        <button
          onClick={() => setTab("project")}
          className={`px-4 py-2.5 text-sm font-semibold transition-all border-b-2 ${tab === "project" ? "text-brand border-brand" : "text-gray-500 border-transparent hover:text-gray-700"}`}
        >
          Project Images ({projectLinked.length})
        </button>
      </div>

      {/* Add image panel */}
      {tab === "standalone" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">Add Image to Gallery</h3>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setAddMode("upload")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${addMode === "upload" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
              >
                <Upload size={12} /> Upload File
              </button>
              <button
                onClick={() => setAddMode("url")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${addMode === "url" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
              >
                <LinkIcon size={12} /> Paste URL
              </button>
            </div>
          </div>

          {addMode === "upload" ? (
            <div>
              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all ${uploading ? "border-brand/40 bg-purple-50/50" : "border-gray-200 hover:border-brand/40 hover:bg-gray-50"}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
                {uploading ? (
                  <>
                    <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="text-sm font-semibold text-brand">{uploadProgress}</p>
                  </>
                ) : (
                  <>
                    <Upload size={28} className="text-gray-300 mb-3" />
                    <p className="text-sm font-semibold text-gray-700">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP, GIF — up to 10 MB each</p>
                    <p className="text-xs text-gray-400">Files upload directly to Cloudflare R2</p>
                  </>
                )}
              </label>
            </div>
          ) : (
            <div>
              <div className="flex gap-2">
                <input
                  value={newPath}
                  onChange={(e) => setNewPath(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddUrl()}
                  className="input-field flex-1"
                  placeholder="https://pub-xxx.r2.dev/images/img42.jpeg"
                />
                <button
                  onClick={handleAddUrl}
                  disabled={adding || !newPath.trim()}
                  className="btn-primary flex-shrink-0 px-4 py-2 disabled:opacity-60"
                >
                  <Plus size={15} /> Add
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Paste a full R2 CDN URL or any external image URL.</p>
            </div>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        {displayed.length === 0 ? (
          <div className="text-center py-16">
            <Images size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No images here yet</p>
            {tab === "standalone" && (
              <p className="text-xs text-gray-400 mt-1">Upload files or paste a URL above</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {displayed.map((img) => (
              <div key={img.id} className="group relative rounded-xl overflow-hidden aspect-square bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.imagePath}
                  alt="Gallery image"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <button
                    onClick={() => handleDelete(img.id)}
                    disabled={deleting === img.id}
                    className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                {img.project && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-[9px] font-semibold truncate flex items-center gap-1">
                      <FolderKanban size={9} /> {img.project.name}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {tab === "project" && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-sm text-blue-700 font-medium flex items-start gap-2">
            <FolderKanban size={16} className="mt-0.5 flex-shrink-0" />
            Project-linked images are managed from the Projects tab. To add or remove, edit the project directly.
          </p>
        </div>
      )}
    </div>
  );
}
