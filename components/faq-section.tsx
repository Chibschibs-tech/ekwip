"use client"

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
]

export default function FAQSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Questions fréquentes</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
