import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Truck, Wrench, Shield, ArrowRight } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700">Simple et efficace</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Comment ça marche ?</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Un processus simple et transparent pour louer vos équipements IT professionnels
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 border-blue-100">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Choisissez vos équipements</h3>
                <p className="text-slate-600 mb-6">
                  Parcourez notre catalogue et sélectionnez les équipements qui correspondent parfaitement à vos besoins
                  professionnels.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">Large gamme de produits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">Équipements récents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">Configurations sur-mesure</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Configurez votre offre</h3>
                <p className="text-slate-600 mb-6">
                  Définissez la durée de location et les options qui correspondent à votre budget et vos besoins.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">Durées flexibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">Options personnalisables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">Devis instantané</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Recevez et profitez</h3>
                <p className="text-slate-600 mb-6">
                  Nous livrons rapidement vos équipements et vous accompagnons tout au long de la location.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">Livraison sous 48h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">Installation incluse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">Support 24/7</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Inclus */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Services inclus</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tous nos contrats de location incluent une gamme complète de services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Livraison et installation</h3>
                <p className="text-sm text-slate-600">
                  Livraison rapide et installation professionnelle de vos équipements
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Maintenance</h3>
                <p className="text-sm text-slate-600">Maintenance préventive et corrective tout au long du contrat</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Assurance</h3>
                <p className="text-sm text-slate-600">Protection complète contre les dommages et le vol</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Support 24/7</h3>
                <p className="text-sm text-slate-600">Assistance technique disponible à tout moment</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#1f3b57] to-[#2d4a63] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Découvrez notre catalogue et trouvez les équipements parfaits pour votre entreprise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogue">
              <Button size="lg" className="w-full sm:w-auto bg-white text-[#1f3b57] hover:bg-blue-50">
                Voir le catalogue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent"
              >
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
