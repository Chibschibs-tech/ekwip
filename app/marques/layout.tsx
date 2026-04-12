import type { Metadata } from "next"
import { generateMetadata as genMetadata } from "@/lib/seo"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = genMetadata({
  title: "Nos marques — Ekwip | Matériel IT professionnel au Maroc",
  description:
    "Découvrez toutes les marques d'équipement informatique disponibles chez Ekwip : HP, Dell, Lenovo, Apple et bien d'autres. Matériel neuf avec garantie constructeur.",
  keywords: [
    "marques informatiques Maroc",
    "HP Maroc",
    "Dell Maroc",
    "Lenovo Maroc",
    "matériel IT professionnel",
  ],
  url: "/marques",
  type: "website",
})

export default function MarquesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
