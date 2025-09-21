"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Quelle est la durée minimum de location ?",
    answer:
      "La durée minimum de location est de 1 mois. Vous pouvez choisir des durées de 1 à 36 mois selon vos besoins.",
  },
  {
    question: "Que se passe-t-il en cas de panne ?",
    answer:
      "Nous remplaçons l'équipement défaillant sous 24h ouvrées. Le support technique est inclus dans tous nos contrats.",
  },
  {
    question: "Puis-je upgrader mon équipement en cours de contrat ?",
    answer: "Oui, vous pouvez upgrader votre équipement à tout moment. Nous ajustons simplement votre mensualité.",
  },
  {
    question: "Les logiciels sont-ils inclus ?",
    answer: "Nous fournissons l'équipement avec le système d'exploitation. Les logiciels métiers sont à votre charge.",
  },
]

export function FAQSection() {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left hover:text-ekwip">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQSection
