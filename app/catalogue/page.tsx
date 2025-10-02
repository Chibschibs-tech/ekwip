"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllCategories, getAllProducts } from "@/lib/products"
import { Package, ArrowRight } from "lucide-react"

export default function CataloguePage() {
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    // Charger les catégories et produits
    const loadData = () => {
      const cats = getAllCategories()
      const prods = getAllProducts()
      setCategories(cats)
      setProducts(prods)
    }

    loadData()

    // Écouter les changements de localStorage
    const handleStorageChange = () => {
      loadData()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // Compter les produits par catégorie
  const getProductCount = (categoryName: string) => {
    return products.filter((p) => p.categories?.includes(categoryName)).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Notre Catalogue d'Équipements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez notre gamme complète d'équipements informatiques professionnels disponibles à la location
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Catégories</p>
                  <p className="text-3xl font-bold text-blue-600">{categories.length}</p>
                </div>
                <Package className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Produits</p>
                  <p className="text-3xl font-bold text-purple-600">{products.length}</p>
                </div>
                <Package className="h-12 w-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Disponibles</p>
                  <p className="text-3xl font-bold text-green-600">{products.filter((p) => p.stock > 0).length}</p>
                </div>
                <Package className="h-12 w-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des catégories */}
        {categories.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune catégorie disponible</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Les catégories créées dans l'admin apparaîtront ici automatiquement.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const productCount = getProductCount(category.name)

              return (
                <Link key={category.id} href={`/catalogue/${category.slug}`} className="group">
                  <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-2 hover:border-blue-500 dark:hover:border-blue-400">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {category.name}
                          </CardTitle>
                          {category.description && (
                            <CardDescription className="mt-2 line-clamp-2">{category.description}</CardDescription>
                          )}
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant={productCount > 0 ? "default" : "secondary"}>
                          {productCount} {productCount === 1 ? "produit" : "produits"}
                        </Badge>
                        {category.parent && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">Sous-catégorie</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}

        {/* Section tous les produits */}
        {products.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/catalogue/tous-les-produits"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Voir tous les produits
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
