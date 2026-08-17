export default function GalleryLoading() {
  // Simulate a masonry grid with varied heights
  const heights = [
    "h-48","h-64","h-40","h-56","h-72","h-44",
    "h-60","h-36","h-52","h-68","h-44","h-64",
    "h-40","h-56","h-48","h-60","h-72","h-36",
    "h-52","h-44","h-64","h-40","h-56","h-48",
  ];

  return (
    <div className="pt-16" style={{ paddingTop: "72px" }}>
      {/* Hero skeleton */}
      <div className="page-hero-lg img-skeleton" />

      {/* Breadcrumb skeleton */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="container-section flex items-center gap-2">
          <div className="h-3 w-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-2 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Masonry skeleton */}
      <section className="section-padding bg-white">
        <div className="container-section">
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {heights.map((h, i) => (
              <div
                key={i}
                className={`break-inside-avoid mb-4 rounded-xl overflow-hidden img-skeleton ${h}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
