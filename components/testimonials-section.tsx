"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  company: string
  role: string
  content: string
  rating: number
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Benali",
    company: "TechStart Maroc",
    role: "Directrice IT",
    content:
      "Ekwip nous a permis d'équiper toute notre équipe sans impacter notre trésorerie. Le service est exceptionnel et le support technique très réactif.",
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Ahmed Tazi",
    company: "Consulting Plus",
    role: "CEO",
    content:
      "La flexibilité des contrats et la qualité des équipements font d'Ekwip notre partenaire de choix pour tous nos besoins informatiques.",
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Fatima El Mansouri",
    company: "Digital Agency",
    role: "Responsable Technique",
    content:
      "Grâce à Ekwip, nous avons toujours accès aux dernières technologies sans les contraintes d'achat. Un vrai plus pour notre compétitivité.",
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez pourquoi plus de 500 entreprises nous font confiance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>

                <StarRating rating={testimonial.rating || 5} />

                <blockquote className="mt-4 text-gray-700 italic">"{testimonial.content}"</blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
