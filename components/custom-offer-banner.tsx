import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CustomOfferBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1f3b57] to-[#2d5a87] text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Besoin d'une offre sur mesure ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Nos experts analysent vos besoins et vous proposent une solution personnalisée avec les meilleurs
            équipements du marché
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-[#1f3b57] hover:bg-gray-100 font-semibold px-8 py-3 rounded-full"
              >
                Demander un devis gratuit
              </Button>
            </Link>
            <Link href="/comment-ca-marche">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1f3b57] font-semibold px-8 py-3 rounded-full bg-transparent"
              >
                Comment ça marche
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="opacity-80">Entreprises clientes</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">48h</div>
              <div className="opacity-80">Livraison garantie</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="opacity-80">Support technique</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomOfferBanner
