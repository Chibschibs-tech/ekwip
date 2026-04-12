import type { Metadata } from "next"
import { generateMetadata as genMetadata } from "@/lib/seo"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = genMetadata({
  title: "Contact — Ekwip | Partenaire IT au Maroc",
  description:
    "Contactez Ekwip pour un devis, un projet de développement ou toute question. Basé à Casablanca, nous vous répondons sous 24h.",
  keywords: [
    "contact Ekwip",
    "devis IT Maroc",
    "partenaire informatique Casablanca",
  ],
  url: "/contact",
  type: "website",
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
