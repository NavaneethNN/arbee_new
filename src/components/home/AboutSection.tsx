import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const points = [
  "A relentless pursuit of perfection defines every step of our journey",
  "25+ Years of proven engineering excellence and expertise",
  "Unwavering commitment to the highest standards of excellence",
  "A trusted name in integrity and technical precision",
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-gray-50/60">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image side */}
          <div
            className="relative order-2 lg:order-1 mt-6 lg:mt-0"
            data-reveal="fade-right"
          >
            {/* Extra bottom padding so the founder card doesn't clip */}
            <div className="pb-14 sm:pb-16">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image
                  src="https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/about.jpg"
                  alt="Arbee Constructions — Who We Are"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-brand/10" />
              </div>

              {/* Floating experience badge — positioned within the padded area */}
              <div className="absolute top-0 left-0 bg-brand text-white rounded-xl px-4 py-3 shadow-xl">
                <div className="text-xl sm:text-2xl font-black leading-none">25+</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-purple-200 mt-0.5">Years</div>
              </div>

              {/* Floating founder card — anchored to bottom of padded wrapper */}
              <div className="absolute bottom-0 right-0 sm:right-2 bg-white rounded-xl shadow-xl p-3 sm:p-4 border border-gray-100 max-w-[200px] sm:max-w-[220px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-black text-base sm:text-lg flex-shrink-0">
                    R
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 text-xs sm:text-sm leading-tight truncate">Er. V. Ravichandran</div>
                    <div className="text-[10px] text-brand-green font-semibold mt-0.5">Founder &amp; Lead Engineer</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">25+ yrs expertise</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2" data-reveal="fade-left">
            <span className="section-label">Who We Are</span>
            <h2 className="section-heading mb-4">
              A Quarter-Century of{" "}
              <span className="text-brand">Proven Success</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">
              Founded and led by Er. V. Ravichandran, Arbee Constructions is
              the result of over 25 years of deep-rooted engineering expertise.
              What began as a vision to provide quality construction has grown
              into a powerhouse of design and execution.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
              Our track record is not just measured in square feet, but in
              enduring relationships forged with clients. Through economic
              shifts and evolving trends, Arbee has remained constant — a name
              synonymous with integrity and technical precision.
            </p>

            <ul className="space-y-2.5 mb-7">
              {points.map((p, i) => (
                <li
                  key={p}
                  className="flex items-start gap-3"
                  data-reveal="fade-up"
                  data-delay={String(i * 80 + 100)}
                >
                  <CheckCircle2 size={15} className="text-brand-green mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{p}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-primary">
              Learn More About Us
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
