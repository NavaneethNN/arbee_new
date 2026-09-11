export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Calendar, Tag, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const R2 = "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev";
const BASE = "https://arbeeconstructions.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  if (isNaN(id)) return { title: "Project Not Found" };
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { take: 1, orderBy: { displayOrder: "asc" } } },
  });
  if (!project) return { title: "Project Not Found" };

  const ogImage = project.images[0]?.imagePath ?? `${R2}/images/completed_cover.jpg`;
  return {
    title: `${project.name} — ${project.category} Project`,
    description: project.description,
    alternates: { canonical: `${BASE}/project/${id}` },
    openGraph: {
      title: `${project.name} | Arbee Constructions`,
      description: project.description,
      url: `${BASE}/project/${id}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Arbee Constructions`,
      description: project.description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  if (isNaN(id)) notFound();

  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { displayOrder: "asc" } } },
  });
  if (!project) notFound();

  const highlights = project.highlights.split("\n").map((h) => h.trim()).filter(Boolean);
  const coverImage = project.images[0]?.imagePath;

  const related = await prisma.project.findMany({
    where: { category: project.category, id: { not: project.id } },
    take: 3,
    include: { images: { take: 1, orderBy: { displayOrder: "asc" } } },
  });

  return (
    <div style={{ paddingTop: "64px" }}>

      {/* Hero */}
      <section className="page-hero-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: coverImage ? `url('${coverImage}')` : `url('${R2}/images/completed_cover.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/88 via-gray-950/40 to-transparent" />
        <div className="relative z-10 container-section w-full py-12 flex flex-col justify-end h-full">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-400 text-yellow-900"}`}>
              {project.status === "completed" ? "✓ Completed" : "● Ongoing"}
            </span>
            <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
              {project.category}
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight max-w-3xl">
            {project.name}
          </h1>
          {project.completion && project.completion !== "ongoing" && (
            <p className="flex items-center gap-1.5 text-white/65 text-sm mt-2">
              <Calendar size={12} />
              {project.completion}
            </p>
          )}
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-section py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap min-w-0">
            <Link href="/" className="hover:text-brand transition-colors flex-shrink-0">Home</Link>
            <span className="flex-shrink-0">/</span>
            <Link href="/projects/completed" className="hover:text-brand transition-colors flex-shrink-0">Projects</Link>
            <span className="flex-shrink-0">/</span>
            <span className="text-gray-800 font-medium truncate">{project.name}</span>
          </div>
          <Link href="/projects/completed" className="flex items-center gap-1 text-sm text-brand font-semibold hover:underline flex-shrink-0">
            <ArrowLeft size={13} /> Back
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-section">
          {/* On mobile: sidebar goes below content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div data-reveal="fade-up">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Project Overview</h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{project.description}</p>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div data-reveal="fade-up" data-delay="100">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Project Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3.5">
                        <CheckCircle2 size={15} className="text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Details */}
              {project.projectDetails && (
                <div data-reveal="fade-up" data-delay="150">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Project Details</h2>
                  <div className="space-y-3">
                    {project.projectDetails.split("\n").filter(Boolean).map((para, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed text-sm sm:text-base">{para}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-5" data-reveal="fade-up" data-delay="150">
              {/* Info */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-widest">Project Info</h3>
                <div className="space-y-3.5">
                  {[
                    { icon: Tag, label: "Category", value: project.category },
                    { icon: Calendar, label: "Status", value: project.status === "completed" ? "Completed" : "Ongoing" },
                    ...(project.completion && project.completion !== "ongoing"
                      ? [{ icon: Calendar, label: "Completion", value: project.completion }]
                      : []),
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-3">
                        <Icon size={15} className="text-brand-green mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{item.label}</div>
                          <div className="text-sm font-medium text-gray-800">{item.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-brand rounded-2xl p-5 text-white">
                <h3 className="font-bold text-base mb-2">Like What You See?</h3>
                <p className="text-white/75 text-sm mb-4 leading-relaxed">
                  Get in touch today and let us build your dream project.
                </p>
                <Link
                  href="/#contact"
                  className="block w-full text-center bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-brand-green-dark transition-colors text-sm"
                >
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {project.images.length > 0 && (
            <div className="mt-12" data-reveal="fade-up">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Project Gallery</h2>
              <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3">
                {project.images.map((img, i) => (
                  <div
                    key={img.id}
                    className="group relative break-inside-avoid mb-3 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.imagePath}
                      alt={`${project.name} — image ${i + 1}`}
                      className="w-full h-auto object-cover block"
                      loading={i < 4 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/15 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-section">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/project/${p.id}`} className="group block">
                  <div className="card rounded-2xl overflow-hidden">
                    <div className="relative h-40 sm:h-44 bg-gray-100">
                      {p.images[0] ? (
                        <Image src={p.images[0].imagePath} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand/10 to-brand/5" />
                      )}
                    </div>
                    <div className="p-4 sm:p-5">
                      <span className="text-xs font-semibold text-brand-green">{p.category}</span>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base mt-1 group-hover:text-brand transition-colors leading-snug">{p.name}</h3>
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{p.description}</p>
                      <div className="flex items-center gap-1 text-brand font-semibold text-sm mt-3">
                        View Details <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
