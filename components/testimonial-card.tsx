import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  company: string
  content: string
  avatar?: string
  rating?: number
}

export function TestimonialCard({ name, company, content, avatar, rating = 5 }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <blockquote className="text-gray-700 mb-4 italic">"{content}"</blockquote>

        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-sm">{name}</div>
            <div className="text-gray-500 text-xs">{company}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard
