"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

// Client logos from the clients-logo folder
const clientLogos = [
  { name: "Cambiste", src: "/images/clients-logo/cambiste-logo-dark.png" },
  { name: "DOFactory", src: "/images/clients-logo/dofactory.jpg" },
  { name: "YouPack", src: "/images/clients-logo/logo-youpack-site-2048x444.png" },
  { name: "Ocura Consulting", src: "/images/clients-logo/ocura22consuting_cover_e2147483647vbetatxSLpw.png" },
  { name: "Valkima", src: "/images/clients-logo/valkima.png" },
]

export function ClientLogoSlider() {
  const [mounted, setMounted] = useState(false)
  const [clients, setClients] = useState<Array<{ name: string; src: string }>>([])

  useEffect(() => {
    setMounted(true)
    // Try to fetch clients from API, fallback to static logos
    fetch("/api/clients?status=active&limit=10")
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error("Failed to fetch clients")
      })
      .then((data) => {
        if (data && data.length > 0) {
          // Use logos from database if available, otherwise use static logos
          const clientLogosWithImages = data.map((c: any) => ({
            name: c.companyName || "Client",
            src: c.logo || `/images/clients-logo/${c.companyName?.toLowerCase().replace(/\s+/g, "-")}.png` || "/placeholder.svg",
          }))
          // Filter out clients without valid logos and merge with static logos
          setClients([...clientLogos, ...clientLogosWithImages.filter((c: any) => c.src !== "/placeholder.svg")])
        } else {
          setClients(clientLogos)
        }
      })
      .catch(() => {
        // Fallback to static logos if API fails
        setClients(clientLogos)
      })
  }, [])

  const displayLogos = clients.length > 0 ? clients : clientLogos

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {displayLogos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all p-4 h-20">
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.name}
              width={120}
              height={60}
              className="object-contain max-h-16 w-auto"
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-scroll">
        {[...displayLogos, ...displayLogos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 flex items-center justify-center grayscale hover:grayscale-0 transition-all p-8"
          >
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.name}
              width={120}
              height={60}
              className="object-contain max-h-16 w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
