import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CustomOfferBanner() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-[#1f3b57] to-[#2d5a87] text-white">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold">Besoin d'une offre sur-mesure ?</h2>
          <p className="text-xl text-blue-100">
            Contactez notre équipe pour étudier vos besoins spécifiques et obtenir un devis personnalisé. Nous adaptons
            nos solutions à votre secteur d'activité et à vos contraintes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-[#1f3b57] hover:bg-gray-100">
                Demander un devis
              </Button>
            </Link>
            <Link href="/comment-ca-marche">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1f3b57] bg-transparent"
              >
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomOfferBanner
