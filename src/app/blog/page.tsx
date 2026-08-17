import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Calendar, Eye, Tag, ArrowRight } from "lucide-react";

const R2 = "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev";
const BASE = "https://arbeeconstructions.com";

export const metadata: Metadata = {
  title: "Construction Insights & Updates",
  description:
    "Expert perspectives on construction, design trends, and industry innovations from Arbee Constructions — Coimbatore's leading construction company.",
  alternates: { canonical: `${BASE}/blog` },
  openGraph: {
    title: "Construction Blog | Arbee Constructions",
    description:
      "Expert construction insights, design trends, and industry innovations from Arbee Structures — Coimbatore.",
    url: `${BASE}/blog`,
    images: [{ url: `${R2}/images/about.jpg`, width: 1200, height: 630, alt: "Arbee Constructions Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Blog | Arbee Constructions",
    description: "Expert construction insights and industry innovations from Arbee Structures.",
    images: [`${R2}/images/about.jpg`],
  },
};

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(d));
}

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  return (
    <div className="pt-16" style={{ paddingTop: "72px" }}>
      {/* Hero */}
      <section className="page-hero-lg">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/about.jpg')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-section w-full py-16">
          <span className="section-label" style={{ color: "#1DA841" }}>
            Insights &amp; Updates
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-2xl leading-tight mt-1">
            Construction Insights
          </h1>
          <p className="text-white/75 mt-3 text-sm md:text-base max-w-xl">
            Expert perspectives on construction, design trends, and industry
            innovations from Arbee Structures.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-section py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Blog</span>
        </div>
      </div>

      {/* Category bar */}
      {categories.length > 1 && (
        <div className="bg-white border-b border-gray-100 sticky top-16 md:top-20 z-30">
          <div className="container-section py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <span key={cat} className="flex-shrink-0 text-xs font-semibold px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 cursor-default">
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <section className="section-padding bg-white">
        <div className="container-section">
          {blogs.length === 0 ? (
            <div className="text-center py-24 text-gray-400" data-reveal="fade-up">
              <p className="text-xl font-bold text-gray-600 mb-2">No articles found</p>
              <p className="text-sm">Check back soon for construction insights and updates.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              <div className="mb-10" data-reveal="fade-up">
                <Link href={`/blog/${blogs[0].slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="relative h-64 lg:h-auto min-h-64 bg-gray-100">
                      {blogs[0].featuredImage ? (
                        <Image
                          src={`https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/${blogs[0].featuredImage}`}
                          alt={blogs[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                          <span className="text-brand/30 text-6xl font-black">A</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="badge bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="badge bg-purple-100 text-brand text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          <Tag size={10} /> {blogs[0].category}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-brand transition-colors mb-3 leading-snug">
                        {blogs[0].title}
                      </h2>
                      {blogs[0].excerpt && (
                        <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">{blogs[0].excerpt}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(blogs[0].createdAt)}</span>
                          <span className="flex items-center gap-1"><Eye size={12} />{blogs[0].views} views</span>
                        </div>
                        <span className="flex items-center gap-1.5 text-brand font-bold text-sm group-hover:gap-2.5 transition-all">
                          Read More <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Rest of posts */}
              {blogs.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {blogs.slice(1).map((blog, i) => (
                    <div key={blog.id} data-reveal="fade-up" data-delay={String((i % 3) * 100 + 50)}>
                    <Link href={`/blog/${blog.slug}`} className="group block">
                      <div className="card h-full flex flex-col rounded-2xl overflow-hidden">
                        <div className="relative h-48 bg-gray-100">
                          {blog.featuredImage ? (
                            <Image
                              src={`https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/${blog.featuredImage}`}
                              alt={blog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                              <span className="text-brand/30 text-4xl font-black">A</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 p-6">
                          <span className="badge bg-purple-100 text-brand text-xs font-semibold px-2.5 py-1 rounded-full mb-3 self-start">
                            {blog.category}
                          </span>
                          <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-brand transition-colors">
                            {blog.title}
                          </h3>
                          {blog.excerpt && (
                            <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-2">{blog.excerpt}</p>
                          )}
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Calendar size={11} />{formatDate(blog.createdAt)}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Eye size={11} />{blog.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
