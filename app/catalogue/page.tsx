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
import { fetchRentalCategories, type WordPressCategory } from "@/lib/wordpress-api"
import { storeProducts } from "@/lib/store-products"
import CatalogProductCard from "@/components/catalog-product-card"

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

// Category colors for modern design
const categoryColors: Record<string, { bg: string; text: string; hover: string }> = {
  "ordinateurs-portables": { bg: "bg-blue-50", text: "text-blue-700", hover: "hover:bg-blue-100" },
  "ordinateurs-de-bureau": { bg: "bg-indigo-50", text: "text-indigo-700", hover: "hover:bg-indigo-100" },
  smartphones: { bg: "bg-purple-50", text: "text-purple-700", hover: "hover:bg-purple-100" },
  tablettes: { bg: "bg-pink-50", text: "text-pink-700", hover: "hover:bg-pink-100" },
  accessoires: { bg: "bg-green-50", text: "text-green-700", hover: "hover:bg-green-100" },
  imprimantes: { bg: "bg-orange-50", text: "text-orange-700", hover: "hover:bg-orange-100" },
  mobilier: { bg: "bg-amber-50", text: "text-amber-700", hover: "hover:bg-amber-100" },
}

// Default fallback categories in case the API fails
const fallbackCategories = [
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

export default async function Catalogue() {
  // Fetch categories from WordPress
  let categories: WordPressCategory[] = []

  try {
    categories = await fetchRentalCategories()

    // If no categories were found, use fallback
    if (categories.length === 0) {
      categories = fallbackCategories
    }
  } catch (error) {
    console.error("Error fetching categories:", error)
    categories = fallbackCategories
  }

  // Get all available categories from products for filtering
  const availableCategories = Array.from(new Set(storeProducts.map((product) => product.category)))
  const availableBrands = Array.from(new Set(storeProducts.map((product) => product.brand)))

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Notre catalogue d'équipements</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Découvrez notre large gamme d'équipements IT disponibles à la location pour répondre à tous vos besoins
            professionnels.
          </p>
        </div>
      </section>

      {/* Modern Categories Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Explorez nos catégories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Trouvez rapidement l'équipement dont vous avez besoin grâce à notre organisation par catégories
            </p>
          </div>

          {/* Categories Grid - Modern Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const colors = categoryColors[category.slug] || {
                bg: "bg-slate-50",
                text: "text-slate-700",
                hover: "hover:bg-slate-100",
              }

              return (
                <Link href={`/catalogue/${category.slug}`} key={category.id} className="group">
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 ${colors.hover}`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                      <div className={`w-full h-full rounded-full ${colors.bg}`}></div>
                    </div>

                    {/* Icon Container */}
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${colors.bg} ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {categoryIcons[category.slug] || <Laptop className="h-8 w-8" />}
                    </div>

                    {/* Category Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-slate-800 group-hover:text-ekwip transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{category.description}</p>

                      {/* Product Count */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-slate-500 font-medium">
                          {category.count} {category.count > 1 ? "produits" : "produit"}
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-ekwip group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-ekwip/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Featured Category Highlight */}
          <div className="mt-12 bg-gradient-to-r from-ekwip to-blue-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Besoin d'aide pour choisir ?</h3>
              <p className="text-lg opacity-90 mb-6">
                Nos experts sont là pour vous accompagner dans le choix des équipements les plus adaptés à vos besoins
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-ekwip hover:bg-slate-100">
                  Parler à un expert
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Voir tous les produits
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Tous nos équipements</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Parcourez l'intégralité de notre catalogue d'équipements disponibles à la location.
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Filter className="h-5 w-5" />
                <span>Filtres :</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input placeholder="Rechercher un équipement..." className="pl-10" />
                </div>

                {/* Category Filter */}
                <Select>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Toutes catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
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
                    <SelectValue placeholder="Toutes marques" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes marques</SelectItem>
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
                  En stock uniquement
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                  Nouveautés
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
              Charger plus d'équipements
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Produits populaires</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez nos équipements les plus demandés par nos clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-slate-100 p-8 flex items-center justify-center">
                  <Laptop className="h-20 w-20 text-slate-600" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">MacBook Pro 14"</h3>
                    <div className="bg-ekwip-100 text-ekwip px-2 py-1 rounded text-xs font-medium">Populaire</div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">Processeur M2 Pro, 16 Go RAM, 512 Go SSD</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-500">À partir de</p>
                      <p className="text-xl font-bold">120 €/mois</p>
                    </div>
                    <Button variant="outline">Voir détails</Button>
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
                    <div className="bg-ekwip-100 text-ekwip px-2 py-1 rounded text-xs font-medium">Nouveau</div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">Intel i7, 32 Go RAM, 1 To SSD, RTX 3060</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-500">À partir de</p>
                      <p className="text-xl font-bold">95 €/mois</p>
                    </div>
                    <Button variant="outline">Voir détails</Button>
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
                    <div className="bg-ekwip-100 text-ekwip px-2 py-1 rounded text-xs font-medium">Populaire</div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">256 Go, forfait data 100 Go inclus</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-500">À partir de</p>
                      <p className="text-xl font-bold">45 €/mois</p>
                    </div>
                    <Button variant="outline">Voir détails</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-ekwip hover:bg-ekwip-700">Voir tous les produits</Button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Nos marques partenaires</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nous travaillons avec les meilleures marques pour vous offrir des équipements de qualité.
            </p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Contactez-nous pour discuter de vos besoins spécifiques. Nous pouvons vous proposer des solutions sur
            mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-ekwip hover:bg-ekwip-700">Demander un devis personnalisé</Button>
            <Button variant="outline">Nous contacter</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
