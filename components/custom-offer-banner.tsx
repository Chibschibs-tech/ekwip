"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function CustomOfferBanner() {
  const { t } = useLanguage()

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-ekwip text-white">
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-ekwip-800 to-ekwip p-8 md:p-12 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="bg-white/10 rounded-full p-6 flex-shrink-0">
            <Users className="h-12 w-12 text-white" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("home.offerBanner.title")}</h2>
            <p className="text-lg md:text-xl opacity-90 mb-6 md:mb-0">{t("home.offerBanner.description")}</p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-ekwip hover:bg-ekwip-50 shadow-lg">
                {t("home.offerBanner.button")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
