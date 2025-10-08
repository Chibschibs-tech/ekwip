import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Wrench, Mail, Phone, ArrowRight } from "lucide-react"

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Information */}
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                <div className="mb-8">
                  <Image
                    src="/images/logo-black.png"
                    alt="Ekwip"
                    width={150}
                    height={50}
                    className="h-12 w-auto mb-8"
                  />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1f3b57]/10 rounded-full flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-[#1f3b57]" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Nouveau look en cours...</h1>
                </div>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Nous travaillons actuellement sur une toute nouvelle version de notre site web pour vous offrir une
                  expérience encore meilleure. Notre équipe est à votre disposition pour toute demande.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Appelez-nous</p>
                      <a href="tel:+212660703622" className="text-sm text-gray-600 hover:text-[#1f3b57]">
                        +212 660 703 622
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Envoyez-nous un email</p>
                      <a href="mailto:contact@ekwip.ma" className="text-sm text-gray-600 hover:text-[#1f3b57]">
                        contact@ekwip.ma
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="flex-1">
                    <Button size="lg" className="w-full bg-[#1f3b57] hover:bg-[#1f3b57]/90">
                      Nous contacter
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Side - Visual */}
              <div className="relative bg-gradient-to-br from-[#1f3b57] to-[#2d5a7b] p-8 lg:p-12 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <Image
                      src="/images/laptop-hero.png"
                      alt="Équipements Ekwip"
                      width={400}
                      height={300}
                      className="w-full h-auto drop-shadow-2xl"
                    />
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Notre engagement</h3>
                    <p className="text-sm text-gray-600">
                      Location d'équipements IT professionnels avec support complet et maintenance incluse.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Ekwip. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  )
}
