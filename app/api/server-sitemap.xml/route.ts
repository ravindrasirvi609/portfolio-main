import { getServerSideSitemap } from "next-sitemap";
import { ISitemapField } from "next-sitemap";
import { MetadataRoute } from "next";

export async function GET(request: Request) {
  // Get the main domain URL
  const baseUrl = "https://www.ravindrachoudhary.in";

  // Static pages with metadata
  const staticPages: ISitemapField[] = [
    {
      loc: `${baseUrl}`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/visitor-data`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/visitor-dashboard`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/site-visitor`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.7,
    },
    // Add more pages as needed
  ];

  return getServerSideSitemap(staticPages);
}
