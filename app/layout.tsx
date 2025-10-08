import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"
import { AuthProvider } from "@/contexts/auth-context"
import { LanguageProvider } from "@/contexts/language-context"
import { CartProvider } from "@/contexts/cart-context"
import { ProductsProvider } from "@/contexts/products-context"
import { CategoriesProvider } from "@/contexts/categories-context"
import { BrandsProvider } from "@/contexts/brands-context"
import { AttributesProvider } from "@/contexts/attributes-context"
import { DataSync } from "@/components/data-sync"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ekwip - Location d'équipements informatiques professionnels",
  description:
    "Louez vos équipements IT sur-mesure avec Ekwip. Flexibilité, performance et tranquillité d'esprit garanties.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AdminAuthProvider>
            <AuthProvider>
              <LanguageProvider>
                <ProductsProvider>
                  <CategoriesProvider>
                    <BrandsProvider>
                      <AttributesProvider>
                        <CartProvider>
                          <DataSync />
                          {children}
                          <Toaster />
                        </CartProvider>
                      </AttributesProvider>
                    </BrandsProvider>
                  </CategoriesProvider>
                </ProductsProvider>
              </LanguageProvider>
            </AuthProvider>
          </AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
