import type { Metadata } from "next";
import { hreflangFor } from "@/i18n/seo";
import BasePage from "../../../../catalogue/product/[slug]/page";

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata =>
  hreflangFor(`/catalogue/product/${params.slug}`);

export default function LocalizedProductPage({ params }: { params: { slug: string } }) {
  // on propage "params" au composant de base au cas où il en a besoin
  // (si BasePage n’en a pas besoin, il les ignorera)
  // @ts-expect-error next props passthrough
  return <BasePage params={params} />;
}
