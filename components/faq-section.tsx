"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data
const faqItems = [
  {
    question: "Comment fonctionne la location d'équipement IT avec Ekwip?",
    answer:
      "Ekwip vous propose une solution de location flexible d'équipement IT. Vous choisissez les équipements dont vous avez besoin, nous les livrons et les installons. Vous payez un loyer mensuel fixe pendant la durée de votre choix, et à la fin du contrat, vous pouvez renouveler, acheter ou nous retourner les équipements.",
  },
  {
    question: "Quels types d'équipements proposez-vous?",
    answer:
      "Nous proposons une large gamme d'équipements IT: ordinateurs portables, ordinateurs de bureau, serveurs, équipements réseau, smartphones, tablettes, écrans, imprimantes et périphériques. Tous nos équipements sont de marques reconnues et peuvent être configurés selon vos besoins.",
  },
  {
    question: "Quelle est la durée minimale de location?",
    answer:
      "La durée minimale de location est de 12 mois, mais nous proposons des contrats de 12, 24, 36 ou 48 mois. Plus la durée est longue, plus le loyer mensuel est avantageux.",
  },
  {
    question: "Puis-je changer ou mettre à jour mon matériel en cours de contrat ?",
    answer:
      "Oui, vous pouvez upgrader votre équipement en fonction de vos besoins. l'upgarde se fait sans frais additionnels.",
  },
  {
    question: "Le support technique est-il inclus ?",
    answer:
      "Oui, notre support technique est inclus. En cas de problème, nous assurons assistance et maintenance. Votre matériel est également couvert contre les dommages, pertes ou vols. En cas d'incident, une franchise unique de 600 Dhs s'applique pour la réparation ou le remplacement.",
  },
  {
    question: "Quelle est la durée du contrat de location et que se passe-t-il en cas de résiliation anticipée ?",
    answer:
      "Nos contrats standards sont d'une durée de 24 mois. Si vous souhaitez résilier avant la fin de votre engagement, vous devrez payer 50 % du montant dû sur la période restante.",
  },
  {
    question: "Que se passe-t-il en cas de panne d'un équipement?",
    answer:
      "En cas de panne, notre équipe technique intervient rapidement pour diagnostiquer le problème. Si l'équipement ne peut pas être réparé, nous le remplaçons par un équipement équivalent ou supérieur sans frais supplémentaires (dans le cadre de nos conditions de garantie standard).",
  },
  {
    question: "Puis-je ajouter des équipements en cours de contrat?",
    answer:
      "Absolument! Vous pouvez ajouter des équipements à tout moment. Les nouveaux équipements seront intégrés à votre contrat existant ou feront l'objet d'un nouveau contrat, selon ce qui est le plus avantageux pour vous.",
  },
]

export default function FAQSection() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Questions fréquentes</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
