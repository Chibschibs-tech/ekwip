import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string | ReactNode
  className?: string
  iconBgColor?: string
  textColor?: string
  bgColor?: string
}

export default function FeatureCard({
  title,
  description,
  icon,
  className,
  iconBgColor = "bg-[#1f3b57]/10",
  textColor = "text-slate-800",
  bgColor = "bg-white",
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "feature-card rounded-2xl p-8 h-full flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300",
        bgColor,
        textColor,
        className,
      )}
    >
      <div className={cn("icon-container rounded-full p-4 mb-6", iconBgColor)}>
        {typeof icon === "string" ? (
          <Image src={icon || "/placeholder.svg"} alt={title} width={60} height={60} className="w-15 h-15" />
        ) : (
          icon
        )}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-sm md:text-base">{description}</p>
    </div>
  )
}
