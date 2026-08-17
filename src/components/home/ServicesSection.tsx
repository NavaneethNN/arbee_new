import Link from "next/link";
import {
  Home, Building2, Factory, Church,
  Hotel, PenTool, Layers, ArrowRight,
} from "lucide-react";

const services = [
  { icon: Home,     title: "Residential Building",  desc: "Creating dream homes with quality craftsmanship and meticulous attention to detail.",         color: "bg-blue-50 text-blue-600",   border: "hover:border-blue-200"   },
  { icon: Building2, title: "Commercial Building",  desc: "Constructing functional and impressive commercial spaces tailored for your business.",        color: "bg-orange-50 text-orange-600", border: "hover:border-orange-200" },
  { icon: Factory,  title: "Industrial Building",   desc: "Building robust industrial facilities designed for maximum efficiency and safety.",            color: "bg-slate-100 text-slate-600", border: "hover:border-slate-200"  },
  { icon: Church,   title: "Assembly Building",     desc: "Specialized construction for community spaces and public gathering facilities.",               color: "bg-purple-50 text-purple-600", border: "hover:border-purple-200"},
  { icon: Hotel,    title: "Hotel Construction",    desc: "Premium hospitality buildings engineered for comfort, aesthetics, and longevity.",             color: "bg-pink-50 text-pink-600",   border: "hover:border-pink-200"   },
  { icon: PenTool,  title: "Plan & Elevation",      desc: "Professional architectural planning and detailed elevation design services.",                   color: "bg-teal-50 text-teal-600",   border: "hover:border-teal-200"   },
  { icon: Layers,   title: "Interior Design",       desc: "Transforming spaces with creative and functional interior design solutions.",                   color: "bg-green-50 text-green-600", border: "hover:border-green-200"  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-gray-50/60">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-12" data-reveal="fade-up">
          <span className="section-label">What We Offer</span>
          <h2 className="section-heading">
            Our <span className="text-brand">Services</span>
          </h2>
          <p className="section-sub mt-3 max-w-2xl mx-auto">
            Comprehensive construction solutions tailored to bring your vision
            to life with excellence and precision.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`group bg-white rounded-2xl border border-gray-100 p-6
                  hover:shadow-lg ${s.border} transition-all duration-300 card-hover`}
                data-reveal="fade-up"
                data-delay={String((i % 4) * 80 + 50)}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${s.color} transition-all duration-300`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base mb-2 group-hover:text-brand transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}

          {/* CTA card */}
          <div
            className="bg-brand rounded-2xl p-6 flex flex-col justify-between card-hover"
            data-reveal="fade-up"
            data-delay="350"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                <span className="text-white font-black text-xl">+</span>
              </div>
              <h3 className="font-bold text-white text-sm md:text-base mb-2">&amp; Many More</h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                Consultation, Estimation, Structural Design, Valuation, Repair &amp; Rehabilitation, Turn-Key projects.
              </p>
            </div>
            <Link
              href="/#contact"
              className="mt-5 inline-flex items-center gap-1.5 text-brand-green font-bold text-sm hover:gap-3 transition-all"
            >
              Enquire Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
