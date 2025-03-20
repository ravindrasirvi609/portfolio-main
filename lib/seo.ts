import type { Metadata } from "next";

export function getSiteMetadata(): Metadata {
  return {
    title:
      "Ravindra Sirvi - वेबसाइट डिजाइन, मोबाइल ऐप डेवलपमेंट | Best Indian Web Developer",
    description:
      "भारत में वेबसाइट और मोबाइल ऐप डेवलपमेंट के लिए संपर्क करें। Affordable website design in India. Best web developer in India for business websites, e-commerce solutions and mobile apps.",
    keywords:
      "website developer India, वेबसाइट डेवलपर, वेबसाइट डिजाइन, मोबाइल ऐप डेवलपमेंट, website design India, website cost India, web development services India, e-commerce website India, सस्ती वेबसाइट, भारत में वेबसाइट डेवलपर, best web developer in India, professional website developer",
    openGraph: {
      title: "वेबसाइट डिजाइन और मोबाइल ऐप डेवलपमेंट सेवाएँ | Ravindra Sirvi",
      description:
        "भारत में वेबसाइट और मोबाइल ऐप डेवलपमेंट के लिए संपर्क करें। Professional website development services across India.",
      url: "https://www.ravindrachoudhary.in/",
      siteName: "Ravindra Sirvi - Web Developer India",
      images: [
        {
          url: "https://www.ravindrachoudhary.in/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "वेबसाइट डेवलपर इंडिया - Ravindra Sirvi",
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
      title: "वेबसाइट और मोबाइल ऐप डेवलपमेंट सेवाएँ | Ravindra Sirvi",
      description:
        "भारत में वेबसाइट और मोबाइल ऐप डेवलपमेंट के लिए संपर्क करें। Professional website development services across India.",
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
        "hi-IN": "https://www.ravindrachoudhary.in/hi",
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
    name: "Ravindra Sirvi - Website Development Services India | वेबसाइट डेवलपमेंट सेवाएँ",
    image: "https://www.ravindrachoudhary.in/og-image.jpg",
    url: "https://www.ravindrachoudhary.in",
    telephone: "+91-8107199052", // Add your actual phone if you want
    priceRange: "₹10,000 - ₹1,00,000",
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
      addressRegion: "Rajasthan", // Replace with your actual state
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 20.5937, // Update with your actual location or approximate location in India
      longitude: 78.9629,
    },
    description:
      "Professional website and mobile app development services across India. वेबसाइट और मोबाइल ऐप डेवलपमेंट के लिए संपर्क करें। Serving businesses in Delhi, Mumbai, Bangalore, Jaipur, and throughout India.",
    areaServed: [
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Jaipur",
      "Hyderabad",
      "India",
    ],
    serviceType: [
      "Website Development",
      "E-commerce Website",
      "Mobile App Development",
      "Web Design",
      "वेबसाइट डिजाइन",
      "वेबसाइट डेवलपमेंट",
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "Starting at ₹10,000",
      priceCurrency: "INR",
      validFrom: "2024-01-01",
      url: "https://www.ravindrachoudhary.in",
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Business Website Development",
        description:
          "Professional business website development services in India",
      },
      {
        "@type": "Offer",
        name: "E-commerce Website Development",
        description: "E-commerce website development for Indian businesses",
      },
      {
        "@type": "Offer",
        name: "Mobile App Development",
        description: "Custom mobile app development for Android and iOS",
      },
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.ravindrachoudhary.in/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://www.linkedin.com/in/ravindra-sirvi",
      "https://github.com/ravindrasirvi609",
      "https://twitter.com/ravindra_sirvi",
    ],
  };
}

// FAQ Schema for common website development questions
export function getFAQSchemaMarkup() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "वेबसाइट बनवाने का खर्च कितना होता है?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "वेबसाइट का खर्च ₹10,000 से शुरू होता है और वेबसाइट के प्रकार और फीचर्स के आधार पर बदलता है। बिज़नेस वेबसाइट, ई-कॉमर्स या कस्टम वेबसाइट के लिए अलग-अलग प्राइस होता है।",
        },
      },
      {
        "@type": "Question",
        name: "How much does it cost to build a website in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Website development costs in India start from ₹10,000 and vary based on the type and features required. Business websites, e-commerce sites, and custom solutions have different pricing structures.",
        },
      },
      {
        "@type": "Question",
        name: "What services do you offer for website development?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I offer comprehensive website development services including business websites, e-commerce platforms, mobile app development, web application development, and SEO services. All websites are mobile-responsive and optimized for search engines.",
        },
      },
      {
        "@type": "Question",
        name: "Do you develop websites for clients across India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, I provide website development services to clients throughout India including major cities like Delhi, Mumbai, Bangalore, Jaipur, Hyderabad, and all other locations. Remote collaboration makes it possible to work with clients anywhere in India.",
        },
      },
    ],
  };
}
