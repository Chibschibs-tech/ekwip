import { TestimonialCard } from "@/components/testimonial-card"

const testimonials = [
  {
    name: "Sarah Martin",
    company: "Directrice IT, TechCorp",
    content:
      "Ekwip nous a permis de moderniser notre parc informatique sans impact sur notre trésorerie. Le service est exceptionnel.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Ahmed Benali",
    company: "CEO, StartupInnovante",
    content:
      "Grâce à Ekwip, nous avons pu équiper rapidement nos équipes avec du matériel haut de gamme. Je recommande vivement.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Marie Dubois",
    company: "Responsable Achats, GrandGroupe",
    content: "La flexibilité des contrats et la qualité du support technique font d'Ekwip un partenaire de choix.",
    avatar: "/placeholder-user.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Découvrez les témoignages de nos clients satisfaits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
