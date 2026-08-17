"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface GalleryImage {
  id: number;
  imagePath: string;
  project: { id: number; name: string; category: string } | null;
}

function GalleryItem({ img }: { img: GalleryImage }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const markLoaded = useCallback(() => setLoaded(true), []);

  // Catch images that were already cached before mount
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="group relative break-inside-avoid mb-4 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
      {/* Shimmer skeleton — sits behind the image, same dimensions */}
      <div
        className={`img-skeleton w-full min-h-[160px] transition-opacity duration-300 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden="true"
        style={{ aspectRatio: "4 / 3" }}
      />

      {/* Image — absolutely positioned over skeleton so layout is skeleton-driven */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={img.imagePath}
        alt={img.project?.name ?? "Arbee Constructions — construction photo"}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-500 ease-in-out
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        loading="lazy"
        decoding="async"
        onLoad={markLoaded}
        onError={markLoaded}
      />

      {/* Hover overlay */}
      {img.project && (
        <div className="absolute inset-0 bg-gradient-to-t from-brand/88 via-brand/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
          <p className="text-white font-bold text-sm leading-snug">{img.project.name}</p>
          <p className="text-white/65 text-xs mt-0.5">{img.project.category}</p>
          <Link
            href={`/project/${img.project.id}`}
            className="mt-2 inline-flex items-center gap-1 text-brand-green text-xs font-bold hover:underline"
          >
            View Project <ExternalLink size={10} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">No images found.</div>
    );
  }

  return (
    /* No data-reveal here — gallery images manage their own visibility */
    <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {images.map((img) => (
        <GalleryItem key={img.id} img={img} />
      ))}
    </div>
  );
}
