import type { Metadata } from "next"
import { generateMetadata as genMetadata } from "@/lib/seo"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = genMetadata({
  title: "Catalogue Ekwip - Location d'équipements IT au Maroc",
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
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
