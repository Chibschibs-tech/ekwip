import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon?: string | ReactNode
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  // Determine if icon is a valid string (non-empty) or a React component
  const isValidIconString = typeof icon === "string" && icon.trim().length > 0
  const isReactComponent = typeof icon !== "string" && icon !== null && icon !== undefined

  return (
    <Card className="border-2 hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
            {isValidIconString ? (
              <Image 
                src={icon as string} 
                alt={title} 
                width={32} 
                height={32} 
                className="object-contain" 
              />
            ) : isReactComponent ? (
              icon
            ) : (
              <Image 
                src="/placeholder.svg" 
                alt={title} 
                width={32} 
                height={32} 
                className="object-contain" 
              />
            )}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
