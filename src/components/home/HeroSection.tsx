import Link from "next/link";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end sm:justify-center overflow-hidden">

      {/* ── Background photo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/home.jpeg')" }}
      />

      {/* ── Mobile overlay: strong bottom-up dark for readability ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 sm:hidden" />
      {/* ── Desktop overlay: brand diagonal ── */}
      <div className="absolute inset-0 hero-overlay hidden sm:block" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 hidden sm:block" />

      {/* ── Top tint so navbar is always readable on mobile ── */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/60 to-transparent sm:hidden" />

      {/* ── Floating "Est. 2000" badge — top right, mobile only ── */}
      <div className="absolute top-20 right-4 sm:hidden z-20">
        <div className="bg-white/15 backdrop-blur-lg border border-white/25 rounded-2xl px-4 py-3 text-center shadow-lg">
          <div className="text-white font-black text-xl leading-none">2000</div>
          <div className="text-brand-green text-[9px] font-bold uppercase tracking-widest mt-1">Est.</div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full px-5 pt-28 pb-10 sm:container-section sm:pt-28 sm:pb-20">
        <div className="max-w-3xl">

          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full mb-5"
            data-reveal="fade-down"
            data-duration="fast"
          >
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse flex-shrink-0" />
            <span className="leading-snug">Trusted · 100+ Clients · 25+ Years</span>
          </div>

          {/* Main heading */}
          <h1
            className="font-black text-white mb-4"
            style={{ lineHeight: 1.05 }}
            data-reveal="fade-up"
            data-delay="100"
          >
            {/* Mobile */}
            <span
              className="block sm:hidden"
              style={{ fontSize: "clamp(2.4rem, 12vw, 3.2rem)" }}
            >
              We Build
              <br />
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
            {/* Desktop */}
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
            className="text-white/75 leading-relaxed mb-7 text-[13px] sm:text-base max-w-md sm:max-w-xl"
            data-reveal="fade-up"
            data-delay="200"
          >
            From the first brick laid to the final coat of paint — precision,
            integrity, and unwavering excellence in every project.
          </p>

          {/* Stat pills — mobile only */}
          <div
            className="grid grid-cols-3 gap-2 mb-7 sm:hidden"
            data-reveal="fade-up"
            data-delay="230"
          >
            {[
              { value: "25+", label: "Years" },
              { value: "50+", label: "Projects" },
              { value: "100+", label: "Clients" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center bg-white/12 backdrop-blur-sm border border-white/20 rounded-xl py-3"
              >
                <div className="text-white font-black text-xl leading-none">{s.value}</div>
                <div className="text-white/55 text-[9px] font-bold uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-6 sm:mb-10"
            data-reveal="fade-up"
            data-delay="300"
          >
            <Link
              href="/#contact"
              className="flex items-center justify-center gap-2 bg-brand-green text-white font-bold rounded-2xl text-[15px] px-6 py-4 shadow-lg shadow-green-900/30 active:scale-95 transition-all"
            >
              Get Free Consultation
              <ArrowRight size={16} />
            </Link>
            <Link
              href="tel:+919842238001"
              className="flex items-center justify-center gap-2 bg-white/12 backdrop-blur-sm border border-white/30 text-white font-bold rounded-2xl text-[15px] px-6 py-4 active:scale-95 transition-all sm:hidden"
            >
              <Phone size={16} />
              Call Now
            </Link>
            <Link
              href="/projects/completed"
              className="hidden sm:flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold rounded-xl text-sm px-5 py-3.5 hover:bg-white/15 active:scale-95 transition-all"
            >
              View Our Projects
            </Link>
          </div>

          {/* Trust chips — desktop only */}
          <div
            className="hidden sm:flex flex-wrap items-center gap-2"
            data-reveal="fade-up"
            data-delay="400"
          >
            {["🏗️  50+ Projects", "🏆  Award Winning", "⏱️  On-Time Delivery"].map((label) => (
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

      {/* ── Green accent bar bottom — mobile only ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-green sm:hidden" />

      {/* ── Scroll cue — desktop only ── */}
      <a
        href="#projects"
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors z-10"
      >
        <span className="text-[9px] font-bold tracking-widest uppercase">Scroll</span>
        <ChevronDown size={15} className="animate-bounce" />
      </a>
    </section>
  );
}
