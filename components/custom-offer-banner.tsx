import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Percent, Clock } from "lucide-react"

export function CustomOfferBanner() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
          <Percent className="w-4 h-4 mr-2" />
          Offre spéciale
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Premier mois à 50% pour les nouveaux clients</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Découvrez nos solutions de location IT avec une remise exceptionnelle sur votre premier mois de location.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/catalogue">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Profiter de l'offre
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Obtenir un devis
            </Button>
          </Link>
        </div>
        <p className="text-sm text-blue-200 mt-6 flex items-center justify-center">
          <Clock className="w-4 h-4 mr-2" />
          Offre valable jusqu'au 31 décembre 2024, pour tout nouveau contrat de location
        </p>
      </div>
    </section>
  )
}
