"use client"

import { TestimonialCard } from "@/components/testimonial-card"

const testimonials = [
  {
    name: "Sarah Martin",
    role: "Directrice IT",
    company: "TechCorp",
    content:
      "Ekwip nous a permis de moderniser notre parc informatique sans impacter notre trésorerie. Le service est excellent et l'équipe très réactive.",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    name: "Ahmed Benali",
    role: "CEO",
    company: "StartupXYZ",
    content:
      "Grâce à Ekwip, nous avons pu équiper toute notre équipe avec du matériel haut de gamme dès le lancement. La flexibilité des contrats est parfaite pour une startup.",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    name: "Marie Dubois",
    role: "Responsable Achats",
    company: "Entreprise ABC",
    content:
      "Le portail client d'Ekwip nous permet de gérer facilement notre flotte d'équipements. Les rapports sont clairs et le support technique très efficace.",
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez pourquoi plus de 500 entreprises nous font confiance pour leurs équipements IT
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
