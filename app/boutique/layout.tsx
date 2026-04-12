import type { Metadata } from "next"
import { generateMetadata as genMetadata } from "@/lib/seo"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = genMetadata({
  title: "Boutique Ekwip - Achetez vos équipements IT neufs au Maroc",
  description:
    "Achetez vos équipements informatiques professionnels neufs : ordinateurs portables, smartphones, tablettes, accessoires. Livraison rapide et garantie constructeur.",
  keywords: [
    "achat équipement IT Maroc",
    "ordinateur portable neuf",
    "smartphone neuf",
    "tablette professionnelle",
    "accessoires informatiques",
    "boutique IT Maroc",
    "vente équipement informatique",
  ],
  url: "/boutique",
  type: "website",
})

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

