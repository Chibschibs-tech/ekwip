"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import CategoryCard from "@/components/category-card"
import FeatureCard from "@/components/feature-card"
import TestimonialsSection from "@/components/testimonials-section"
import ClientLogoSlider from "@/components/client-logo-slider"
import FAQSection from "@/components/faq-section"
import CustomOfferBanner from "@/components/custom-offer-banner"
import { useLanguage } from "@/contexts/language-context"
import { getCategories, getFeaturedProducts } from "@/lib/products"

export default function Home() {
  const { t } = useLanguage()
  const categories = getCategories()
  const featuredProducts = getFeaturedProducts()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-ekwip-50 via-white to-ekwip-100 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">{t("hero.title")}</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">{t("hero.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="gradient" className="text-lg px-8">
                  <Link href="/catalogue">
                    {t("hero.cta_primary")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Link href="/comment-ca-marche">{t("hero.cta_secondary")}</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-ekwip-100 to-ekwip-200 rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/images/laptop-hero.png"
                  alt="Équipements informatiques Ekwip"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
                <div className="absolute -top-4 -right-4 bg-ekwip text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Nouveau !
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t("categories.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("categories.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CategoryCard
                  iconName={category.name}
                  title={category.name}
                  description={category.description}
                  slug={category.slug}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t("features.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("features.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="/images/icon-cash.png"
              title={t("features.flexibility.title")}
              description={t("features.flexibility.desc")}
            />
            <FeatureCard
              icon="/images/icon-support.png"
              title={t("features.maintenance.title")}
              description={t("features.maintenance.desc")}
            />
            <FeatureCard
              icon="/images/icon-upgrade.png"
              title={t("features.upgrade.title")}
              description={t("features.upgrade.desc")}
            />
            <FeatureCard
              icon="/images/icon-fleet.png"
              title={t("features.support.title")}
              description={t("features.support.desc")}
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t("how_it_works.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("how_it_works.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: t("how_it_works.step1.title"),
                description: t("how_it_works.step1.desc"),
                icon: "🛒",
              },
              {
                step: "2",
                title: t("how_it_works.step2.title"),
                description: t("how_it_works.step2.desc"),
                icon: "⚙️",
              },
              {
                step: "3",
                title: t("how_it_works.step3.title"),
                description: t("how_it_works.step3.desc"),
                icon: "✅",
              },
              {
                step: "4",
                title: t("how_it_works.step4.title"),
                description: t("how_it_works.step4.desc"),
                icon: "🚀",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full border-ekwip-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogoSlider />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Custom Offer Banner */}
      <CustomOfferBanner />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-ekwip text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à moderniser votre parc informatique ?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Découvrez nos solutions de location flexibles et bénéficiez de l'expertise de nos équipes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-ekwip hover:bg-gray-100">
                <Link href="/catalogue">Découvrir le catalogue</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                <Link href="/contact">Parler à un expert</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
