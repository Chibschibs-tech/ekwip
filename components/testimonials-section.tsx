import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Benali",
    company: "TechStart Solutions",
    rating: 5,
    content:
      "Ekwip nous a permis d'équiper notre équipe rapidement sans impacter notre trésorerie. Le service client est exceptionnel et les équipements sont toujours de qualité.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Ahmed Tazi",
    company: "Digital Maroc",
    rating: 5,
    content:
      "La flexibilité des contrats et la qualité du support technique font d'Ekwip notre partenaire de choix pour tous nos besoins informatiques.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Fatima Chakroun",
    company: "InnovCorp",
    rating: 5,
    content:
      "Grâce à Ekwip, nous avons pu moderniser notre parc informatique sans investissement initial. Une solution parfaite pour notre croissance.",
    avatar: "/placeholder-user.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ce que disent nos clients</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez pourquoi plus de 500 entreprises nous font confiance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
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
