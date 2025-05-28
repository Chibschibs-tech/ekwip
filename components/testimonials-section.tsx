"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Benali",
    company: "TechStart Morocco",
    role: "CEO",
    content:
      "Ekwip nous a permis d'équiper notre équipe rapidement sans impacter notre trésorerie. Le service est exceptionnel et les équipements toujours à jour.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=SB",
  },
  {
    id: 2,
    name: "Ahmed Tazi",
    company: "Digital Solutions",
    role: "CTO",
    content:
      "La flexibilité offerte par Ekwip est remarquable. Nous pouvons adapter notre parc informatique selon nos besoins sans contraintes.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=AT",
  },
  {
    id: 3,
    name: "Fatima Chraibi",
    company: "InnovCorp",
    role: "Directrice Financière",
    content:
      "L'impact sur notre cash-flow a été immédiat. Nous recommandons vivement Ekwip à toutes les entreprises soucieuses de leur trésorerie.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=FC",
  },
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Ensure we always have an array to work with
  const testimonialsList = Array.isArray(testimonials) ? testimonials : []

  if (testimonialsList.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Témoignages clients</h2>
        <p className="text-gray-600">Témoignages en cours de chargement...</p>
      </div>
    )
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsList.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length)
  }

  const currentTestimonialData = testimonialsList[currentTestimonial] || testimonialsList[0]

  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ce que disent nos clients</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez pourquoi plus de 500 entreprises font confiance à Ekwip pour leurs besoins en équipement IT.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonialsList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              {Array.from({ length: currentTestimonialData.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              "{currentTestimonialData.content}"
            </blockquote>

            <div className="flex items-center justify-center space-x-4">
              <img
                src={currentTestimonialData.avatar || "/placeholder.svg"}
                alt={currentTestimonialData.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="text-left">
                <div className="font-semibold text-gray-800">{currentTestimonialData.name}</div>
                <div className="text-gray-600">
                  {currentTestimonialData.role}, {currentTestimonialData.company}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
