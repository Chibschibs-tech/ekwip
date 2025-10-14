// app/[locale]/catalogue/product/[slug]/page.tsx
import type { Metadata } from "next";
import ProductPage, {
  // si ta page source exporte ces fonctions, on les ré-exporte pour préserver le SSG
  generateStaticParams as _generateStaticParams
} from "@/app/catalogue/product/[slug]/page";
import { hreflangFor } from "@/i18n/seo";
import type { Locale } from "@/i18n/config";

export const dynamicParams = true;

// Next 15 : params est un Promise
export async function generateMetadata(
  props: { params: Promise<{ locale: Locale; slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  return hreflangFor(`/catalogue/product/${slug}`);
}

// Optionnel : si la page source exporte generateStaticParams, on le relaie
export const generateStaticParams =
  typeof _generateStaticParams === "function" ? _generateStaticParams : undefined;

// Important : on RELAIE **tous** les props (params, searchParams, etc.)
export default function LocalizedProductAlias(props: any) {
  return <ProductPage {...props} />;
}
