/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ekwip.ma',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/portail-client/*'],
  alternateRefs: [
    { href: 'https://ekwip.ma/fr', hreflang: 'fr' },
    { href: 'https://ekwip.ma/en', hreflang: 'en' },
    { href: 'https://ekwip.ma/ar', hreflang: 'ar' },
  ],
};
