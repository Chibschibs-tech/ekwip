import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="border-2 hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
            <Image src={icon || "/placeholder.svg"} alt={title} width={32} height={32} className="object-contain" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
