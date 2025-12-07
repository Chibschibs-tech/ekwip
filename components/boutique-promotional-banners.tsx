"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type { Banner } from "@/types/admin"

export function BoutiquePromotionalBanners() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("/api/banners?position=boutique&active=true")
        if (!response.ok) throw new Error("Failed to fetch banners")
        const data = await response.json()
        // Sort by order and take first 3
        const sortedBanners = data.sort((a: Banner, b: Banner) => a.order - b.order).slice(0, 3)
        setBanners(sortedBanners)
      } catch (error) {
        console.error("Error fetching banners:", error)
        // Fallback to empty array if API fails
        setBanners([])
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()

    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (loading) {
    return (
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[500px] bg-gray-200 animate-pulse rounded-lg" />
            <div className="flex flex-col gap-6">
              <div className="h-[245px] bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-[245px] bg-gray-200 animate-pulse rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (banners.length === 0) {
    return null // Don't show section if no banners
  }

  // First banner is featured (large), rest are small
  const featuredBanner = banners[0]
  const smallBanners = banners.slice(1, 3) // Max 2 small banners

  // Helper function to get the appropriate image (mobile or desktop)
  const getBannerImage = (banner: Banner) => {
    if (banner.isMobileEnabled && banner.mobileImage && isMobile) {
      return banner.mobileImage
    }
    return banner.image
  }

  return (
    <section className="py-8 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Featured Banner - Left */}
          <Link href={featuredBanner.link || "#"} className="lg:col-span-2">
            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] h-full">
              <CardContent className="p-0 relative">
                <div className="bg-slate-900 text-white h-full min-h-[500px] flex flex-col relative overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={getBannerImage(featuredBanner) || "/placeholder.svg"}
                      alt={featuredBanner.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  </div>
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-between relative z-10">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">{featuredBanner.title}</h2>
                      {featuredBanner.description && (
                        <p className="text-lg text-white/90 mb-6 max-w-md drop-shadow-md">{featuredBanner.description}</p>
                      )}
                    </div>
                    {featuredBanner.buttonText && (
                      <Button
                        size="lg"
                        className="bg-white text-slate-900 hover:bg-slate-100 w-fit shadow-lg"
                        onClick={(e) => {
                          e.preventDefault()
                          if (featuredBanner.link) {
                            window.location.href = featuredBanner.link
                          }
                        }}
                      >
                        {featuredBanner.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Two Small Banners - Right (stacked to equal left height) */}
          <div className="flex flex-col gap-6">
            {smallBanners.map((banner) => (
              <Link key={banner.id} href={banner.link || "#"} className="flex-1">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] h-full">
                  <CardContent className="p-0 relative">
                    <div className="bg-slate-900 text-white h-full min-h-[245px] flex flex-col relative overflow-hidden">
                      {/* Background Image */}
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={getBannerImage(banner) || "/placeholder.svg"}
                          alt={banner.title}
                          fill
                          className="object-cover"
                        />
                        {/* Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-lg">{banner.title}</h3>
                          {banner.description && (
                            <p className="text-sm text-white/90 mb-4 drop-shadow-md">{banner.description}</p>
                          )}
                        </div>
                        {banner.buttonText && (
                          <Button
                            size="sm"
                            className="bg-white text-slate-900 hover:bg-slate-100 w-fit shadow-lg"
                            onClick={(e) => {
                              e.preventDefault()
                              if (banner.link) {
                                window.location.href = banner.link
                              }
                            }}
                          >
                            {banner.buttonText}
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        )}
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

