import type { Metadata } from "next"
import { generateMetadata as genMetadata } from "@/lib/seo"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = genMetadata({
  title: "Ma liste de besoins — Ekwip",
  description: "Récapitulatif de vos équipements sélectionnés et demande de devis personnalisé.",
  url: "/ma-liste-besoins",
  type: "website",
  noindex: true,
})

export default function MaListeBesoinsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
