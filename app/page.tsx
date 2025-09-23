"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import ProductTabs from "@/components/product-tabs"
import ClientLogoSlider from "@/components/client-logo-slider"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import CustomOfferBanner from "@/components/custom-offer-banner"
import FeatureCard from "@/components/feature-card"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-[#1f3b57]/10 text-[#1f3b57] hover:bg-[#1f3b57]/20">
                  Solution de location IT
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Équipez-vous, sans ruiner votre trésorerie!
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Louez vos équipements IT services applicatifs inclus. Flexibilité, performance et tranquillité
                  d'esprit garanties.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalogue">
                  <Button size="lg" className="bg-[#1f3b57] hover:bg-[#1f3b57]/90 text-white px-8 py-3">
                    Demander un devis
                  </Button>
                </Link>
                <Link href="/comment-ca-marche">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 bg-transparent border-[#1f3b57] text-[#1f3b57] hover:bg-[#1f3b57] hover:text-white"
                  >
                    Voir le catalogue
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iXQ7znj442AnEqarTI9CMHOYmodfME.png"
                alt="Homme d'affaires au téléphone devant son ordinateur portable"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
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
              Des solutions flexibles et performantes pour tous vos besoins informatiques
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="/images/icon-cash.png"
              title="Préservez votre trésorerie"
              description="Évitez les gros investissements et préservez votre cash-flow avec nos solutions de location."
            />
            <FeatureCard
              icon="/images/icon-fleet.png"
              title="Gestion de parc simplifiée"
              description="Nous nous occupons de la maintenance, des mises à jour et du support technique."
            />
            <FeatureCard
              icon="/images/icon-upgrade.png"
              title="Mise à niveau garantie"
              description="Bénéficiez toujours des dernières technologies avec nos options de mise à niveau."
            />
            <FeatureCard
              icon="/images/icon-support.png"
              title="Support technique 24/7"
              description="Notre équipe d'experts est disponible pour vous accompagner à tout moment."
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
            <p className="text-xl text-gray-600">Plus de 500 entreprises nous font confiance pour leurs besoins IT</p>
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
              Un processus simple et efficace pour équiper votre entreprise
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1f3b57] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Choisissez vos équipements</h3>
              <p className="text-gray-600">
                Parcourez notre catalogue et sélectionnez les équipements qui correspondent à vos besoins.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1f3b57] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Recevez votre devis</h3>
              <p className="text-gray-600">
                Nous vous proposons une solution personnalisée avec un devis détaillé sous 24h.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1f3b57] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Profitez de vos équipements</h3>
              <p className="text-gray-600">
                Recevez vos équipements configurés et bénéficiez de notre support complet.
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
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Plus de 10 collaborateurs ?</h2>
                <p className="text-xl text-gray-600">
                  Bénéficiez d'offres spéciales et d'un accompagnement personnalisé pour les grandes équipes.
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
                  <p className="text-gray-700">Tarifs préférentiels sur les volumes</p>
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
                  <p className="text-gray-700">Gestionnaire de compte dédié</p>
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
                  <p className="text-gray-700">Support prioritaire et SLA garantis</p>
                </div>
              </div>
              <Link href="/contact">
                <Button size="lg" className="bg-[#1f3b57] hover:bg-[#1f3b57]/90 text-white">
                  Contactez notre équipe entreprise
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
      <section className="py-20 px-4 bg-gradient-to-r from-[#1f3b57] to-[#2d5a87] text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Prêt à équiper votre entreprise ?</h2>
            <p className="text-xl text-blue-100">
              Rejoignez les centaines d'entreprises qui nous font confiance pour leurs besoins informatiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalogue">
                <Button size="lg" variant="secondary" className="bg-white text-[#1f3b57] hover:bg-gray-100">
                  Demander un devis gratuit
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1f3b57] bg-transparent"
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
