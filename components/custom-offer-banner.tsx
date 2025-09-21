import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CustomOfferBanner() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-ekwip-50 to-ekwip-100">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-ekwip">Notre offre Banner-title</h2>
          <p className="text-xl text-ekwip-700">
            Libérez-vous des contraintes d'achat et concentrez-vous sur votre croissance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogue">
              <Button size="lg" className="bg-ekwip hover:bg-ekwip-700 text-white">
                Découvrir nos offres
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-ekwip text-ekwip hover:bg-ekwip hover:text-white bg-transparent"
              >
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomOfferBanner
