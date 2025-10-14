import type { Metadata } from "next";
import { hreflangFor } from "@/i18n/seo";

export const generateMetadata = (): Metadata => hreflangFor("/store");

// Serve the Boutique page for /[locale]/store
export { default } from "../../boutique/page";
