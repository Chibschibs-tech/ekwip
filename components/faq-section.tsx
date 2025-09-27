"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FAQ {
  id: number
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Quelle est la durée minimale de location ?",
    answer:
      "Nos contrats de location débutent à partir de 12 mois, avec possibilité de renouvellement ou de mise à niveau à tout moment.",
  },
  {
    id: 2,
    question: "Que se passe-t-il en cas de panne ?",
    answer:
      "Nous nous occupons de tout ! Notre service technique intervient sous 24h et nous fournissons un équipement de remplacement si nécessaire.",
  },
  {
    id: 3,
    question: "Puis-je changer d'équipement en cours de contrat ?",
    answer:
      "Absolument ! Vous pouvez faire évoluer votre parc informatique à tout moment selon vos besoins. Nous ajustons simplement votre contrat.",
  },
  {
    id: 4,
    question: "Les logiciels sont-ils inclus ?",
    answer:
      "Oui, nous fournissons les équipements avec les logiciels de base installés et configurés. Les licences professionnelles peuvent être ajoutées selon vos besoins.",
  },
  {
    id: 5,
    question: "Proposez-vous un service de livraison ?",
    answer:
      "Oui, nous livrons et installons vos équipements partout au Maroc. Notre équipe technique se charge de la configuration sur site.",
  },
  {
    id: 6,
    question: "Comment fonctionne la facturation ?",
    answer:
      "La facturation est mensuelle et inclut l'équipement, la maintenance, le support technique et les assurances. Pas de frais cachés !",
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          <p className="text-xl text-gray-600">Trouvez rapidement les réponses à vos questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1f3b57] hover:bg-[#1f3b57]/90 transition-colors"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  )
}
