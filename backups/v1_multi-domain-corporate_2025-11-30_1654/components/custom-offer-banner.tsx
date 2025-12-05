import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export function CustomOfferBanner() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-ekwip to-ekwip-700 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Badge className="mb-6 bg-white/20 text-white border-white/30">
          <Sparkles className="w-4 h-4 mr-2" />
          Offre spéciale
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Premier mois à 50% pour les nouveaux clients</h2>
        <p className="text-xl text-white/90 mb-8">
          Découvrez nos solutions en bénéficiant d'une remise exceptionnelle sur votre premier mois de location. Offre
          limitée dans le temps !
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button size="lg" className="bg-white text-ekwip hover:bg-gray-100">
              Profiter de l'offre
            </Button>
          </Link>
          <Link href="/catalogue">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Voir le catalogue
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/70">
          * Offre valable pour toute nouvelle souscription sur une durée de 36 mois minimum.
        </p>
      </div>
    </section>
  )
}
