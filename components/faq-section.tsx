"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Quelle est la durée minimale de location ?",
    answer:
      "La durée minimale de location est de 6 mois. Nous proposons des contrats flexibles de 6, 12, 24 et 36 mois selon vos besoins.",
  },
  {
    question: "Que se passe-t-il en cas de panne ?",
    answer:
      "Nous proposons un service de remplacement sous 48h en cas de panne. Notre équipe technique est disponible 24/7 pour vous assister.",
  },
  {
    question: "Puis-je acheter l'équipement à la fin du contrat ?",
    answer:
      "Oui, vous avez la possibilité d'acheter l'équipement à sa valeur résiduelle à la fin du contrat de location.",
  },
  {
    question: "Les frais de maintenance sont-ils inclus ?",
    answer:
      "Oui, tous nos contrats incluent la maintenance préventive et corrective, ainsi que le remplacement en cas de défaillance majeure.",
  },
  {
    question: "Proposez-vous la livraison et l'installation ?",
    answer:
      "Oui, nous assurons la livraison et l'installation de tous les équipements dans vos locaux. Notre équipe peut également configurer les appareils selon vos besoins.",
  },
  {
    question: "Comment puis-je augmenter ma flotte d'équipements ?",
    answer:
      "Vous pouvez augmenter votre flotte à tout moment en contactant notre service client. Nous adaptons votre contrat en fonction de vos besoins évolutifs.",
  },
]

export default function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Questions fréquentes</h2>
            <p className="text-xl text-slate-600">Tout ce que vous devez savoir sur nos services de location</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
