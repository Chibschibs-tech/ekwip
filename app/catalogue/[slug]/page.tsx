"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, ShoppingCart } from "lucide-react"
import { getProductsByCategory } from "@/lib/products"
import { useLanguage } from "@/contexts/language-context"

// Mock categories data
const categories = [
  {
    id: 1,
    name: "Ordinateurs portables",
    slug: "ordinateurs-portables",
    description: "Ordinateurs portables professionnels pour tous vos besoins",
  },
  {
    id: 2,
    name: "Ordinateurs de bureau",
    slug: "ordinateurs-de-bureau",
    description: "Stations de travail performantes pour vos équipes",
  },
  {
    id: 3,
    name: "Smartphones",
    slug: "smartphones",
    description: "Smartphones professionnels pour vos équipes mobiles",
  },
  {
    id: 4,
    name: "Tablettes",
    slug: "tablettes",
    description: "Tablettes tactiles pour une productivité en déplacement",
  },
  {
    id: 5,
    name: "Accessoires",
    slug: "accessoires",
    description: "Accessoires et périphériques pour compléter votre équipement",
  },
  {
    id: 6,
    name: "Imprimantes",
    slug: "imprimantes",
    description: "Solutions d'impression pour tous vos besoins professionnels",
  },
  {
    id: 7,
    name: "Mobilier",
    slug: "mobilier",
    description: "Mobilier de bureau ergonomique et fonctionnel",
  },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage()

  // Find the category
  const category = categories.find((cat) => cat.slug === params.slug)

  if (!category) {
    notFound()
  }

  // Get products for this category
  const categoryProducts = getProductsByCategory(category.name)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-ekwip">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-ekwip">
              Catalogue
            </Link>
            <span>/</span>
            <span className="text-gray-900">{category.name}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/catalogue">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au catalogue
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{category.description}</p>
            <div className="text-sm text-gray-500">
              {categoryProducts.length} produit{categoryProducts.length > 1 ? "s" : ""} disponible
              {categoryProducts.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {categoryProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aucun produit disponible dans cette catégorie pour le moment.</p>
              <Link href="/catalogue">
                <Button variant="outline">Voir toutes les catégories</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative bg-gray-100 aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.new && (
                        <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">Nouveau</Badge>
                      )}
                      {product.featured && (
                        <Badge className="absolute top-3 right-3 bg-ekwip hover:bg-ekwip-700">
                          <Star className="h-3 w-3 mr-1" />
                          Populaire
                        </Badge>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-ekwip transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">À partir de</p>
                          <p className="text-xl font-bold text-ekwip">
                            {product.price}€<span className="text-sm font-normal">/mois</span>
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link href={`/store/product/${product.slug}`} className="flex-1">
                          <Button className="w-full bg-ekwip hover:bg-ekwip-700">Voir détails</Button>
                        </Link>
                        <Button variant="outline" size="icon">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Besoin d'aide pour choisir ?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Nos experts sont là pour vous accompagner dans le choix de vos équipements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-ekwip hover:bg-ekwip-700">Demander un devis personnalisé</Button>
            <Button variant="outline">Parler à un expert</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
