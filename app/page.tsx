"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import ProductTabs from "@/components/product-tabs"
import ClientLogoSlider from "@/components/client-logo-slider"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import CustomOfferBanner from "@/components/custom-offer-banner"
import FeatureCard from "@/components/feature-card"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-ekwip-50 py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-ekwip-100 text-ekwip-800 hover:bg-ekwip-200">
                  Nouveau
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Location d'équipements informatiques pour entreprises
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Louez vos équipements IT services inclus. Flexibilité, performance et tranquillité d'esprit pour votre
                  entreprise.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalogue">
                  <Button size="lg" className="bg-ekwip hover:bg-ekwip-700 text-white px-8 py-3">
                    Découvrir le catalogue
                  </Button>
                </Link>
                <Link href="/comment-ca-marche">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 bg-transparent border-ekwip text-ekwip hover:bg-ekwip hover:text-white"
                  >
                    Comment ça marche
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/laptop-hero.png"
                alt="Équipements informatiques"
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
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir Ekwip ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions flexibles pour équiper votre entreprise sans contrainte
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="/images/icon-cash.png"
              title="Préservez votre trésorerie"
              description="Transformez vos dépenses d'investissement en coûts opérationnels prévisibles avec des mensualités fixes."
            />
            <FeatureCard
              icon="/images/icon-fleet.png"
              title="Pilotez votre flotte IT"
              description="Gérez et optimisez tout votre parc informatique depuis une interface unique."
            />
            <FeatureCard
              icon="/images/icon-upgrade.png"
              title="Upgradez à tout moment"
              description="Échangez ou upgradez votre équipement selon vos besoins, sans contrainte."
            />
            <FeatureCard
              icon="/images/icon-support.png"
              title="Support et maintenance inclus"
              description="Assistance technique et remplacement rapide en cas de problème."
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Notre catalogue d'équipements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète d'équipements informatiques professionnels
            </p>
          </div>
          <ProductTabs />
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
            <p className="text-xl text-gray-600">Rejoignez les entreprises qui ont choisi Ekwip</p>
          </div>
          <ClientLogoSlider />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comment ça marche</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et transparent pour équiper votre entreprise
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ekwip text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Choisissez votre équipement</h3>
              <p className="text-gray-600">
                Parcourez notre catalogue et sélectionnez les équipements adaptés à vos besoins.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ekwip text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Définissez votre durée</h3>
              <p className="text-gray-600">
                Choisissez la durée de location qui vous convient, de 1 à 36 mois selon vos projets.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ekwip text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Recevez et utilisez</h3>
              <p className="text-gray-600">
                Nous livrons et installons votre équipement. Profitez d'un support technique pendant toute la durée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Plus de 10 collaborateurs?</h2>
                <p className="text-xl text-gray-600">
                  Contactez-nous pour étudier ensemble votre besoin et obtenir une offre sur-mesure.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">Gestion de parc informatique complète</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">Tarifs dégressifs selon le volume</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">Support technique dédié</p>
                </div>
              </div>
              <Link href="/contact">
                <Button size="lg" className="bg-ekwip hover:bg-ekwip-700 text-white">
                  Obtenir un devis
                </Button>
              </Link>
            </div>
            <div className="space-y-8">
              <FAQSection />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Offer Banner */}
      <CustomOfferBanner />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-ekwip to-ekwip-800 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Prêt à moderniser votre parc informatique ?</h2>
            <p className="text-xl text-ekwip-100">
              Découvrez nos solutions de location flexibles et bénéficiez de l'expertise de nos équipes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalogue">
                <Button size="lg" variant="secondary" className="bg-white text-ekwip hover:bg-gray-100">
                  Découvrir le catalogue
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-ekwip bg-transparent"
                >
                  Parler à un expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
