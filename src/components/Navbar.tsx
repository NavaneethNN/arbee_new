"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

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

  // Close dropdown on outside click
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

  // Lock body scroll when mobile menu open
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid ? "bg-white shadow-sm border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <div className="container-section">
          <div className="flex items-center justify-between h-16 md:h-18" style={{ height: solid ? "64px" : "72px" }}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="relative w-9 h-9 md:w-10 md:h-10">
                <Image src="https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/logo.png" alt="Arbee Constructions" fill className="object-contain" sizes="40px" />
              </div>
              <div className="hidden xs:block sm:block">
                <div className={`text-base font-black tracking-wide leading-none transition-colors ${solid ? "text-brand" : "text-white"}`}>
                  ARBEE
                </div>
                <div className={`text-[10px] font-bold tracking-widest uppercase leading-tight transition-colors ${solid ? "text-brand-green" : "text-green-300"}`}>
                  CONSTRUCTIONS
                </div>
              </div>
            </Link>

            {/* Desktop nav — md and up */}
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
                      <ChevronDown size={13} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 animate-fade-in">
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

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2">
              <Link
                href="/#contact"
                className="hidden md:inline-flex items-center gap-1.5 bg-brand-green text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-brand-green-dark transition-colors shadow-sm"
              >
                Get in Touch
              </Link>
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className={`md:hidden p-2 rounded-xl transition-colors ${
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

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white z-50 shadow-2xl
          transition-transform duration-300 ease-in-out md:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src="https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev/images/logo.png" alt="Arbee" fill className="object-contain" sizes="32px" />
            </div>
            <span className="font-black text-brand text-sm">ARBEE CONSTRUCTIONS</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Nav links — scrollable */}
        <div className="overflow-y-auto h-[calc(100%-140px)] py-3 px-3">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="mb-1">
                <p className="px-3 pt-3 pb-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Projects
                </p>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-brand hover:bg-purple-50 transition-colors"
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
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors mb-0.5 ${
                  pathname === link.href
                    ? "text-brand bg-purple-50"
                    : "text-gray-700 hover:text-brand hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA pinned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="btn-green w-full"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  );
}
