"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/contexts/language-context"

// FAQ data - same as in the FAQSection component
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

export default function CommentCaMarche() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{t("how_it_works.title")}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("how_it_works.description")}</p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="h-16 w-16 bg-ekwip rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">{t("how_it_works.step1.title")}</h2>
              <p className="text-lg text-slate-600 mb-6">{t("how_it_works.step1.description")}</p>
              <ul className="space-y-3">
                {t("how_it_works.step1.features").map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-ekwip hover:bg-ekwip-700">{t("how_it_works.step1.cta")}</Button>
            </div>
            <div className="bg-slate-100 rounded-xl p-8 h-80 flex items-center justify-center">
              <div className="text-slate-400 text-lg">Illustration: Catalogue d'équipements</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1 bg-slate-100 rounded-xl p-8 h-80 flex items-center justify-center">
              <div className="text-slate-400 text-lg">Illustration: Sélection de durée</div>
            </div>
            <div className="order-1 md:order-2">
              <div className="h-16 w-16 bg-ekwip rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">{t("how_it_works.step2.title")}</h2>
              <p className="text-lg text-slate-600 mb-6">{t("how_it_works.step2.description")}</p>
              <ul className="space-y-3">
                {t("how_it_works.step2.features").map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="h-16 w-16 bg-ekwip rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">{t("how_it_works.step3.title")}</h2>
              <p className="text-lg text-slate-600 mb-6">{t("how_it_works.step3.description")}</p>
              <ul className="space-y-3">
                {t("how_it_works.step3.features").map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-ekwip hover:bg-ekwip-700">{t("how_it_works.step3.cta")}</Button>
            </div>
            <div className="bg-slate-100 rounded-xl p-8 h-80 flex items-center justify-center">
              <div className="text-slate-400 text-lg">Illustration: Livraison et support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t("how_it_works.benefits.title")}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("how_it_works.benefits.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t("how_it_works.benefits.items").map((item: any, index: number) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Updated with Accordion */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t("how_it_works.faq.title")}</h2>
            <p className="text-lg text-slate-600">{t("how_it_works.faq.description")}</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-xl py-4">{item.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-lg pb-6">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">{t("how_it_works.cta.title")}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">{t("how_it_works.cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-ekwip hover:bg-ekwip-700 px-8 py-6 text-lg">
              {t("how_it_works.cta.primary_button")}
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              {t("how_it_works.cta.secondary_button")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
