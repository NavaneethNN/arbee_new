import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end sm:items-center overflow-hidden">

      {/* ── Background photo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/home.jpeg')" }}
      />

      {/* ── Overlays ──
          Mobile : heavy dark-to-transparent from bottom, lighter top
          Desktop: brand purple diagonal overlay  */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20 sm:hidden" />
      <div className="absolute inset-0 hero-overlay hidden sm:block" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 hidden sm:block" />

      {/* ── Green accent bar — mobile only, bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-green sm:hidden" />

      {/* ── Floating "Est. 2000" badge — mobile only ── */}
      <div className="absolute top-24 right-4 sm:hidden z-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3.5 py-2.5 text-center">
          <div className="text-white font-black text-lg leading-none">2000</div>
          <div className="text-brand-green text-[9px] font-bold uppercase tracking-widest mt-0.5">Est.</div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container-section w-full pt-20 pb-10 sm:pt-24 sm:pb-20">
        <div className="max-w-3xl">

          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full mb-5"
            data-reveal="fade-down"
            data-duration="fast"
          >
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse flex-shrink-0" />
            <span>Trusted by 100+ Clients · 25+ Years of Excellence</span>
          </div>

          {/* Main heading */}
          <h1
            className="font-black text-white leading-[1.0] mb-5"
            data-reveal="fade-up"
            data-delay="100"
          >
            {/* Mobile: big stacked lines */}
            <span className="block text-[2.6rem] sm:hidden leading-[1.05]">
              We Build<br />
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #1DA841 0%, #4ade80 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dream Spaces
              </span>
            </span>
            {/* Desktop: original layout */}
            <span className="hidden sm:block text-5xl md:text-6xl lg:text-7xl">
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
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-white/80 leading-relaxed mb-7 text-sm sm:text-base max-w-xl"
            data-reveal="fade-up"
            data-delay="200"
          >
            From the first brick laid to the final coat of paint — precision,
            integrity, and unwavering excellence in every project.
          </p>

          {/* ── Mobile stat pills ── */}
          <div
            className="flex items-center gap-3 mb-7 sm:hidden"
            data-reveal="fade-up"
            data-delay="250"
          >
            {[
              { value: "25+", label: "Years" },
              { value: "50+", label: "Projects" },
              { value: "100+", label: "Clients" },
            ].map((s) => (
              <div key={s.label} className="flex-1 text-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl py-2.5 px-1">
                <div className="text-white font-black text-lg leading-none">{s.value}</div>
                <div className="text-white/60 text-[10px] font-semibold uppercase tracking-wide mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs — stacked on mobile, row on sm+ */}
          <div
            className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10"
            data-reveal="fade-up"
            data-delay="300"
          >
            <Link
              href="/#contact"
              className="btn-green w-full sm:w-auto justify-center text-base py-3.5"
            >
              Get Free Consultation
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects/completed"
              className="btn-ghost-white w-full sm:w-auto justify-center text-base py-3.5"
            >
              View Our Projects
            </Link>
          </div>

          {/* Trust chips — desktop only */}
          <div
            className="hidden sm:flex flex-nowrap items-center gap-2"
            data-reveal="fade-up"
            data-delay="400"
          >
            {[
              { label: "🏗️  50+ Projects" },
              { label: "🏆  Award Winning" },
              { label: "⏱️  On-Time Delivery" },
            ].map(({ label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
              >
                {label}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Scroll cue ── */}
      <a
        href="#projects"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors z-10"
      >
        <span className="text-[9px] font-bold tracking-widest uppercase">Scroll</span>
        <ChevronDown size={15} className="animate-bounce" />
      </a>
    </section>
  );
}
