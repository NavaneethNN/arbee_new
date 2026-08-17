import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import GalleryGrid from "@/components/GalleryGrid";

const R2 = "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev";
const BASE = "https://arbeeconstructions.com";

export const metadata: Metadata = {
  title: "Project Gallery — Construction Portfolio",
  description:
    "Explore Arbee Constructions' complete gallery of residential, commercial, and industrial projects across Coimbatore and Tamil Nadu.",
  alternates: { canonical: `${BASE}/gallery` },
  openGraph: {
    title: "Project Gallery | Arbee Constructions",
    description:
      "Browse our complete construction portfolio — residential homes, commercial complexes, industrial facilities, and interior designs.",
    url: `${BASE}/gallery`,
    images: [{ url: `${R2}/images/completed.jpeg`, width: 1200, height: 630, alt: "Arbee Constructions Gallery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Gallery | Arbee Constructions",
    description: "Browse our complete construction portfolio across Coimbatore and Tamil Nadu.",
    images: [`${R2}/images/completed.jpeg`],
  },
};

export default async function GalleryPage() {
  const images = await prisma.projectImage.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      project: { select: { id: true, name: true, category: true } },
    },
  });

  // Deduplicate by imagePath
  const seen = new Set<string>();
  const uniqueImages = images.filter((img) => {
    if (seen.has(img.imagePath)) return false;
    seen.add(img.imagePath);
    return true;
  });

  return (
    <div className="pt-16" style={{ paddingTop: "72px" }}>
      {/* Hero */}
      <section className="page-hero-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/completed.jpeg')" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-section w-full py-16">
          <span
            className="section-label"
            style={{ color: "#1DA841" }}
            data-reveal="fade-up"
          >
            Our Work
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-2xl leading-tight mt-1"
            data-reveal="fade-up"
            data-delay="100"
          >
            Project Gallery
          </h1>
          <p
            className="text-white/75 mt-3 text-sm md:text-base max-w-xl"
            data-reveal="fade-up"
            data-delay="200"
          >
            Explore our portfolio of completed construction projects across
            Coimbatore and Tamil Nadu.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-section py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Gallery</span>
          </div>
          <span className="text-sm text-gray-400">{uniqueImages.length} photos</span>
        </div>
      </div>

      {/* Gallery grid — client component handles image reveal */}
      <section className="section-padding bg-white">
        <div className="container-section">
          <GalleryGrid images={uniqueImages} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-14">
        <div className="container-section text-center">
          <h2
            className="text-2xl md:text-3xl font-black text-white mb-3"
            data-reveal="fade-up"
          >
            Inspired by Our Work?
          </h2>
          <p
            className="text-purple-200 mb-7 max-w-lg mx-auto text-sm md:text-base"
            data-reveal="fade-up"
            data-delay="150"
          >
            Let&apos;s discuss your project and create something extraordinary together.
          </p>
          <div data-reveal="fade-up" data-delay="250">
            <Link href="/#contact" className="btn-green">Start Your Project</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
