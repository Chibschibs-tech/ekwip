import Image from "next/image"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
  className?: string
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar = "/placeholder.svg?height=100&width=100",
  className,
}: TestimonialCardProps) {
  return (
    <div className={cn("testimonial-card bg-white rounded-2xl p-6 shadow-sm", className)}>
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image src={avatar || "/placeholder.svg"} alt={author} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{author}</h4>
          <p className="text-sm text-gray-500">
            {role}, {company}
          </p>
        </div>
      </div>
      <p className="text-gray-600 italic">"{quote}"</p>
    </div>
  )
}

export default TestimonialCard
