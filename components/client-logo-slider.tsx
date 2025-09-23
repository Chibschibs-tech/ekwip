"use client"

import Image from "next/image"

const clientLogos = [
  { name: "Client 1", logo: "/images/client-logo-1.png" },
  { name: "Client 2", logo: "/images/client-logo-2.png" },
  { name: "Client 3", logo: "/images/client-logo-3.png" },
  { name: "Client 4", logo: "/images/client-logo-4.png" },
  { name: "Client 5", logo: "/images/client-logo-5.png" },
  { name: "Client 6", logo: "/images/client-logo-6.png" },
]

export function ClientLogoSlider() {
  return (
    <div className="overflow-hidden">
      <div className="flex animate-scroll space-x-8 lg:space-x-12">
        {[...clientLogos, ...clientLogos].map((client, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src={client.logo || "/placeholder.svg"}
              alt={client.name}
              width={120}
              height={60}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClientLogoSlider
