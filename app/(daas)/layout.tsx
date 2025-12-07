import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/contexts/auth-context"
import { NeedsListProvider } from "@/contexts/cart-context"
import { LanguageProvider } from "@/contexts/language-context"
import { ProductsProvider } from "@/contexts/products-context"
import { CategoriesProvider } from "@/contexts/categories-context"
import { BrandsProvider } from "@/contexts/brands-context"
import { AttributesProvider } from "@/contexts/attributes-context"
import { Toaster } from "@/components/ui/toaster"
import { DataSync } from "@/components/data-sync"



import { generateMetadata as genMetadata } from "@/lib/seo"

export const metadata = genMetadata({
  title: "Ekwip DaaS - Location d'équipements IT pour entreprises au Maroc",
  description:
    "Parc informatique, smartphones, tablettes et accessoires en location mensuelle. Portail client pour suivre votre parc, vos contrats et renouvellements. Solutions IT flexibles pour entreprises.",
  keywords: [
    "location équipement IT Maroc",
    "DaaS Maroc",
    "location ordinateur portable",
    "location smartphone",
    "location tablette",
    "parc informatique",
    "portail client IT",
    "équipement IT entreprise",
    "location mensuelle IT",
  ],
  url: "/",
  type: "website",
})

export default function DaasLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ProductsProvider>
          <CategoriesProvider>
            <BrandsProvider>
              <AttributesProvider>
                <NeedsListProvider>
                  <DataSync />
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                  </div>
                  <Toaster />
                </NeedsListProvider>
              </AttributesProvider>
            </BrandsProvider>
          </CategoriesProvider>
        </ProductsProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}
