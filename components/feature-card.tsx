import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="feature-card h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-[#1f3b57]/10 rounded-2xl flex items-center justify-center">
            <Image src={icon || "/placeholder.svg"} alt={title} width={32} height={32} />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

export default FeatureCard
