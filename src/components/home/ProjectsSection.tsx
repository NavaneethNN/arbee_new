import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsSection() {
  const projects = await prisma.project.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { displayOrder: "asc" }, take: 1 } },
  });

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container-section">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          data-reveal="fade-up"
        >
          <div>
            <span className="section-label">Our Work</span>
            <h2 className="section-heading">
              Featured <span className="text-brand">Projects</span>
            </h2>
            <p className="section-sub mt-3 max-w-xl">
              Discover our portfolio of excellence in construction — from
              landmark completions to exciting works in progress.
            </p>
          </div>
          <Link href="/projects/completed" className="btn-outline flex-shrink-0">
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((p, i) => (
            <div
              key={p.id}
              data-reveal="fade-up"
              data-delay={String((i % 3) * 100 + 50)}
            >
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
      </div>
    </section>
  );
}
