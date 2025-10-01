import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqs = [
  {
    question: "Quelles sont les durées minimales de location ?",
    answer:
      "Nos contrats de location sont flexibles et s'adaptent à vos besoins. La durée minimale est généralement de 12 mois, mais nous proposons également des contrats de 24 et 36 mois avec des tarifs dégressifs.",
  },
  {
    question: "Que se passe-t-il en cas de panne ?",
    answer:
      "Nous assurons le support technique et la maintenance de tous nos équipements. En cas de panne, nous intervenons rapidement et fournissons un équipement de remplacement si nécessaire pour assurer la continuité de votre activité.",
  },
  {
    question: "Puis-je changer d'équipement en cours de contrat ?",
    answer:
      "Oui, nos contrats sont flexibles. Vous pouvez faire évoluer votre parc informatique en cours de contrat selon vos besoins. Contactez-nous pour discuter des modalités de mise à niveau ou de changement d'équipement.",
  },
  {
    question: "Les logiciels sont-ils inclus ?",
    answer:
      "Nous livrons les équipements avec le système d'exploitation de base. Selon vos besoins, nous pouvons également inclure des licences logicielles professionnelles (suite Office, logiciels métiers, etc.) dans votre contrat de location.",
  },
  {
    question: "Proposez-vous un service de livraison ?",
    answer:
      "Oui, nous assurons la livraison et l'installation de tous vos équipements. Notre équipe technique peut également vous accompagner dans la configuration et la mise en service de votre matériel.",
  },
  {
    question: "Comment fonctionne la facturation ?",
    answer:
      "La facturation est mensuelle et débute dès la réception de vos équipements. Vous recevez une facture détaillée par email chaque mois. Nous proposons également des facilités de paiement adaptées aux besoins des entreprises.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          <p className="text-lg text-gray-600">
            Trouvez rapidement les réponses à vos questions sur la location d'équipements IT
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-gray-900">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
          <Link href="/contact">
            <Button size="lg" className="bg-ekwip hover:bg-ekwip-700">
              Contactez-nous
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
