"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

const infoCards = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@arbeeconstructions.com",
    href: "mailto:info@arbeeconstructions.com",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98422 38001",
    href: "tel:+919842238001",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Coimbatore, Tamil Nadu",
    href: "https://maps.google.com/?q=11.0168,76.9558",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.mobile.trim() || !/^(\+\d{1,3})?\d{10}$/.test(form.mobile.replace(/\s/g, ""))) e.mobile = "Valid 10-digit mobile number required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", mobile: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-12" data-reveal="fade-up">
          <span className="section-label">Contact Us</span>
          <h2 className="section-heading">
            Let&apos;s Build Something{" "}
            <span className="text-brand">Amazing Together</span>
          </h2>
          <p className="section-sub mt-3 max-w-xl mx-auto">
            Ready to start your project? Contact us today for a free
            consultation on your construction needs.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {infoCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-brand/20 hover:shadow-md transition-all card-hover"
                data-reveal="fade-up"
                data-delay={String(i * 100 + 100)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{c.label}</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{c.value}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Form card */}
        <div className="max-w-2xl mx-auto" data-reveal="fade-up" data-delay="200">
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>

            {status === "success" && (
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 mb-6">
                <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">
                  Request submitted successfully! We&apos;ll contact you shortly.
                </p>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6">
                <AlertCircle size={17} className="mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">Submission failed. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={`input-field ${errors.name ? "border-red-400 focus:ring-red-200" : ""}`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className={`input-field ${errors.email ? "border-red-400 focus:ring-red-200" : ""}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Phone / Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`input-field ${errors.mobile ? "border-red-400 focus:ring-red-200" : ""}`}
                />
                {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Briefly describe your project, timeline or questions..."
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Get in Touch
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
