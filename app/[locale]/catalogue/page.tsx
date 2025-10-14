import type { Metadata } from "next";
import { hreflangFor } from "@/i18n/seo";
import BasePage from "../../catalogue/page";

export const generateMetadata = (): Metadata => hreflangFor("/catalogue");

export default function LocalizedCataloguePage() {
  return <BasePage />;
}
