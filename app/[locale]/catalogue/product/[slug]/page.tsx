// app/[locale]/catalogue/product/[slug]/page.tsx
export { default } from '@/app/catalogue/product/[slug]/page';
export { generateMetadata } from '@/app/catalogue/product/[slug]/page';
export { generateStaticParams } from '@/app/catalogue/product/[slug]/page';
// app/[locale]/catalogue/product/[slug]/page.tsx
import type { Metadata } from 'next';

// On continue d'utiliser la vraie page produit :
export { default } from '@/app/catalogue/product/[slug]/page';

// Helper qui fabrique les URLs absolues hreflang
import { hreflangFor } from '@/i18n/seo';

// Si la page d’origine exporte déjà generateMetadata, on la garde
import * as Base from '@/app/catalogue/product/[slug]/page';

export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } }
): Promise<Metadata> {
  // métadonnées de base éventuelles de la page d’origine
  const base =
    typeof (Base as any).generateMetadata === 'function'
      ? await (Base as any).generateMetadata({ params: { slug: params.slug } })
      : {};

  // + nos hreflang/canonical basés sur le slug
  return {
    ...base,
    ...hreflangFor(`/catalogue/product/${params.slug}`),
  };
}
