import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { fetchRentalCategories, fetchProductsByCategory } from "@/lib/wordpress-api"
import { ChevronRight } from "lucide-react"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Fetch all rental categories
  const categories = await fetchRentalCategories()

  // Find the current category
  const category = categories.find((cat) => cat.slug === params.slug)

  // If category not found, return 404
  if (!category) {
    notFound()
  }

  // Fetch products for this category
  const products = await fetchProductsByCategory(category.id)

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-ekwip">
                  Accueil
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-ekwip">
                  Catalogue
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="font-medium text-ekwip">{category.name}</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{category.name}</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            {category.description ||
              `Découvrez notre sélection de ${category.name.toLowerCase()} disponibles à la location.`}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
                    <div
                      dangerouslySetInnerHTML={{ __html: product.short_description }}
                      className="text-slate-600 text-sm mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-slate-500">À partir de</p>
                        <p className="text-xl font-bold">{product.price} €/mois</p>
                      </div>
                      <Link href={`/catalogue/product/${product.slug}`}>
                        <Button variant="outline">Voir détails</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Aucun produit trouvé</h2>
              <p className="text-slate-600 mb-6">Aucun produit n'est disponible dans cette catégorie pour le moment.</p>
              <Link href="/catalogue">
                <Button>Retour au catalogue</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
