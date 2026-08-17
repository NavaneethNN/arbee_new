import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";
import { HardHat } from "lucide-react";

const R2 = "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev";
const BASE = "https://arbeeconstructions.com";

export const metadata: Metadata = {
  title: "Ongoing Projects — Active Construction Sites",
  description:
    "See Arbee Constructions' current construction projects actively in progress across Coimbatore — residential, commercial, and industrial builds.",
  alternates: { canonical: `${BASE}/projects/ongoing` },
  openGraph: {
    title: "Ongoing Projects | Arbee Constructions",
    description:
      "Currently active construction projects by Arbee Constructions — precision-built with 25+ years of engineering expertise.",
    url: `${BASE}/projects/ongoing`,
    images: [{ url: `${R2}/images/home.jpeg`, width: 1200, height: 630, alt: "Arbee Constructions Ongoing Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ongoing Projects | Arbee Constructions",
    description: "Currently active construction projects by Arbee Constructions in Coimbatore.",
    images: [`${R2}/images/home.jpeg`],
  },
};

export default async function OngoingProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { status: "ongoing" },
    include: { images: { orderBy: { displayOrder: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-16" style={{ paddingTop: "72px" }}>
      {/* Hero */}
      <section className="page-hero-lg">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/home.jpeg')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-section w-full py-16">
          <span className="section-label" style={{ color: "#1DA841" }}>In Progress</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-2xl leading-tight mt-1">
            Ongoing Projects
          </h1>
          <p className="text-white/75 mt-3 text-sm md:text-base max-w-xl">
            Our current construction projects actively in progress.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-section py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Ongoing Projects</span>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-section">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <HardHat size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Ongoing Projects</h3>
              <p className="text-gray-400 mb-6">All projects are currently completed. Check back soon!</p>
              <Link href="/projects/completed" className="btn-primary">View Completed Projects</Link>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <p className="text-gray-600 text-sm">
                  Currently working on <span className="font-bold text-gray-900">{projects.length}</span> active project{projects.length > 1 ? "s" : ""}
                </p>
              </div>
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
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-16">
        <div className="container-section text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Want to Start a New Project?
          </h2>
          <p className="text-purple-200 mb-7 max-w-xl mx-auto">
            Contact us today and let&apos;s discuss your construction needs.
          </p>
          <Link href="/#contact" className="btn-green">Get Free Consultation</Link>
        </div>
      </section>
    </div>
  );
}
