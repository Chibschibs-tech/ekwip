import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Video, Monitor, Mic, LayoutGrid, Users, Settings, Share2, ShieldCheck } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { StructuredData } from "@/components/seo/structured-data"
import { generateStructuredData } from "@/lib/seo"
import { generateMetadata as genMetadata } from "@/lib/seo"
import { ClientLogoSlider } from "@/components/client-logo-slider"
import { ServiceCard } from "@/components/service-card"
import { CardSlider } from "@/components/ui/card-slider"

export const metadata = genMetadata({
  title: "Ekwip Connect - Solutions Audiovisuelles Professionnelles au Maroc",
  description:
    "Installation de salles de réunion, visioconférence et solutions de diffusion fixes pour les entreprises. De l'audit à la maintenance, nous gérons votre projet AV de A à Z.",
  keywords: [
    "solutions audiovisuelles Maroc",
    "salles de réunion",
    "visioconférence professionnelle",
    "installation AV",
    "Zoom Rooms",
    "Microsoft Teams Rooms",
    "digital signage",
    "sonorisation",
    "boardrooms",
  ],
  url: "/connect",
  type: "website",
})

export default function ConnectPage() {
    const serviceSchema = generateStructuredData("Service", {
        serviceType: "Solutions Audiovisuelles",
        description: "Conception et installation de solutions AV fixes pour tous vos espaces",
        areaServed: {
            "@type": "Country",
            name: "Morocco",
        },
    })
    
    return (
        <>
            <StructuredData data={serviceSchema} />
            <main className="min-h-screen">
            {/* Hero Section with Glassmorphism */}
            <section className="relative bg-gradient-to-br from-[#064E3B] via-[#059669] to-[#064E3B] py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Hero Content in Glassmorphic Container */}
                        <ScrollReveal>
                            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12">
                                <div className="ek-chip ek-chip-connect mb-6 bg-emerald-500/20 text-emerald-50 border-emerald-400/30">
                                    <div className="ek-chip-dot bg-emerald-400" />
                                    Ekwip Connect
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    Solutions audiovisuelles professionnelles
                                </h1>

                                <p className="text-lg text-emerald-50 mb-8 leading-relaxed">
                                    Installation de salles de réunion, visioconférence et solutions de diffusion fixes pour les entreprises. De l&apos;audit à la maintenance, nous gérons votre projet de A à Z.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link href="/contact">
                                        <button className="ek-btn-pill-primary bg-emerald-500 hover:bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/20">
                                            Demander un audit gratuit
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </Link>
                                    <a href="#solutions">
                                        <button className="ek-btn-pill-secondary bg-white border-white text-ekwip-primary hover:bg-slate-50 hover:border-white">
                                            Découvrir nos solutions
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Right: Visual */}
                        <ScrollReveal delay={0.2}>
                            <div className="relative h-[500px] w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <Image
                                    src="/artifacts/connect_hero_visual.png"
                                    alt="Salle de réunion moderne équipée de solutions audiovisuelles professionnelles - Installation AV pour entreprises au Maroc"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/60 to-transparent"></div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Solutions Grid */}
            <section id="solutions" aria-label="Nos solutions audiovisuelles" className="py-20 px-4 md:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce que nous faisons</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                 Conception et installation de solutions AV fixes pour tous vos espaces. De la salle de réunion à l&apos;auditorium, nous équipons vos espaces pour la collaboration hybride et la diffusion de contenu.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {[
                             { icon: <Users className="w-6 h-6 text-emerald-600" />, title: "Salles de réunion", description: "Écrans interactifs, systèmes audio, caméras pour la collaboration hybride." },
                             { icon: <Video className="w-6 h-6 text-emerald-600" />, title: "Visioconférence", description: "Zoom Rooms, Microsoft Teams Rooms certifiées et optimisées." },
                             { icon: <LayoutGrid className="w-6 h-6 text-emerald-600" />, title: "Salles de direction", description: "Boardrooms haut de gamme avec pilotage centralisé." },
                             { icon: <Mic className="w-6 h-6 text-emerald-600" />, title: "Auditoriums", description: "Sonorisation, captation et diffusion pour vos événements internes." },
                            { icon: <Monitor className="w-6 h-6 text-emerald-600" />, title: "Digital Signage", description: "Affichage dynamique pour la communication interne." },
                            { icon: <Settings className="w-6 h-6 text-emerald-600" />, title: "Maintenance", description: "Support technique et supervision de vos installations." }
                        ].map((item, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col">
                                    <div className="bg-emerald-50 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed flex-grow">{item.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={0.4}>
                        <div className="text-center">
                            <Link href="/contact">
                                <button className="ek-btn-pill-secondary hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors">
                                    Voir toutes nos solutions
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Process / Approach */}
            <section className="py-24 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre approche</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                 Une méthodologie éprouvée pour garantir le succès de vos projets
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 relative">
                        {/* Connecting Line (Desktop only) */}
                        <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-emerald-100 -z-10"></div>

                        {[
                            { step: "1", title: "Audit", description: "Analyse de vos besoins et contraintes techniques" },
                             { step: "2", title: "Design", description: "Conception technique et choix des équipements" },
                             { step: "3", title: "Installation", description: "Mise en place, câblage et paramétrage" },
                            { step: "4", title: "Support", description: "Formation, maintenance et supervision" }
                        ].map((item, index) => (
                            <ScrollReveal key={item.step} delay={index * 0.1}>
                                <div className="text-center bg-white group">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-emerald-600 font-bold text-xl border-4 border-emerald-50 group-hover:border-emerald-500 transition-colors">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Final CTA */}
                    <ScrollReveal delay={0.5}>
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden">
                            <div className="relative z-10">
                                 <h3 className="text-2xl md:text-3xl font-bold mb-4">Un projet en tête ?</h3>
                                  <p className="text-emerald-50 mb-8 max-w-2xl mx-auto">
                                     Nos experts sont là pour vous conseiller sur la meilleure configuration pour vos espaces.
                                  </p>
                                  <Link href="/contact">
                                      <button className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-full font-semibold transition-colors flex items-center mx-auto shadow-lg">
                                         Démarrer votre projet
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </button>
                                </Link>
                            </div>
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Technologies & Partners Section */}
            <section aria-label="Technologies et partenaires" className="py-20 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technologies & Partenaires</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                 Nous travaillons avec les meilleures marques et solutions du marché pour garantir la qualité de vos installations
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                        {/* Placeholder for partner logos - to be replaced with actual logos */}
                        {[
                            "Microsoft Teams",
                            "Zoom",
                            "Logitech",
                            "Samsung",
                            "LG",
                            "Cisco",
                        ].map((partner, index) => (
                            <div key={index} className="flex items-center justify-center h-16 w-full">
                                <span className="text-gray-400 text-sm font-medium">{partner}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross-Service Section */}
            <section aria-label="Autres services Ekwip" className="py-20 px-4 md:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-12">
                             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Complétez votre infrastructure avec nos autres services</h2>
                              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                 Ekwip propose une gamme complète de services pour répondre à tous vos besoins d&apos;infrastructure IT
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ScrollReveal delay={0.1}>
                            <ServiceCard
                                title="Location d'équipements IT"
                                description="Parc informatique, smartphones, tablettes et accessoires en location mensuelle, avec un portail pour suivre votre parc, vos contrats et vos renouvellements."
                                href="/catalogue"
                                image="/artifacts/daas_equipment_visual_v2.png"
                                imageAlt="Ã‰quipements IT en location"
                                chip={{ label: "Ekwip DaaS", variant: "daas" }}
                                colorClass="text-[#38BDF8]"
                                hoverColorClass="text-[#38BDF8]"
                            />
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <ServiceCard
                                 title="Web Apps métiers, Agents IA et automatisation"
                                 description="Portails internes, automatisations, connecteurs et agents IA adaptés à vos outils existants, pour soutenir les équipes support, ventes ou opérations."
                                href="/tech"
                                image="/artifacts/tech_ai_visual_v2.png"
                                imageAlt="Solutions tech et IA"
                                chip={{ label: "Ekwip Tech", variant: "tech" }}
                                colorClass="text-[#F97316]"
                                hoverColorClass="text-[#F97316]"
                            />
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}
