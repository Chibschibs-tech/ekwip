import { TestimonialCard } from "@/components/testimonial-card"

const testimonials = [
  {
    name: "Sarah Martin",
    role: "Directrice IT",
    company: "TechCorp",
    content:
      "Ekwip nous a permis de moderniser notre parc informatique sans impact sur notre trésorerie. Le service est exceptionnel.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Pierre Dubois",
    role: "CEO",
    company: "StartupXYZ",
    content:
      "La flexibilité offerte par Ekwip est parfaite pour une startup en croissance. Nous pouvons adapter notre équipement selon nos besoins.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Marie Leroy",
    role: "Responsable Achats",
    company: "GrandGroupe",
    content:
      "Un partenaire de confiance pour la gestion de notre flotte IT. Support réactif et équipements toujours performants.",
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
