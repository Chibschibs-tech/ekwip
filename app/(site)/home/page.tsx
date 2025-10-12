import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Shield, Zap, Users, TrendingUp } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Tous nos équipements sont assurés et garantis",
    },
    {
      icon: Zap,
      title: "Installation rapide",
      description: "Livraison et installation sous 48h",
    },
    {
      icon: Users,
      title: "Support 24/7",
      description: "Une équipe dédiée à votre service",
    },
    {
      icon: TrendingUp,
      title: "Évolutif",
      description: "Adaptez vos équipements selon vos besoins",
    },
  ]

  const categories = [
    {
      name: "Ordinateurs portables",
      slug: "ordinateurs-portables",
      description: "Dell, HP, Lenovo et plus",
      image: "/images/laptop-hero.png",
    },
    {
      name: "Ordinateurs de bureau",
      slug: "ordinateurs-bureau",
      description: "Workstations professionnelles",
      image: "/images/imac.png",
    },
    {
      name: "Imprimantes",
      slug: "imprimantes",
      description: "Multifonctions et professionnelles",
      image: "/images/printer-hero.png",
    },
  ]

  const clients = [
    "/images/client-logo-1.png",
    "/images/client-logo-2.png",
    "/images/client-logo-3.png",
    "/images/client-logo-4.png",
    "/images/client-logo-5.png",
    "/images/client-logo-6.png",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-blue-600 text-white">Leader au Maroc</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                Location d'équipements IT professionnels
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Simplifiez la gestion de vos équipements informatiques avec des solutions de location flexibles et
                tout-en-un. Du hardware au support, nous gérons tout pour vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalogue">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                    Découvrir le catalogue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/comment-ca-marche">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Comment ça marche ?
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Support inclus</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Livraison 48h</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl -z-10" />
              <Image
                src="/images/laptop-hero.png"
                alt="Équipements IT professionnels"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Pourquoi choisir Ekwip ?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des avantages qui font la différence pour votre entreprise
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-slate-100 hover:border-blue-200 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Notre catalogue</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des équipements de qualité professionnelle adaptés à tous vos besoins
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {categories.map((category) => (
              <Link key={category.slug} href={`/catalogue/${category.slug}`}>
                <Card className="group hover:shadow-xl transition-all cursor-pointer border-2 border-slate-100 hover:border-blue-200">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-slate-600 mb-4">{category.description}</p>
                      <span className="text-blue-600 font-medium inline-flex items-center group-hover:gap-2 transition-all">
                        Découvrir
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/catalogue">
              <Button size="lg" variant="outline" className="group bg-transparent">
                Voir tout le catalogue
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Ils nous font confiance</h2>
            <p className="text-lg text-slate-600">Plus de 500 entreprises utilisent nos solutions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((logo, index) => (
              <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt={`Client ${index + 1}`}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#1f3b57] to-[#2d4a63] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à moderniser votre parc informatique ?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour obtenir un devis personnalisé et découvrir comment nous pouvons vous
            aider
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-white text-[#1f3b57] hover:bg-blue-50">
                Demander un devis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/catalogue">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent"
              >
                Explorer le catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
