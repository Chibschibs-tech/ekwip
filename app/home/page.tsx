import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"
import CategoryCard from "@/components/category-card"
import FeatureCard from "@/components/feature-card"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import ClientLogoSlider from "@/components/client-logo-slider"
import { ArrowRight, CheckCircle } from "lucide-react"

const featuredProducts = [
  {
    id: "1",
    name: "MacBook Pro 14",
    slug: "macbook-pro-14",
    price: 450,
    image: "/images/macbook-pro.png",
    category: "Ordinateurs portables",
    description: "Puce M3 Pro, 18 Go de RAM, 512 Go SSD",
    specs: {
      processor: "Apple M3 Pro",
      ram: "18 Go",
      storage: "512 Go SSD",
      screen: '14"',
    },
    stock: 15,
    status: "published" as const,
  },
  {
    id: "2",
    name: "Dell XPS 13",
    slug: "dell-xps-13",
    price: 380,
    image: "/images/dell-xps.png",
    category: "Ordinateurs portables",
    description: "Intel Core i7, 16 Go RAM, 512 Go SSD",
    specs: {
      processor: "Intel Core i7-1355U",
      ram: "16 Go",
      storage: "512 Go SSD",
      screen: '13.4"',
    },
    stock: 20,
    status: "published" as const,
  },
  {
    id: "3",
    name: "iPhone 14 Pro",
    slug: "iphone-14-pro",
    price: 320,
    image: "/images/iphone.png",
    category: "Smartphones",
    description: "128 Go, Puce A16 Bionic, Appareil photo 48 Mpx",
    specs: {
      processor: "Apple A16 Bionic",
      storage: "128 Go",
      camera: "48 Mpx",
      screen: '6.1"',
    },
    stock: 30,
    status: "published" as const,
  },
  {
    id: "4",
    name: "iMac 24",
    slug: "imac-24",
    price: 520,
    image: "/images/imac.png",
    category: "Ordinateurs de bureau",
    description: "Puce M3, 8 Go RAM, 256 Go SSD, écran 4.5K",
    specs: {
      processor: "Apple M3",
      ram: "8 Go",
      storage: "256 Go SSD",
      screen: '24" 4.5K',
    },
    stock: 8,
    status: "published" as const,
  },
]

const categories = [
  {
    name: "Ordinateurs portables",
    slug: "ordinateurs-portables",
    image: "/images/laptop-hero.png",
    count: 45,
  },
  {
    name: "Ordinateurs de bureau",
    slug: "ordinateurs-bureau",
    image: "/images/imac.png",
    count: 28,
  },
  {
    name: "Smartphones",
    slug: "smartphones",
    image: "/images/iphone.png",
    count: 62,
  },
  {
    name: "Imprimantes",
    slug: "imprimantes",
    image: "/images/printer-hero.png",
    count: 34,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Solution professionnelle</Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                  Louez vos équipements IT
                  <span className="text-blue-600"> sur-mesure</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Ordinateurs, smartphones, imprimantes et plus encore. Flexibilité totale, performance garantie et
                  tranquillité d'esprit.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/home/catalogue">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    Voir le catalogue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/home/comment-ca-marche">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-300 bg-transparent">
                    Comment ça marche
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-slate-600">Équipements</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">200+</div>
                  <div className="text-sm text-slate-600">Clients satisfaits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-slate-600">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/laptop-hero.png"
                  alt="Location d'équipements IT"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-200">
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="font-semibold text-slate-900">Livraison rapide</div>
                    <div className="text-sm text-slate-600">Sous 48h à Casablanca</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pourquoi choisir Ekwip ?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Une solution complète pour tous vos besoins en équipements informatiques professionnels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="/images/icon-cash.png"
              title="Économies garanties"
              description="Jusqu'à 60% d'économies par rapport à l'achat, avec une gestion budgétaire prévisible"
            />
            <FeatureCard
              icon="/images/icon-upgrade.png"
              title="Toujours à jour"
              description="Accédez aux dernières technologies sans investissement initial important"
            />
            <FeatureCard
              icon="/images/icon-fleet.png"
              title="Gestion simplifiée"
              description="Nous gérons la maintenance, les réparations et les remplacements"
            />
            <FeatureCard
              icon="/images/icon-support.png"
              title="Support dédié"
              description="Une équipe d'experts disponible 24/7 pour vous accompagner"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Notre catalogue d'équipements</h2>
              <p className="text-xl text-slate-600">Des solutions adaptées à chaque besoin professionnel</p>
            </div>
            <Link href="/home/catalogue">
              <Button variant="outline" className="hidden md:flex items-center bg-transparent">
                Voir tout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/home/catalogue">
              <Button variant="outline" className="w-full bg-transparent">
                Voir tout le catalogue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700">Les plus populaires</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Équipements tendance</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Découvrez nos équipements les plus demandés par les entreprises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/home/catalogue">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Voir tous les produits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Un processus simple et rapide pour louer vos équipements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-blue-200 mb-4">01</div>
                <h3 className="text-xl font-semibold mb-3">Choisissez vos équipements</h3>
                <p className="text-blue-100">
                  Parcourez notre catalogue et sélectionnez les équipements qui correspondent à vos besoins
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-blue-200 mb-4">02</div>
                <h3 className="text-xl font-semibold mb-3">Configurez votre offre</h3>
                <p className="text-blue-100">Définissez la durée de location et les options qui vous conviennent</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-blue-200 mb-4">03</div>
                <h3 className="text-xl font-semibold mb-3">Recevez et profitez</h3>
                <p className="text-blue-100">
                  Nous livrons rapidement et vous accompagnons tout au long de la location
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/home/comment-ca-marche">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                En savoir plus
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ils nous font confiance</h2>
            <p className="text-xl text-slate-600">Plus de 200 entreprises au Maroc nous font confiance</p>
          </div>
          <ClientLogoSlider />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à transformer votre parc informatique ?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Rejoignez les entreprises qui ont fait confiance à Ekwip pour leurs équipements IT
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/home/catalogue">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                  Voir le catalogue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/home/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
                >
                  Contactez-nous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
