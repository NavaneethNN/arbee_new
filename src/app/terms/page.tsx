import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Arbee Constructions website and services.",
  alternates: { canonical: "https://arbeeconstructions.com/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="pt-16 md:pt-20">
      <div className="bg-brand py-16">
        <div className="container-section">
          <span className="section-label text-brand-green">Legal</span>
          <h1 className="text-4xl font-black text-white mt-2">Terms &amp; Conditions</h1>
          <p className="text-purple-200 mt-2 text-sm">Last updated: January 2026</p>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-section py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Terms &amp; Conditions</span>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-section max-w-3xl">
          <div className="prose-arbee space-y-8">
            {[
              {
                title: "Acceptance of Terms",
                content: "By accessing and using the Arbee Constructions website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.",
              },
              {
                title: "Use of Website",
                content: "You may use this website for lawful purposes only. You agree not to use this site in any way that may cause damage to the website, impair its availability, or compromise its security. Any unauthorized use of the website may give rise to a claim for damages.",
              },
              {
                title: "Intellectual Property",
                content: "All content on this website, including text, images, logos, and graphics, is the property of Arbee Constructions and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.",
              },
              {
                title: "Construction Services",
                content: "All construction services provided by Arbee Constructions are subject to separate service agreements. Information on this website is for general informational purposes only and does not constitute a binding contract or warranty of any kind.",
              },
              {
                title: "Limitation of Liability",
                content: "Arbee Constructions shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or our services. Our total liability shall not exceed the amount paid for specific services.",
              },
              {
                title: "Governing Law",
                content: "These terms shall be governed by and construed in accordance with the laws of India, with jurisdiction in the courts of Coimbatore, Tamil Nadu. Any disputes arising from these terms shall be resolved through mutual negotiation or legal proceedings as appropriate.",
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
              For questions about these Terms &amp; Conditions, contact us at{" "}
              <a href="mailto:contact@arbeeconstructions.com" className="text-brand hover:underline">
                contact@arbeeconstructions.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
