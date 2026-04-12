import Link from "next/link"
import { ArrowRight, Check, Monitor, Headphones, RefreshCw, Shield, Wallet, BarChart3, Scaling, Calendar } from "lucide-react"

export default function RentoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1F3B57] via-[#2a4a66] to-[#1F3B57] py-20 md:py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-sm font-medium mb-8">
            Un produit Ekwip
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Rento — Location d&apos;équipement IT pour entreprises
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Équipez vos équipes sans immobiliser votre trésorerie. Louez votre parc informatique en mensualités, tout inclus.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://rento.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="ek-btn-pill-primary"
            >
              Découvrir le catalogue
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/contact">
              <button className="ek-btn-pill-secondary bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg">
                Nous contacter
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Comment ca marche */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comment ça marche</h2>
            <p className="text-lg text-gray-600">Un processus simple, de la sélection à la livraison.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Choisissez vos équipements", desc: "Parcourez le catalogue Rento et sélectionnez les équipements adaptés à vos besoins." },
              { step: "2", title: "Configurez votre contrat", desc: "Choisissez la durée, les options de maintenance et les services inclus." },
              { step: "3", title: "Recevez votre matériel", desc: "Vos équipements sont livrés, installés et configurés par notre équipe." },
              { step: "4", title: "Renouvelez ou restituez", desc: "En fin de contrat : renouvelez, upgrader vers du neuf ou restituez simplement." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-[#1f3b57] rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tout est inclus</h2>
            <p className="text-lg text-gray-600">Pas de surprises, pas de frais cachés.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Headphones className="h-7 w-7" />, title: "Maintenance et support technique" },
              { icon: <RefreshCw className="h-7 w-7" />, title: "Remplacement en cas de panne" },
              { icon: <Monitor className="h-7 w-7" />, title: "Équipements toujours à jour" },
              { icon: <Shield className="h-7 w-7" />, title: "Gestion simplifiée via portail client" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#1f3b57]/10 text-[#1f3b57] mb-4">
                  {item.icon}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pourquoi louer avec Rento ?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <Wallet className="h-6 w-6" />, title: "Préservez votre trésorerie", desc: "Pas d'investissement initial lourd — des mensualités prévisibles." },
              { icon: <BarChart3 className="h-6 w-6" />, title: "Coûts mensuels prévisibles", desc: "Budget IT clair, sans mauvaises surprises ni charges imprévues." },
              { icon: <Calendar className="h-6 w-6" />, title: "Pas d'immobilisation d'actifs", desc: "Vos équipements ne figurent pas au bilan — flexibilité comptable." },
              { icon: <Scaling className="h-6 w-6" />, title: "Scalabilité selon vos besoins", desc: "Ajoutez ou réduisez des postes facilement en cours de contrat." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1f3b57] text-white flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-[#1f3b57]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à équiper vos équipes ?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Découvrez le catalogue Rento ou contactez-nous pour un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://rento.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#1f3b57] font-semibold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Voir le catalogue Rento
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/contact">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-all">
                Des questions ? Contactez-nous
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
