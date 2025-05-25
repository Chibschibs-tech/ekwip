"use client"

import { useState } from "react"
import TestimonialCard from "@/components/testimonial-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock testimonial data
const testimonials = [
  {
    quote:
      "Ekwip nous a permis de moderniser notre parc informatique sans impacter notre trésorerie. Un service client exceptionnel !",
    author: "Sarah Benali",
    role: "Directrice Financière",
    company: "TechMaroc",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "La flexibilité d'Ekwip est parfaite pour notre startup en croissance. Nous adaptons notre équipement selon nos besoins.",
    author: "Karim Alaoui",
    role: "CEO",
    company: "InnovDigital",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Le support technique est réactif et efficace. Un vrai plus pour notre entreprise qui ne peut pas se permettre de temps d'arrêt.",
    author: "Nadia Chraibi",
    role: "Responsable IT",
    company: "ConseilPro",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ce que nos clients disent</h2>
          <p className="text-gray-600 mb-8">
            Découvrez les témoignages de nos clients satisfaits qui ont transformé leur gestion IT grâce à nos solutions
            de location.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="icon" className="rounded-full" onClick={prevTestimonial}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={nextTestimonial}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              avatar={testimonial.avatar}
              className={
                index === currentIndex || index === (currentIndex + 1) % testimonials.length ? "" : "hidden md:block"
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
