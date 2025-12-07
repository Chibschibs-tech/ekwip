"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface PromoBanner {
  id: string
  title: string
  subtitle?: string
  image: string
  link: string
  buttonText: string
  gradient: string
  featured?: boolean
}

// Default promotional banners - can be replaced with database content later
// Only 3 banners: 1 large left, 2 small right (stacked)
const defaultBanners: PromoBanner[] = [
  {
    id: "1",
    title: "Promotion MacBook",
    subtitle: "Découvrez nos offres spéciales sur MacBook, iPad, iPhone et plus encore",
    image: "/images/macbook-pro.png",
    link: "/boutique?category=ordinateurs-portables",
    buttonText: "Acheter maintenant",
    gradient: "from-slate-800 to-slate-900",
    featured: true,
  },
  {
    id: "2",
    title: "Smartphones",
    subtitle: "Nouveautés",
    image: "/images/iphone.png",
    link: "/boutique?category=smartphones",
    buttonText: "Découvrir",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    id: "3",
    title: "Accessoires IT",
    subtitle: "Équipez-vous",
    image: "/images/printer-hero.png",
    link: "/boutique?category=accessoires",
    buttonText: "Voir plus",
    gradient: "from-blue-400 to-cyan-400",
  },
]

export function BoutiquePromotionalBanners() {
  const featuredBanner = defaultBanners.find((b) => b.featured) || defaultBanners[0]
  const smallBanners = defaultBanners.filter((b) => !b.featured).slice(0, 2) // Only 2 small banners

  return (
    <section className="py-8 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Featured Banner - Left */}
          <Link href={featuredBanner.link} className="lg:col-span-2">
            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] h-full">
              <CardContent className="p-0 relative">
                <div className={`bg-gradient-to-br ${featuredBanner.gradient} text-white h-full min-h-[500px] flex flex-col relative`}>
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-between relative z-10">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredBanner.title}</h2>
                      {featuredBanner.subtitle && (
                        <p className="text-lg text-white/90 mb-6 max-w-md">{featuredBanner.subtitle}</p>
                      )}
                    </div>
                    <Button
                      size="lg"
                      className="bg-white text-slate-900 hover:bg-slate-100 w-fit"
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.href = featuredBanner.link
                      }}
                    >
                      {featuredBanner.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 right-0 w-full h-2/3 -z-0 opacity-20">
                    <Image
                      src={featuredBanner.image || "/placeholder.svg"}
                      alt={featuredBanner.title}
                      fill
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Two Small Banners - Right (stacked to equal left height) */}
          <div className="flex flex-col gap-6">
            {smallBanners.map((banner) => (
              <Link key={banner.id} href={banner.link} className="flex-1">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] h-full">
                  <CardContent className="p-0 relative">
                    <div className={`bg-gradient-to-br ${banner.gradient} text-white h-full min-h-[245px] flex flex-col relative`}>
                      <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold mb-2">{banner.title}</h3>
                          {banner.subtitle && (
                            <p className="text-sm text-white/90 mb-4">{banner.subtitle}</p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-white text-slate-900 hover:bg-slate-100 w-fit"
                          onClick={(e) => {
                            e.preventDefault()
                            window.location.href = banner.link
                          }}
                        >
                          {banner.buttonText}
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 right-0 w-full h-2/3 -z-0 opacity-20">
                        <Image
                          src={banner.image || "/placeholder.svg"}
                          alt={banner.title}
                          fill
                          className="object-contain object-bottom"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

