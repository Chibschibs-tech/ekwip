/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ekwip.ma",
  generateRobotsTxt: true,
  // évite l’indexation de l’admin & API
  exclude: ["/admin/*", "/api/*", "/coming-soon"],
  // gère les locales (FR/EN/AR)
  transform: async (config, path) => {
    // self canonical + alternates pour chaque locale
    const locales = ["fr", "en", "ar"];
    const noLocale = path === "/" ? "" : path; // home sans double slash

    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.7,
      alternateRefs: locales.map((l) => ({
        href: `${config.siteUrl}/${l}${noLocale}`,
        hreflang: l,
      })),
    };
  },
  // Optionnel: ajoute des chemins dynamiques (produits, marques)
  additionalPaths: async (config) => {
    // TODO: remplace par une vraie source (DB/API)
    const productSlugs = ["dell-precision-5690"]; // ex.
    const brandSlugs = ["dell","hp"]; // ex.

    return [
      ...productSlugs.map((slug) => ({
        loc: `/catalogue/product/${slug}`,
        changefreq: "weekly",
        priority: 0.8,
        alternateRefs: ["fr","en","ar"].map((l) => ({
          href: `${config.siteUrl}/${l}/catalogue/product/${slug}`,
          hreflang: l,
        })),
      })),
      ...brandSlugs.map((slug) => ({
        loc: `/marques/${slug}`,
        changefreq: "monthly",
        priority: 0.6,
        alternateRefs: ["fr","en","ar"].map((l) => ({
          href: `${config.siteUrl}/${l}/marques/${slug}`,
          hreflang: l,
        })),
      })),
    ];
  },
};
