"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import ProductTabs from "@/components/product-tabs"
import ClientLogoSlider from "@/components/client-logo-slider"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import { ArrowRight, Banknote, Server, RefreshCw, HeadphonesIcon } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Équipez-vous, <span className="text-ekwip">sans ruiner</span> votre trésorerie!
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">{t("home.hero.description")}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="xl" className="shadow-lg">
                {t("home.hero.button1")}
              </Button>
              <Button variant="outline" size="xl">
                {t("home.hero.button2")}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl transform transition-all duration-500 hover:rotate-1 hover:shadow-2xl">
              <div className="relative">
                <Image
                  src="https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/Hero%20office"
                  alt="Équipement informatique professionnel pour entreprises"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover brightness-105 contrast-105"
                  priority
                />
                {/* Overlay with brand color */}
                <div className="absolute inset-0 bg-ekwip opacity-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title={t("home.features.card1.title")}
              description={t("home.features.card1.description")}
              icon={<Banknote className="w-10 h-10 text-ekwip" />}
              iconBgColor="bg-blue-100"
              className="shadow-md"
            />

            <FeatureCard
              title={t("home.features.card2.title")}
              description={t("home.features.card2.description")}
              icon={<Server className="w-10 h-10 text-ekwip" />}
              iconBgColor="bg-indigo-100"
              className="shadow-md"
            />

            <FeatureCard
              title={t("home.features.card3.title")}
              description={t("home.features.card3.description")}
              icon={<RefreshCw className="w-10 h-10 text-white" />}
              iconBgColor="bg-white/20"
              bgColor="bg-ekwip"
              textColor="text-white"
              className="shadow-md"
            />

            <FeatureCard
              title={t("home.features.card4.title")}
              description={t("home.features.card4.description")}
              icon={<HeadphonesIcon className="w-10 h-10 text-ekwip" />}
              iconBgColor="bg-indigo-100"
              className="shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section className="py-20 md:py-28 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">{t("home.products.title")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("home.products.description")}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <ProductTabs />
          </div>

          <div className="mt-16 text-center">
            <a href="https://ekwip.ma/catalogue">
              <Button variant="gradient" size="lg" className="shadow-lg px-8 py-6 text-lg">
                {t("home.products.button")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t("home.clients.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("home.clients.description")}</p>
          </div>

          <ClientLogoSlider />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl mx-4 md:mx-8 lg:mx-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t("home.howItWorks.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("home.howItWorks.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t("home.howItWorks.step1.title")}</h3>
              <p className="text-gray-600">{t("home.howItWorks.step1.description")}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t("home.howItWorks.step2.title")}</h3>
              <p className="text-gray-600">{t("home.howItWorks.step2.description")}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t("home.howItWorks.step3.title")}</h3>
              <p className="text-gray-600">{t("home.howItWorks.step3.description")}</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/comment-ca-marche">
              <Button variant="outline" size="lg" className="bg-white">
                {t("home.howItWorks.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise Section with FAQ */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Plus de 10 collaborateurs?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous proposons des solutions sur mesure pour les moyennes et grandes entreprises.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Solutions pour entreprises</h3>
              <p className="text-gray-600 mb-6">
                Ekwip propose des solutions de location d'équipement IT adaptées aux besoins spécifiques des moyennes et
                grandes entreprises. Nos experts vous accompagnent dans la définition de votre parc informatique et vous
                proposent des solutions sur mesure.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Gestion de parc informatique complète</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Tarifs dégressifs selon le volume</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Support technique dédié</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Portail client personnalisé</span>
                </li>
              </ul>
              <Button variant="gradient" size="lg">
                Demander un devis
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/dell-xps.png"
                  alt="Solutions entreprise"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection />
        </div>
      </section>

      {/* Custom Offer Banner - Updated with the site's blue color */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-ekwip text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à équiper votre entreprise?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="xl" className="bg-white text-ekwip hover:bg-gray-100">
              Demander un devis
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <TestimonialsSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("home.cta.title")}</h2>
          <p className="text-white text-lg max-w-2xl mx-auto mb-8 opacity-90">{t("home.cta.description")}</p>
          <Link href="/contact">
            <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
              {t("home.cta.button")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
