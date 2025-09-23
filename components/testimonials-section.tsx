"use client"

import TestimonialCard from "@/components/testimonial-card"

const testimonials = [
  {
    name: "Sarah Martin",
    company: "Directrice IT, TechCorp",
    text: "Ekwip nous a permis de moderniser notre parc informatique sans impact sur notre trésorerie. Le service est exceptionnel.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Ahmed Benali",
    company: "CEO, StartupInnovante",
    text: "Grâce à Ekwip, nous avons pu équiper rapidement nos équipes avec du matériel haut de gamme. Je recommande vivement.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Marie Dubois",
    company: "Responsable Achats, GrandGroupe",
    text: "La flexibilité des contrats et la qualité du support technique font d'Ekwip un partenaire de choix.",
    avatar: "/placeholder-user.jpg",
  },
]

export default function TestimonialsSection() {
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
