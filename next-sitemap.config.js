/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ekwip.ma",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*", "/coming-soon"],

  // Ajoute les hreflang (alternateRefs) pour FR/EN/AR
  transform: async (config, path) => {
    const locales = ["fr", "en", "ar"];
    // pour que "/" ne devienne pas "//" lorsqu'on préfixe la locale
    const noLocale = path === "/" ? "" : path;

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

  // 👉 à relier plus tard à ta DB pour lister dynamiquement produits / marques
  additionalPaths: async (config) => {
    const productSlugs = ["dell-precision-5690"]; // exemple
    const brandSlugs = ["dell", "hp"]; // exemple

    const locales = ["fr", "en", "ar"];
    const alt = (p) =>
      locales.map((l) => ({ href: `${config.siteUrl}/${l}${p}`, hreflang: l }));

    return [
      ...productSlugs.map((slug) => ({
        loc: `/catalogue/product/${slug}`,
        changefreq: "weekly",
        priority: 0.8,
        alternateRefs: alt(`/catalogue/product/${slug}`),
      })),
      ...brandSlugs.map((slug) => ({
        loc: `/marques/${slug}`,
        changefreq: "monthly",
        priority: 0.6,
        alternateRefs: alt(`/marques/${slug}`),
      })),
    ];
  },
};
