"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { refreshCategories, refreshProducts } from "@/lib/products"

export default function CataloguePage() {
  const [categories, setCategories] = useState<any[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])

  useEffect(() => {
    // Charger les catégories et produits
    const loadedCategories = refreshCategories()
    const loadedProducts = refreshProducts()

    setCategories(loadedCategories)
    setFeaturedProducts(loadedProducts.filter((p: any) => p.isFeatured).slice(0, 4))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-ekwip to-ekwip-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre Catalogue d'Équipements</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Découvrez notre gamme complète de matériel informatique et d'équipements professionnels disponibles à la
            location
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explorez par catégorie</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trouvez exactement ce dont vous avez besoin parmi nos différentes catégories d'équipements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/catalogue/${category.slug}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <Badge variant="secondary" className="bg-white/90">
                        {category.count} produits
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Button variant="ghost" className="group-hover:translate-x-2 transition-transform w-full">
                      Voir les produits
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Produits en vedette</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez nos équipements les plus populaires et les nouveautés de notre catalogue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/catalogue/product/${product.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.isNew && <Badge className="absolute top-2 right-2 bg-green-500">Nouveau</Badge>}
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2">
                        {product.brand}
                      </Badge>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-ekwip">{product.price} DH</p>
                          <p className="text-xs text-gray-500">par mois</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Voir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-ekwip text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Besoin d'aide pour choisir ?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Nos experts sont là pour vous conseiller et vous aider à trouver la solution parfaite pour votre entreprise
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-ekwip hover:bg-gray-100">
              Contacter un expert
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 bg-transparent">
              Demander un devis
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
