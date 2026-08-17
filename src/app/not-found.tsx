import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 py-20">
        <div className="text-9xl font-black text-brand mb-4 leading-none">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
          We couldn&apos;t find that page. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home size={16} /> Back to Home
          </Link>
          <Link href="/projects/completed" className="btn-outline">
            View Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
