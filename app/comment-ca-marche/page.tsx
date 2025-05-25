import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Comment ça marche ?</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Découvrez comment Ekwip simplifie la gestion de votre parc informatique avec une solution de location
            flexible et sans engagement.
          </p>
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
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Choisissez votre équipement</h2>
              <p className="text-lg text-slate-600 mb-6">
                Parcourez notre catalogue complet d'équipements IT et sélectionnez les produits qui correspondent à vos
                besoins professionnels.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Large gamme d'ordinateurs portables et de bureau</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Smartphones et tablettes professionnels</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Accessoires et périphériques</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Solutions serveurs et réseau</span>
                </li>
              </ul>
              <Button className="mt-8 bg-ekwip hover:bg-ekwip-700">Voir le catalogue</Button>
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
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Définissez votre durée de location</h2>
              <p className="text-lg text-slate-600 mb-6">
                Choisissez la durée de location qui correspond à vos besoins, de 1 à 36 mois, sans engagement de longue
                durée.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Flexibilité totale dans la durée</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Tarifs dégressifs pour les engagements plus longs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Possibilité de prolonger ou modifier en cours de contrat</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Options d'achat en fin de contrat</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="h-16 w-16 bg-ekwip rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Recevez et utilisez votre équipement</h2>
              <p className="text-lg text-slate-600 mb-6">
                Nous livrons et installons votre équipement dans vos locaux. Profitez d'un support technique pendant
                toute la durée de votre contrat.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Livraison et installation incluses</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Configuration selon vos besoins</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Support technique réactif et disponible</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-slate-700">Remplacement en cas de panne</span>
                </li>
              </ul>
              <Button className="mt-8 bg-ekwip hover:bg-ekwip-700">Demander un devis</Button>
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Les avantages de la location</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez pourquoi de plus en plus d'entreprises choisissent la location d'équipement IT plutôt que
              l'achat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Économie de trésorerie</h3>
                <p className="text-slate-600">
                  Préservez votre trésorerie en évitant les investissements massifs dans l'achat d'équipements qui se
                  déprécient rapidement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Flexibilité maximale</h3>
                <p className="text-slate-600">
                  Adaptez votre parc informatique à l'évolution de vos besoins et de votre effectif sans contraintes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Équipement toujours à jour</h3>
                <p className="text-slate-600">
                  Bénéficiez des dernières technologies sans vous soucier de l'obsolescence de votre matériel.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Maintenance incluse</h3>
                <p className="text-slate-600">
                  Profitez d'un service de maintenance et de support technique inclus dans votre abonnement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Gestion simplifiée</h3>
                <p className="text-slate-600">
                  Simplifiez la gestion de votre parc informatique avec un interlocuteur unique pour tous vos besoins.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Avantages fiscaux</h3>
                <p className="text-slate-600">
                  Les loyers sont entièrement déductibles des charges d'exploitation, contrairement à l'amortissement
                  des équipements achetés.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section - Updated with Accordion */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Questions fréquentes</h2>
            <p className="text-lg text-slate-600">
              Tout ce que vous devez savoir sur notre service de location d'équipement IT.
            </p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Prêt à simplifier la gestion de votre équipement IT ?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-ekwip hover:bg-ekwip-700 px-8 py-6 text-lg">Demander un devis</Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
