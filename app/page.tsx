import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {/* Logo */}
          <div className="mb-12">
            <Image src="/images/logo-black.png" alt="Ekwip" width={200} height={60} className="h-16 w-auto" />
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <Clock className="h-4 w-4" />
                <span>Site en maintenance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Notre site fait peau neuve !
              </h1>

              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Nous travaillons actuellement sur une nouvelle expérience pour vous offrir le meilleur service de
                location d'équipements IT au Maroc.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
              <Card className="border-2 hover:border-blue-500 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Appelez-nous</h3>
                      <a href="tel:+212660703622" className="text-blue-600 hover:text-blue-700 font-medium text-lg">
                        +212 660 703 622
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-500 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Écrivez-nous</h3>
                      <a
                        href="mailto:contact@ekwip.ma"
                        className="text-blue-600 hover:text-blue-700 font-medium text-lg"
                      >
                        contact@ekwip.ma
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Link href="/home/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  Nous contacter
                </Button>
              </Link>
            </div>

            {/* Image */}
            <div className="relative w-full max-w-3xl mx-auto mt-16">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/laptop-hero.png"
                  alt="Ekwip - Location d'équipements IT"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <Card className="mt-16 max-w-2xl mx-auto bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <p className="text-center text-slate-600">
                <span className="font-semibold text-slate-900">Ekwip</span> - Votre partenaire de confiance pour la
                location d'équipements informatiques professionnels au Maroc. Flexibilité, performance et tranquillité
                d'esprit garanties.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
