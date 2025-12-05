import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function TechPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            Ekwip Tech
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Solutions digitales et IA sur mesure
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Développement de solutions tech personnalisées, automatisation et accompagnement à la transformation digitale.
                        </p>
                        <Link href="/corporate/contact">
                            <Button size="lg" className="bg-[#1F3B57] hover:bg-[#152d42]">
                                Discuter d'un projet
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Solutions */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos solutions</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Des outils digitaux adaptés à vos besoins spécifiques
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Web Apps métiers",
                                description: "Applications web sur mesure pour digitaliser vos processus internes : CRM, ERP, plateformes de gestion.",
                                items: ["Interface intuitive", "Accessible partout", "Évolutif"]
                            },
                            {
                                title: "Automatisation",
                                description: "Automatisez vos tâches répétitives et optimisez vos workflows avec des solutions d'intégration intelligentes.",
                                items: ["Gain de temps", "Réduction d'erreurs", "Intégrations API"]
                            },
                            {
                                title: "Agents AI",
                                description: "Assistants intelligents pour automatiser le support client, les ventes ou les opérations internes.",
                                items: ["Disponible 24/7", "Compréhension naturelle", "Apprentissage continu"]
                            },
                            {
                                title: "RAG sur mesure",
                                description: "Solutions de recherche et génération augmentée par récupération adaptées à vos données propriétaires.",
                                items: ["Données sécurisées", "Réponses précises", "Base de connaissances"]
                            }
                        ].map((solution, index) => (
                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                                <p className="text-gray-600 mb-6">{solution.description}</p>
                                <ul className="space-y-2">
                                    {solution.items.map((item, i) => (
                                        <li key={i} className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment nous travaillons</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Une approche agile et collaborative pour garantir la réussite de votre projet
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Cadrage",
                                description: "Analyse approfondie de vos besoins et définition du scope"
                            },
                            {
                                step: "2",
                                title: "Prototype",
                                description: "Développement d'un POC pour valider la solution"
                            },
                            {
                                step: "3",
                                title: "Déploiement",
                                description: "Mise en production progressive avec formation"
                            },
                            {
                                step: "4",
                                title: "Amélioration",
                                description: "Évolution continue basée sur vos retours"
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

            {/* Technologies */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Technologies</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Nous utilisons les technologies les plus modernes et éprouvées
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {["Next.js", "React", "Python", "OpenAI", "TypeScript", "Tailwind CSS"].map((tech) => (
                            <div key={tech} className="bg-gray-50 rounded-lg p-4 text-center font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-[#1F3B57] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Transformez votre entreprise</h2>
                    <p className="text-xl text-gray-200 mb-8">
                        Parlons de votre vision et construisons ensemble la solution digitale qui fera la différence
                    </p>
                    <Link href="/corporate/contact">
                        <Button size="lg" className="bg-white text-[#1F3B57] hover:bg-gray-100">
                            Démarrer un projet
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
