"use client"

import { TestimonialCard } from "@/components/testimonial-card"

const testimonials = [
  {
    quote:
      "Ekwip nous a permis de moderniser notre parc informatique sans investissement initial. Le service est exceptionnel.",
    author: "Sarah Benali",
    role: "Directrice IT",
    company: "TechCorp",
    avatar: "/placeholder-user.jpg",
  },
  {
    quote:
      "La flexibilité des contrats et la qualité du matériel font d'Ekwip notre partenaire de choix pour l'équipement.",
    author: "Ahmed Tazi",
    role: "CEO",
    company: "StartupMA",
    avatar: "/placeholder-user.jpg",
  },
  {
    quote: "Support technique réactif et matériel toujours à la pointe. Nous recommandons vivement Ekwip.",
    author: "Fatima Alaoui",
    role: "Responsable Achats",
    company: "InnovCorp",
    avatar: "/placeholder-user.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Ce que disent nos clients</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez pourquoi plus de 500 entreprises nous font confiance pour leur équipement informatique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
