import Link from "next/link";
import { ArrowRight, ChevronDown, Building2, Award, Clock } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/home.jpeg')" }}
      />
      {/* Layered overlays for depth */}
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 container-section w-full pt-20 pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6"
            data-reveal="fade-down"
            data-duration="fast"
          >
            <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
            Trusted by 100+ Clients · 25+ Years of Excellence
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6"
            data-reveal="fade-up"
            data-delay="100"
          >
            Building
            <span
              className="block"
              style={{
                backgroundImage: "linear-gradient(90deg, #1DA841 0%, #4ade80 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dream Spaces
            </span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
            data-reveal="fade-up"
            data-delay="200"
          >
            From the first brick laid to the final coat of paint, we transform
            architectural visions into reality with precision, integrity, and
            unwavering excellence.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col xs:flex-row sm:flex-row flex-wrap gap-3 mb-12"
            data-reveal="fade-up"
            data-delay="300"
          >
            <Link href="/#contact" className="btn-green text-base px-8 py-4">
              Get in Touch
              <ArrowRight size={18} />
            </Link>
            <Link href="/projects/completed" className="btn-ghost-white text-base px-8 py-4">
              View Our Projects
            </Link>
          </div>

          {/* Trust chips */}
          <div
            className="flex flex-nowrap items-center gap-2"
            data-reveal="fade-up"
            data-delay="400"
          >
            {[
              { icon: Building2, label: "50+ Projects" },
              { icon: Award, label: "Award Winning" },
              { icon: Clock, label: "On-Time Delivery" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-semibold px-2.5 py-1.5 rounded-full whitespace-nowrap"
              >
                <Icon size={12} className="text-brand-green flex-shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll prompt */}
      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors z-10 group"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase">Scroll Down</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
