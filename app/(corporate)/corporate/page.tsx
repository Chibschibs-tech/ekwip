import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Laptop, Cast, Cpu, Shield, TrendingUp, Zap } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ClientLogoSlider } from "@/components/client-logo-slider"
import { DaasLink } from "@/components/daas-link"

export default function CorporateHome() {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Glassmorphism */}
            <section className="relative bg-gradient-to-br from-[#1F3B57] via-[#2a4a66] to-[#1F3B57] py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Hero Content in Glassmorphic Container */}
                        <ScrollReveal>
                            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    Alignez vos équipes, vos outils et vos équipements.
                                </h1>

                                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                                    Ekwip conçoit et opère l&apos;infrastructure matérielle et digitale de votre entreprise : postes de travail, espaces audiovisuels, outils internes et agents IA qui parlent le langage de vos équipes.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link href="/contact">
                                        <button className="ek-btn-pill-primary">
                                            Parler à un expert Ekwip
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </Link>
                                    <a href="#domains">
                                        <button className="ek-btn-pill-secondary">
                                            Découvrir nos domaines d&apos;intervention
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Right: Team in Server Room Visual */}
                        <ScrollReveal delay={0.2}>
                            <div className="relative h-[500px] w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <Image
                                    src="/artifacts/corporate_hero_team.png"
                                    alt="Équipe Ekwip dans un datacenter"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1F3B57]/50 to-transparent"></div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Ce qu'on prend en main pour vous */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Ce qu&apos;on prend en main pour vous
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <ScrollReveal delay={0.1}>
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col">
                                <div className="bg-ekwip-daas/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Laptop className="h-7 w-7 text-ekwip-daas" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ekwip-daas transition-colors">Équiper vos équipes</h3>
                                <p className="text-gray-600 leading-relaxed flex-grow">
                                    Ordinateurs, smartphones, accessoires et mobilier IT fournis en location, suivis dans un portail unique pour garder la maîtrise de votre parc.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col">
                                <div className="bg-ekwip-connect/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Cast className="h-7 w-7 text-ekwip-connect" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ekwip-connect transition-colors">Connecter vos espaces</h3>
                                <p className="text-gray-600 leading-relaxed flex-grow">
                                    Salles de réunion, espaces de formation, visio et diffusion, pensés pour que vos équipes se concentrent sur le contenu plutôt que sur la technique.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col">
                                <div className="bg-ekwip-tech/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Cpu className="h-7 w-7 text-ekwip-tech" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ekwip-tech transition-colors">Digitaliser vos opérations</h3>
                                <p className="text-gray-600 leading-relaxed flex-grow">
                                    Outils internes, automatisations, connecteurs et agents IA adaptés à votre stack, pour fluidifier les process et réduire les tâches répétitives.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>

                        <ScrollReveal delay={0.4}>
                        <div className="text-center">
                            <Link href="/contact">
                                <button className="ek-btn-pill-primary px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all">
                                    Parlons de votre besoin
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Nos domaines d'intervention aujourd'hui */}
            <section id="domains" className="py-24 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Nos domaines d&apos;intervention aujourd&apos;hui
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Ekwip grandit avec ses clients. Aujourd&apos;hui, nous intervenons principalement sur trois univers complémentaires, chacun avec ses propres équipes et méthodes.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Domain Cards - Horizontal Grid with Enhanced Glassmorphism */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* DaaS Card */}
                        <ScrollReveal delay={0.1}>
                            <DaasLink href="/catalogue" className="group block h-full">
                                <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                                    {/* Image Background */}
                                    <div className="relative h-56 overflow-hidden rounded-t-3xl">
                                        <Image
                                            src="/artifacts/daas_equipment_visual_v2.png"
                                            alt="IT Equipment"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow relative z-10">
                                        <div className="ek-chip ek-chip-daas mb-4 w-fit">
                                            <div className="ek-chip-dot" />
                                            Ekwip DaaS
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                            Location d&apos;équipements IT
                                        </h3>
                                        <p className="text-base text-gray-700 mb-6 leading-relaxed flex-grow">
                                            Parc informatique, smartphones, tablettes et accessoires en location mensuelle, avec un portail pour suivre votre parc, vos contrats et vos renouvellements.
                                        </p>
                                        <div className="flex items-center text-[#38BDF8] font-bold text-sm group-hover:gap-3 transition-all mt-auto">
                                            Explorer la location IT <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        {/* Connect Card */}
                        <ScrollReveal delay={0.2}>
                            <Link href="/connect" className="group block h-full">
                                <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                                    {/* Image Background */}
                                    <div className="relative h-56 overflow-hidden rounded-t-3xl">
                                        <Image
                                            src="/artifacts/av_solutions_visual.png"
                                            alt="AV Solutions"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow relative z-10">
                                        <div className="ek-chip ek-chip-connect mb-4 w-fit">
                                            <div className="ek-chip-dot" />
                                            Ekwip Connect
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                            Solutions Audiovisuelles et digitales
                                        </h3>
                                        <p className="text-base text-gray-700 mb-6 leading-relaxed flex-grow">
                                            Conception et intégration de salles de réunion, espaces de formation, visio et diffusion, du choix des équipements jusqu&apos;au paramétrage fin sur site.
                                        </p>
                                        <div className="flex items-center text-[#10B981] font-bold text-sm group-hover:gap-3 transition-all mt-auto">
                                            Voir les solutions audiovisuelles <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        {/* Tech Card */}
                        <ScrollReveal delay={0.3}>
                            <Link href="/tech" className="group block h-full">
                                <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                                    {/* Image Background */}
                                    <div className="relative h-56 overflow-hidden rounded-t-3xl">
                                        <Image
                                            src="/artifacts/tech_ai_visual_v2.png"
                                            alt="Tech & AI Solutions"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow relative z-10">
                                        <div className="ek-chip ek-chip-tech mb-4 w-fit">
                                            <div className="ek-chip-dot" />
                                            Ekwip Tech
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                            Web Apps métiers, Agents IA et automatisation sur-mesure
                                        </h3>
                                        <p className="text-base text-gray-700 mb-6 leading-relaxed flex-grow">
                                            Portails internes, automatisations, connecteurs et agents IA adaptés à vos outils existants, pour soutenir les équipes support, ventes ou opérations.
                                        </p>
                                        <div className="flex items-center text-[#F97316] font-bold text-sm group-hover:gap-3 transition-all mt-auto">
                                            Découvrir Ekwip Tech <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Ils nous font confiance (Copied from DaaS) */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ils nous font confiance</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Nos partenaires nous font confiance pour l'ensemble de leurs besoins IT
                            </p>
                        </div>
                        <ClientLogoSlider />
                    </ScrollReveal>
                </div>
            </section>

            {/* Pourquoi choisir Ekwip ? */}
            <section className="py-24 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Pourquoi choisir Ekwip ?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Le même partenaire pour vos parcs IT, vos espaces et vos outils digitaux, avec une approche pragmatique orientée usage.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Shield className="w-12 h-12" />,
                                title: "Expertise multi-domaines",
                                description: "Une seule entreprise pour la location IT, l'AV et le développement"
                            },
                            {
                                icon: <TrendingUp className="w-12 h-12" />,
                                title: "Solutions évolutives",
                                description: "Des services qui grandissent avec votre entreprise"
                            },
                            {
                                icon: <Zap className="w-12 h-12" />,
                                title: "Réactivité maximale",
                                description: "Support 24/7 et interventions rapides"
                            }
                        ].map((item, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-shadow h-full">
                                    <div className="text-[#214274] mb-4">{item.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-slate-50">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Prêt à nous expliquer votre contexte ?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                            Démarrons par un seul sujet – un parc IT à structurer, une salle à équiper ou un besoin d&apos;automatisation – puis faisons évoluer la collaboration au rythme de votre entreprise.
                        </p>
                        <Link href="/contact">
                            <button className="ek-btn-pill-primary">
                                Nous parler de votre projet
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    )
}
