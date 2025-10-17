// app/[locale]/page.tsx
import type { Metadata } from "next";
import { hreflangFor } from "@/i18n/seo";

// Hreflang pour la home (/, /fr, /en, /ar)
export const generateMetadata = (): Metadata => hreflangFor("/");

// On réutilise la vraie home non-localisée
export { default } from "@/app/page";
