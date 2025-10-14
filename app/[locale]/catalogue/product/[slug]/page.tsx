import type { Metadata } from "next";
import { hreflangFor } from "@/i18n/seo";

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata =>
  hreflangFor(`/catalogue/product/${params.slug}`);

// Reuse the existing non-localized page implementation
export { default } from "../../../../catalogue/product/[slug]/page";
