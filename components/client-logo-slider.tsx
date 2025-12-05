"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const clientLogos = [
  { name: "Cambiste", src: "/images/clients-logo/cambiste-logo-dark.png" },
  { name: "YouPack", src: "/images/clients-logo/logo-youpack-site-2048x444.png" },
  { name: "Ocura Consulting", src: "/images/clients-logo/ocura22consuting_cover_e2147483647vbetatxSLpw.png" },
  { name: "Valkima", src: "/images/clients-logo/valkima.png" },
]

export function ClientLogoSlider() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {clientLogos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all p-4">
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.name}
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-scroll">
        {[...clientLogos, ...clientLogos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 flex items-center justify-center grayscale hover:grayscale-0 transition-all p-8"
          >
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.name}
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
