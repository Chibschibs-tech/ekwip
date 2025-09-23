import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    company: string
    role: string
    content: string
    rating: number
    avatar?: string
  }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full border border-gray-200 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${index < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
        </div>

        {/* Testimonial Content */}
        <blockquote className="text-gray-700 mb-6 italic">"{testimonial.content}"</blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-ekwip-100 flex items-center justify-center">
                <span className="text-ekwip font-semibold text-lg">{testimonial.name.charAt(0)}</span>
              </div>
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-600">
              {testimonial.role} • {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard
