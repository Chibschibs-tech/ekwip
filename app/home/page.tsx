import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-32 overflow-hidden">
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
                <Link href="/catalogue">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    Voir le catalogue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/comment-ca-marche">
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
            <Card className="border-2 hover:border-blue-500 transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image src="/images/icon-cash.png" alt="Économies" width={32} height={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Économies garanties</h3>
                <p className="text-slate-600">
                  Jusqu'à 60% d'économies par rapport à l'achat, avec une gestion budgétaire prévisible
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image src="/images/icon-upgrade.png" alt="Mise à jour" width={32} height={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Toujours à jour</h3>
                <p className="text-slate-600">
                  Accédez aux dernières technologies sans investissement initial important
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image src="/images/icon-fleet.png" alt="Gestion" width={32} height={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Gestion simplifiée</h3>
                <p className="text-slate-600">Nous gérons la maintenance, les réparations et les remplacements</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image src="/images/icon-support.png" alt="Support" width={32} height={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Support dédié</h3>
                <p className="text-slate-600">Une équipe d'experts disponible 24/7 pour vous accompagner</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Notre catalogue d'équipements</h2>
            <p className="text-xl text-slate-600">Des solutions adaptées à chaque besoin professionnel</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/catalogue/ordinateurs-portables">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/laptop-hero.png"
                    alt="Ordinateurs portables"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Ordinateurs portables</h3>
                  <p className="text-slate-600 mb-4">45 équipements disponibles</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Découvrir
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/catalogue/ordinateurs-bureau">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/imac.png"
                    alt="Ordinateurs de bureau"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Ordinateurs de bureau</h3>
                  <p className="text-slate-600 mb-4">28 équipements disponibles</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Découvrir
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/catalogue/smartphones">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/iphone.png"
                    alt="Smartphones"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Smartphones</h3>
                  <p className="text-slate-600 mb-4">62 équipements disponibles</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Découvrir
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/catalogue/imprimantes">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/printer-hero.png"
                    alt="Imprimantes"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Imprimantes</h3>
                  <p className="text-slate-600 mb-4">34 équipements disponibles</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Découvrir
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
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
            <Link href="/comment-ca-marche">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                En savoir plus
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à transformer votre parc informatique ?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Rejoignez les entreprises qui ont fait confiance à Ekwip pour leurs équipements IT
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalogue">
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
