/** @type {import('next-sitemap').IConfig} */
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ekwip.ma';

// locales utilisées (FR par défaut sans préfixe, EN/AR avec préfixe)
const locales = [
  { code: 'fr', base: `${SITE}` },        // pas de /fr pour la locale par défaut
  { code: 'en', base: `${SITE}/en` },
  { code: 'ar', base: `${SITE}/ar` },
];

export default {
  siteUrl: SITE,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    // routes à ne pas indexer
    '/admin/*',
    '/api/*',
    '/portail-client*',
    '/coming-soon',
    '/ma-liste-besoins',
  ],

  // Hreflang automatiques pour chaque URL
  alternateRefs: [
    { href: locales[0].base, hreflang: 'fr' },
    { href: locales[1].base, hreflang: 'en' },
    { href: locales[2].base, hreflang: 'ar' },
    { href: SITE,           hreflang: 'x-default' },
  ],

  // Si tu dois ajuster le <loc>, la fréquence ou la priorité selon le path
  transform: async (config, path) => {
    const isHome = path === '/';
    return {
      loc: `${SITE}${path}`,
      changefreq: isHome ? 'daily' : 'weekly',
      priority: isHome ? 1.0 : 0.7,
      // next-sitemap s’occupe d’ajouter les <xhtml:link> via alternateRefs
    };
  },
};
