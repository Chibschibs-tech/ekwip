import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="mx-auto w-16 h-16 relative">
          <Image
            src={icon || "/placeholder.svg"}
            alt={title}
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

export default FeatureCard
