"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const clientLogos = [
  { name: "Client 1", logo: "/images/client-logo-1.png" },
  { name: "Client 2", logo: "/images/client-logo-2.png" },
  { name: "Client 3", logo: "/images/client-logo-3.png" },
  { name: "Client 4", logo: "/images/client-logo-4.png" },
  { name: "Client 5", logo: "/images/client-logo-5.png" },
  { name: "Client 6", logo: "/images/client-logo-6.png" },
]

export default function ClientLogoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clientLogos.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div className="flex space-x-12 animate-slide">
        {[...clientLogos, ...clientLogos].map((client, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image src={client.logo || "/placeholder.svg"} alt={client.name} fill className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}
