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

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ekwip.ma"),
  title: {
    default: "Ekwip - Infrastructure IT, Solutions AV et Développement sur-mesure",
    template: "%s | Ekwip",
  },
  description:
    "Ekwip aligne vos équipes, outils et équipements. Location d'équipements IT (DaaS), solutions audiovisuelles (Connect) et développement sur-mesure (Tech) pour les entreprises au Maroc.",
  keywords: [
    "location équipement IT Maroc",
    "DaaS Maroc",
    "infrastructure IT entreprise",
    "solutions audiovisuelles Maroc",
    "développement sur-mesure",
    "agents IA entreprise",
    "automatisation processus",
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
    title: "Ekwip - Infrastructure IT, Solutions AV et Développement sur-mesure",
    description:
      "Ekwip aligne vos équipes, outils et équipements. Location d'équipements IT, solutions audiovisuelles et développement sur-mesure pour les entreprises au Maroc.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekwip - Infrastructure IT, Solutions AV et Développement sur-mesure",
    description:
      "Ekwip aligne vos équipes, outils et équipements. Location d'équipements IT, solutions audiovisuelles et développement sur-mesure pour les entreprises au Maroc.",
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "verification_token_here",
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
