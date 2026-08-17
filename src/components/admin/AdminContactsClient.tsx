"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Trash2, Search, Mail, Phone, Clock } from "lucide-react";

type Contact = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  message: string | null;
  status: "new" | "read" | "replied";
  createdAt: Date;
};

const STATUS_SEQUENCE: Record<string, Contact["status"]> = {
  new: "read",
  read: "replied",
  replied: "new",
};

const statusStyle: Record<string, string> = {
  new: "bg-amber-100 text-amber-700 border-amber-200",
  read: "bg-blue-100 text-blue-700 border-blue-200",
  replied: "bg-green-100 text-green-700 border-green-200",
};

export default function AdminContactsClient({ initialContacts }: { initialContacts: Contact[] }) {
  const router = useRouter();
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "read" | "replied">("all");
  const [deleting, setDeleting] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = contacts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search);
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const newCount = contacts.filter((c) => c.status === "new").length;

  const handleStatusChange = async (contact: Contact) => {
    const next = STATUS_SEQUENCE[contact.status];
    const res = await fetch(`/api/admin/contacts/${contact.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) {
      setContacts((prev) => prev.map((c) => c.id === contact.id ? { ...c, status: next } : c));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this contact submission?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
      setContacts((prev) => prev.filter((c) => c.id !== id));
      router.refresh();
    } finally { setDeleting(null); }
  };

  function formatDate(d: Date) {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }).format(new Date(d));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Contact Submissions</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {contacts.length} total · <span className={newCount > 0 ? "text-amber-600 font-semibold" : ""}>{newCount} new</span>
          </p>
        </div>
      </div>

      {/* Stats mini-bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "New", count: contacts.filter((c) => c.status === "new").length, color: "border-amber-200 bg-amber-50 text-amber-700" },
          { label: "Read", count: contacts.filter((c) => c.status === "read").length, color: "border-blue-200 bg-blue-50 text-blue-700" },
          { label: "Replied", count: contacts.filter((c) => c.status === "replied").length, color: "border-green-200 bg-green-50 text-green-700" },
        ].map((s) => (
          <div key={s.label} className={`border rounded-2xl p-4 text-center ${s.color}`}>
            <div className="text-2xl font-black">{s.count}</div>
            <div className="text-xs font-bold uppercase tracking-wider mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by name, email or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="flex gap-2">
          {(["all", "new", "read", "replied"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wide ${filterStatus === s ? "bg-brand text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-brand/30"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Contact cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <MessageSquare size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No submissions found</p>
          </div>
        )}
        {filtered.map((c) => (
          <div key={c.id}
            className={`bg-white rounded-2xl border overflow-hidden transition-all ${c.status === "new" ? "border-amber-200 shadow-sm shadow-amber-50" : "border-gray-100"}`}>
            {/* Card header */}
            <div className="flex items-start gap-4 p-5">
              <div className="w-11 h-11 rounded-full bg-brand flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">{c.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyle[c.status]}`}>
                    {c.status}
                  </span>
                  {c.status === "new" && (
                    <span className="text-[10px] bg-amber-400 text-amber-900 font-black px-2 py-0.5 rounded-full animate-pulse">NEW</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <a href={`mailto:${c.email}`} className="flex items-center gap-1 hover:text-brand transition-colors">
                    <Mail size={11} /> {c.email}
                  </a>
                  <a href={`tel:${c.mobile}`} className="flex items-center gap-1 hover:text-brand transition-colors">
                    <Phone size={11} /> {c.mobile}
                  </a>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Clock size={11} /> {formatDate(c.createdAt)}
                  </span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {c.message && (
                  <button
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    {expanded === c.id ? "Hide" : "View"}
                  </button>
                )}
                <button onClick={() => handleStatusChange(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${statusStyle[c.status]} hover:opacity-80`}
                  title={`Click to mark as ${STATUS_SEQUENCE[c.status]}`}>
                  → {STATUS_SEQUENCE[c.status]}
                </button>
                <button onClick={() => handleDelete(c.id)} disabled={deleting === c.id}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            {/* Expanded message */}
            {expanded === c.id && c.message && (
              <div className="px-5 pb-5 border-t border-gray-50 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4 border border-gray-100">
                  {c.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
