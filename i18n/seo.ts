// i18n/seo.ts
import type {Metadata} from 'next';

const BASE =
  (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '') || 'https://ekwip.ma';

function abs(path: string) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}`;
}

function localizedPaths(pathWithoutLocale: string) {
  const clean = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
  const suffix = clean === '/' ? '' : clean;
  return {
    en: abs(`/en${suffix}`),
    fr: abs(`/fr${suffix}`),
    ar: abs(`/ar${suffix}`),
    'x-default': abs(`/fr${suffix}`)
  };
}

/** À utiliser dans generateMetadata() des pages sous /app/[locale]/... */
export function hreflangFor(pathWithoutLocale: string): Metadata {
  return {alternates: {languages: localizedPaths(pathWithoutLocale)}};
}
