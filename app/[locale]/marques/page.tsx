import type { Metadata } from "next";
import { hreflangFor } from "@/i18n/seo";
import BasePage from "../../marques/page";

export const generateMetadata = (): Metadata => hreflangFor("/marques");

export default function LocalizedBrandsPage() {
  return <BasePage />;
}
