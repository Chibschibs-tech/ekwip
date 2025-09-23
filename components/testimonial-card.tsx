import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialCardProps {
  name: string
  company: string
  text: string
  avatar?: string
}

export function TestimonialCard({ name, company, text, avatar }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-4">
        <p className="text-gray-600 italic">"{text}"</p>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard
