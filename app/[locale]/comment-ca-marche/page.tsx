import type { Metadata } from "next";
import { hreflangFor } from "@/i18n/seo";
import BasePage from "../../comment-ca-marche/page";

export const generateMetadata = (): Metadata => hreflangFor("/comment-ca-marche");

export default function LocalizedHowItWorksPage() {
  return <BasePage />;
}
