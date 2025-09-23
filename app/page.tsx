import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FeatureCard } from "@/components/feature-card"
import { ProductTabs } from "@/components/product-tabs"
import { ClientLogoSlider } from "@/components/client-logo-slider"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { CustomOfferBanner } from "@/components/custom-offer-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-ekwip/10 text-ekwip border-ekwip/20">Solution de location IT</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Équipez-vous, sans ruiner votre trésorerie!
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Louez vos équipements IT services applicatifs inclus. Flexibilité, performance et tranquillité d'esprit
                garanties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalogue">
                  <Button size="lg" className="bg-ekwip hover:bg-ekwip/90">
                    Demander un devis
                  </Button>
                </Link>
                <Link href="/comment-ca-marche">
                  <Button variant="outline" size="lg">
                    Voir le catalogue
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iXQ7znj442AnEqarTI9CMHOYmodfME.png"
                alt="Homme d'affaires au téléphone avec son ordinateur portable"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir Ekwip ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions flexibles et performantes pour tous vos besoins informatiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="Préservez votre trésorerie"
              description="Évitez les gros investissements et préservez votre cash-flow avec nos solutions de location."
              icon="/images/icon-cash.png"
            />
            <FeatureCard
              title="Gestion de parc simplifiée"
              description="Nous nous occupons de la maintenance, des mises à jour et du support technique."
              icon="/images/icon-fleet.png"
            />
            <FeatureCard
              title="Mise à niveau garantie"
              description="Bénéficiez toujours des dernières technologies avec nos options de mise à niveau."
              icon="/images/icon-upgrade.png"
            />
            <FeatureCard
              title="Support technique 24/7"
              description="Notre équipe d'experts est disponible pour vous accompagner à tout moment."
              icon="/images/icon-support.png"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Notre catalogue d'équipements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète d'équipements informatiques professionnels
            </p>
          </div>

          <ProductTabs />

          <div className="text-center mt-12">
            <Link href="/catalogue">
              <Button size="lg" variant="outline">
                Voir tout le catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
            <p className="text-xl text-gray-600">Plus de 500 entreprises nous font confiance pour leurs besoins IT</p>
          </div>

          <ClientLogoSlider />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comment ça marche</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et efficace pour équiper votre entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ekwip text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Choisissez vos équipements</h3>
              <p className="text-gray-600">
                Parcourez notre catalogue et sélectionnez les équipements qui correspondent à vos besoins.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ekwip text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Recevez votre devis</h3>
              <p className="text-gray-600">
                Nous vous proposons une solution personnalisée avec un devis détaillé sous 24h.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ekwip text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Profitez de vos équipements</h3>
              <p className="text-gray-600">
                Recevez vos équipements configurés et bénéficiez de notre support complet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 bg-ekwip text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Plus de 10 collaborateurs ?</h2>
              <p className="text-xl mb-8 opacity-90">
                Bénéficiez d'offres spéciales et d'un accompagnement personnalisé pour les grandes équipes.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Tarifs préférentiels sur les volumes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Gestionnaire de compte dédié
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Support prioritaire et SLA garantis
                </li>
              </ul>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Contactez notre équipe entreprise
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/images/laptop-hero.png"
                alt="Équipe entreprise"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Offer Banner */}
      <CustomOfferBanner />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Prêt à équiper votre entreprise ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les centaines d'entreprises qui nous font confiance pour leurs besoins informatiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-ekwip hover:bg-ekwip/90">
                Demander un devis gratuit
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                Parler à un expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
