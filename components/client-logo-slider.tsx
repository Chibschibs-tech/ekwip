"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const clientLogos = [
  { name: "Client 1", src: "/images/client-logo-1.png" },
  { name: "Client 2", src: "/images/client-logo-2.png" },
  { name: "Client 3", src: "/images/client-logo-3.png" },
  { name: "Client 4", src: "/images/client-logo-4.png" },
  { name: "Client 5", src: "/images/client-logo-5.png" },
  { name: "Client 6", src: "/images/client-logo-6.png" },
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
