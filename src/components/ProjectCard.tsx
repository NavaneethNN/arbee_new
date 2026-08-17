import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

interface ProjectCardProps {
  id: number;
  name: string;
  description: string;
  category: string;
  status: string;
  completion: string;
  coverImage?: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Residential:          { bg: "bg-blue-100",   text: "text-blue-700" },
  Commercial:           { bg: "bg-orange-100", text: "text-orange-700" },
  Industrial:           { bg: "bg-slate-100",  text: "text-slate-600" },
  "Assembly Building":  { bg: "bg-purple-100", text: "text-purple-700" },
  Hotel:                { bg: "bg-pink-100",   text: "text-pink-700" },
  "Interior Designs":   { bg: "bg-teal-100",   text: "text-teal-700" },
  "Private Dwelling":   { bg: "bg-green-100",  text: "text-green-700" },
  "Institutional Building": { bg: "bg-yellow-100", text: "text-yellow-700" },
};

export default function ProjectCard({
  id,
  name,
  description,
  category,
  status,
  completion,
  coverImage,
}: ProjectCardProps) {
  const color = categoryColors[category] ?? { bg: "bg-gray-100", text: "text-gray-600" };
  const completionLabel = completion
    .replace(/^completed on\s*/i, "")
    .replace(/^Completed\s*/i, "");

  return (
    <Link href={`/project/${id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand/10 transition-all duration-300 card-hover">
        {/* Cover image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100 flex-shrink-0">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={name}
              fill
              className="object-cover group-hover:scale-106 transition-transform duration-500"
              style={{ "--tw-scale-x": "1.06", "--tw-scale-y": "1.06" } as React.CSSProperties}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand/8 to-brand/3">
              <MapPin size={36} className="text-brand/25" />
            </div>
          )}
          {/* Gradient fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${
                status === "completed"
                  ? "bg-green-500 text-white"
                  : "bg-amber-400 text-amber-900"
              }`}
            >
              {status === "completed" ? "✓ Completed" : "● Ongoing"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Category + date row */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${color.bg} ${color.text}`}>
              {category}
            </span>
            {completionLabel && completionLabel !== "ongoing" && (
              <span className="flex items-center gap-1 text-[11px] text-gray-400 flex-shrink-0">
                <Calendar size={10} />
                {completionLabel}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-bold text-gray-900 text-base md:text-lg leading-snug mb-2 group-hover:text-brand transition-colors duration-200">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-2">
            {description}
          </p>

          {/* CTA row */}
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-1.5 text-brand font-bold text-sm group-hover:gap-3 transition-all duration-200">
            View Details
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
