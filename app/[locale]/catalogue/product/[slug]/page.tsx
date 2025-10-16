// app/[locale]/catalogue/product/[slug]/page.tsx
import type { Metadata } from 'next'
import { hreflangFor } from '@/i18n/seo'

// 👉 récupère la liste des locales ; si tu n'as pas ce fichier/export,
// remplace l'import par: const locales = ['fr','en','ar'] as const;
import { locales } from '@/i18n/config' // ou '@/i18n/request'

// 1) On ré-exporte la vraie page produit (UI, data, etc.)
export { default } from '@/app/catalogue/product/[slug]/page'

// 2) On fabrique les params *par locale* à partir de la page de base
export async function generateStaticParams() {
  // on essaie d’appeler generateStaticParams de la page base
  const base = await import('@/app/catalogue/product/[slug]/page')
  const baseParams =
    (typeof base.generateStaticParams === 'function'
      ? await base.generateStaticParams()
      : []) as Array<{ slug: string }>

  const allLocales =
    (Array.isArray(locales) && locales.length ? locales : ['fr', 'en', 'ar']) as string[]

  // on duplique chaque slug pour chaque locale
  return allLocales.flatMap((locale) =>
    baseParams.map(({ slug }) => ({ locale, slug }))
  )
}

// 3) Meta locale-aware (hreflang)
export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Metadata {
  const { locale, slug } = params
  return hreflangFor(`/catalogue/product/${slug}`, locale)
}
