// i18n/seo.ts
import type {Metadata} from "next";

const LOCALES = ["fr", "en", "ar"] as const;

function mapFor(pathWithoutLocale: string) {
  const clean = pathWithoutLocale.startsWith("/") ? pathWithoutLocale : `/${pathWithoutLocale}`;
  return {
    en: `/en${clean === "/" ? "" : clean}`,
    fr: `/fr${clean === "/" ? "" : clean}`,
    ar: `/ar${clean === "/" ? "" : clean}`,
    "x-default": `/fr${clean === "/" ? "" : clean}`,
  };
}

/**
 * Utilise-le dans generateMetadata() de n'importe quelle page sous /app/[locale]/...
 * Exemple: hreflangFor("/")  -> /fr, /en, /ar
 *          hreflangFor("/catalogue") -> /fr/catalogue, /en/catalogue, /ar/catalogue
 */
export function hreflangFor(pathWithoutLocale: string): Metadata {
  return { alternates: { languages: mapFor(pathWithoutLocale) } };
}
