"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

const projectsLinks = [
  { label: "Completed Projects", href: "/projects/completed" },
  { label: "Ongoing Projects", href: "/projects/ongoing" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "#", children: projectsLinks },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const solid = scrolled || !isHome;

  const linkBase = solid
    ? "text-gray-700 hover:text-brand hover:bg-gray-50"
    : "text-white/90 hover:text-white hover:bg-white/10";

  const linkActive = solid
    ? "text-brand bg-purple-50"
    : "text-white bg-white/20";

  return (
    <>
      {/* ─── Top bar ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid ? "bg-white shadow-sm border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <div className="container-section">
          <div className="flex items-center justify-between" style={{ height: "64px" }}>

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src="https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/logo.png"
                  alt="Arbee Constructions"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              {/* Always show wordmark — was broken by undefined `xs:` breakpoint */}
              <div>
                <div className={`text-sm font-black tracking-wide leading-none transition-colors ${solid ? "text-brand" : "text-white"}`}>
                  ARBEE
                </div>
                <div className={`text-[9px] font-bold tracking-widest uppercase leading-tight transition-colors ${solid ? "text-brand-green" : "text-green-300"}`}>
                  CONSTRUCTIONS
                </div>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen((p) => !p)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        dropdownOpen ? linkActive : linkBase
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:text-brand hover:bg-purple-50 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      pathname === link.href ? linkActive : linkBase
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* ── Right side: CTA + hamburger ── */}
            <div className="flex items-center gap-2">
              <Link
                href="/#contact"
                className="hidden md:inline-flex items-center gap-1.5 bg-brand-green text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Get in Touch
              </Link>
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className={`md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                  solid ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ─── Backdrop ─── */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ─── Mobile drawer ─── */}
      <div
        className={`fixed top-0 right-0 z-50 md:hidden
          flex flex-col bg-white shadow-2xl
          w-[280px] max-w-[90vw] h-[100dvh]
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 flex-shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/logo.png"
                alt="Arbee"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <div>
              <div className="text-sm font-black text-brand tracking-wide leading-none">ARBEE</div>
              <div className="text-[9px] font-bold text-brand-green tracking-widest uppercase leading-tight">CONSTRUCTIONS</div>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links — scrollable */}
        <nav className="flex-1 overflow-y-auto py-2 px-3">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                {/* Projects section label */}
                <p className="px-3 pt-4 pb-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Projects
                </p>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      pathname === child.href
                        ? "text-brand bg-purple-50"
                        : "text-gray-600 hover:text-brand hover:bg-gray-50"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "text-brand bg-purple-50"
                    : "text-gray-700 hover:text-brand hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA footer — always visible, never overlaps content */}
        <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-white">
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-brand-green text-white font-bold py-3.5 rounded-xl hover:bg-brand-green-dark transition-colors text-sm"
          >
            Get in Touch
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}
