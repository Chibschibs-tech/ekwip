"use client"

import { useState, useMemo } from "react"
import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Laptop,
  Monitor,
  Smartphone,
  Server,
  Headphones,
  Printer,
  TabletSmartphone,
  HardDrive,
  Search,
  Filter,
  Armchair,
  ArrowRight,
} from "lucide-react"
import RentalProductCard from "@/components/rental-product-card"
import Image from "next/image"
import { useCategories } from "@/contexts/categories-context"
import { useProducts } from "@/contexts/products-context"
import { useBrands } from "@/contexts/brands-context"
import { formatPrice } from "@/lib/products"

// Map of category slugs to icons
const categoryIcons: Record<string, React.ReactNode> = {
  "ordinateurs-portables": <Laptop className="h-8 w-8" />,
  "ordinateurs-de-bureau": <Monitor className="h-8 w-8" />,
  smartphones: <Smartphone className="h-8 w-8" />,
  tablettes: <TabletSmartphone className="h-8 w-8" />,
  accessoires: <Headphones className="h-8 w-8" />,
  imprimantes: <Printer className="h-8 w-8" />,
  mobilier: <Armchair className="h-8 w-8" />,
  serveurs: <Server className="h-8 w-8" />,
  stockage: <HardDrive className="h-8 w-8" />,
}

// Map of category slugs to product images
const categoryImages: Record<string, string> = {
  "ordinateurs-portables": "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png",
  "ordinateurs-de-bureau": "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptops",
  smartphones: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/smartphone.webp",
  tablettes: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/tablet.png",
  accessoires: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/keyboard%20%26%20mouse.png",
  imprimantes: "/images/printer-hero.png",
  mobilier: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/chair.png",
}

export default function Catalogue() {
  // Fetch data from API contexts
  const { categories, loading: categoriesLoading } = useCategories()
  const { products: allProducts, loading: productsLoading } = useProducts()
  const { brands: allBrands, loading: brandsLoading } = useBrands()

  // Filter for rental products only (active status)
  const rentalProducts = useMemo(() => {
    return allProducts.filter((p) => p.productType === "rent" && p.status === "active")
  }, [allProducts])

  // Get active categories only
  const activeCategories = useMemo(() => {
    return categories.filter((cat) => cat.isActive)
  }, [categories])

  // Get available brands from rental products
  const availableBrands = useMemo(() => {
    const brandIds = new Set(rentalProducts.map((p) => p.brandId).filter(Boolean))
    return allBrands.filter((b) => brandIds.has(b.id) && b.isActive)
  }, [rentalProducts, allBrands])

  // Get brand map for quick lookup
  const brandMap = useMemo(() => {
    return new Map(allBrands.map((b) => [b.id, b.name]))
  }, [allBrands])

  const loading = categoriesLoading || productsLoading || brandsLoading

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Notre catalogue d'équipements</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète d'équipements professionnels en location
          </p>
        </div>
      </section>

      {/* Modern Categories Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Nos catégories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explorez nos différentes catégories d'équipements professionnels
            </p>
          </div>

          {/* Categories Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeCategories.map((category) => (
                <Link href={`/catalogue/${category.slug}`} key={category.id} className="group">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-ekwip-50 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-ekwip-200 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 hover:bg-ekwip hover:bg-none hover:border-ekwip">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ekwip-100 to-transparent rounded-full -mr-16 -mt-16 opacity-70 group-hover:from-white/20"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ekwip-100 to-transparent rounded-full -ml-12 -mb-12 opacity-70 group-hover:from-white/20"></div>

                    {/* Product Image in Circle */}
                    <div className="absolute top-2 right-2 w-24 h-24 rounded-full bg-white border-3 border-ekwip-100 group-hover:border-white overflow-hidden flex items-center justify-center shadow-md z-10">
                      {categoryImages[category.slug] || category.image ? (
                        <Image
                          src={categoryImages[category.slug] || category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-ekwip-300 rounded-full group-hover:bg-white/30"></div>
                      )}
                    </div>

                    {/* Icon Container */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-ekwip text-white mb-4 group-hover:scale-110 group-hover:bg-white group-hover:text-ekwip transition-all duration-300 shadow-md relative z-10">
                      {categoryIcons[category.slug] || <Laptop className="h-8 w-8" />}
                    </div>

                    {/* Category Info */}
                    <div className="space-y-2 relative z-10">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-gray-100 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2 group-hover:text-gray-300 transition-colors">
                        {category.description || ""}
                      </p>

                      {/* Product Count */}
                      <div className="flex items-center justify-between pt-3">
                        <span className="text-xs font-semibold text-ekwip bg-ekwip-100 px-3 py-1 rounded-full shadow-sm group-hover:bg-white/20 group-hover:text-white transition-colors">
                          {category.productCount || 0} {(category.productCount || 0) > 1 ? "produits" : "produit"}
                        </span>
                        <div className="flex items-center text-ekwip font-medium text-sm group-hover:text-gray-100 transition-colors">
                          Découvrir
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Tous nos produits</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Parcourez l'ensemble de notre catalogue d'équipements professionnels
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Filter className="h-5 w-5" />
                <span>Filtres</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input placeholder="Rechercher un produit..." className="pl-10" />
                </div>

                {/* Category Filter */}
                <Select>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {activeCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Brand Filter */}
                <Select>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Toutes les marques" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les marques</SelectItem>
                    {availableBrands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                  En stock uniquement
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                  Nouveautés
                </Badge>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : rentalProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun produit disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rentalProducts.map((product) => (
                <RentalProductCard key={product.id} product={product} brandName={brandMap.get(product.brandId)} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Charger plus de produits
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {rentalProducts.filter((p) => p.isFeatured).length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Produits populaires</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Découvrez les équipements les plus demandés par nos clients
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rentalProducts
                .filter((p) => p.isFeatured)
                .slice(0, 3)
                .map((product) => (
                  <Card key={product.id} className="border border-slate-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="bg-slate-100 p-8 flex items-center justify-center">
                        <Image
                          src={product.thumbnail || product.images?.[0] || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={150}
                          className="object-contain"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <div className="bg-ekwip-100 text-ekwip px-2 py-1 rounded text-xs font-medium">Populaire</div>
                        </div>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.shortDescription || product.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-slate-500">À partir de</p>
                            <p className="text-xl font-bold">{formatPrice(product.price)}/mois</p>
                          </div>
                          <Link href={`/catalogue/product/${product.slug}`}>
                            <Button variant="outline">Voir les détails</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/catalogue">
                <Button className="bg-ekwip hover:bg-ekwip-700">Voir tous les produits</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Brands Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Nos marques partenaires</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nous travaillons avec les meilleures marques pour vous offrir des équipements de qualité
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {availableBrands.length > 0 ? (
              availableBrands.slice(0, 8).map((brand) => (
                <div
                  key={brand.id}
                  className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32 hover:bg-slate-200 transition-colors"
                >
                  {brand.logo ? (
                    <Image src={brand.logo} alt={brand.name} width={120} height={60} className="object-contain" />
                  ) : (
                    <div className="text-slate-400 font-medium">{brand.name}</div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">Aucune marque disponible</div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Contactez-nous pour un devis personnalisé ou pour discuter de vos besoins spécifiques
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
