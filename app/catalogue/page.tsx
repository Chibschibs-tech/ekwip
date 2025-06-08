"use client"

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
import { storeProducts } from "@/lib/store-products"
import CatalogProductCard from "@/components/catalog-product-card"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

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

// Map of category slugs to product images - UPDATED WITH NEW ASSIGNMENTS
const categoryImages: Record<string, string> = {
  "ordinateurs-portables": "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png",
  "ordinateurs-de-bureau": "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptops", // Previous laptop image now for desktops
  smartphones: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/smartphone.webp",
  tablettes: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/tablet.png",
  accessoires: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/keyboard%20%26%20mouse.png",
  imprimantes: "/images/printer-hero.png",
  mobilier: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/chair.png",
}

// Mock categories (no WordPress)
const categories = [
  {
    id: 1,
    name: "Ordinateurs portables",
    slug: "ordinateurs-portables",
    description: "Ordinateurs portables professionnels pour tous vos besoins",
    count: 10,
    parent: 0,
  },
  {
    id: 2,
    name: "Ordinateurs de bureau",
    slug: "ordinateurs-de-bureau",
    description: "Stations de travail performantes pour vos équipes",
    count: 8,
    parent: 0,
  },
  {
    id: 3,
    name: "Smartphones",
    slug: "smartphones",
    description: "Smartphones professionnels pour vos équipes mobiles",
    count: 6,
    parent: 0,
  },
  {
    id: 4,
    name: "Tablettes",
    slug: "tablettes",
    description: "Tablettes tactiles pour une productivité en déplacement",
    count: 5,
    parent: 0,
  },
  {
    id: 5,
    name: "Accessoires",
    slug: "accessoires",
    description: "Accessoires et périphériques pour compléter votre équipement",
    count: 15,
    parent: 0,
  },
  {
    id: 6,
    name: "Imprimantes",
    slug: "imprimantes",
    description: "Solutions d'impression pour tous vos besoins professionnels",
    count: 7,
    parent: 0,
  },
  {
    id: 7,
    name: "Mobilier",
    slug: "mobilier",
    description: "Mobilier de bureau ergonomique et fonctionnel",
    count: 9,
    parent: 0,
  },
]

export default function Catalogue() {
  // Get all available categories from products for filtering
  const availableCategories = Array.from(new Set(storeProducts.map((product) => product.category)))
  const availableBrands = Array.from(new Set(storeProducts.map((product) => product.brand)))
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{t("catalogue.title")}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("catalogue.description")}</p>
        </div>
      </section>

      {/* Modern Categories Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t("catalogue.categories.title")}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("catalogue.categories.description")}</p>
          </div>

          {/* Categories Grid - Fixed: Solid Ekwip Blue on Hover with Light Grey Text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link href={`/catalogue/${category.slug}`} key={category.id} className="group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-ekwip-50 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-ekwip-200 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 hover:bg-ekwip hover:bg-none hover:border-ekwip">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ekwip-100 to-transparent rounded-full -mr-16 -mt-16 opacity-70 group-hover:from-white/20"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ekwip-100 to-transparent rounded-full -ml-12 -mb-12 opacity-70 group-hover:from-white/20"></div>

                  {/* Product Image in Circle - CENTERED AND FULLY VISIBLE */}
                  <div className="absolute top-2 right-2 w-24 h-24 rounded-full bg-white border-3 border-ekwip-100 group-hover:border-white overflow-hidden flex items-center justify-center shadow-md z-10">
                    {categoryImages[category.slug] ? (
                      <Image
                        src={categoryImages[category.slug] || "/placeholder.svg"}
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

                  {/* Category Info - UPDATED TEXT COLORS */}
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-gray-100 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 group-hover:text-gray-300 transition-colors">
                      {category.description}
                    </p>

                    {/* Product Count */}
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-xs font-semibold text-ekwip bg-ekwip-100 px-3 py-1 rounded-full shadow-sm group-hover:bg-white/20 group-hover:text-white transition-colors">
                        {category.count} {category.count > 1 ? t("common.products") : t("common.product")}
                      </span>
                      <div className="flex items-center text-ekwip font-medium text-sm group-hover:text-gray-100 transition-colors">
                        {t("common.discover")}
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t("catalogue.all_products.title")}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("catalogue.all_products.description")}</p>
          </div>

          {/* Filters Section */}
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Filter className="h-5 w-5" />
                <span>{t("catalogue.filters")}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input placeholder={t("catalogue.search_placeholder")} className="pl-10" />
                </div>

                {/* Category Filter */}
                <Select>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder={t("catalogue.all_categories")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("catalogue.all_categories")}</SelectItem>
                    {availableCategories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Brand Filter */}
                <Select>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder={t("catalogue.all_brands")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("catalogue.all_brands")}</SelectItem>
                    {availableBrands.map((brand) => (
                      <SelectItem key={brand} value={brand.toLowerCase()}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                  {t("catalogue.in_stock_only")}
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                  {t("catalogue.new_items")}
                </Badge>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {storeProducts.map((product) => (
              <CatalogProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              {t("catalogue.load_more")}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t("catalogue.popular_products")}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("catalogue.popular_description")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-slate-100 p-8 flex items-center justify-center">
                  <Image
                    src="https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png"
                    alt="MacBook Pro"
                    width={200}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">MacBook Pro 14"</h3>
                    <div className="bg-ekwip-100 text-ekwip px-2 py-1 rounded text-xs font-medium">
                      {t("common.popular")}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">Processeur M2 Pro, 16 Go RAM, 512 Go SSD</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-500">{t("catalogue.from")}</p>
                      <p className="text-xl font-bold">120 €/{t("common.month")}</p>
                    </div>
                    <Button variant="outline">{t("catalogue.view_details")}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-slate-100 p-8 flex items-center justify-center">
                  <Monitor className="h-20 w-20 text-slate-600" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Dell XPS Desktop</h3>
                    <div className="bg-ekwip-100 text-ekwip px-2 py-1 rounded text-xs font-medium">
                      {t("common.new")}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">Intel i7, 32 Go RAM, 1 To SSD, RTX 3060</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-500">{t("catalogue.from")}</p>
                      <p className="text-xl font-bold">95 €/{t("common.month")}</p>
                    </div>
                    <Button variant="outline">{t("catalogue.view_details")}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-slate-100 p-8 flex items-center justify-center">
                  <Smartphone className="h-20 w-20 text-slate-600" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">iPhone 15 Pro</h3>
                    <div className="bg-ekwip-100 text-ekwip px-2 py-1 rounded text-xs font-medium">
                      {t("common.popular")}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">256 Go, forfait data 100 Go inclus</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-500">{t("catalogue.from")}</p>
                      <p className="text-xl font-bold">45 €/{t("common.month")}</p>
                    </div>
                    <Button variant="outline">{t("catalogue.view_details")}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-ekwip hover:bg-ekwip-700">{t("catalogue.view_all_products")}</Button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t("catalogue.partner_brands")}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("catalogue.partner_brands_description")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32 hover:bg-slate-200 transition-colors">
              <div className="text-slate-400 font-medium">Apple</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32 hover:bg-slate-200 transition-colors">
              <div className="text-slate-400 font-medium">Dell</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32 hover:bg-slate-200 transition-colors">
              <div className="text-slate-400 font-medium">HP</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32 hover:bg-slate-200 transition-colors">
              <div className="text-slate-400 font-medium">Lenovo</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32 hover:bg-slate-200 transition-colors">
              <div className="text-slate-400 font-medium">Samsung</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32 hover:bg-slate-200 transition-colors">
              <div className="text-slate-400 font-medium">Microsoft</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32 hover:bg-slate-200 transition-colors">
              <div className="text-slate-400 font-medium">Cisco</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32 hover:bg-slate-200 transition-colors">
              <div className="text-slate-400 font-medium">Asus</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">{t("catalogue.not_found_title")}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">{t("catalogue.not_found_description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-ekwip hover:bg-ekwip-700">{t("catalogue.custom_quote")}</Button>
            <Button variant="outline">{t("catalogue.talk_to_expert")}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
