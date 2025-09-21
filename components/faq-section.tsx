import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Comment fonctionne la location d'équipement chez Ekwip ?",
    answer:
      "Vous choisissez votre équipement, signez un contrat de location, et recevez votre matériel sous 48h. Nous nous occupons de la maintenance et du support technique.",
  },
  {
    question: "Quelle est la durée minimale de location ?",
    answer:
      "La durée minimale de location est de 12 mois pour la plupart des équipements. Nous proposons également des contrats flexibles adaptés à vos besoins.",
  },
  {
    question: "Que se passe-t-il en cas de panne ?",
    answer:
      "Notre équipe technique intervient sous 24h. Si la réparation prend plus de 48h, nous vous fournissons un équipement de remplacement.",
  },
  {
    question: "Puis-je acheter l'équipement en fin de contrat ?",
    answer:
      "Oui, vous avez la possibilité d'acheter l'équipement à sa valeur résiduelle en fin de contrat, ou de le renouveler avec du matériel plus récent.",
  },
  {
    question: "Quels sont les avantages fiscaux de la location ?",
    answer:
      "Les loyers sont déductibles à 100% des bénéfices imposables, ce qui optimise votre trésorerie et votre fiscalité d'entreprise.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Questions fréquentes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur nos services de location d'équipement
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
