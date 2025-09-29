import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Quels sont les avantages de la location ?",
    answer:
      "La location vous permet de préserver votre trésorerie, de bénéficier des dernières technologies, d'avoir un support technique inclus et de déduire fiscalement vos mensualités.",
  },
  {
    question: "Que comprend le service de location ?",
    answer:
      "Nos contrats incluent l'équipement, la maintenance, le support technique, les mises à jour logicielles et la possibilité de renouvellement ou d'upgrade.",
  },
  {
    question: "Puis-je acheter l'équipement en cours de contrat ?",
    answer:
      "Oui, vous pouvez racheter vos équipements à tout moment pendant la durée du contrat. Le prix de rachat sera calculé en fonction de la durée restante.",
  },
  {
    question: "Les logiciels sont-ils inclus ?",
    answer:
      "Oui, nous fournissons les équipements avec les logiciels de base installés et configurés. Les licences spécialisées peuvent être ajoutées selon vos besoins.",
  },
  {
    question: "Proposez-vous un service de livraison ?",
    answer:
      "Oui, nous livrons et installons vos équipements partout au Maroc. Notre équipe technique se charge de la configuration et de la mise en service.",
  },
  {
    question: "Comment fonctionne la facturation ?",
    answer:
      "La facturation est mensuelle et comprend tous les services inclus dans votre contrat. Vous recevez une facture unique pour tous vos équipements.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
          <p className="text-lg text-gray-600">
            Trouvez rapidement les réponses à vos questions sur nos services de location IT
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
