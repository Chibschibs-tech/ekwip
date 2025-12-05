import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function DaasPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-slate-50 py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            Ekwip DaaS
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Location d'équipements IT professionnels
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Ordinateurs portables, smartphones, tablettes et accessoires IT en location flexible pour les entreprises.
                        </p>
                        <Link href="https://daas.ekwip.ma/catalogue">
                            <Button size="lg" className="bg-[#1F3B57] hover:bg-[#152d42]">
                                Accéder au catalogue complet
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi louer avec Ekwip ?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Des avantages concrets pour votre entreprise
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Préservez votre trésorerie",
                                description: "Pas d'investissement initial. Mensualités fixes et prévisibles.",
                                icon: "💰"
                            },
                            {
                                title: "Gestion simplifiée",
                                description: "Nous gérons la maintenance, les mises à jour et le support.",
                                icon: "⚙️"
                            },
                            {
                                title: "Mise à niveau garantie",
                                description: "Renouvelez vos équipements régulièrement avec les dernières technologies.",
                                icon: "🔄"
                            },
                            {
                                title: "Support 24/7",
                                description: "Équipe d'experts disponible pour vous accompagner.",
                                icon: "🛟"
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment Categories */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Notre catalogue</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Une large gamme d'équipements professionnels
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Ordinateurs portables",
                                description: "Dell, HP, Lenovo - Configurations professionnelles adaptées à vos besoins",
                                link: "https://daas.ekwip.ma/catalogue?category=ordinateurs-portables"
                            },
                            {
                                title: "Smartphones",
                                description: "iPhone, Samsung Galaxy - Derniers modèles pour vos équipes mobiles",
                                link: "https://daas.ekwip.ma/catalogue?category=smartphones"
                            },
                            {
                                title: "Tablettes",
                                description: "iPad, Surface - Pour la mobilité et les présentations",
                                link: "https://daas.ekwip.ma/catalogue?category=tablettes"
                            }
                        ].map((category, index) => (
                            <Link key={index} href={category.link} className="group">
                                <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-[#1F3B57]">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h3>
                                    <p className="text-gray-600 mb-6">{category.description}</p>
                                    <div className="flex items-center text-[#1F3B57] font-semibold group-hover:gap-2 transition-all">
                                        Voir les produits <ArrowRight className="ml-1 h-5 w-5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment ça marche</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Un processus simple pour équiper votre entreprise
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Choisissez vos équipements",
                                description: "Parcourez notre catalogue et sélectionnez les produits adaptés"
                            },
                            {
                                step: "2",
                                title: "Recevez votre devis",
                                description: "Solution personnalisée avec devis détaillé sous 24h"
                            },
                            {
                                step: "3",
                                title: "Profitez de vos équipements",
                                description: "Livraison, configuration et support complet inclus"
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
                    <h2 className="text-4xl font-bold mb-6">Prêt à vous équiper ?</h2>
                    <p className="text-xl text-gray-200 mb-8">
                        Explorez notre catalogue complet et trouvez les équipements adaptés à vos besoins
                    </p>
                    <Link href="https://daas.ekwip.ma/catalogue">
                        <Button size="lg" className="bg-white text-[#1F3B57] hover:bg-gray-100">
                            Voir le catalogue
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
