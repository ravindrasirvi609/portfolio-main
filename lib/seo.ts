import type { Metadata } from "next";

export function getSiteMetadata(): Metadata {
  return {
    title: "Ravindra Sirvi - Indian Software Engineer & Developer Portfolio",
    description:
      "Hire a skilled Indian software engineer for your next project. Ravindra Sirvi specializes in web, mobile, and cloud technologies with expertise in React, Next.js, Node.js and more.",
    keywords:
      "Indian software engineer, hire developer India, web development India, mobile app development, cloud technologies, Indian developer portfolio, React developer India, Next.js developer, freelance Indian developer",
    openGraph: {
      title: "Ravindra Sirvi - Indian Software Engineer Portfolio",
      description:
        "Hire Ravindra Sirvi, an experienced Indian software engineer for your next project",
      url: "https://www.ravindrachoudhary.in/",
      siteName: "Ravindra Sirvi Portfolio",
      images: [
        {
          url: "https://www.ravindrachoudhary.in/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Ravindra Sirvi - Indian Software Engineer",
        },
      ],
      locale: "en_IN",
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
    twitter: {
      card: "summary_large_image",
      title: "Ravindra Sirvi - Indian Software Engineer Portfolio",
      description:
        "Hire a skilled Indian software engineer for your web and mobile projects",
      creator: "@ravindra_sirvi",
      images: ["https://www.ravindrachoudhary.in/og-image.jpg"],
    },
    verification: {
      google: "add-your-google-verification-code-here",
    },
    alternates: {
      canonical: "https://www.ravindrachoudhary.in",
      languages: {
        "en-IN": "https://www.ravindrachoudhary.in",
      },
    },
    authors: [
      { name: "Ravindra Sirvi", url: "https://www.ravindrachoudhary.in" },
    ],
    category: "Technology",
    creator: "Ravindra Sirvi",
    publisher: "Ravindra Sirvi",
  };
}

// Add schema markup for a professional service provider
export function getSchemaMarkup() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ravindra Sirvi - Software Engineering Services",
    image: "https://www.ravindrachoudhary.in/og-image.jpg",
    url: "https://www.ravindrachoudhary.in",
    telephone: "+91-XXXXXXXXXX", // Add your actual phone if you want
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 20.5937, // Update with your actual location or approximate location in India
      longitude: 78.9629,
    },
    description:
      "Professional software engineering services specializing in web, mobile, and cloud technologies. Available for client projects across India and globally.",
    areaServed: ["India", "Global"],
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "Cloud Solutions",
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "Varies",
      priceCurrency: "INR",
      validFrom: "2024-01-01",
      url: "https://www.ravindrachoudhary.in",
    },
  };
}
