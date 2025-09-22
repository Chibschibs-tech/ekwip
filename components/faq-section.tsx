"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Quelle est la durée minimum de location ?",
    answer:
      "La durée minimum de location est de 12 mois. Nous proposons des contrats flexibles de 12 à 36 mois selon vos besoins.",
  },
  {
    question: "Que se passe-t-il en cas de panne ?",
    answer:
      "En cas de panne, nous remplaçons votre équipement sous 48h ouvrées. Le support technique et la maintenance sont inclus dans tous nos contrats.",
  },
  {
    question: "Puis-je upgrader mon équipement en cours de contrat ?",
    answer:
      "Oui, vous pouvez upgrader votre équipement à tout moment. Nous ajustons simplement votre mensualité en fonction du nouvel équipement.",
  },
  {
    question: "Comment fonctionne la facturation ?",
    answer:
      "La facturation est mensuelle et inclut l'équipement, la maintenance, le support technique et l'assurance. Aucun frais caché.",
  },
]

export function FAQSection() {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQSection
