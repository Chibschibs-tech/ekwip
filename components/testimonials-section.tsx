"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Ahmed Bennani",
    role: "Directeur IT, TechCorp Maroc",
    content:
      "Ekwip a transformé notre gestion d'équipements. La flexibilité et le service client sont exceptionnels. Nous économisons 40% sur notre budget IT.",
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Fatima El Alaoui",
    role: "CEO, StartupHub",
    content:
      "Service impeccable ! La livraison est rapide et les équipements sont toujours en excellent état. Notre équipe est ravie de la qualité du matériel.",
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Karim Tazi",
    role: "Responsable Achats, MediaGroup",
    content:
      "La solution parfaite pour notre croissance rapide. Nous pouvons adapter notre parc informatique sans investissement massif. Je recommande vivement !",
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ce que disent nos clients</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
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
