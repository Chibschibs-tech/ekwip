import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CustomOfferBanner() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-[#1f3b57] to-[#2d5a87] text-white">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold">Besoin d'une solution sur mesure ?</h2>
          <p className="text-xl text-blue-100">
            Nos experts analysent vos besoins et vous proposent une solution personnalisée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-[#1f3b57] hover:bg-gray-100">
                Demander un devis personnalisé
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1f3b57] bg-transparent"
              >
                Parler à un expert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
