"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const clients = [
  { name: "Client 1", logo: "/images/client-logo-1.png" },
  { name: "Client 2", logo: "/images/client-logo-2.png" },
  { name: "Client 3", logo: "/images/client-logo-3.png" },
  { name: "Client 4", logo: "/images/client-logo-4.png" },
  { name: "Client 5", logo: "/images/client-logo-5.png" },
  { name: "Client 6", logo: "/images/client-logo-6.png" },
]

export default function ClientLogoSlider() {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-12 items-center"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...clients, ...clients].map((client, index) => (
          <div key={index} className="flex-shrink-0 w-40 h-20 relative grayscale hover:grayscale-0 transition-all">
            <Image
              src={client.logo || "/placeholder.svg"}
              alt={client.name}
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
