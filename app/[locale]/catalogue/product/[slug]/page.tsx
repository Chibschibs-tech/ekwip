// app/[locale]/catalogue/product/[slug]/page.tsx
import type { Metadata } from "next";
import ProductPage from "@/app/catalogue/product/[slug]/page";
import { hreflangFor } from "@/i18n/seo";

// On exporte UNE SEULE FOIS le composant par défaut
export default function LocalizedProductPage(props: any) {
  return <ProductPage {...props} />;
}

// On ajoute nos <link rel="alternate" hreflang="..."> pour ce slug
export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } }
): Promise<Metadata> {
  return hreflangFor(`/catalogue/product/${params.slug}`);
}
