import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Laptop, Video, Code, Zap, Shield, TrendingUp } from "lucide-react"

export default function CorporateHome() {
    return (
        <div className="min-h-screen">
            {/* Hero Section - Visual Impact */}
            <section className="relative bg-gradient-to-br from-[#1F3B57] via-[#2a4a66] to-[#1F3B57] py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white mb-8 border border-white/20">
                            <Zap className="w-4 h-4" />
                            <span className="text-sm font-medium">Votre partenaire technologique de confiance</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            Équipez, Connectez,
                            <br />
                            <span className="bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                                Digitalisez
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
                            De la location d'équipements IT aux solutions audiovisuelles en passant par le développement sur mesure,
                            Ekwip accompagne votre transformation digitale de bout en bout.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/corporate/daas">
                                <Button size="lg" className="bg-white text-[#1F3B57] hover:bg-blue-50 text-lg px-8 py-6 h-auto">
                                    Découvrir nos solutions
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/corporate/contact">
                                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto">
                                    Nous contacter
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 text-center">
                        <div className="text-white">
                            <div className="text-4xl font-bold mb-2">500+</div>
                            <div className="text-blue-200 text-sm">Entreprises équipées</div>
                        </div>
                        <div className="text-white">
                            <div className="text-4xl font-bold mb-2">3</div>
                            <div className="text-blue-200 text-sm">Domaines d'expertise</div>
                        </div>
                        <div className="text-white">
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <div className="text-blue-200 text-sm">Support disponible</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Services Showcase */}
            <section className="py-24 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Trois expertises, une solution complète
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Nous couvrons tous les aspects de votre transformation digitale
                        </p>
                    </div>

                    {/* DaaS - Visual Card */}
                    <div className="mb-20">
                        <Link href="/corporate/daas" className="group">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-blue-50 to-slate-50 rounded-3xl p-12 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#1F3B57]">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                        <Laptop className="w-4 h-4" />
                                        Ekwip DaaS
                                    </div>
                                    <h3 className="text-4xl font-bold text-gray-900 mb-6">
                                        Location d'équipements IT
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                        Ordinateurs, smartphones, tablettes : équipez vos équipes sans investissement initial.
                                        Mensualités flexibles, maintenance incluse, mise à niveau garantie.
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            "Préservation de trésorerie",
                                            "Gestion de parc simplifiée",
                                            "Renouvellement technologique",
                                            "Support technique 24/7"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700">
                                                <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                                <span className="text-lg">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex items-center text-[#1F3B57] font-semibold text-lg group-hover:gap-3 transition-all">
                                        Accéder au catalogue <ArrowRight className="ml-2 h-6 w-6" />
                                    </div>
                                </div>
                                <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                                    <Image
                                        src="/images/laptop-hero.png"
                                        alt="Équipements IT"
                                        fill
                                        className="object-contain p-8"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Connect - Visual Card */}
                    <div className="mb-20">
                        <Link href="/corporate/connect" className="group">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-600">
                                <div className="order-2 lg:order-1 relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <Video className="w-32 h-32 text-indigo-600 mx-auto mb-4" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-sm font-medium text-gray-700">
                                                Salles de réunion
                                            </div>
                                            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-sm font-medium text-gray-700">
                                                Visioconférence
                                            </div>
                                            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-sm font-medium text-gray-700">
                                                Auditoriums
                                            </div>
                                            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-sm font-medium text-gray-700">
                                                Digital Signage
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-1 lg:order-2">
                                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                        <Video className="w-4 h-4" />
                                        Ekwip Connect
                                    </div>
                                    <h3 className="text-4xl font-bold text-gray-900 mb-6">
                                        Solutions audiovisuelles professionnelles
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                        Installation de salles de réunion, systèmes de visioconférence, et solutions de diffusion fixes.
                                        De l'audit à la maintenance, nous gérons votre projet de A à Z.
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            "Audit et conception technique",
                                            "Installation professionnelle",
                                            "Formation des équipes",
                                            "Support et maintenance"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700">
                                                <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                                <span className="text-lg">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex items-center text-indigo-600 font-semibold text-lg group-hover:gap-3 transition-all">
                                        En savoir plus <ArrowRight className="ml-2 h-6 w-6" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Tech - Visual Card */}
                    <div>
                        <Link href="/corporate/tech" className="group">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-600">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                        <Code className="w-4 h-4" />
                                        Ekwip Tech
                                    </div>
                                    <h3 className="text-4xl font-bold text-gray-900 mb-6">
                                        Développement & IA sur mesure
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                        Web apps métiers, automatisation, agents AI et RAG personnalisés.
                                        Nous transformons vos idées en solutions digitales performantes.
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            "Applications web métiers",
                                            "Automatisation de processus",
                                            "Agents AI conversationnels",
                                            "Solutions RAG sur mesure"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700">
                                                <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                                <span className="text-lg">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex items-center text-purple-600 font-semibold text-lg group-hover:gap-3 transition-all">
                                        Découvrir Tech <ArrowRight className="ml-2 h-6 w-6" />
                                    </div>
                                </div>
                                <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <Code className="w-32 h-32 text-purple-600 mx-auto mb-4" />
                                        <div className="grid grid-cols-3 gap-3">
                                            {["Next.js", "React", "Python", "OpenAI", "TypeScript", "AI"].map((tech) => (
                                                <div key={tech} className="bg-white/50 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-medium text-gray-700">
                                                    {tech}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Ekwip - Visual */}
            <section className="py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Pourquoi choisir Ekwip ?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Un partenaire unique pour tous vos besoins technologiques
                        </p>
                    </div>

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
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-[#1F3B57] rounded-xl flex items-center justify-center mb-6 text-white">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600 text-lg">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Visual Impact */}
            <section className="relative bg-gradient-to-r from-[#1F3B57] to-[#2a4a66] py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Prêt à transformer votre entreprise ?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                        Parlons de votre projet et trouvons ensemble la solution idéale pour vos besoins
                    </p>
                    <Link href="/corporate/contact">
                        <Button size="lg" className="bg-white text-[#1F3B57] hover:bg-blue-50 text-lg px-10 py-7 h-auto shadow-2xl">
                            Contactez-nous maintenant
                            <ArrowRight className="ml-2 h-6 w-6" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
