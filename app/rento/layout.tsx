import type { Metadata } from "next"
import { generateMetadata as genMetadata } from "@/lib/seo"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = genMetadata({
  title: "Rento by Ekwip — Location d'équipement IT pour entreprises au Maroc",
  description:
    "Louez votre parc informatique en mensualités. Maintenance, support et renouvellement inclus. Une solution Ekwip pour les entreprises marocaines.",
  keywords: [
    "location équipement IT Maroc",
    "location ordinateur portable",
    "location matériel informatique entreprise",
    "location IT Maroc",
    "parc informatique location",
    "Rento Ekwip",
  ],
  url: "/rento",
  type: "website",
})

export default function RentoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
