export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Calendar, Eye, Tag, ArrowLeft, ArrowRight, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { slug: string };
}

const R2 = "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev";
const BASE = "https://arbeeconstructions.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({ where: { slug: params.slug } });
  if (!blog) return { title: "Article Not Found" };

  const ogImage = blog.featuredImage
    ? `${R2}/images/${blog.featuredImage}`
    : `${R2}/images/about.jpg`;

  return {
    title: blog.title,
    description: blog.excerpt ?? blog.title,
    alternates: { canonical: `${BASE}/blog/${blog.slug}` },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt ?? blog.title,
      url: `${BASE}/blog/${blog.slug}`,
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
      authors: [blog.author],
      tags: [blog.category, "construction", "coimbatore"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt ?? blog.title,
      images: [ogImage],
    },
  };
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));
}

export default async function BlogPostPage({ params }: Props) {
  const blog = await prisma.blog.findUnique({ where: { slug: params.slug } });

  if (!blog || blog.status !== "published") notFound();

  // Increment views
  await prisma.blog.update({ where: { id: blog.id }, data: { views: { increment: 1 } } });

  const related = await prisma.blog.findMany({
    where: { status: "published", category: blog.category, id: { not: blog.id } },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-16" style={{ paddingTop: "72px" }}>
      {/* Hero */}
      <section className="page-hero-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: blog.featuredImage
              ? `url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/${blog.featuredImage}')`
              : "url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/about.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/50 to-transparent" />
        <div className="relative z-10 container-section w-full py-16 flex flex-col justify-end h-full">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold bg-brand-green text-white px-3 py-1 rounded-full flex items-center gap-1">
              <Tag size={10} /> {blog.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-white/60 text-sm">
            <span className="flex items-center gap-1.5"><User size={13} /> {blog.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} />{formatDate(blog.createdAt)}</span>
            <span className="flex items-center gap-1.5"><Eye size={13} />{blog.views} views</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-section py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand">Blog</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate max-w-xs">{blog.title}</span>
          </div>
          <Link href="/blog" className="flex items-center gap-1 text-sm text-brand font-semibold hover:underline">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <section className="section-padding bg-white">
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content */}
            <article className="lg:col-span-2" data-reveal="fade-right">
              {blog.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-brand pl-5 mb-10 italic">
                  {blog.excerpt}
                </p>
              )}

              {blog.content ? (
                <div className="prose-arbee">
                  <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-400">No content available.</p>
              )}

              {/* Author card */}
              <div className="mt-12 border-t border-gray-100 pt-10">
                <div className="flex items-start gap-5 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-1">About the Author</p>
                    <p className="font-bold text-gray-900 text-lg">{blog.author}</p>
                    <p className="text-sm text-gray-500 mt-1">Construction Expert · Arbee Constructions</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8" data-reveal="fade-left" data-delay="150">
              {/* Article Info */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Article Info</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { icon: Tag, label: "Category", value: blog.category },
                    { icon: User, label: "Author", value: blog.author },
                    { icon: Calendar, label: "Published", value: formatDate(blog.createdAt) },
                    { icon: Eye, label: "Views", value: `${blog.views}` },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3">
                        <Icon size={14} className="text-brand-green flex-shrink-0" />
                        <span className="text-gray-400">{item.label}:</span>
                        <span className="font-semibold text-gray-700">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-brand rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Have a Project in Mind?</h3>
                <p className="text-white/75 text-sm mb-5 leading-relaxed">
                  Contact our team for a free consultation on your construction needs.
                </p>
                <Link href="/#contact" className="block w-full text-center bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-brand-green-dark transition-colors">
                  Get in Touch
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {related.map((b) => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="group block">
                  <div className="card rounded-2xl overflow-hidden h-full flex flex-col">
                    <div className="relative h-44 bg-gray-100">
                      {b.featuredImage ? (
                        <Image src={`https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/${b.featuredImage}`} alt={b.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand/10 to-brand/5" />
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <span className="text-xs font-semibold text-brand-green mb-2">{b.category}</span>
                      <h3 className="font-bold text-gray-900 group-hover:text-brand transition-colors leading-snug mb-2">{b.title}</h3>
                      <div className="mt-auto flex items-center gap-1 text-brand text-sm font-semibold">
                        Read More <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
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
