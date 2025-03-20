import { getServerSideSitemap } from "next-sitemap";
import { ISitemapField } from "next-sitemap";

export async function GET(request: Request) {
  // Get the main domain URL
  const baseUrl = "https://www.ravindrachoudhary.in";

  // List of major Indian cities for local SEO
  const indianCities = [
    "delhi",
    "mumbai",
    "bangalore",
    "jaipur",
    "hyderabad",
    "ahmedabad",
    "chennai",
    "kolkata",
    "pune",
    "surat",
    "lucknow",
    "kanpur",
    "nagpur",
    "indore",
    "thane",
    "bhopal",
    "visakhapatnam",
    "patna",
    "vadodara",
    "ghaziabad",
  ];

  // Create sitemap entries for services in each city
  const localSitemapEntries: ISitemapField[] = [];

  // Add city-specific service entries
  indianCities.forEach((city) => {
    // Add English entries
    localSitemapEntries.push({
      loc: `${baseUrl}/services/website-development-${city}`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.8,
    });

    localSitemapEntries.push({
      loc: `${baseUrl}/services/ecommerce-website-${city}`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.8,
    });

    localSitemapEntries.push({
      loc: `${baseUrl}/services/mobile-app-development-${city}`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.8,
    });

    // Add Hindi entries for each city
    localSitemapEntries.push({
      loc: `${baseUrl}/hi/services/website-development-${city}`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.8,
    });
  });

  return getServerSideSitemap(localSitemapEntries);
}
