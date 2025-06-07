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

  // SEO-optimized titles and descriptions based on category
  const seoTitles: Record<string, string> = {
    "ordinateurs-portables": "Ordinateurs portables disponibles à la location",
    "ordinateurs-de-bureau": "Ordinateurs de bureau disponibles à la location",
    smartphones: "Smartphones disponibles à la location",
    tablettes: "Tablettes disponibles à la location",
    accessoires: "Accessoires informatiques disponibles à la location",
    imprimantes: "Imprimantes disponibles à la location",
    mobilier: "Mobilier de bureau disponible à la location",
  }

  const seoDescriptions: Record<string, string> = {
    "ordinateurs-portables":
      "Louez des ordinateurs portables de dernière génération pour votre entreprise. Nous proposons une large gamme de modèles adaptés à tous les besoins professionnels, avec service de maintenance inclus.",
    "ordinateurs-de-bureau":
      "Équipez votre entreprise avec des ordinateurs de bureau performants en location. Solutions flexibles et évolutives pour tous types d'entreprises, avec support technique inclus.",
    smartphones:
      "Location de smartphones professionnels pour vos équipes. Forfaits data inclus, gestion de flotte simplifiée et renouvellement régulier des appareils.",
    tablettes:
      "Louez des tablettes tactiles pour vos besoins professionnels. Idéal pour la mobilité, les présentations clients ou les points de vente. Plusieurs modèles disponibles.",
    accessoires:
      "Complétez votre équipement informatique avec notre gamme d'accessoires en location. Écrans, claviers, souris, casques et autres périphériques pour optimiser votre productivité.",
    imprimantes:
      "Solutions d'impression professionnelles en location. Imprimantes laser, multifonctions et grands formats avec service de maintenance et consommables inclus.",
    mobilier:
      "Aménagez vos espaces de travail avec notre mobilier de bureau ergonomique en location. Bureaux, chaises, armoires et solutions d'aménagement flexibles.",
  }

  // Get SEO content or use fallbacks
  const seoTitle = seoTitles[category.slug] || `${category.name} disponibles à la location`
  const seoDescription =
    seoDescriptions[category.slug] ||
    `Découvrez notre sélection de ${category.name.toLowerCase()} disponibles à la location pour votre entreprise. Solutions flexibles et service inclus.`

  // Category image placeholders (to be replaced with actual images)
  const categoryImages: Record<string, string> = {
    "ordinateurs-portables": "/placeholder.svg?height=400&width=400",
    "ordinateurs-de-bureau": "/placeholder.svg?height=400&width=400",
    smartphones: "/placeholder.svg?height=400&width=400",
    tablettes: "/placeholder.svg?height=400&width=400",
    accessoires: "/placeholder.svg?height=400&width=400",
    imprimantes: "/placeholder.svg?height=400&width=400",
    mobilier: "/placeholder.svg?height=400&width=400",
  }

  const categoryImage = categoryImages[category.slug] || "/placeholder.svg?height=400&width=400"

  return (
    <div>
      {/* Hero Section with Wide Banner */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16 lg:py-20 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-3/5 pr-0 md:pr-8 mb-8 md:mb-0">
              {/* Breadcrumbs */}
              <nav className="mb-4">
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
                  <li className="font-medium text-white">{category.name}</li>
                </ol>
              </nav>

              {/* SEO Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{seoTitle}</h1>

              {/* SEO Description */}
              <p className="text-lg text-slate-300 mb-8 max-w-2xl">{seoDescription}</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-ekwip hover:bg-ekwip-700 text-white">Démarrer</Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  Obtenir un devis
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

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-full text-white"
            fill="currentColor"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                {products.length} {products.length > 1 ? "produits" : "produit"} disponibles
              </h2>
              <p className="text-slate-600">Trouvez l'équipement idéal pour votre entreprise</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Trier par:</span>
              <select className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ekwip">
                <option value="popularity">Popularité</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="newest">Nouveautés</option>
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

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Pourquoi louer des {category.name.toLowerCase()} ?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez les avantages de la location d'équipements pour votre entreprise
            </p>
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
              <h3 className="text-xl font-semibold mb-2">Coûts prévisibles</h3>
              <p className="text-slate-600">
                Transformez vos dépenses d'investissement en coûts opérationnels prévisibles avec des mensualités fixes.
              </p>
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
              <h3 className="text-xl font-semibold mb-2">Équipements à jour</h3>
              <p className="text-slate-600">
                Accédez aux dernières technologies sans investissement majeur et renouvelez régulièrement votre
                matériel.
              </p>
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
              <h3 className="text-xl font-semibold mb-2">Service inclus</h3>
              <p className="text-slate-600">
                Bénéficiez d'un support technique, d'une maintenance et d'un remplacement en cas de panne.
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
            Nos experts sont à votre disposition pour vous aider à trouver les équipements adaptés à vos besoins
            spécifiques.
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
