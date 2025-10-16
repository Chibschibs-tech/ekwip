// app/[locale]/catalogue/product/[slug]/page.tsx
import type { Metadata } from 'next';

// On importe le composant de la PDP d'origine, et on le ré-exporte UNE fois
import ProductPage from '@/app/catalogue/product/[slug]/page';
export default ProductPage;

// On importe le module complet pour accéder à generateMetadata éventuel
import * as Base from '@/app/catalogue/product/[slug]/page';

// Helper hreflang/canonical
import { hreflangFor } from '@/i18n/seo';

export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } }
): Promise<Metadata> {
  // Si la PDP d'origine fournit déjà des métadonnées, on les récupère
  const base =
    typeof (Base as any).generateMetadata === 'function'
      ? await (Base as any).generateMetadata({ params: { slug: params.slug } })
      : {};

  // On ajoute nos alternates/canonical hreflang
  return {
    ...base,
    ...hreflangFor(`/catalogue/product/${params.slug}`),
  };
}
