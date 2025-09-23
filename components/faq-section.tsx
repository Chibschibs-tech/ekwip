import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Quelle est la durée minimum de location ?",
    answer: "La durée minimum de location est de 12 mois pour la plupart de nos équipements.",
  },
  {
    question: "Que se passe-t-il en cas de panne ?",
    answer: "Nous remplaçons l'équipement défaillant sous 24h ouvrées et prenons en charge toutes les réparations.",
  },
  {
    question: "Puis-je acheter l'équipement en fin de contrat ?",
    answer: "Oui, vous avez la possibilité d'acquérir l'équipement à sa valeur résiduelle en fin de contrat.",
  },
  {
    question: "Le support technique est-il inclus ?",
    answer: "Oui, le support technique est inclus dans tous nos contrats de location.",
  },
]

export function FAQSection() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          <p className="text-xl text-gray-600">Trouvez les réponses aux questions les plus courantes</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQSection
