import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Quels sont les avantages de la location ?",
      answer:
        "La location vous permet de préserver votre trésorerie, de bénéficier d'équipements toujours à jour, et d'inclure la maintenance et le support dans votre contrat mensuel.",
    },
    {
      question: "Que comprend le service de location ?",
      answer:
        "Nos contrats incluent l'équipement, la livraison, l'installation, la configuration, la maintenance préventive, le support technique 24/7 et l'assurance.",
    },
    {
      question: "Puis-je acheter l'équipement en cours de contrat ?",
      answer:
        "Oui, vous pouvez racheter vos équipements à tout moment pendant la durée du contrat. Le prix de rachat est calculé en fonction de la durée restante.",
    },
    {
      question: "Les logiciels sont-ils inclus ?",
      answer:
        "Nous proposons des packages avec les logiciels essentiels (Windows, Office, antivirus). D'autres logiciels spécialisés peuvent être ajoutés selon vos besoins.",
    },
    {
      question: "Proposez-vous un service de récupération ?",
      answer:
        "Oui, nous récupérons gratuitement tous les équipements en fin de contrat et nous nous chargeons de la destruction sécurisée des données si nécessaire.",
    },
    {
      question: "Comment fonctionne la facturation ?",
      answer:
        "La facturation est mensuelle et comprend tous les services. Aucun frais caché, tout est transparent dès la signature du contrat.",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
          <p className="text-lg text-gray-600">Trouvez rapidement les réponses à vos questions</p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-medium text-gray-900">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
