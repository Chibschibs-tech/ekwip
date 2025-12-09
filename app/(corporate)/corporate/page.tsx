import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Laptop, Cast, Cpu, Shield, TrendingUp, Zap } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ClientLogoSlider } from "@/components/client-logo-slider"
import { DaasLink } from "@/components/daas-link"
import { StructuredData } from "@/components/seo/structured-data"
import { generateStructuredData } from "@/lib/seo"
import { metadata } from "./metadata"
import { CardSlider } from "@/components/ui/card-slider"

export { metadata }

export default function CorporateHome() {
    const organizationSchema = generateStructuredData("Organization", {})
    const websiteSchema = generateStructuredData("WebSite", {})
    
    return (
        <>
            <StructuredData data={organizationSchema} />
            <StructuredData data={websiteSchema} />
            <main className="min-h-screen">
            {/* Hero Section with Glassmorphism */}
            <section className="relative bg-gradient-to-br from-[#1F3B57] via-[#2a4a66] to-[#1F3B57] py-16 md:py-20 lg:py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10 z-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
                </div>

                {/* Mobile Background Image Layer */}
                <div className="lg:hidden absolute inset-0 z-[1]">
                    <Image
                        src="/artifacts/corporate_hero_team.png"
                        alt=""
                        fill
                        className="object-cover opacity-40"
                        priority
                        sizes="100vw"
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1F3B57]/90 via-[#1F3B57]/85 to-[#1F3B57]/95"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Hero Content in Glassmorphic Container */}
                        <ScrollReveal>
                            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 lg:p-12 relative">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                                    Alignez vos équipes, vos outils et vos équipements.
                                </h1>

                                <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8 leading-relaxed">
                                    De l&apos;équipement IT à la location, aux espaces audiovisuels, en passant par les outils digitaux sur-mesure. Ekwip conçoit et opère l&apos;infrastructure matérielle et digitale de votre entreprise : postes de travail, espaces audiovisuels, outils internes et agents IA qui parlent le langage de vos équipes.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link href="/contact">
                                        <button className="ek-btn-pill-primary">
                                            Parler à un expert
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </Link>
                                    <a href="#domains">
                                        <button className="ek-btn-pill-secondary bg-white border-white/20 text-ekwip-primary hover:backdrop-blur-md hover:bg-white/80 hover:border-white/30 hover:text-[#1a3047] transition-all duration-300 shadow-lg hover:shadow-xl">
                                            Nos domaines d&apos;intervention
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Right: Team in Server Room Visual - Desktop only */}
                        <ScrollReveal delay={0.2} className="hidden lg:block">
                            <div className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <Image
                                    src="/artifacts/corporate_hero_team.png"
                                    alt="Équipe Ekwip dans un datacenter"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 50vw, 33vw"
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

                    <div className="w-full max-w-7xl mx-auto">
                        <CardSlider gap="lg" className="mb-12 lg:grid-cols-3">
                            {[
                                {
                                    icon: <Laptop className="h-8 w-8 text-[#38BDF8]" />,
                                    bgColor: "bg-[#38BDF8]/10",
                                    title: "Équiper vos équipes",
                                    description: "Ordinateurs, smartphones, accessoires et mobilier IT fournis en location, suivis dans un portail unique pour garder la maîtrise de votre parc.",
                                    hoverColor: "text-[#38BDF8]",
                                },
                                {
                                    icon: <Cast className="h-8 w-8 text-[#10B981]" />,
                                    bgColor: "bg-[#10B981]/10",
                                    title: "Connecter vos espaces",
                                    description: "Salles de réunion, espaces de formation, visio et diffusion, pensés pour que vos équipes se concentrent sur le contenu plutôt que sur la technique.",
                                    hoverColor: "text-[#10B981]",
                                },
                                {
                                    icon: <Cpu className="h-8 w-8 text-[#F97316]" />,
                                    bgColor: "bg-[#F97316]/10",
                                    title: "Digitaliser vos opérations",
                                    description: "Outils internes, automatisations, connecteurs et agents IA adaptés à votre stack, pour fluidifier les process et réduire les tâches répétitives.",
                                    hoverColor: "text-[#F97316]",
                                },
                            ].map((item, index) => (
                                <ScrollReveal key={index} delay={index * 0.1}>
                                    <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 rounded-3xl p-10 md:p-12 border border-white/80 shadow-[0_8px_32px_0px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_0px_rgba(0,0,0,0.12)] hover:bg-white/98 hover:-translate-y-2 hover:border-white transition-all duration-500 group h-full flex flex-col before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/50 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:-z-10">
                                        <div className={`${item.bgColor} rounded-2xl w-18 h-18 md:w-20 md:h-20 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                                            {item.icon}
                                        </div>
                                        <h3 className={`text-2xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-5 transition-colors ${index === 0 ? 'group-hover:text-[#38BDF8]' : index === 1 ? 'group-hover:text-[#10B981]' : 'group-hover:text-[#F97316]'}`}>{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed flex-grow text-base md:text-lg">
                                            {item.description}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </CardSlider>
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
            <section id="domains" aria-label="Nos trois services: DaaS, Connect et Tech" className="py-24 px-4 md:px-6 lg:px-8 bg-white">
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
                    <div className="w-full max-w-7xl mx-auto">
                        <CardSlider gap="lg" className="lg:grid-cols-3 auto-rows-fr">
                            {/* DaaS Card */}
                            <ScrollReveal delay={0.1} className="h-full flex">
                                <DaasLink href="/catalogue" className="group block h-full w-full flex">
                                    <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:shadow-gray-400/50 rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full w-full flex flex-col">
                                    {/* Image Background */}
                                    <div className="relative h-56 overflow-hidden rounded-t-3xl">
                                        <Image
                                            src="/artifacts/daas_equipment_visual_v2.png"
                                            alt="Location d'équipements IT - Ordinateurs portables, smartphones et accessoires pour entreprises"
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
                            </DaasLink>
                        </ScrollReveal>

                            {/* Connect Card */}
                            <ScrollReveal delay={0.2} className="h-full flex">
                                <Link href="/connect" className="group block h-full w-full flex">
                                    <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:shadow-gray-400/50 rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full w-full flex flex-col">
                                    {/* Image Background */}
                                    <div className="relative h-56 overflow-hidden rounded-t-3xl">
                                        <Image
                                            src="/artifacts/av_solutions_visual.png"
                                            alt="Solutions audiovisuelles professionnelles - Salles de réunion, visioconférence et digital signage"
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
                                            Nos solutions Audiovisuelles <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                            {/* Tech Card */}
                            <ScrollReveal delay={0.3} className="h-full flex">
                                <Link href="/tech" className="group block h-full w-full flex">
                                    <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:shadow-gray-400/50 rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full w-full flex flex-col">
                                    {/* Image Background */}
                                    <div className="relative h-56 overflow-hidden rounded-t-3xl">
                                        <Image
                                            src="/artifacts/tech_ai_visual_v2.png"
                                            alt="Développement sur-mesure et agents IA - Solutions tech personnalisées pour transformation digitale"
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
                    </CardSlider>
                    </div>
                </div>
            </section>

            {/* Ils nous font confiance (Copied from DaaS) */}
            <section aria-label="Nos clients et partenaires" className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8">
                                Nos partenaires nous font confiance pour l'ensemble de leurs besoins IT
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <ClientLogoSlider />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Pourquoi choisir Ekwip ? */}
            <section aria-label="Avantages de choisir Ekwip" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-[#1f3b57]">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Pourquoi choisir Ekwip ?
                            </h2>
                            <p className="text-lg text-white/90 max-w-3xl mx-auto">
                                Le même partenaire pour vos parcs IT, vos espaces et vos outils digitaux, avec une approche pragmatique orientée usage.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="w-full max-w-7xl mx-auto">
                        <CardSlider gap="lg" className="lg:grid-cols-3 auto-rows-fr">
                            {[
                                {
                                    icon: <Shield className="w-12 h-12 text-white" />,
                                    title: "Expertise multi-domaines",
                                    description: "Une seule entreprise pour la location IT, l'AV et le développement. Un seul interlocuteur pour tous vos besoins d'infrastructure."
                                },
                                {
                                    icon: <TrendingUp className="w-12 h-12 text-white" />,
                                    title: "Solutions évolutives",
                                    description: "Des services qui grandissent avec votre entreprise. Démarrons par un projet pilote, puis faisons évoluer la collaboration au rythme de vos besoins."
                                },
                                {
                                    icon: <Zap className="w-12 h-12 text-white" />,
                                    title: "Approche pragmatique",
                                    description: "Nous nous concentrons sur l'usage et les résultats concrets. Support réactif et accompagnement personnalisé pour chaque client."
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

            {/* Final CTA */}
            <section aria-label="Appel à l'action - Contactez-nous" className="py-20 px-4 md:px-6 lg:px-8 bg-slate-50">
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
        </main>
        </>
    )
}
