const badges = [
  "Expert Engineering",
  "Quality Construction",
  "Timely Delivery",
  "Client Satisfaction",
  "25+ Years",
  "Coimbatore's Best",
];

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "100%", label: "Client Trust" },
  { value: "50+", label: "Projects Completed" },
  { value: "2000", label: "Year Founded" },
];

export default function StatsBar() {
  return (
    <section className="bg-white border-b border-gray-100">
      {/* Stats grid — 2×2 on mobile, 4 cols on sm+ */}
      <div className="container-section">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-6 px-3 text-center"
              data-reveal="fade-up"
              data-delay={String(i * 100)}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-brand leading-none tabular-nums">
                {s.value}
              </span>
              <span className="text-[10px] font-bold text-gray-400 mt-1.5 tracking-widest uppercase leading-tight">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Animated badge ticker */}
      <div className="bg-brand overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...badges, ...badges, ...badges].map((b, i) => (
              <span
                key={i}
                className="text-white/85 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 flex-shrink-0 px-5 py-2.5"
              >
                <span className="w-1 h-1 rounded-full bg-brand-green flex-shrink-0" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
