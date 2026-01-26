"use client"

import { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Laptop, Printer, Monitor, Server, Wifi, Package, ShoppingBag, Truck, Shield, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BoutiqueSubmenu } from "@/components/boutique-submenu"
import { useCategories } from "@/contexts/categories-context"
import { useProducts } from "@/contexts/products-context"

// Category icons mapping
const categoryIcons: Record<string, any> = {
  "cat-laptops": Laptop,
  "cat-desktops": Monitor,
  "cat-printers": Printer,
  "cat-monitors": Monitor,
  "cat-servers": Server,
  "cat-networking": Wifi,
  "cat-accessories": Package,
  "cat-storage": Package,
  "cat-software": Package,
  "cat-ups": Package,
  "cat-multimedia": Package,
}

export default function BoutiquePage() {
  const { categories, loading: categoriesLoading } = useCategories()
  const { products, loading: productsLoading } = useProducts()

  const loading = categoriesLoading || productsLoading

  // Get sale products only
  const saleProducts = useMemo(() => {
    return products.filter((p) => p.productType === "sale" && p.status === "active")
  }, [products])

  // Categories with product counts
  const categoriesWithCounts = useMemo(() => {
    const activeCategories = categories.filter((cat) => cat.isActive)
    return activeCategories
      .map((category) => {
        const productCount = saleProducts.filter((p) => p.categoryId === category.id).length
        return { ...category, productCount }
      })
      .filter((cat) => cat.productCount > 0)
      .sort((a, b) => b.productCount - a.productCount)
  }, [categories, saleProducts])

  // Featured/Recent products (last 8)
  const featuredProducts = useMemo(() => {
    return [...saleProducts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8)
  }, [saleProducts])

  // Best value products (sorted by price, mid-range)
  const bestValueProducts = useMemo(() => {
    const sorted = [...saleProducts].sort((a, b) => a.price - b.price)
    const midIndex = Math.floor(sorted.length / 3)
    return sorted.slice(midIndex, midIndex + 8)
  }, [saleProducts])

  // Format prices - TTC rounded up to nearest integer
  const formatPrice = (priceHT: number) => {
    const priceTTC = Math.ceil(priceHT * 1.2)
    return new Intl.NumberFormat("fr-FR").format(priceTTC) + " Dh"
  }

  const formatPriceHT = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(Math.round(price)) + " Dh"
  }

  // Product Card Component
  const ProductCard = ({ product }: { product: typeof saleProducts[0] }) => (
    <Link href={`/boutique/produit/${product.slug}`}>
      <Card className="h-full group hover:shadow-lg transition-all duration-300 overflow-hidden border-slate-200">
        <CardContent className="p-0">
          <div className="relative aspect-square bg-white overflow-hidden">
            <Image
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <Badge className="absolute top-2 left-2 bg-red-500">
                -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </Badge>
            )}
          </div>
          <div className="p-4 border-t bg-white">
            {product.brandName && (
              <p className="text-xs text-slate-500 mb-1 font-medium">{product.brandName}</p>
            )}
            <h3 className="font-medium text-sm text-slate-900 line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-[#1f3b57] transition-colors">
              {product.name}
            </h3>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#1f3b57]">{formatPrice(product.price)}</span>
              <span className="text-xs text-slate-500">{formatPriceHT(product.price)} HT</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <BoutiqueSubmenu />
        <div className="animate-pulse">
          <div className="h-96 bg-slate-200" />
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="aspect-square bg-slate-200 rounded mb-4" />
                  <div className="h-4 bg-slate-200 rounded mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <BoutiqueSubmenu />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1f3b57] via-[#2a4a6b] to-[#1f3b57] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                Boutique Ekwip
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Équipement IT<br />
                <span className="text-blue-300">Professionnel</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                Découvrez notre sélection de matériel informatique de qualité professionnelle. 
                Laptops, imprimantes, accessoires et plus encore.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/boutique/tous-les-produits">
                  <Button size="lg" className="bg-white text-[#1f3b57] hover:bg-white/90">
                    Voir tous les produits
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/boutique/ordinateurs-portables">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Ordinateurs portables
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
                <Image
                  src="/images/laptop-hero.png"
                  alt="Laptop professionnel"
                  width={500}
                  height={400}
                  className="relative z-10 drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Livraison rapide</p>
                <p className="text-xs text-slate-500">Partout au Maroc</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Garantie incluse</p>
                <p className="text-xs text-slate-500">Sur tous les produits</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100">
                <Headphones className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Support technique</p>
                <p className="text-xs text-slate-500">Assistance dédiée</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-100">
                <ShoppingBag className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Paiement sécurisé</p>
                <p className="text-xs text-slate-500">Transactions protégées</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Nos Catégories</h2>
              <p className="text-slate-600 mt-1">Explorez notre gamme complète</p>
            </div>
            <Link href="/boutique/tous-les-produits" className="hidden sm:flex items-center text-[#1f3b57] hover:underline font-medium">
              Voir tout
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categoriesWithCounts.slice(0, 12).map((category) => {
              const IconComponent = categoryIcons[category.id] || Package
              return (
                <Link key={category.id} href={`/boutique/${category.slug}`}>
                  <Card className="h-full group hover:shadow-lg hover:border-[#1f3b57] transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 group-hover:bg-[#1f3b57]/10 flex items-center justify-center transition-colors">
                        <IconComponent className="h-6 w-6 text-[#1f3b57]" />
                      </div>
                      <h3 className="font-semibold text-sm text-slate-900 mb-1 line-clamp-2 group-hover:text-[#1f3b57] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {category.productCount} produit{category.productCount !== 1 ? "s" : ""}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Nouveautés</h2>
              <p className="text-slate-600 mt-1">Les derniers produits ajoutés</p>
            </div>
            <Link href="/boutique/tous-les-produits?sort=newest" className="hidden sm:flex items-center text-[#1f3b57] hover:underline font-medium">
              Voir tout
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/boutique/tous-les-produits?sort=newest">
              <Button variant="outline">
                Voir toutes les nouveautés
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Value Products */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Meilleurs Rapports Qualité/Prix</h2>
              <p className="text-slate-600 mt-1">Nos recommandations professionnelles</p>
            </div>
            <Link href="/boutique/tous-les-produits?sort=price-asc" className="hidden sm:flex items-center text-[#1f3b57] hover:underline font-medium">
              Voir tout
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestValueProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 md:py-16 bg-[#1f3b57]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Besoin d'un devis personnalisé ?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour vous accompagner dans vos projets d'équipement IT. 
              Contactez-nous pour un devis adapté à vos besoins.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-[#1f3b57] hover:bg-white/90">
                  Demander un devis
                </Button>
              </Link>
              <Link href="/comment-ca-marche">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Comment ça marche ?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#1f3b57]">{saleProducts.length}+</p>
              <p className="text-slate-600 mt-1">Produits disponibles</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#1f3b57]">{categoriesWithCounts.length}</p>
              <p className="text-slate-600 mt-1">Catégories</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#1f3b57]">24h</p>
              <p className="text-slate-600 mt-1">Délai de livraison</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#1f3b57]">100%</p>
              <p className="text-slate-600 mt-1">Satisfaction client</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
