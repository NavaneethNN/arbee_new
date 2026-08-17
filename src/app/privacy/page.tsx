import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Arbee Constructions — how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://arbeeconstructions.com/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="pt-16" style={{ paddingTop: "72px" }}>
      <div className="bg-brand py-14">
        <div className="container-section">
          <span className="section-label" style={{ color: "#1DA841" }}>Legal</span>
          <h1 className="text-3xl md:text-4xl font-black text-white mt-1">Privacy Policy</h1>
          <p className="text-purple-200 mt-2 text-sm">Last updated: January 2026</p>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-section py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Privacy Policy</span>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-section max-w-3xl">
          <div className="prose-arbee space-y-8">
            {[
              {
                title: "Information We Collect",
                content: "We collect information you provide directly to us, including your name, email address, phone number, and any messages you submit through our contact form. We may also collect information about your use of our website automatically through cookies and similar technologies.",
              },
              {
                title: "How We Use Your Information",
                content: "We use the information we collect to respond to your inquiries, provide construction consultations, send project updates, improve our services, and comply with legal obligations. We do not sell, trade, or rent your personal information to third parties.",
              },
              {
                title: "Data Security",
                content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is stored securely and access is limited to authorized personnel only.",
              },
              {
                title: "Cookies",
                content: "Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand how you use our website and remember your preferences. You can control cookie settings through your browser.",
              },
              {
                title: "Third-Party Services",
                content: "We may use third-party services such as Google Analytics to help us understand website traffic and usage patterns. These services may collect information about your visits to our website in accordance with their own privacy policies.",
              },
              {
                title: "Contact Us",
                content: "If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at contact@arbeeconstructions.com or call +91 98422 38001.",
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-500">
              This privacy policy applies to Arbee Constructions (arbeeconstructions.com). By using our website, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
