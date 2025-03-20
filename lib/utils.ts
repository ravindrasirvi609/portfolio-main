import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// SEO helper functions
export function createCanonicalUrl(path: string = ""): string {
  const baseUrl = "https://www.ravindrachoudhary.in";
  return `${baseUrl}${path}`;
}

export function generateStructuredData(
  type: string,
  data: Record<string, any>
): string {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  return JSON.stringify({
    ...baseData,
    ...data,
  });
}

export function getAlternateLanguageLinks() {
  return [
    {
      hrefLang: "en-IN",
      href: "https://www.ravindrachoudhary.in",
    },
  ];
}
