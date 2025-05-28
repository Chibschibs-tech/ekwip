import { fetchAllCategories, fetchFilteredProducts } from "@/lib/wordpress-api"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Boutique - Ekwip | Équipements IT en location",
  description: "Découvrez notre sélection d'équipements informatiques disponibles à la location.",
}

export default async function StorePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const categoryFilter = searchParams?.category ? Number(searchParams.category) : undefined
  const searchFilter = searchParams?.search as string

  const { products } = await fetchFilteredProducts({
    category: categoryFilter,
    search: searchFilter,
    perPage: 12,
  })

  const categories = await fetchAllCategories()

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
                      Toutes les catégories
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/store?category=${category.id}`}
                        className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {category.name} ({category.count})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="lg:w-3/4">
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link key={product.id} href={`/store/product/${product.slug}`}>
                      <Card className="h-full hover:shadow-md transition-all">
                        <div className="relative h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                          {product.images && product.images.length > 0 ? (
                            <Image
                              src={product.images[0].src || "/placeholder.svg"}
                              alt={product.images[0].alt || product.name}
                              fill
                              className="object-contain p-4"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">Aucune image</div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                          <div
                            className="text-gray-600 text-sm mb-4 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: product.short_description }}
                          />
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500">À partir de</p>
                              <p className="text-xl font-bold text-blue-600">{product.price} MAD/mois</p>
                            </div>
                            {product.featured && (
                              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                                Populaire
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-semibold mb-4">Aucun produit trouvé</h2>
                  <p className="text-gray-600">Aucun produit ne correspond à vos critères de recherche.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
