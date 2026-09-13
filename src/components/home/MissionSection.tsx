import Image from "next/image";
import { Target, Eye } from "lucide-react";

export default function MissionSection() {
  return (
    <section id="mission" className="section-padding bg-white overflow-x-hidden">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10" data-reveal="fade-up">
          <span className="section-label">Our Foundation</span>
          <h2 className="section-heading">
            Vision &amp; <span className="text-brand">Mission</span>
          </h2>
          <p className="section-sub mt-2 max-w-xl mx-auto">
            Our guiding principles that drive excellence in every project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          {/* Cards */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Vision card */}
            <div
              className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300 group"
              data-reveal="fade-right"
              data-delay="100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand transition-colors duration-300 flex-shrink-0">
                  <Eye size={18} className="text-brand group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                Setting the gold standard from concept to creation. We envision a
                future where every structure we build stands as a testament to
                quality, innovation, and lasting value for generations to come.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-green" />
                <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Gold Standard</span>
              </div>
            </div>

            {/* Mission card */}
            <div
              className="flex-1 bg-brand rounded-2xl p-5 hover:shadow-xl transition-all duration-300"
              data-reveal="fade-right"
              data-delay="200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Target size={18} className="text-white" />
                </div>
                <h3 className="text-base font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-white/80 leading-relaxed text-sm">
                Our mission is simple yet ambitious: to provide the highest
                standards of construction quality. We believe every project,
                regardless of scale, deserves an uncompromising commitment to excellence.
              </p>
              <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-green" />
                <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Uncompromising Excellence</span>
              </div>
            </div>
          </div>

          {/* Image — shown below cards on mobile */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-xl min-h-[220px] sm:min-h-[280px] lg:min-h-0"
            data-reveal="fade-left"
            data-delay="150"
          >
            <Image
              src="https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/completed.jpeg"
              alt="Arbee Constructions — Our Mission"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/75 via-brand/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <div className="w-8 h-0.5 bg-brand-green mb-3" />
              <p className="text-white font-bold text-sm leading-snug">
                &ldquo;Every brick we lay is a promise we keep to our clients.&rdquo;
              </p>
              <p className="text-white/65 text-xs mt-1.5">— Er. V. Ravichandran, Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
