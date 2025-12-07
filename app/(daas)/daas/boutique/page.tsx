"use client"

import { BoutiqueSubmenu } from "@/components/boutique-submenu"
import { BoutiquePromotionalBanners } from "@/components/boutique-promotional-banners"
import { BoutiquePopularCategories } from "@/components/boutique-popular-categories"
import { BoutiqueActualites } from "@/components/boutique-actualites"
import { useCategories } from "@/contexts/categories-context"
import { useProducts } from "@/contexts/products-context"

export default function BoutiquePage() {
  const { loading: categoriesLoading, error: categoriesError } = useCategories()
  const { loading: productsLoading, error: productsError } = useProducts()

  const loading = categoriesLoading || productsLoading
  const hasError = categoriesError || productsError

  return (
    <div className="min-h-screen">
      {/* Error Display */}
      {hasError && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              {categoriesError && "⚠️ Impossible de charger les catégories. "}
              {productsError && "⚠️ Impossible de charger les produits. "}
              Veuillez actualiser la page ou contacter le support si le problème persiste.
            </p>
          </div>
        </div>
      )}

      {/* Boutique Submenu */}
      <BoutiqueSubmenu />

      {/* Promotional Banners */}
      <BoutiquePromotionalBanners />

      {/* Popular Categories */}
      <BoutiquePopularCategories />

      {/* Actualités (Blog) Section */}
      <BoutiqueActualites />
    </div>
  )
}
