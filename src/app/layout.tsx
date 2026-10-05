import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/data/config";

export const viewport: Viewport = {
  themeColor: "#0b1528",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.corazonair.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_CONFIG.shortName} | Premium HVAC Service in ${SITE_CONFIG.location}`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: `Top-rated HVAC and Air Conditioning service in ${SITE_CONFIG.location}. Contact ${SITE_CONFIG.shortName} for AC repair, installation, and maintenance. 24/7 Availability.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_CONFIG.shortName} | HVAC & Air Conditioning Service in ${SITE_CONFIG.location}`,
    description: `Reliable Heating & Cooling Service in ${SITE_CONFIG.location}. Available ${SITE_CONFIG.hours}.`,
    url: "/",
    siteName: SITE_CONFIG.businessName,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: SITE_CONFIG.businessName,
    image: `${baseUrl}/api/icon/512`,
    url: baseUrl,
    telephone: SITE_CONFIG.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.5244,
      longitude: -112.1524
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      opens: "00:00",
      closes: "23:59"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
