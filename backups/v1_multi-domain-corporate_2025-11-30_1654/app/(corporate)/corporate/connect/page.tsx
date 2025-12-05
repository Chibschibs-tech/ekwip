import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function ConnectPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            Ekwip Connect
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Solutions audiovisuelles professionnelles
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Installation de salles de réunion, visioconférence et solutions de diffusion fixes pour les entreprises.
                        </p>
                        <Link href="/corporate/contact">
                            <Button size="lg" className="bg-[#1F3B57] hover:bg-[#152d42]">
                                Parler d'un projet
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que nous faisons</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Conception et installation de solutions AV fixes pour vos espaces professionnels
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Salles de réunion",
                                description: "Équipement complet pour vos espaces de collaboration : écrans interactifs, systèmes audio, caméras.",
                                icon: "🏢"
                            },
                            {
                                title: "Visioconférence",
                                description: "Solutions professionnelles pour vos réunions à distance : Zoom Rooms, Microsoft Teams Rooms.",
                                icon: "📹"
                            },
                            {
                                title: "Salles de direction",
                                description: "Boardrooms équipées avec des solutions haut de gamme et design discret.",
                                icon: "👔"
                            },
                            {
                                title: "Salles de formation",
                                description: "Espaces pédagogiques interactifs avec tableaux blancs numériques et systèmes de diffusion.",
                                icon: "🎓"
                            },
                            {
                                title: "Auditoriums",
                                description: "Sonorisation et vidéo pour vos grands événements internes et conférences.",
                                icon: "🎤"
                            },
                            {
                                title: "Digital Signage",
                                description: "Solutions d'affichage dynamique pour vos espaces d'accueil et zones publiques.",
                                icon: "📺"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Notre approche</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Un processus structuré pour garantir le succès de votre projet
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Audit",
                                description: "Analyse de vos besoins et de vos espaces"
                            },
                            {
                                step: "2",
                                title: "Design",
                                description: "Conception technique et présentation de la solution"
                            },
                            {
                                step: "3",
                                title: "Installation",
                                description: "Mise en place et configuration des équipements"
                            },
                            {
                                step: "4",
                                title: "Support",
                                description: "Formation et accompagnement continu"
                            }
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-16 h-16 bg-[#1F3B57] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-[#1F3B57] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Un projet en tête ?</h2>
                    <p className="text-xl text-gray-200 mb-8">
                        Discutons de vos besoins et concevons ensemble la solution audiovisuelle idéale
                    </p>
                    <Link href="/corporate/contact">
                        <Button size="lg" className="bg-white text-[#1F3B57] hover:bg-gray-100">
                            Contactez-nous
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
