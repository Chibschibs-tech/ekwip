"use client"

import Image from "next/image"

export function ClientLogoSlider() {
  const logos = [
    { name: "Client 1", src: "/images/client-logo-1.png" },
    { name: "Client 2", src: "/images/client-logo-2.png" },
    { name: "Client 3", src: "/images/client-logo-3.png" },
    { name: "Client 4", src: "/images/client-logo-4.png" },
    { name: "Client 5", src: "/images/client-logo-5.png" },
    { name: "Client 6", src: "/images/client-logo-6.png" },
  ]

  return (
    <div className="overflow-hidden">
      <div className="flex animate-scroll space-x-12">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.name}
              width={120}
              height={60}
              className="h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
