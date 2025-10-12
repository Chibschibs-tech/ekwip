import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Benali",
    role: "Directrice IT",
    company: "TechCorp Maroc",
    content:
      "Ekwip nous a permis d'équiper toute notre équipe rapidement et sans impacter notre trésorerie. Le service est exceptionnel et le support très réactif.",
    rating: 5,
  },
  {
    name: "Ahmed Tazi",
    role: "CEO",
    company: "StartupHub",
    content:
      "La flexibilité des contrats et la qualité des équipements sont exceptionnelles. Nous avons pu faire évoluer notre parc informatique au fur et à mesure de notre croissance.",
    rating: 5,
  },
  {
    name: "Fatima Elkhayati",
    role: "Responsable Achats",
    company: "InnovGroup",
    content:
      "Grâce à Ekwip, nous avons équipé toute notre équipe avec du matériel de qualité professionnelle. Un vrai gain de temps et d'argent pour notre entreprise.",
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez pourquoi plus de 500 entreprises nous font confiance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-700 my-4 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-ekwip text-white">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
