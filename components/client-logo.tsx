import Image from "next/image"

interface ClientLogoProps {
  name: string
  logo: string
}

export default function ClientLogo({ name, logo }: ClientLogoProps) {
  return (
    <div className="mx-8 flex items-center justify-center h-20 w-40">
      <Image
        src={logo || "/placeholder.svg"}
        alt={name}
        width={120}
        height={60}
        className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  )
}
