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
} from "lucide-react"
import { fetchRentalCategories, type WordPressCategory } from "@/lib/wordpress-api"
import { storeProducts } from "@/lib/store-products"
import CatalogProductCard from "@/components/catalog-product-card"

// Map of category slugs to icons
const categoryIcons: Record<string, React.ReactNode> = {
  "ordinateurs-portables": <Laptop className="h-10 w-10" />,
  "ordinateurs-de-bureau": <Monitor className="h-10 w-10" />,
  smartphones: <Smartphone className="h-10 w-10" />,
  serveurs: <Server className="h-10 w-10" />,
  accessoires: <Headphones className="h-10 w-10" />,
  imprimantes: <Printer className="h-10 w-10" />,
  tablettes: <TabletSmartphone className="h-10 w-10" />,
  stockage: <HardDrive className="h-10 w-10" />,
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
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Notre catalogue d'équipements</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Découvrez notre large gamme d'équipements IT disponibles à la location pour répondre à tous vos besoins
            professionnels.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Nos catégories principales</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explorez nos équipements par catégorie pour trouver rapidement ce dont vous avez besoin.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link href={`/catalogue/${category.slug}`} key={category.id}>
                <Card className="h-full border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 bg-slate-100 p-4 rounded-lg flex items-center justify-center">
                      {categoryIcons[category.slug] || <Laptop className="h-10 w-10" />}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 flex-grow">{category.description}</p>
                    <Button variant="outline" className="w-full mt-auto">
                      Découvrir
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
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
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
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
            <Card className="border border-slate-200">
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

            <Card className="border border-slate-200">
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

            <Card className="border border-slate-200">
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
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32">
              <div className="text-slate-400 font-medium">Apple</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32">
              <div className="text-slate-400 font-medium">Dell</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32">
              <div className="text-slate-400 font-medium">HP</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32">
              <div className="text-slate-400 font-medium">Lenovo</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32">
              <div className="text-slate-400 font-medium">Samsung</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32">
              <div className="text-slate-400 font-medium">Microsoft</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32">
              <div className="text-slate-400 font-medium">Cisco</div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg flex items-center justify-center h-32">
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
