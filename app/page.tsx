import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Sparkles } from "lucide-react"

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-8">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <Image
                    src="/images/logo-black.png"
                    alt="Ekwip"
                    width={200}
                    height={60}
                    className="h-12 w-auto"
                    priority
                  />
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-full">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Nouveau look en cours</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Nous travaillons sur quelque chose d'incroyable ! Notre nouveau site sera bientôt disponible avec une
                  expérience améliorée.
                </p>
              </div>

              {/* Progress indicator */}
              <div className="py-6">
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full animate-pulse w-3/4"></div>
                </div>
                <p className="text-sm text-slate-500 mt-2">Le site sera bientôt disponible...</p>
              </div>

              {/* Contact Info */}
              <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Restons en contact</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href="tel:+212660703622"
                    className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-500 transition-all group"
                  >
                    <Phone className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-slate-500">Téléphone</div>
                      <div className="font-semibold text-slate-900">+212 660 703 622</div>
                    </div>
                  </a>
                  <a
                    href="mailto:contact@ekwip.ma"
                    className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-500 transition-all group"
                  >
                    <Mail className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-slate-500">Email</div>
                      <div className="font-semibold text-slate-900">contact@ekwip.ma</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link href="/home/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
                  >
                    Nous contacter
                  </Button>
                </Link>
              </div>

              {/* Footer note */}
              <p className="text-sm text-slate-500 pt-6">
                En attendant, vous pouvez nous contacter pour toute demande concernant la location d'équipements IT
                professionnels
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
