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
  title: "Ekwip - Location d'équipements informatiques professionnels",
  description:
    "Ekwip propose des solutions de location d'équipements informatiques flexibles pour les entreprises au Maroc. Ordinateurs portables, imprimantes, serveurs et plus encore.",
  keywords:
    "location équipement informatique, location ordinateur portable, location imprimante, location serveur, Maroc, Casablanca, entreprise",
    generator: 'v0.app'
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
