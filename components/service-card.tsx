import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type React from "react"

interface ServiceCardProps {
  title: string
  description: string
  href: string
  image: string
  imageAlt: string
  chip: {
    label: string
    variant: "daas" | "connect" | "tech"
  }
  colorClass: string
  hoverColorClass: string
}

export function ServiceCard({
  title,
  description,
  href,
  image,
  imageAlt,
  chip,
  colorClass,
  hoverColorClass,
}: ServiceCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
        {/* Image Background */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <Image 
            src={image} 
            alt={imageAlt || title} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        </div>

        <div className="p-8 flex flex-col flex-grow relative z-10">
          <div className={`ek-chip ek-chip-${chip.variant} mb-4 w-fit`}>
            <div className="ek-chip-dot" />
            {chip.label}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{title}</h3>
          <p className="text-base text-gray-700 mb-6 leading-relaxed flex-grow">{description}</p>
          <div className={`flex items-center ${colorClass} font-bold text-sm group-hover:gap-3 transition-all mt-auto`}>
            En savoir plus <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

