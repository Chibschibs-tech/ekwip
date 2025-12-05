import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Bot, Code, Database, Cpu, Zap, Lock, Terminal } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function TechPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section with Dark Console */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text Content */}
                        <ScrollReveal>
                            <div>
                                <div className="ek-chip ek-chip-tech mb-6">
                                    <div className="ek-chip-dot" />
                                    Ekwip Tech
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Agents IA, outils internes et automatisation au service de vos équipes.
                                </h1>

                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Développement de solutions tech personnalisées, automatisation et accompagnement à la transformation digitale.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                                    <Link href="/contact">
                                        <button className="ek-btn-pill-primary">
                                            Planifier un atelier Tech
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </Link>
                                    <button className="px-6 py-3 rounded-full border border-slate-200 text-slate-600 font-medium hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all shadow-sm hover:shadow-md">
                                        Voir nos projets
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <div className="ek-chip ek-chip-neutral">Agents IA</div>
                                    <div className="ek-chip ek-chip-neutral">Web Apps</div>
                                    <div className="ek-chip ek-chip-neutral">Automation</div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Right: Dark Console Module */}
                        <ScrollReveal delay={0.2}>
                            <div className="ek-tech-console-wrapper transform hover:scale-[1.02] transition-transform duration-500">
                                <div className="ek-tech-console">
                                    {/* Header */}
                                    <div className="ek-tech-console-header">
                                        <div style={{ fontSize: '0.7rem', color: '#e5e7eb' }}>Console Ekwip Tech</div>
                                        <div className="ek-tech-console-pill">
                                            Vue temps réel
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="ek-tech-console-stats">
                                        <div className="ek-stat-dark">
                                            <div className="ek-stat-dark-label">Agents actifs</div>
                                            <div className="ek-stat-dark-value">12</div>
                                            <div className="ek-stat-dark-badge ek-stat-dark-badge-emerald">
                                                🟢 En ligne
                                            </div>
                                        </div>
                                        <div className="ek-stat-dark">
                                            <div className="ek-stat-dark-label">Requêtes/h</div>
                                            <div className="ek-stat-dark-value">1.2K</div>
                                            <div className="ek-stat-dark-badge ek-stat-dark-badge-blue">
                                                ↑ 23%
                                            </div>
                                        </div>
                                        <div className="ek-stat-dark">
                                            <div className="ek-stat-dark-label">Précision</div>
                                            <div className="ek-stat-dark-value">94%</div>
                                            <div className="ek-stat-dark-badge ek-stat-dark-badge-tech">
                                                IA optimisée
                                            </div>
                                        </div>
                                    </div>

                                    {/* Graph */}
                                    <div className="ek-tech-console-graph">
                                        <div className="ek-tech-console-graph-overlay" />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            gap: '4px',
                                            height: '100%',
                                            padding: '8px'
                                        }}>
                                            {[40, 65, 45, 80, 55, 70, 60, 85, 75, 90, 65, 80].map((height, i) => (
                                                <div
                                                    key={i}
                                                    className="ek-tech-console-bar"
                                                    style={{ height: `${height}%` }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="ek-tech-console-footer">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            Système opérationnel
                                        </div>
                                        <div className="font-mono">v2.4.0</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Solutions - Dark Cards */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-[#0F172A] text-white relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                                Nos expertises
                            </h2>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                Des technologies de pointe pour résoudre vos défis opérationnels
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: <Bot className="w-6 h-6 text-orange-500" />, title: "Agents IA", description: "Assistants virtuels intelligents connectés à votre base de connaissances interne." },
                            { icon: <Code className="w-6 h-6 text-blue-500" />, title: "Web Apps Métier", description: "Applications sur-mesure pour digitaliser vos processus spécifiques." },
                            { icon: <Zap className="w-6 h-6 text-yellow-500" />, title: "Automatisation", description: "Workflows n8n/Make pour connecter vos outils (CRM, ERP, Slack)." },
                            { icon: <Database className="w-6 h-6 text-purple-500" />, title: "Data Engineering", description: "Pipelines de données et dashboards pour piloter votre activité." },
                            { icon: <Lock className="w-6 h-6 text-emerald-500" />, title: "Sécurité & Auth", description: "Gestion des accès et conformité RGPD intégrée by design." },
                            { icon: <Terminal className="w-6 h-6 text-slate-400" />, title: "DevOps", description: "Infrastructure cloud scalable et déploiements automatisés." }
                        ].map((item, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:bg-slate-800 hover:border-orange-500/50 transition-all duration-300 group h-full">
                                    <div className="mb-4 bg-slate-900/80 w-12 h-12 rounded-lg flex items-center justify-center border border-slate-700 group-hover:border-orange-500/30 transition-colors">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={0.4}>
                        <div className="text-center">
                            <Link href="/contact">
                                <button className="ek-btn-pill-secondary border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-white transition-colors">
                                    Explorer nos technologies
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Process / Methodology */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Méthodologie Agile</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Des livraisons rapides et itératives pour un ROI immédiat
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {[
                            { step: "01", title: "Discovery", description: "Ateliers de cadrage pour définir le MVP" },
                            { step: "02", title: "Build", description: "Sprints de développement de 2 semaines" },
                            { step: "03", title: "Deploy", description: "Mise en production continue" },
                            { step: "04", title: "Scale", description: "Optimisation et ajout de fonctionnalités" }
                        ].map((item, index) => (
                            <ScrollReveal key={item.step} delay={index * 0.1}>
                                <div className="relative p-6 border-l-4 border-orange-100 hover:border-orange-500 transition-colors bg-slate-50 rounded-r-xl">
                                    <div className="text-4xl font-bold text-slate-200 absolute top-4 right-4">{item.step}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">{item.title}</h3>
                                    <p className="text-gray-600 text-sm relative z-10">{item.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={0.5}>
                        <div className="bg-gradient-to-r from-orange-500 to-[#1E3563] rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-orange-900/20">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">Besoin d&apos;accélérer votre roadmap ?</h3>
                            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                                Nos équipes sont prêtes à s&apos;intégrer à votre stack et à vos process dès maintenant.
                            </p>
                            <Link href="/contact">
                                <button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full font-semibold transition-colors flex items-center mx-auto shadow-lg">
                                    Réserver un créneau
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    )
}
