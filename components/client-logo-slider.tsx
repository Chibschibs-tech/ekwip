import Image from "next/image"

const clientLogos = [
  { name: "Cambiste", logo: "/images/client-logo-1.png" },
  { name: "Youpack", logo: "/images/client-logo-2.png" },
  { name: "OGUBA", logo: "/images/client-logo-3.png" },
  { name: "Client 4", logo: "/images/client-logo-4.png" },
  { name: "Client 5", logo: "/images/client-logo-5.png" },
  { name: "Client 6", logo: "/images/client-logo-6.png" },
]

export default function ClientLogoSlider() {
  return (
    <div className="overflow-hidden">
      <div className="client-logo-slider">
        {[...clientLogos, ...clientLogos].map((client, index) => (
          <div key={index} className="flex-shrink-0 w-60 h-20 flex items-center justify-center mx-8">
            <Image
              src={client.logo || "/placeholder.svg"}
              alt={client.name}
              width={120}
              height={60}
              className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
