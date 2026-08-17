import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollReveal from "@/components/ScrollReveal";

const BASE_URL = "https://arbeeconstructions.com";
const R2 = "https://pub-e7829452e02d4285a8bad18cc480c5cf.r2.dev";

const OG_IMAGE = {
  url: `${R2}/images/home.jpeg`,
  width: 1200,
  height: 630,
  alt: "Arbee Constructions — Premier Construction Company in Coimbatore",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "ARBEE CONSTRUCTIONS | Premier Construction Company in Coimbatore",
    template: "%s | Arbee Constructions",
  },

  description:
    "Arbee Constructions — Coimbatore's trusted construction company with 25+ years of excellence. Specializing in residential, commercial, industrial buildings, hotels, and interior designs. Led by Er. V. Ravichandran.",

  keywords: [
    "construction company coimbatore",
    "best construction company in coimbatore",
    "builders coimbatore",
    "residential building coimbatore",
    "commercial building coimbatore",
    "industrial building coimbatore",
    "arbee constructions",
    "arbee structures",
    "Er V Ravichandran",
    "construction contractor coimbatore",
    "house construction coimbatore",
    "interior design coimbatore",
    "hotel construction",
    "assembly building",
    "turn key construction",
    "civil engineering coimbatore",
  ],

  authors: [{ name: "Arbee Constructions", url: BASE_URL }],
  creator: "Arbee Constructions",
  publisher: "Arbee Constructions",

  // Canonical
  alternates: {
    canonical: BASE_URL,
  },

  // Favicons & icons
  icons: {
    icon: `${R2}/images/logo.png`,
    shortcut: `${R2}/images/logo.png`,
    apple: `${R2}/images/logo.png`,
  },

  // Open Graph — controls WhatsApp, Facebook, LinkedIn sharing
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "ARBEE CONSTRUCTIONS",
    title: "Arbee Constructions | Premier Construction Company in Coimbatore",
    description:
      "Building your dream spaces with 25+ years of engineering excellence. Trusted construction company in Coimbatore — residential, commercial, industrial & interior design.",
    locale: "en_IN",
    images: [OG_IMAGE],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    site: "@arbeeconstructions",
    creator: "@arbeeconstructions",
    title: "Arbee Constructions | Premier Construction Company in Coimbatore",
    description:
      "Building your dream spaces with 25+ years of engineering excellence in Coimbatore.",
    images: [OG_IMAGE],
  },

  // Geo & language
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Coimbatore",
    "geo.position": "11.0168;76.9558",
    "ICBM": "11.0168, 76.9558",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your Search Console token here later)
  // verification: { google: "YOUR_GOOGLE_VERIFICATION_TOKEN" },
};

// LocalBusiness + Organization structured data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "GeneralContractor"],
      "@id": `${BASE_URL}/#business`,
      name: "Arbee Constructions",
      alternateName: ["Arbee Structures", "ARBEE CONSTRUCTIONS"],
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${R2}/images/logo.png`,
        width: 200,
        height: 200,
      },
      image: `${R2}/images/home.jpeg`,
      description:
        "Arbee Constructions is a premier construction company in Coimbatore, Tamil Nadu, with 25+ years of engineering excellence specializing in residential, commercial, and industrial buildings.",
      foundingDate: "2000",
      founder: {
        "@type": "Person",
        name: "Er. V. Ravichandran",
        jobTitle: "Founder & Lead Engineer",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "B-11, Thirumalai Garden, Pattanam Road, Vellalore",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        postalCode: "641111",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 11.0168,
        longitude: 76.9558,
      },
      telephone: "+919842238001",
      email: "contact@arbeeconstructions.com",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://youtube.com/@ungalporiyaalan3640",
        "https://www.instagram.com/arbeeconstructions",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Construction Services",
        itemListElement: [
          "Residential Building",
          "Commercial Building",
          "Industrial Building",
          "Assembly Building",
          "Hotel Construction",
          "Plan & Elevation",
          "Interior Design",
          "Consultation",
          "Turn-Key Project Contract",
          "Structural Design",
          "Repair & Rehabilitation",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
      priceRange: "₹₹",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "ARBEE CONSTRUCTIONS",
      description: "Premier Construction Company in Coimbatore with 25+ Years Excellence",
      publisher: { "@id": `${BASE_URL}/#business` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/blog?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Preload hero image for LCP */}
        <link
          rel="preload"
          as="image"
          href={`${R2}/images/home.jpeg`}
          fetchPriority="high"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {/* JSON-LD structured data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="beforeInteractive"
        />
        <Preloader />
        <ScrollReveal />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
