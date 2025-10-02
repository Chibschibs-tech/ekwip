"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import CatalogProductCard from "@/components/catalog-product-card"
import { ArrowLeft, Search, Filter } from "lucide-react"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popularity")
  const [category, setCategory] = useState<any>(null)
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      const cat = getCategoryBySlug(params.slug)
      const prods = getProductsByCategory(params.slug)

      setCategory(cat)
      setAllProducts(prods)
      setIsLoading(false)
    }

    loadData()
  }, [params.slug])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.basePrice - b.basePrice
        case "price_desc":
          return b.basePrice - a.basePrice
        case "newest":
          return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
        case "popularity":
        default:
          return a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1
      }
    })

    return sorted
  }, [allProducts, searchQuery, sortBy])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!category) {
    notFound()
  }

  const productCount = filteredAndSortedProducts.length

  return (
    <div>
      {/* Breadcrumb */}
      <section className="py-6 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-900">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/catalogue" className="text-gray-500 hover:text-gray-900">
              Catalogue
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{category.name}</span>
          </nav>
        </div>
      </section>

      {/* Category Header */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link href="/catalogue" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au catalogue
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{category.name}</h1>

              <p className="text-lg text-gray-600 mb-6">{category.description}</p>

              <div className="flex items-center gap-4 mb-8">
                <Badge variant="outline" className="text-gray-900 border-gray-900">
                  {productCount} {productCount === 1 ? "produit disponible" : "produits disponibles"}
                </Badge>
              </div>

              <p className="text-gray-600">
                Trouvez l'équipement parfait pour vos besoins professionnels dans notre sélection de{" "}
                {category.name.toLowerCase()}
              </p>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={500}
                  height={400}
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 whitespace-nowrap">Trier par</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularité</SelectItem>
                  <SelectItem value="price_asc">Prix croissant</SelectItem>
                  <SelectItem value="price_desc">Prix décroissant</SelectItem>
                  <SelectItem value="newest">Nouveautés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedProducts.map((product) => (
                <CatalogProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <Filter className="h-16 w-16 text-gray-300 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche ou parcourez d'autres catégories
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Réinitialiser les filtres
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Rent Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pourquoi louer vos {category.name.toLowerCase()} ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les avantages de la location d'équipements professionnels avec Ekwip
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Préservez votre trésorerie</h3>
              <p className="text-gray-600">
                Transformez vos dépenses d'investissement en coûts opérationnels prévisibles
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Flexibilité maximale</h3>
              <p className="text-gray-600">Adaptez votre parc d'équipements selon l'évolution de vos besoins</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Maintenance incluse</h3>
              <p className="text-gray-600">Bénéficiez d'un support technique complet et d'une maintenance préventive</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à équiper votre entreprise ?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour obtenir un devis personnalisé et découvrir nos solutions de location flexibles
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Demander un devis
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 bg-transparent">
              Parler à un expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
