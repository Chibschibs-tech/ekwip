"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Mock categories data (no WordPress)
const mockCategories = [
  {
    id: 1,
    name: "Ordinateurs portables",
    slug: "ordinateurs-portables",
    description: "Ordinateurs portables professionnels pour tous vos besoins",
    count: 10,
  },
  {
    id: 2,
    name: "Ordinateurs de bureau",
    slug: "ordinateurs-de-bureau",
    description: "Stations de travail performantes pour vos équipes",
    count: 8,
  },
  {
    id: 3,
    name: "Smartphones",
    slug: "smartphones",
    description: "Smartphones professionnels pour vos équipes mobiles",
    count: 6,
  },
  {
    id: 4,
    name: "Tablettes",
    slug: "tablettes",
    description: "Tablettes tactiles pour une productivité en déplacement",
    count: 5,
  },
  {
    id: 5,
    name: "Accessoires",
    slug: "accessoires",
    description: "Accessoires et périphériques pour compléter votre équipement",
    count: 15,
  },
  {
    id: 6,
    name: "Imprimantes",
    slug: "imprimantes",
    description: "Solutions d'impression pour tous vos besoins professionnels",
    count: 7,
  },
  {
    id: 7,
    name: "Mobilier",
    slug: "mobilier",
    description: "Mobilier de bureau ergonomique et fonctionnel",
    count: 9,
  },
]

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    slug: "macbook-pro-14",
    price: "120",
    short_description: "Processeur M2 Pro, 16 Go RAM, 512 Go SSD",
    images: [
      { src: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png", alt: 'MacBook Pro 14"' },
    ],
    category_id: 1,
  },
  {
    id: 2,
    name: "Dell XPS 13",
    slug: "dell-xps-13",
    price: "95",
    short_description: "Intel i7, 16 Go RAM, 512 Go SSD",
    images: [{ src: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png", alt: "Dell XPS 13" }],
    category_id: 1,
  },
  {
    id: 3,
    name: "ThinkPad X1 Carbon",
    slug: "thinkpad-x1-carbon",
    price: "110",
    short_description: "Intel i7, 32 Go RAM, 1 To SSD",
    images: [
      { src: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png", alt: "ThinkPad X1 Carbon" },
    ],
    category_id: 1,
  },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage()

  // Find the current category from mock data
  const category = mockCategories.find((cat) => cat.slug === params.slug)

  // If category not found, return 404
  if (!category) {
    notFound()
  }

  // Get products for this category
  const products = mockProducts.filter((product) => product.category_id === category.id)

  // Get SEO content based on category slug
  const getSeoTitle = (slug: string): string => {
    const titleMap: Record<string, string> = {
      "ordinateurs-portables": t("category.laptops.title"),
      "ordinateurs-de-bureau": t("category.desktops.title"),
      smartphones: t("category.smartphones.title"),
      tablettes: t("category.tablets.title"),
      accessoires: t("category.accessories.title"),
      imprimantes: t("category.printers.title"),
      mobilier: t("category.furniture.title"),
    }
    return titleMap[slug] || `${category.name} ${t("category.products_available")}`
  }

  const getSeoDescription = (slug: string): string => {
    const descriptionMap: Record<string, string> = {
      "ordinateurs-portables": t("category.laptops.description"),
      "ordinateurs-de-bureau": t("category.desktops.description"),
      smartphones: t("category.smartphones.description"),
      tablettes: t("category.tablets.description"),
      accessoires: t("category.accessories.description"),
      imprimantes: t("category.printers.description"),
      mobilier: t("category.furniture.description"),
    }
    return descriptionMap[slug] || category.description
  }

  const seoTitle = getSeoTitle(category.slug)
  const seoDescription = getSeoDescription(category.slug)

  // Category hero images
  const categoryImages: Record<string, string> = {
    "ordinateurs-portables": "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png",
    "ordinateurs-de-bureau": "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptops",
    smartphones: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/smartphone.webp",
    tablettes: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/tablet.png",
    accessoires: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/keyboard%20%26%20mouse.png",
    imprimantes: "/images/printer-hero.png",
    mobilier: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/chair.png",
  }

  const categoryImage = categoryImages[category.slug] || "/placeholder.svg?height=400&width=400"

  return (
    <div>
      {/* Hero Section with Wide Banner */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16 lg:py-20 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-3/5 pr-0 md:pr-8 mb-8 md:mb-0">
              {/* Breadcrumbs */}
              <nav className="mb-4">
                <ol className="flex items-center space-x-2 text-sm text-gray-800">
                  <li>
                    <Link href="/" className="hover:text-gray-900">
                      {t("category.breadcrumb.home")}
                    </Link>
                  </li>
                  <li>
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  </li>
                  <li>
                    <Link href="/catalogue" className="hover:text-gray-900">
                      {t("category.breadcrumb.catalog")}
                    </Link>
                  </li>
                  <li>
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  </li>
                  <li className="font-medium text-gray-800">{category.name}</li>
                </ol>
              </nav>

              {/* SEO Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">{seoTitle}</h1>

              {/* SEO Description */}
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">{seoDescription}</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-ekwip hover:bg-ekwip-700 text-white">{t("common.start")}</Button>
                <Button variant="outline" className="border-ekwip text-ekwip hover:bg-ekwip hover:text-white">
                  {t("common.get_quote")}
                </Button>
              </div>
            </div>

            {/* Category Image */}
            <div className="w-full md:w-2/5 flex justify-center md:justify-end">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <Image
                  src={categoryImage || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                {products.length}{" "}
                {products.length > 1 ? t("category.products_available") : t("category.product_available")}
              </h2>
              <p className="text-slate-600">Trouvez l'équipement idéal pour votre entreprise</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">{t("category.sort_by")}</span>
              <select className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ekwip">
                <option value="popularity">{t("category.sort.popularity")}</option>
                <option value="price-asc">{t("category.sort.price_asc")}</option>
                <option value="price-desc">{t("category.sort.price_desc")}</option>
                <option value="newest">{t("category.sort.newest")}</option>
              </select>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-slate-100 p-6 flex items-center justify-center h-48">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0].src || "/placeholder.svg"}
                        alt={product.images[0].alt || product.name}
                        width={300}
                        height={300}
                        className="max-h-40 w-auto object-contain"
                      />
                    ) : (
                      <div className="text-slate-400">No image available</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{product.short_description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-slate-500">{t("common.from")}</p>
                        <p className="text-xl font-bold">
                          {product.price} €/{t("common.month")}
                        </p>
                      </div>
                      <Link href={`/catalogue/product/${product.slug}`}>
                        <Button variant="outline">{t("common.view_details")}</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">{t("category.no_products")}</h2>
              <p className="text-slate-600 mb-6">{t("category.no_products_description")}</p>
              <Link href="/catalogue">
                <Button>{t("category.back_to_catalog")}</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {t("category.why_rent_title").replace("{category}", category.name.toLowerCase())}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("category.why_rent_description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-ekwip-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-ekwip"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("category.benefit1.title")}</h3>
              <p className="text-slate-600">{t("category.benefit1.description")}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-ekwip-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-ekwip"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("category.benefit2.title")}</h3>
              <p className="text-slate-600">{t("category.benefit2.description")}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-ekwip-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-ekwip"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("category.benefit3.title")}</h3>
              <p className="text-slate-600">{t("category.benefit3.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">{t("category.cta.title")}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">{t("category.cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-ekwip hover:bg-ekwip-700">{t("category.cta.button1")}</Button>
            <Button variant="outline">{t("category.cta.button2")}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
