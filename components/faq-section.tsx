import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Quelle est la durée minimum de location ?",
    answer: "La durée minimum de location est de 12 mois pour la plupart de nos équipements.",
  },
  {
    question: "Que se passe-t-il en cas de panne ?",
    answer:
      "Nous remplaçons l'équipement défaillant sous 48h ouvrées. Un équipement de remplacement peut être fourni immédiatement si nécessaire.",
  },
  {
    question: "Puis-je upgrader mon équipement en cours de contrat ?",
    answer:
      "Oui, vous pouvez upgrader votre équipement à tout moment. Nous ajustons alors la mensualité en conséquence.",
  },
  {
    question: "Comment fonctionne la maintenance ?",
    answer:
      "La maintenance et le support technique sont inclus dans votre mensualité. Notre équipe intervient rapidement en cas de problème.",
  },
  {
    question: "Que devient l'équipement en fin de contrat ?",
    answer:
      "En fin de contrat, vous pouvez renouveler, upgrader vers un équipement plus récent, ou nous restituons l'équipement.",
  },
]

export default function FAQSection() {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Questions fréquentes</h3>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
            <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-4">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
