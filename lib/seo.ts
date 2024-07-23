import type { Metadata } from "next";

export function getSiteMetadata(): Metadata {
  return {
    title: "Ravindra Sirvi - Software Engineer Portfolio",
    description:
      "Discover the world of software engineering through Ravindra Sirvi's portfolio. Skilled in web, mobile, and cloud technologies with a diverse range of projects.",
    keywords:
      "software engineer, web development, mobile development, cloud technologies, portfolio",
    openGraph: {
      title: "Ravindra Sirvi - Software Engineer Portfolio",
      description:
        "Explore Ravindra Sirvi's software engineering projects and skills",
      url: "https://www.ravindrachoudhary.in/",
      siteName: "Ravindra Sirvi Portfolio",
      images: [
        {
          url: "https://www.ravindrachoudhary.in/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
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
    twitter: {
      card: "summary_large_image",
      title: "Ravindra Sirvi - Software Engineer Portfolio",
      description:
        "Explore Ravindra Sirvi's software engineering projects and skills",
      creator: "@ravindra_sirvi",
      images: ["https://www.ravindrachoudhary.in/og-image.jpg"],
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}
