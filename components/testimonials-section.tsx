import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Benali",
      company: "TechStart",
      rating: 5,
      content:
        "Ekwip nous a permis d'équiper rapidement notre équipe sans impacter notre trésorerie. Service impeccable et équipements de qualité.",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Ahmed Tazi",
      company: "Digital Solutions",
      rating: 5,
      content:
        "La flexibilité des contrats et la qualité du support technique font d'Ekwip un partenaire de choix pour notre croissance.",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Fatima Chakroun",
      company: "InnovCorp",
      rating: 5,
      content:
        "Grâce à Ekwip, nous avons pu moderniser notre parc informatique sans investissement initial. Je recommande vivement !",
      avatar: "/placeholder-user.jpg",
    },
  ]

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
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
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
