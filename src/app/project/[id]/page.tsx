import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Calendar, Tag, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  params: { id: string };
}

const R2 = "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev";
const BASE = "https://arbeeconstructions.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.id, 10);
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
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { displayOrder: "asc" } } },
  });

  if (!project) notFound();

  const highlights = project.highlights
    .split("\n")
    .map((h) => h.trim())
    .filter(Boolean);

  const coverImage = project.images[0]?.imagePath;

  // Related projects
  const related = await prisma.project.findMany({
    where: { category: project.category, id: { not: project.id } },
    take: 3,
    include: { images: { take: 1, orderBy: { displayOrder: "asc" } } },
  });

  return (
    <div className="pt-16" style={{ paddingTop: "72px" }}>
      {/* Hero */}
      <section className="page-hero-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: coverImage ? `url('${coverImage}')` : "url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/completed_cover.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/88 via-gray-950/40 to-transparent" />
        <div className="relative z-10 container-section w-full py-16 flex flex-col justify-end h-full">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-400 text-yellow-900"}`}>
              {project.status === "completed" ? "✓ Completed" : "● Ongoing"}
            </span>
            <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
              {project.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight max-w-3xl">
            {project.name}
          </h1>
          {project.completion && project.completion !== "ongoing" && (
            <p className="flex items-center gap-2 text-white/65 text-sm mt-2">
              <Calendar size={13} />
              {project.completion}
            </p>
          )}
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-section py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects/completed" className="hover:text-brand transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate max-w-xs">{project.name}</span>
          </div>
          <Link href="/projects/completed" className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div data-reveal="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div data-reveal="fade-up" data-delay="100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-5">Project Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4">
                        <CheckCircle2 size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Details */}
              {project.projectDetails && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Details</h2>
                  <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
                    {project.projectDetails.split("\n").filter(Boolean).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6" data-reveal="fade-left" data-delay="150">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Project Info</h3>
                <div className="space-y-4">
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
                        <Icon size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{item.label}</div>
                          <div className="text-sm font-medium text-gray-800">{item.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-brand rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Like What You See?</h3>
                <p className="text-white/75 text-sm mb-5 leading-relaxed">
                  Get in touch today and let us build your dream project.
                </p>
                <Link
                  href="/#contact"
                  className="block w-full text-center bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-brand-green-dark transition-colors"
                >
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>

          {/* Image Gallery — masonry */}
          {project.images.length > 0 && (
            <div className="mt-14" data-reveal="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
              <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {project.images.map((img, i) => (
                  <div
                    key={img.id}
                    className="group relative break-inside-avoid mb-4 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.imagePath}
                      alt={`${project.name} — image ${i + 1}`}
                      className="w-full h-auto object-cover block"
                      loading={i < 4 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/15 transition-colors duration-300 rounded-xl" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {related.map((p) => (
                <Link key={p.id} href={`/project/${p.id}`} className="group block">
                  <div className="card rounded-2xl overflow-hidden">
                    <div className="relative h-44 bg-gray-100">
                      {p.images[0] ? (
                        <Image src={p.images[0].imagePath} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand/10 to-brand/5" />
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold text-brand-green">{p.category}</span>
                      <h3 className="font-bold text-gray-900 mt-1 group-hover:text-brand transition-colors">{p.name}</h3>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{p.description}</p>
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
