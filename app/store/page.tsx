import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { getProducts } from "@/lib/products"

export const metadata = {
  title: "Boutique - Ekwip | Équipements IT en location",
  description: "Découvrez notre sélection d'équipements informatiques disponibles à la location.",
}

export default function StorePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const allProducts = getProducts()
  const categoryFilter = searchParams?.category as string
  const searchFilter = searchParams?.search as string

  // Filter products
  let products = allProducts

  if (categoryFilter) {
    products = products.filter((product) => product.category === categoryFilter)
  }

  if (searchFilter) {
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        product.description.toLowerCase().includes(searchFilter.toLowerCase()),
    )
  }

  // Get unique categories
  const categories = Array.from(new Set(allProducts.map((product) => product.category)))

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Boutique Ekwip</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection d'équipements informatiques professionnels disponibles à la location.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Catégories</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/store" className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
                      Toutes les catégories ({allProducts.length})
                    </Link>
                  </li>
                  {categories.map((category) => {
                    const count = allProducts.filter((p) => p.category === category).length
                    return (
                      <li key={category}>
                        <Link
                          href={`/store?category=${encodeURIComponent(category)}`}
                          className={`block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors ${
                            categoryFilter === category ? "bg-blue-50 text-blue-600 font-medium" : ""
                          }`}
                        >
                          {category} ({count})
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="lg:w-3/4">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    {products.length} produit{products.length !== 1 ? "s" : ""} trouvé
                    {products.length !== 1 ? "s" : ""}
                    {categoryFilter && ` dans "${categoryFilter}"`}
                  </p>
                  {(categoryFilter || searchFilter) && (
                    <Link href="/store" className="text-sm text-blue-600 hover:text-blue-800 underline">
                      Effacer les filtres
                    </Link>
                  )}
                </div>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link key={product.id} href={`/store/product/${product.slug}`}>
                      <Card className="h-full hover:shadow-md transition-all group">
                        <div className="relative h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain p-4 group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            {product.new && <Badge className="bg-green-100 text-green-800 text-xs">Nouveau</Badge>}
                            {product.featured && <Badge className="bg-blue-100 text-blue-800 text-xs">Populaire</Badge>}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {product.category}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500">À partir de</p>
                              <p className="text-xl font-bold text-blue-600">{product.price}€/mois</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-semibold mb-4">Aucun produit trouvé</h2>
                  <p className="text-gray-600 mb-6">Aucun produit ne correspond à vos critères de recherche.</p>
                  <Link href="/store">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Voir tous les produits
                    </button>
                  </Link>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
