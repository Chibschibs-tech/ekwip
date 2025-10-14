import type { Metadata } from "next";
import { hreflangFor } from "@/i18n/seo";
import BasePage from "../../boutique/page";

export const generateMetadata = (): Metadata => hreflangFor("/boutique");

export default function LocalizedBoutiquePage() {
  return <BasePage />;
}
