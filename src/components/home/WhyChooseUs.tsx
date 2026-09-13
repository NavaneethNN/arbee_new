import Image from "next/image";
import { ShieldCheck, Star, Clock, Wrench } from "lucide-react";

const values = [
  { icon: ShieldCheck, title: "Safety First",         desc: "We adhere to strict zero-accident policies and full compliance standards on every site.",      iconBg: "bg-red-50",    iconColor: "text-red-500",    num: "01" },
  { icon: Star,        title: "Quality Construction", desc: "Premium materials and rigorous attention to detail are the foundation of our reputation.",      iconBg: "bg-yellow-50", iconColor: "text-yellow-500", num: "02" },
  { icon: Clock,       title: "Timely Delivery",      desc: "We respect your schedule. Our project management ensures we meet deadlines, every time.",       iconBg: "bg-green-50",  iconColor: "text-green-500",  num: "03" },
  { icon: Wrench,      title: "Expert Engineering",   desc: "Decades of combined experience bring deep industry knowledge to every project we undertake.",   iconBg: "bg-blue-50",   iconColor: "text-blue-500",   num: "04" },
];

const R2 = "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev";
const awards = [
  `${R2}/images/award.jpg`,
  `${R2}/images/award2.jpg`,
  `${R2}/images/award3.jpg`,
  `${R2}/images/award4.jpg`,
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding bg-gray-50/60">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10" data-reveal="fade-up">
          <span className="section-label">Our Core Values</span>
          <h2 className="section-heading">
            Why Choose <span className="text-brand">Arbee?</span>
          </h2>
          <p className="section-sub mt-2 max-w-xl mx-auto">
            Four pillars that set us apart — making us Coimbatore&apos;s most
            trusted construction partner for over 25 years.
          </p>
        </div>

        {/* Value cards — 2 col mobile, 2 col sm, 4 col lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 hover:shadow-lg hover:border-brand/20 transition-all duration-300 group card-hover"
                data-reveal="fade-up"
                data-delay={String(i * 100)}
              >
                <div className="absolute top-3 right-3 text-3xl sm:text-4xl font-black text-gray-50 select-none leading-none">
                  {v.num}
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${v.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={18} className={v.iconColor} />
                </div>
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1.5 group-hover:text-brand transition-colors leading-snug">
                  {v.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed line-clamp-4">{v.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Awards strip */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm" data-reveal="fade-up" data-delay="200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-1">Recognition</p>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Recognised for Excellence</h3>
              <p className="text-sm text-gray-500">Proud recipients of multiple construction quality awards across Tamil Nadu.</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              {awards.map((src, i) => (
                <div
                  key={i}
                  className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
                  data-reveal="zoom-in"
                  data-delay={String(i * 80 + 300)}
                >
                  <Image src={src} alt={`Award ${i + 1}`} fill className="object-cover" sizes="56px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
