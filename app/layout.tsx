import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { NeedsListProvider } from "@/contexts/cart-context"
import { LanguageProvider } from "@/contexts/language-context"
import { ProductsProvider } from "@/contexts/products-context"
import { CategoriesProvider } from "@/contexts/categories-context"
import { BrandsProvider } from "@/contexts/brands-context"
import { AttributesProvider } from "@/contexts/attributes-context"
import { Toaster } from "@/components/ui/toaster"
import { DataSync } from "@/components/data-sync"
import { WhatsAppButton } from "@/components/whatsapp-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ekwip.ma"),
  title: {
    default: "Ekwip — Votre partenaire IT au Maroc | Vente, Location & Développement",
    template: "%s | Ekwip",
  },
  description:
    "Ekwip équipe les entreprises marocaines : vente de matériel informatique, location IT via Rento, et développement digital sur-mesure. Basé à Casablanca.",
  keywords: [
    "vente matériel informatique Maroc",
    "équipement IT entreprise",
    "partenaire IT Casablanca",
    "location matériel informatique",
    "développement web Maroc",
  ],
  authors: [{ name: "Ekwip" }],
  creator: "Ekwip",
  publisher: "Ekwip",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ekwip.ma",
    siteName: "Ekwip",
    title: "Ekwip — Votre partenaire IT au Maroc | Vente, Location & Développement",
    description:
      "Ekwip équipe les entreprises marocaines : vente de matériel informatique, location IT via Rento, et développement digital sur-mesure. Basé à Casablanca.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekwip — Votre partenaire IT au Maroc | Vente, Location & Développement",
    description:
      "Ekwip équipe les entreprises marocaines : vente de matériel informatique, location IT via Rento, et développement digital sur-mesure. Basé à Casablanca.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <ProductsProvider>
              <CategoriesProvider>
                <BrandsProvider>
                  <AttributesProvider>
                    <NeedsListProvider>
                      <DataSync />
                      {children}
                      <WhatsAppButton />
                      <Toaster />
                    </NeedsListProvider>
                  </AttributesProvider>
                </BrandsProvider>
              </CategoriesProvider>
            </ProductsProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
