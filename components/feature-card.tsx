import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <Image src={icon || "/placeholder.svg"} alt={title} width={32} height={32} className="w-8 h-8" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

export default FeatureCard
