"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

const clientLogos = [
  {
    id: 1,
    name: "Cambiste",
    logo: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/partners/cambiste-logo-dark.png",
  },
  {
    id: 2,
    name: "YouPack",
    logo: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/partners/logo-youpack-site-2048x444.png",
  },
  {
    id: 3,
    name: "Ocura Consulting",
    logo: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/partners/ocura22consuting_cover_e2147483647vbetatxSLpw.png",
  },
  {
    id: 4,
    name: "Valkima",
    logo: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/partners/valkima.png",
  },
]

export default function ClientLogoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.max(1, clientLogos.length - 2))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Ensure we always have an array to work with
  const logos = Array.isArray(clientLogos) ? clientLogos : []

  if (logos.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-500">Logos en cours de chargement...</p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
      >
        {logos.map((client) => (
          <div key={client.id} className="flex-shrink-0 w-1/3 px-4">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-24">
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                width={120}
                height={60}
                className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.max(1, logos.length - 2) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
