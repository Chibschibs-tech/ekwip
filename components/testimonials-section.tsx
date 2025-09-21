"use client"

import { TestimonialCard } from "@/components/testimonial-card"

const testimonials = [
  {
    name: "Sarah Martin",
    role: "Directrice IT",
    company: "TechCorp",
    content:
      "Ekwip nous a permis de moderniser notre parc informatique sans impacter notre trésorerie. Le service est exceptionnel.",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    name: "Ahmed Benali",
    role: "CEO",
    company: "StartupInnovante",
    content:
      "La flexibilité d'Ekwip est parfaite pour une startup en croissance. Nous pouvons adapter notre équipement selon nos besoins.",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    name: "Marie Dubois",
    role: "Responsable Achats",
    company: "GrandeEntreprise",
    content: "Le support technique est réactif et professionnel. Nous recommandons Ekwip à toutes les entreprises.",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
          <p className="text-xl text-gray-600">Découvrez les témoignages de nos clients satisfaits</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
