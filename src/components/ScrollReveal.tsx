"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollReveal — lightweight Intersection Observer that adds `.is-visible`
 * to any element with a `[data-reveal]` attribute once it enters the viewport.
 *
 * CSS in globals.css handles the actual animation.
 * No external library needed.
 */
export default function ScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();

  const init = () => {
    // Disconnect any existing observer
    if (observerRef.current) observerRef.current.disconnect();

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // Small RAF to ensure CSS transition triggers after class is set
            requestAnimationFrame(() => {
              el.classList.add("is-visible");
            });
            // Once visible — stop observing
            observerRef.current?.unobserve(el);
          }
        });
      },
      {
        threshold: 0.08,         // trigger when 8% visible
        rootMargin: "0px 0px -40px 0px",  // slight offset from bottom
      }
    );

    elements.forEach((el) => {
      // If element is already in viewport on initial load, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        requestAnimationFrame(() => el.classList.add("is-visible"));
      } else {
        observerRef.current?.observe(el);
      }
    });
  };

  // Initialize on first mount and on route change
  useEffect(() => {
    // Slight delay so the DOM has settled after navigation
    const timer = setTimeout(init, 80);
    return () => {
      clearTimeout(timer);
      if (observerRef.current) observerRef.current.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
