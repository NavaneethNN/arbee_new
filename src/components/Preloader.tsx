"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const pathname = usePathname();

  // On first mount — initial page load
  useEffect(() => {
    // Start fade-out after short delay so logo is always seen
    const fadeTimer = setTimeout(() => setFadeOut(true), 900);
    // Fully remove after animation completes
    const hideTimer = setTimeout(() => setVisible(false), 1500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // On route change — show briefly then hide
  useEffect(() => {
    setVisible(true);
    setFadeOut(false);
    const fadeTimer = setTimeout(() => setFadeOut(true), 500);
    const hideTimer = setTimeout(() => setVisible(false), 1050);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      id="arbee-preloader"
      className={fadeOut ? "fade-out" : ""}
      aria-hidden="true"
    >
      {/* Wordmark only */}
      <div className="preloader-logo flex flex-col items-center gap-3">
        <div className="text-center">
          <div className="text-white font-black text-3xl tracking-[0.18em] leading-none">
            ARBEE
          </div>
          <div
            className="font-bold text-xs tracking-[0.4em] uppercase leading-none mt-2"
            style={{ color: "#1DA841" }}
          >
            CONSTRUCTIONS
          </div>
        </div>
      </div>

      {/* Animated dots */}
      <div className="preloader-dots">
        <div className="preloader-dot" />
        <div className="preloader-dot" />
        <div className="preloader-dot" />
      </div>
    </div>
  );
}
