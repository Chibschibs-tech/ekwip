import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { fetchProductsByCategory, fetchRentalCategories } from "@/lib/wordpress-api"

export default async function AccessoiresPage() {
  // Fetch all rental categories
  const categories = await fetchRentalCategories()

  // Find the current category
  const category = categories.find((cat) => cat.slug === "accessoires")

  // If category not found, use default values
  const categoryId = category?.id || 5
  const categoryName = category?.name || "Accessoires"
  const categoryDescription = category?.description || "Accessoires et périphériques pour compléter votre équipement"

  // Fetch products for this category
  const products = await fetchProductsByCategory(categoryId)

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900 to-slate-800">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Accessoires informatiques"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-white">
                  Catalogue
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="font-medium text-white">{categoryName}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{categoryName}</h1>
            <p className="text-lg text-slate-300 mb-8">{categoryDescription}</p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-ekwip hover:bg-ekwip-700">Voir tous les produits</Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Demander un devis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Nos {categoryName.toLowerCase()}</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">Trier par:</span>
              <select className="border border-slate-300 rounded px-3 py-2 text-sm">
                <option>Popularité</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
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
                    <div
                      dangerouslySetInnerHTML={{ __html: product.short_description }}
                      className="text-slate-600 text-sm mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-slate-500">À partir de</p>
                        <p className="text-xl font-bold">{Math.round(Number(product.price) * 0.08) / 100} €/mois</p>
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

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Pourquoi louer vos {categoryName.toLowerCase()} ?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez les avantages de la location d'{categoryName.toLowerCase()} pour votre entreprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-ekwip-100 text-ekwip rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Flexibilité maximale</h3>
              <p className="text-slate-600">
                Adaptez vos équipements selon vos besoins évolutifs sans investissement initial important.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-ekwip-100 text-ekwip rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Renouvellement facile</h3>
              <p className="text-slate-600">
                Bénéficiez des dernières technologies et renouvelez vos accessoires selon vos besoins.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-ekwip-100 text-ekwip rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Support technique inclus</h3>
              <p className="text-slate-600">
                Profitez d'un support technique complet et d'un remplacement rapide en cas de problème.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Besoin d'une solution personnalisée ?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Contactez-nous pour discuter de vos besoins spécifiques en {categoryName.toLowerCase()}. Nous pouvons vous
            proposer des solutions sur mesure.
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
