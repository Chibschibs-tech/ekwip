"use client"

import { useMemo, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Laptop, Printer, Monitor, Server, Wifi, Package, ShoppingBag, Truck, Shield, Headphones, ChevronLeft, ChevronRight } from "lucide-react"
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

// Main categories (grandes catégories) for the slider
const mainCategories = [
  { 
    name: "PC portable", 
    slug: "ordinateurs-portables", 
    icon: Laptop,
    image: "/images/categories/laptop.png"
  },
  { 
    name: "PC bureau", 
    slug: "ordinateurs-de-bureau", 
    icon: Monitor,
    image: "/images/categories/desktop.png"
  },
  { 
    name: "Impression", 
    slug: "imprimantes", 
    icon: Printer,
    image: "/images/categories/printer.png"
  },
  { 
    name: "Tablette & Téléphonie", 
    slug: "tablettes-telephonie", 
    icon: Package,
    image: "/images/categories/tablet.png"
  },
  { 
    name: "Image & Son", 
    slug: "image-son", 
    icon: Monitor,
    image: "/images/categories/tv.png"
  },
  { 
    name: "Accessoire", 
    slug: "accessoires", 
    icon: Package,
    image: "/images/categories/accessories.png"
  },
  { 
    name: "Vidéo Surveillance", 
    slug: "video-surveillance", 
    icon: Server,
    image: "/images/categories/camera.png"
  },
  { 
    name: "Logiciel", 
    slug: "logiciels", 
    icon: Package,
    image: "/images/categories/software.png"
  },
  { 
    name: "Réseau", 
    slug: "reseau", 
    icon: Wifi,
    image: "/images/categories/network.png"
  },
]

// Slider data for hero banner
const heroSlides = [
  {
    id: 1,
    badge: "Boutique Ekwip",
    title: "Équipement IT",
    subtitle: "Professionnel",
    description: "Laptops, imprimantes, accessoires et plus encore. Qualité professionnelle garantie.",
    cta: "Découvrir",
    link: "/boutique/tous-les-produits",
    image: "/images/laptop-hero.png",
    gradient: "from-[#1f3b57] via-[#2a4a6b] to-[#1f3b57]",
    accentColor: "text-blue-300",
  },
  {
    id: 2,
    badge: "Ordinateurs Portables",
    title: "Performance",
    subtitle: "& Mobilité",
    description: "Les meilleures marques : HP, Dell, Lenovo. Pour tous vos besoins professionnels.",
    cta: "Voir les laptops",
    link: "/boutique/ordinateurs-portables",
    image: "/images/laptop-hero.png",
    gradient: "from-indigo-700 via-indigo-800 to-indigo-900",
    accentColor: "text-indigo-300",
  },
  {
    id: 3,
    badge: "Offres Spéciales",
    title: "Prix Imbattables",
    subtitle: "Garantis",
    description: "Profitez de nos tarifs compétitifs sur tout le matériel informatique professionnel.",
    cta: "Voir les offres",
    link: "/boutique/tous-les-produits",
    image: "/images/laptop-hero.png",
    gradient: "from-emerald-700 via-teal-700 to-emerald-800",
    accentColor: "text-emerald-300",
  },
]

export default function BoutiquePage() {
  const { categories, loading: categoriesLoading } = useCategories()
  const { products, loading: productsLoading } = useProducts()
  const [currentSlide, setCurrentSlide] = useState(0)

  const loading = categoriesLoading || productsLoading

  // Auto-advance slider every 5 seconds
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

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

  // Format prices - TTC rounded up, HT = TTC / 1.2 (TVA 20%)
  const formatPriceTTC = (priceHT: number) => {
    const priceTTC = Math.ceil(priceHT * 1.2)
    return new Intl.NumberFormat("fr-FR").format(priceTTC) + " Dh"
  }

  const formatPriceHTFromTTC = (priceHT: number) => {
    const priceTTC = Math.ceil(priceHT * 1.2)
    const htFromTTC = Math.round(priceTTC / 1.2)
    return new Intl.NumberFormat("fr-FR").format(htFromTTC) + " Dh HT"
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
              <span className="text-lg font-bold text-[#1f3b57]">{formatPriceTTC(product.price)}</span>
              <span className="text-xs text-slate-500">{formatPriceHTFromTTC(product.price)}</span>
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

      {/* Hero Banners - Slider left + 2 small right */}
      <section className="bg-slate-50 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[600px]">
            {/* Large Banner Slider Left */}
            <div className="lg:col-span-2 relative">
              <div className="relative h-[380px] lg:h-full rounded-2xl overflow-hidden shadow-lg">
                {/* Slides */}
                {heroSlides.map((slide, index) => (
                  <Link
                    key={slide.id}
                    href={slide.link}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <div className={`relative h-full bg-gradient-to-br ${slide.gradient}`}>
                      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
                      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />
                      <div className="relative h-full p-6 md:p-10 flex flex-col justify-between">
                        <div>
                          <Badge className="bg-white/20 text-white border-white/30 mb-4">
                            {slide.badge}
                          </Badge>
                          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            {slide.title}<br />
                            <span className={slide.accentColor}>{slide.subtitle}</span>
                          </h2>
                          <p className="text-white/80 text-sm md:text-lg max-w-md">
                            {slide.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-white font-medium text-lg hover:gap-3 transition-all">
                          {slide.cta} <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-1/2 h-full hidden md:block">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-contain object-right-bottom p-4 opacity-90"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => { e.preventDefault(); prevSlide(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-all"
                  aria-label="Slide précédente"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); nextSlide(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-all"
                  aria-label="Slide suivante"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentSlide 
                          ? "bg-white w-8" 
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Aller à la slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - 2 Stacked Banners */}
            <div className="flex flex-col gap-4 h-auto lg:h-full">
              {/* Top Right Banner */}
              <Link href="/boutique/imprimantes" className="flex-1 group">
                <div className="relative h-[180px] lg:h-full rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg">
                  <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div>
                      <Badge className="bg-white/20 text-white border-white/30 mb-3 text-xs">
                        Imprimantes
                      </Badge>
                      <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        Solutions d'impression
                      </h3>
                      <p className="text-white/70 text-sm mt-2 hidden lg:block">
                        HP, Brother, Epson et plus
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium group-hover:gap-3 transition-all">
                      Voir les offres <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-1/3 h-full hidden sm:block">
                    <Image
                      src="/images/printer-hero.png"
                      alt="Imprimante"
                      fill
                      className="object-contain object-right-bottom p-2 opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </Link>

              {/* Bottom Right Banner */}
              <Link href="/boutique/accessoires" className="flex-1 group">
                <div className="relative h-[180px] lg:h-full rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                  <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div>
                      <Badge className="bg-white/20 text-white border-white/30 mb-3 text-xs">
                        Accessoires
                      </Badge>
                      <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        Périphériques & Plus
                      </h3>
                      <p className="text-white/70 text-sm mt-2 hidden lg:block">
                        Claviers, souris, câbles...
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium group-hover:gap-3 transition-all">
                      Explorer <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-4 text-7xl opacity-20">
                    🎧
                  </div>
                </div>
              </Link>
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

      {/* Categories Slider Section */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Main Categories Slider */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-6 md:gap-8 min-w-max justify-center">
              {mainCategories.map((mainCat) => (
                <Link 
                  key={mainCat.slug} 
                  href={`/boutique/${mainCat.slug}`}
                  className="flex flex-col items-center group"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-all duration-300 overflow-hidden shadow-sm group-hover:shadow-md">
                    {mainCat.image ? (
                      <Image
                        src={mainCat.image}
                        alt={mainCat.name}
                        width={80}
                        height={80}
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <mainCat.icon className="h-10 w-10 md:h-12 md:w-12 text-[#1f3b57] group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                  <span className="mt-3 text-sm font-medium text-slate-700 group-hover:text-[#1f3b57] transition-colors text-center max-w-[100px]">
                    {mainCat.name}
                  </span>
                </Link>
              ))}
            </div>
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
