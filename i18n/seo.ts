// i18n/seo.ts
import type { Metadata } from "next";

const LOCALES = ["fr", "en", "ar"] as const;

// IMPORTANT : défini dans Vercel (Production et Preview)
const ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://ekwip.ma";

/**
 * Construit un objet Metadata avec canonical + hreflang pour un chemin "non localisé".
 * Exemple d'appel: hreflangFor("/catalogue/product/dell-precision-5690")
 */
export function hreflangFor(pathname: string): Metadata {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;

  const languages = LOCALES.reduce<Record<string, string>>((acc, l) => {
    acc[l] = `${ORIGIN}/${l}${clean === "/" ? "" : clean}`;
    return acc;
  }, {});

  return {
    alternates: {
      canonical: `${ORIGIN}${clean === "/" ? "" : clean}`,
      languages,
      // Optionnel: x-default → FR
      types: { "x-default": `${ORIGIN}/fr${clean === "/" ? "" : clean}` },
    },
  };
}
