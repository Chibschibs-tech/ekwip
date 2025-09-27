"use client"

import Image from "next/image"

const clientLogos = [
  {
    id: 1,
    name: "Client 1",
    logo: "/images/client-logo-1.png",
  },
  {
    id: 2,
    name: "Client 2",
    logo: "/images/client-logo-2.png",
  },
  {
    id: 3,
    name: "Client 3",
    logo: "/images/client-logo-3.png",
  },
  {
    id: 4,
    name: "Client 4",
    logo: "/images/client-logo-4.png",
  },
  {
    id: 5,
    name: "Client 5",
    logo: "/images/client-logo-5.png",
  },
  {
    id: 6,
    name: "Client 6",
    logo: "/images/client-logo-6.png",
  },
]

export function ClientLogoSlider() {
  return (
    <div className="overflow-hidden">
      <div className="flex animate-scroll space-x-12 items-center">
        {/* First set of logos */}
        {clientLogos.map((client) => (
          <div
            key={`first-${client.id}`}
            className="flex-shrink-0 w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image src={client.logo || "/placeholder.svg"} alt={client.name} fill className="object-contain" />
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {clientLogos.map((client) => (
          <div
            key={`second-${client.id}`}
            className="flex-shrink-0 w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image src={client.logo || "/placeholder.svg"} alt={client.name} fill className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}
