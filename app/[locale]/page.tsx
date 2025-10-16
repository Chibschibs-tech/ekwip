// app/[locale]/page.tsx
import LanguageSwitcher from "../../components/LanguageSwitcher";
import type {Metadata} from "next";
import {hreflangFor} from "@/i18n/seo";

export const generateMetadata = (): Metadata => hreflangFor("/");

export default function HomeLocalized() {
  return (
    <main style={{ padding: 24 }}>
      <LanguageSwitcher />
      <h1>Home — Localized route</h1>
      <p>Cette page teste /fr et /en sans impacter les routes actuelles, 
         tout en préservant la route et la query lors du switch.</p>
    </main>
  );
}
