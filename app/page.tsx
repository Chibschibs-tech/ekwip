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
                  {t("home.hero.badge")}
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">{t("home.hero.title")}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{t("home.hero.description")}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalogue">
                  <Button size="lg" className="bg-ekwip hover:bg-ekwip-700 text-white px-8 py-3">
                    {t("home.hero.cta.primary")}
                  </Button>
                </Link>
                <Link href="/comment-ca-marche">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 bg-transparent border-ekwip text-ekwip hover:bg-ekwip hover:text-white"
                  >
                    {t("home.hero.cta.secondary")}
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t("home.features.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("home.features.description")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="/images/icon-cash.png"
              title={t("home.features.card1.title")}
              description={t("home.features.card1.description")}
            />
            <FeatureCard
              icon="/images/icon-fleet.png"
              title={t("home.features.card2.title")}
              description={t("home.features.card2.description")}
            />
            <FeatureCard
              icon="/images/icon-upgrade.png"
              title={t("home.features.card3.title")}
              description={t("home.features.card3.description")}
            />
            <FeatureCard
              icon="/images/icon-support.png"
              title={t("home.features.card4.title")}
              description={t("home.features.card4.description")}
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t("home.products.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("home.products.description")}</p>
          </div>
          <ProductTabs />
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t("home.clients.title")}</h2>
            <p className="text-xl text-gray-600">{t("home.clients.description")}</p>
          </div>
          <ClientLogoSlider />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t("home.howItWorks.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("home.howItWorks.description")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ekwip text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">{t("home.howItWorks.step1.title")}</h3>
              <p className="text-gray-600">{t("home.howItWorks.step1.description")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ekwip text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">{t("home.howItWorks.step2.title")}</h3>
              <p className="text-gray-600">{t("home.howItWorks.step2.description")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ekwip text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">{t("home.howItWorks.step3.title")}</h3>
              <p className="text-gray-600">{t("home.howItWorks.step3.description")}</p>
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
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t("home.enterprise.title")}</h2>
                <p className="text-xl text-gray-600">{t("home.enterprise.description")}</p>
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
                  <p className="text-gray-700">{t("home.enterprise.feature1")}</p>
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
                  <p className="text-gray-700">{t("home.enterprise.feature2")}</p>
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
                  <p className="text-gray-700">{t("home.enterprise.feature3")}</p>
                </div>
              </div>
              <Link href="/contact">
                <Button size="lg" className="bg-ekwip hover:bg-ekwip-700 text-white">
                  {t("home.enterprise.cta")}
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
            <h2 className="text-3xl lg:text-4xl font-bold">{t("home.finalCta.title")}</h2>
            <p className="text-xl text-ekwip-100">{t("home.finalCta.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalogue">
                <Button size="lg" variant="secondary" className="bg-white text-ekwip hover:bg-gray-100">
                  {t("home.finalCta.primary")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-ekwip bg-transparent"
                >
                  {t("home.finalCta.secondary")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
