import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="feature-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <CardContent className="p-8 text-center">
        <div className="icon-container w-16 h-16 mx-auto mb-6 bg-ekwip/10 rounded-full flex items-center justify-center">
          <Image src={icon || "/placeholder.svg"} alt={title} width={32} height={32} className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
