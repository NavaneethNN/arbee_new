import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";

const R2 = "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev";
const BASE = "https://arbeeconstructions.com";

export const metadata: Metadata = {
  title: "Completed Projects — Construction Portfolio",
  description:
    "Explore Arbee Constructions' portfolio of successfully delivered projects — residential homes, commercial buildings, industrial facilities, and interior designs in Coimbatore.",
  alternates: { canonical: `${BASE}/projects/completed` },
  openGraph: {
    title: "Completed Projects | Arbee Constructions",
    description:
      "Our portfolio of successfully delivered construction projects — residential, commercial, industrial, and interior design across Coimbatore.",
    url: `${BASE}/projects/completed`,
    images: [{ url: `${R2}/images/completed_cover.jpg`, width: 1200, height: 630, alt: "Arbee Constructions Completed Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Completed Projects | Arbee Constructions",
    description: "Our portfolio of successfully delivered construction projects in Coimbatore.",
    images: [`${R2}/images/completed_cover.jpg`],
  },
};

export default async function CompletedProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { status: "completed" },
    include: { images: { orderBy: { displayOrder: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <div className="pt-16" style={{ paddingTop: "72px" }}>
      {/* Hero */}
      <section className="page-hero-lg">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/completed_cover.jpg')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-section w-full py-16">
          <span className="section-label" style={{ color: "#1DA841" }}>Our Portfolio</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-2xl leading-tight mt-1">
            Completed Projects
          </h1>
          <p className="text-white/75 mt-3 text-sm md:text-base max-w-xl">
            Showcasing our portfolio of successfully delivered construction projects.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-section py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Completed Projects</span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-section py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">
            Showing <span className="font-bold text-gray-900">{projects.length}</span> completed projects
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span key={cat} className="badge bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding bg-white">
        <div className="container-section">
          {projects.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No completed projects found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {projects.map((p, i) => (
                <div key={p.id} data-reveal="fade-up" data-delay={String((i % 3) * 100)}>
                  <ProjectCard
                    id={p.id}
                    name={p.name}
                    description={p.description}
                    category={p.category}
                    status={p.status}
                    completion={p.completion}
                    coverImage={p.images[0]?.imagePath}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-14">
        <div className="container-section text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Want to Discuss Your Project?</h2>
          <p className="text-purple-200 mb-7 max-w-lg mx-auto text-sm md:text-base">
            Our team is ready to bring your construction vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-green">Get Free Consultation</Link>
            <Link href="/projects/ongoing" className="btn-ghost-white">See Ongoing Projects</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
