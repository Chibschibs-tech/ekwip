"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "Quels sont les avantages de la location par rapport à l'achat ?",
    answer:
      "La location vous permet de préserver votre trésorerie, de bénéficier d'équipements toujours à jour, d'inclure la maintenance et le support, et d'avoir une meilleure flexibilité pour adapter votre parc selon vos besoins.",
  },
  {
    id: 2,
    question: "Quelle est la durée minimale de location ?",
    answer:
      "Nos contrats de location démarrent à partir de 12 mois, avec des options de renouvellement flexibles selon vos besoins.",
  },
  {
    id: 3,
    question: "Que se passe-t-il en cas de panne d'un équipement ?",
    answer:
      "Tous nos contrats incluent la maintenance et le support technique. En cas de panne, nous intervenons rapidement et fournissons un équipement de remplacement si nécessaire.",
  },
  {
    id: 4,
    question: "Puis-je acheter l'équipement en fin de contrat ?",
    answer:
      "Oui, vous avez plusieurs options en fin de contrat : renouvellement, prolongation, retour de l'équipement, ou achat à la valeur résiduelle.",
  },
  {
    id: 5,
    question: "Comment fonctionne la livraison et l'installation ?",
    answer:
      "Nous nous occupons de la livraison, de l'installation et de la configuration de vos équipements. Notre équipe technique assure également la formation de vos utilisateurs.",
  },
]

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Ensure we always have an array to work with
  const faqsList = Array.isArray(faqs) ? faqs : []

  if (faqsList.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Questions fréquentes</h3>
        <p className="text-gray-600">FAQ en cours de chargement...</p>
      </div>
    )
  }

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Questions fréquentes</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trouvez rapidement les réponses aux questions les plus courantes sur nos services de location d'équipement IT.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqsList.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              {openFaq === faq.id ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openFaq === faq.id && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
