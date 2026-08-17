import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const services = [
  "Residential Building",
  "Commercial Building",
  "Industrial Building",
  "Interior Design",
  "Assembly Building",
  "Plan & Elevation",
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Completed Projects", href: "/projects/completed" },
  { label: "Ongoing Projects", href: "/projects/ongoing" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Top CTA strip */}
      <div className="bg-gradient-to-r from-brand to-brand-dark py-12">
        <div className="container-section flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-1">
              Start Your Project
            </p>
            <h3 className="text-xl md:text-2xl font-black text-white">
              Ready to Build Your Dream?
            </h3>
            <p className="text-purple-200 mt-1 text-sm">
              Get a free consultation from our expert engineering team today.
            </p>
          </div>
          <Link href="/#contact" className="btn-green flex-shrink-0">
            Get Free Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer body */}
      <div className="container-section py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1" data-reveal="fade-up" data-delay="0">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src="https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/logo.png"
                  alt="Arbee Constructions"
                  fill
                  className="object-contain"
                  sizes="44px"
                />
              </div>
              <div>
                <div className="text-lg font-black text-brand tracking-wide leading-none">
                  ARBEE
                </div>
                <div className="text-xs font-bold tracking-widest text-brand-green uppercase leading-tight mt-0.5">
                  CONSTRUCTIONS
                </div>
              </div>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              From the first brick laid to the final coat of paint, we craft
              your dreams. Over 25 years of proven engineering excellence and
              unwavering reliability.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://youtube.com/@ungalporiyaalan3640"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand hover:text-brand hover:bg-purple-50 transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/arbeeconstructions"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand hover:text-brand hover:bg-purple-50 transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div data-reveal="fade-up" data-delay="100">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="text-brand-green opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all flex-shrink-0"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div data-reveal="fade-up" data-delay="200">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/#services"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="text-brand-green opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all flex-shrink-0"
                    />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div data-reveal="fade-up" data-delay="300">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={13} className="text-brand" />
                </div>
                <span className="text-sm text-gray-500 leading-relaxed">
                  B-11, Thirumalai Garden, Pattanam Road,<br />
                  Vellalore, Coimbatore 641111
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand/8 flex items-center justify-center flex-shrink-0">
                  <Phone size={13} className="text-brand" />
                </div>
                <div>
                  <a href="tel:+919842238001" className="block text-sm text-gray-500 hover:text-brand transition-colors">
                    +91 98422 38001
                  </a>
                  <a href="tel:+919940722553" className="block text-sm text-gray-500 hover:text-brand transition-colors">
                    +91 99407 22553
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand/8 flex items-center justify-center flex-shrink-0">
                  <Mail size={13} className="text-brand" />
                </div>
                <a
                  href="mailto:contact@arbeeconstructions.com"
                  className="text-sm text-gray-500 hover:text-brand transition-colors break-all"
                >
                  contact@arbeeconstructions.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand/8 flex items-center justify-center flex-shrink-0">
                  <Clock size={13} className="text-brand" />
                </div>
                <span className="text-sm text-gray-500">Mon–Fri: 8:00 – 18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100">
        <div className="container-section py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © 2026 Arbee Constructions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-brand transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-200">|</span>
            <Link href="/terms" className="text-xs text-gray-400 hover:text-brand transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
