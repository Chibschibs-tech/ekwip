import Link from "next/link"
import { ArrowRight, Laptop, Monitor, Cpu, Shield, TrendingUp, Zap, MapPin } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ClientLogoSlider } from "@/components/client-logo-slider"
import { StructuredData } from "@/components/seo/structured-data"
import { generateStructuredData } from "@/lib/seo"
import { CardSlider } from "@/components/ui/card-slider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ekwip — Votre partenaire IT au Maroc | Vente, Location & Développement",
  description:
    "Ekwip équipe les entreprises marocaines : vente de matériel informatique, location IT via Rento, et développement digital sur-mesure. Basé à Casablanca.",
  keywords: [
    "vente matériel informatique Maroc",
    "équipement IT entreprise",
    "partenaire IT Casablanca",
    "location matériel informatique",
    "développement web Maroc",
  ],
}

export default function HomePage() {
  const organizationSchema = generateStructuredData("Organization", {})
  const websiteSchema = generateStructuredData("WebSite", {})

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1F3B57] via-[#2a4a66] to-[#1F3B57] py-16 md:py-20 lg:py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Votre partenaire IT au Maroc
                </h1>
                <p className="text-base md:text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Vente de matériel informatique professionnel, location d&apos;équipements via Rento, et développement digital sur-mesure pour les entreprises marocaines.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/boutique">
                    <button className="ek-btn-pill-primary">
                      Explorer la boutique
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="ek-btn-pill-secondary bg-white/20 border-white/30 text-white hover:backdrop-blur-md hover:bg-white/30 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Nous contacter
                    </button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 md:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Nos domaines d&apos;intervention
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Un seul partenaire pour équiper, louer et digitaliser votre entreprise.
                </p>
              </div>
            </ScrollReveal>

            <div className="w-full max-w-7xl mx-auto">
              <CardSlider gap="lg" className="lg:grid-cols-3">
                {/* Card 1 — Vente */}
                <ScrollReveal delay={0.1}>
                  <Link href="/boutique" className="group block h-full">
                    <div className="relative overflow-hidden bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Laptop className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Vente d&apos;équipement IT
                        </h3>
                        <p className="text-base text-gray-700 mb-6 leading-relaxed flex-grow">
                          Plus de 700 produits professionnels : ordinateurs portables, imprimantes, réseau, accessoires. Devis personnalisé et livraison au Maroc.
                        </p>
                        <div className="flex items-center text-[#38BDF8] font-bold text-sm group-hover:gap-3 transition-all mt-auto">
                          Explorer la boutique <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>

                {/* Card 2 — Rento */}
                <ScrollReveal delay={0.2}>
                  <Link href="/rento" className="group block h-full">
                    <div className="relative overflow-hidden bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#10B981]/10 text-[#10B981] mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Monitor className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Location IT — Rento
                        </h3>
                        <p className="text-base text-gray-700 mb-6 leading-relaxed flex-grow">
                          Louez votre parc informatique en mensualités. Maintenance, support et renouvellement inclus. Un produit Ekwip.
                        </p>
                        <div className="flex items-center text-[#10B981] font-bold text-sm group-hover:gap-3 transition-all mt-auto">
                          Découvrir Rento <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>

                {/* Card 3 — Dev */}
                <ScrollReveal delay={0.3}>
                  <Link href="/contact" className="group block h-full">
                    <div className="relative overflow-hidden bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#F97316]/10 text-[#F97316] mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Cpu className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Développement Digital
                        </h3>
                        <p className="text-base text-gray-700 mb-6 leading-relaxed flex-grow">
                          Sites web, applications métiers, CRMs, outils internes et automatisations construits pour vos opérations.
                        </p>
                        <div className="flex items-center text-[#F97316] font-bold text-sm group-hover:gap-3 transition-all mt-auto">
                          Discuter d&apos;un projet <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </CardSlider>
            </div>
          </div>
        </section>

        {/* Ils nous font confiance */}
        <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Des entreprises marocaines nous font confiance pour leurs besoins IT.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <ClientLogoSlider />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Pourquoi choisir Ekwip */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-[#1f3b57]">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Pourquoi choisir Ekwip ?
                </h2>
                <p className="text-lg text-white/90 max-w-3xl mx-auto">
                  Le même partenaire pour vos équipements IT, la location et vos outils digitaux.
                </p>
              </div>
            </ScrollReveal>

            <div className="w-full max-w-7xl mx-auto">
              <CardSlider gap="lg" className="lg:grid-cols-3 auto-rows-fr">
                {[
                  {
                    icon: <Shield className="w-12 h-12 text-white" />,
                    title: "Expertise multi-domaines",
                    description: "Vente, location et développement digital depuis un seul interlocuteur pour tous vos besoins d'infrastructure."
                  },
                  {
                    icon: <TrendingUp className="w-12 h-12 text-white" />,
                    title: "Solutions évolutives",
                    description: "Des services qui grandissent avec votre entreprise. Démarrons par un projet pilote, puis faisons évoluer la collaboration."
                  },
                  {
                    icon: <Zap className="w-12 h-12 text-white" />,
                    title: "Approche pragmatique",
                    description: "Concentrés sur l'usage et les résultats concrets. Support réactif et accompagnement personnalisé pour chaque client."
                  }
                ].map((item, index) => (
                  <ScrollReveal key={index} delay={index * 0.1} className="h-full flex">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 h-full w-full flex flex-col">
                      <div className="text-white mb-4">{item.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/90 flex-grow">{item.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </CardSlider>
            </div>
          </div>
        </section>

        {/* Qui sommes-nous */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Qui sommes-nous
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Basée à Casablanca, Ekwip est un partenaire IT B2B qui accompagne les entreprises marocaines dans leur équipement et leur transformation digitale. Nous combinons la vente de matériel informatique professionnel, la location d&apos;équipements via notre offre Rento, et le développement d&apos;outils digitaux sur-mesure.
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>30 Bd Rahal El Meskini, Casablanca</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-slate-50">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Un projet en tête ?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Que ce soit pour équiper vos équipes, louer du matériel ou développer un outil, nous sommes là pour en discuter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/boutique">
                  <button className="ek-btn-pill-primary">
                    Explorer la boutique
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="ek-btn-pill-secondary">
                    Nous contacter
                  </button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  )
}
