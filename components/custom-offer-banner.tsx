import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function CustomOfferBanner() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-ekwip to-ekwip/80 text-white">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin d'une solution sur mesure ?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Nos experts analysent vos besoins et vous proposent une solution personnalisée
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Demander un devis personnalisé
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-ekwip bg-transparent"
                >
                  Parler à un expert
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default CustomOfferBanner
