import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Target,
  Eye,
  ArrowRight,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";

const R2 = "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev";
const BASE = "https://arbeeconstructions.com";

export const metadata: Metadata = {
  title: "About Us — 25+ Years of Engineering Excellence",
  description:
    "Learn about Arbee Constructions — founded in 2000 by Er. V. Ravichandran. 25+ years of engineering excellence delivering residential, commercial, and industrial construction in Coimbatore.",
  alternates: { canonical: `${BASE}/about` },
  openGraph: {
    title: "About Arbee Constructions | 25+ Years of Engineering Excellence",
    description:
      "Founded by Er. V. Ravichandran in 2000, Arbee Constructions has grown into Coimbatore's most trusted construction company with 50+ projects delivered.",
    url: `${BASE}/about`,
    images: [{ url: `${R2}/images/about.jpg`, width: 1200, height: 630, alt: "Arbee Constructions Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Arbee Constructions | 25+ Years of Engineering Excellence",
    description: "Founded in 2000 by Er. V. Ravichandran — Coimbatore's trusted construction company.",
    images: [`${R2}/images/about.jpg`],
  },
};

const stats = [
  { icon: TrendingUp, value: "25+", label: "Years of Excellence" },
  { icon: Users, value: "100+", label: "Happy Clients" },
  { icon: Award, value: "50+", label: "Projects Completed" },
];

const milestones = [
  { year: "2000", title: "Founded", desc: "Arbee Constructions was established by Er. V. Ravichandran with a vision to deliver quality construction in Coimbatore." },
  { year: "2005", title: "First Commercial Project", desc: "Expanded into commercial construction, completing our first G+2 commercial complex on time and within budget." },
  { year: "2015", title: "Industrial Division", desc: "Launched our industrial building division, taking on large-scale warehouse and manufacturing facilities." },
  { year: "2020", title: "Interior Designs", desc: "Added interior design services, offering clients end-to-end construction and design solutions." },
  { year: "2023", title: "Award Recognition", desc: "Received multiple construction quality awards for outstanding project delivery and client satisfaction." },
  { year: "2026", title: "25 Years Strong", desc: "Celebrating 25 years of excellence with an expanding portfolio and a growing team of engineers." },
];

export default function AboutPage() {
  return (
    <div className="pt-16" style={{ paddingTop: "72px" }}>
      {/* Hero */}
      <section className="page-hero-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/about.jpg')" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-section w-full py-16">
          <span className="section-label" style={{ color: "#1DA841" }}>Our Story</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl mt-1">
            A Quarter-Century of Proven Success
          </h1>
          <p className="text-white/70 mt-3 text-sm md:text-base max-w-xl">
            in Engineering Excellence
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-section py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">About Us</span>
        </div>
      </div>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-section">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center py-10 px-6 gap-2">
                  <Icon size={28} className="text-brand-green" />
                  <span className="text-4xl font-black text-brand">{s.value}</span>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-reveal="fade-right">
              <span className="section-label">Our Journey</span>
              <h2 className="section-heading mb-6">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Founded and led by Er. V. Ravichandran, Arbee Constructions is
                the result of over 25 years of deep-rooted engineering
                expertise. What began as a vision to provide quality
                construction has grown into a powerhouse of design and
                execution.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Our journey has been defined by a relentless pursuit of
                perfection. Through economic shifts and evolving architectural
                trends, Arbee has remained constant — a name synonymous with
                integrity, technical precision, and unwavering reliability.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our successful track record is not just measured in the number
                of square feet we&apos;ve built, but in the enduring relationships
                we have forged with our clients. Each project we take on is a
                new opportunity to exceed expectations and redefine excellence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { label: "25+ Years", desc: "Proven engineering excellence" },
                  { label: "Excellence", desc: "Unwavering commitment to standards" },
                  { label: "Reliability", desc: "Trusted name in precision" },
                ].map((kp) => (
                  <div key={kp.label} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <div className="font-black text-brand text-lg">{kp.label}</div>
                    <div className="text-xs text-gray-500 mt-1 leading-snug">{kp.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative" data-reveal="fade-left">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/completed_cover.jpg"
                  alt="Arbee Constructions story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-brand text-white rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-black">2000</div>
                <div className="text-xs text-white/70 font-semibold tracking-wide uppercase">Year Founded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-gray-50">
        <div className="container-section">
          <div className="text-center mb-14">
            <span className="section-label">Our Leadership</span>
            <h2 className="section-heading">The <span className="text-brand">Visionary</span> Behind Arbee</h2>
          </div>
          <div className="max-w-3xl mx-auto" data-reveal="fade-up" data-delay="100">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2 bg-brand p-10 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-4xl border-4 border-white/30">
                    R
                  </div>
                  <div>
                    <div className="text-white font-black text-xl">Er. V. Ravichandran</div>
                    <div className="text-brand-green font-semibold text-sm mt-1">Founder &amp; Lead Engineer</div>
                  </div>
                </div>
                <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    With over 25 years of deep-rooted engineering expertise,
                    Er. V. Ravichandran has built Arbee Constructions into one
                    of Coimbatore&apos;s most trusted construction firms. His
                    hands-on approach and commitment to precision ensure that
                    every project bears the hallmark of quality.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { v: "25+", l: "Years in Industry" },
                      { v: "50+", l: "Projects Led" },
                    ].map((s) => (
                      <div key={s.l} className="bg-gray-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-black text-brand">{s.v}</div>
                        <div className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wide">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-white">
        <div className="container-section">
          <div className="text-center mb-14">
            <span className="section-label">Our Foundation</span>
            <h2 className="section-heading">Vision &amp; <span className="text-brand">Mission</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand flex items-center justify-center mb-5">
                <Eye size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Setting the gold standard from concept to creation. We envision
                a future where every structure we build stands as a testament
                to quality, innovation, and lasting value for generations.
              </p>
            </div>
            <div className="bg-brand rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                <Target size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-white/80 leading-relaxed">
                Our mission is simple yet ambitious: to provide the highest
                standards of construction quality. We believe that every
                project, regardless of its scale, deserves an uncompromising
                commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-section">
          <div className="text-center mb-14">
            <span className="section-label">Our History</span>
            <h2 className="section-heading">Our <span className="text-brand">Journey</span> Through the Years</h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand border-4 border-white shadow md:-translate-x-1/2 translate-y-1 flex-shrink-0 z-10" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                      <span className="inline-block text-xs font-black bg-brand text-white px-3 py-1 rounded-full mb-2">{m.year}</span>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{m.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-padding bg-white">
        <div className="container-section">
          <div className="text-center mb-10">
            <span className="section-label">Recognition</span>
            <h2 className="section-heading">Awards &amp; <span className="text-brand">Achievements</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { src: "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/award.jpg", label: "Best Construction Quality" },
              { src: "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/award2.jpg", label: "Excellence in Design" },
              { src: "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/award3.jpg", label: "Client Satisfaction" },
              { src: "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/award4.jpg", label: "Industry Recognition" },
            ].map((a, i) => (
              <div key={a.label} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow aspect-square"
                data-reveal="zoom-in" data-delay={String(i * 100)}>
                <Image src={a.src} alt={a.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-semibold">{a.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-16">
        <div className="container-section text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Ready to Work With Us?
          </h2>
          <p className="text-purple-200 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Let&apos;s discuss your project and bring your construction vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-green">
              Get Free Consultation <ArrowRight size={16} />
            </Link>
            <Link href="/projects/completed" className="btn-ghost-white">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
