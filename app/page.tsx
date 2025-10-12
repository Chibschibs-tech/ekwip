import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FeatureCard } from "@/components/feature-card"
import { ProductTabs } from "@/components/product-tabs"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { ClientLogoSlider } from "@/components/client-logo-slider"
import { CustomOfferBanner } from "@/components/custom-offer-banner"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      title: "Préservez votre trésorerie",
      description:
        "Évitez les gros investissements et préservez votre cash-flow avec nos solutions de location flexibles.",
      icon: "/images/icon-cash.png",
    },
    {
      title: "Gestion de parc simplifiée",
      description: "Nous nous occupons de la maintenance, des mises à jour et du support technique de vos équipements.",
      icon: "/images/icon-fleet.png",
    },
    {
      title: "Mise à niveau garantie",
      description: "Bénéficiez toujours des dernières technologies grâce à nos programmes de renouvellement régulier.",
      icon: "/images/icon-upgrade.png",
    },
    {
      title: "Support technique 24/7",
      description:
        "Notre équipe d'experts est disponible pour vous accompagner et résoudre tous vos problèmes techniques.",
      icon: "/images/icon-support.png",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">Solutions IT professionnelles</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Équipez-vous, sans ruiner votre <span className="text-[#1f3b57]">trésorerie!</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Louez vos équipements IT sur-mesure avec Ekwip. Flexibilité, performance et tranquillité d'esprit
                garanties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalogue">
                  <Button size="lg" className="bg-[#1f3b57] hover:bg-[#1f3b57]/90">
                    Découvrir le catalogue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#1f3b57] text-[#1f3b57] hover:bg-[#1f3b57]/10 bg-transparent"
                  >
                    Obtenir un devis
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/laptop-hero.png"
                alt="Équipements informatiques professionnels"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Pourquoi choisir Ekwip ?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des solutions flexibles et performantes pour tous vos besoins informatiques
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Notre catalogue d'équipements</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre gamme complète d'équipements informatiques professionnels
            </p>
          </div>
          <ProductTabs />
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Plus de 10 collaborateurs ?</h2>
              <p className="text-lg text-slate-300 mb-8">
                Bénéficiez d'offres spéciales et d'un accompagnement dédié pour équiper toute votre équipe.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Tarifs préférentiels sur les volumes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Gestionnaire de compte dédié</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Support prioritaire et sur-mesure</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-slate-800 hover:bg-slate-100">
                  Contactez-nous
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/images/printer-hero.png"
                alt="Solutions entreprise"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Offer Banner */}
      <CustomOfferBanner />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Client Logos */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ils nous font confiance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plus de 500 entreprises nous font confiance pour leurs besoins IT
            </p>
          </div>
          <ClientLogoSlider />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Comment ça marche</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un processus simple et efficace pour équiper votre entreprise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1f3b57] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choisissez vos équipements</h3>
              <p className="text-gray-600">
                Parcourez notre catalogue et sélectionnez les équipements qui correspondent à vos besoins.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1f3b57] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recevez votre devis</h3>
              <p className="text-gray-600">
                Nous vous proposons une solution personnalisée avec un devis détaillé sous 24h.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1f3b57] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Profitez de vos équipements</h3>
              <p className="text-gray-600">
                Recevez vos équipements configurés et bénéficiez de notre support complet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />
    </div>
  )
}
