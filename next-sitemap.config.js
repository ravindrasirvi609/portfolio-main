/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ravindrachoudhary.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.ravindrachoudhary.in/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
    ],
  },
  generateIndexSitemap: true,
  alternateRefs: [
    {
      href: 'https://www.ravindrachoudhary.in',
      hreflang: 'en-IN',
    },
  ],
}