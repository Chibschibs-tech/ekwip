import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function CustomOfferBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#1f3b57] to-[#2d5a87] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-2" />
            <span className="text-lg font-semibold text-yellow-400">Offre spéciale</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Premier mois à 50% pour les nouveaux clients</h2>

          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Découvrez nos solutions de location IT avec une remise exceptionnelle sur votre premier mois. Offre limitée
            dans le temps !
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#1f3b57] hover:bg-gray-100 font-semibold">
                Profiter de l'offre
              </Button>
            </Link>
            <Link href="/catalogue">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#1f3b57] bg-transparent"
              >
                Voir le catalogue
              </Button>
            </Link>
          </div>

          <p className="text-sm mt-6 opacity-75">
            * Offre valable jusqu'au 31 mars 2024 pour tout nouveau contrat de 12 mois minimum
          </p>
        </div>
      </div>
    </section>
  )
}
