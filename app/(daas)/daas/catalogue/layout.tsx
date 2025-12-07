import type { Metadata } from "next"
import { generateMetadata as genMetadata } from "@/lib/seo"

export const metadata: Metadata = genMetadata({
  title: "Catalogue Ekwip DaaS - Location d'équipements IT au Maroc",
  description:
    "Découvrez notre catalogue complet d'équipements IT en location : ordinateurs portables, smartphones, tablettes, serveurs, imprimantes. Durées flexibles de 6 à 36 mois.",
  keywords: [
    "catalogue location IT",
    "location ordinateur portable",
    "location smartphone",
    "location serveur",
    "équipement IT location",
    "DaaS catalogue",
    "location mensuelle IT",
  ],
  url: "/catalogue",
  type: "website",
})

export default function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

