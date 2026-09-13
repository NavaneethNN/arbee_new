import Link from "next/link";
import {
  Home, Building2, Factory, Church,
  Hotel, PenTool, Layers, ArrowRight,
} from "lucide-react";

const services = [
  { icon: Home,      title: "Residential",    desc: "Creating dream homes with quality craftsmanship and meticulous attention to detail.",        color: "bg-blue-50 text-blue-600",     border: "hover:border-blue-200"   },
  { icon: Building2, title: "Commercial",     desc: "Constructing functional and impressive commercial spaces tailored for your business.",       color: "bg-orange-50 text-orange-600", border: "hover:border-orange-200" },
  { icon: Factory,   title: "Industrial",     desc: "Building robust industrial facilities designed for maximum efficiency and safety.",           color: "bg-slate-100 text-slate-600",  border: "hover:border-slate-200"  },
  { icon: Church,    title: "Assembly",       desc: "Specialized construction for community spaces and public gathering facilities.",              color: "bg-purple-50 text-purple-600", border: "hover:border-purple-200" },
  { icon: Hotel,     title: "Hotel",          desc: "Premium hospitality buildings engineered for comfort, aesthetics, and longevity.",            color: "bg-pink-50 text-pink-600",     border: "hover:border-pink-200"   },
  { icon: PenTool,   title: "Plan & Elevation", desc: "Professional architectural planning and detailed elevation design services.",              color: "bg-teal-50 text-teal-600",     border: "hover:border-teal-200"   },
  { icon: Layers,    title: "Interior Design", desc: "Transforming spaces with creative and functional interior design solutions.",               color: "bg-green-50 text-green-600",   border: "hover:border-green-200"  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-gray-50/60">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10" data-reveal="fade-up">
          <span className="section-label">What We Offer</span>
          <h2 className="section-heading">
            Our <span className="text-brand">Services</span>
          </h2>
          <p className="section-sub mt-2 max-w-2xl mx-auto">
            Comprehensive construction solutions tailored to bring your vision
            to life with excellence and precision.
          </p>
        </div>

        {/* Grid — 2 col mobile, 3 col md, 4 col lg */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5
                  hover:shadow-lg ${s.border} transition-all duration-300 card-hover`}
                data-reveal="fade-up"
                data-delay={String((i % 4) * 80 + 50)}
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={18} className="hidden sm:block" />
                </div>
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1.5 group-hover:text-brand transition-colors leading-snug">
                  {s.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed line-clamp-3">{s.desc}</p>
              </div>
            );
          })}

          {/* CTA card */}
          <div
            className="bg-brand rounded-2xl p-4 sm:p-5 flex flex-col justify-between card-hover"
            data-reveal="fade-up"
            data-delay="350"
          >
            <div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                <span className="text-white font-black text-xl">+</span>
              </div>
              <h3 className="font-bold text-white text-xs sm:text-sm mb-1.5 leading-snug">&amp; Many More</h3>
              <p className="text-white/70 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
                Consultation, Estimation, Structural Design, Valuation, Repair &amp; Rehabilitation, Turn-Key projects.
              </p>
            </div>
            <Link
              href="/#contact"
              className="mt-3 inline-flex items-center gap-1.5 text-brand-green font-bold text-xs sm:text-sm hover:gap-2.5 transition-all"
            >
              Enquire Now <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
