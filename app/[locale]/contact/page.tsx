import type { Metadata } from "next";
import { hreflangFor } from "@/i18n/seo";
import BasePage from "../../contact/page";

export const generateMetadata = (): Metadata => hreflangFor("/contact");

export default function LocalizedContactPage() {
  return <BasePage />;
}
