"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    "home.hero.description":
      "Louez vos équipements informatiques et préservez votre trésorerie. Solutions flexibles pour entreprises de toutes tailles.",
    "home.hero.button1": "Découvrir nos solutions",
    "home.hero.button2": "Demander un devis",
    "home.features.card1.title": "Préservez votre trésorerie",
    "home.features.card1.description":
      "Pas d'investissement initial important. Gardez votre capital pour vos projets stratégiques.",
    "home.features.card2.title": "Gestion de parc simplifiée",
    "home.features.card2.description":
      "Nous nous occupons de tout : livraison, installation, maintenance et support technique.",
    "home.features.card3.title": "Équipements toujours à jour",
    "home.features.card3.description": "Bénéficiez des dernières technologies sans vous soucier de l'obsolescence.",
    "home.features.card4.title": "Support technique inclus",
    "home.features.card4.description": "Une équipe d'experts à votre disposition pour vous accompagner au quotidien.",
    "home.products.title": "Notre catalogue d'équipements",
    "home.products.description":
      "Découvrez notre large gamme d'équipements informatiques disponibles à la location. Des ordinateurs portables aux serveurs, nous avons tout ce qu'il vous faut.",
    "home.products.button": "Voir tout le catalogue",
    "home.clients.title": "Ils nous font confiance",
    "home.clients.description":
      "Plus de 500 entreprises au Maroc ont choisi Ekwip pour leurs besoins en équipement informatique.",
    "home.howItWorks.title": "Comment ça marche ?",
    "home.howItWorks.description": "Un processus simple et rapide pour équiper votre entreprise en quelques étapes.",
    "home.howItWorks.step1.title": "Choisissez vos équipements",
    "home.howItWorks.step1.description":
      "Parcourez notre catalogue et sélectionnez les équipements adaptés à vos besoins.",
    "home.howItWorks.step2.title": "Configurez votre contrat",
    "home.howItWorks.step2.description":
      "Définissez la durée de location et les services associés selon vos préférences.",
    "home.howItWorks.step3.title": "Recevez et utilisez",
    "home.howItWorks.step3.description":
      "Nous livrons, installons et configurons vos équipements. Vous pouvez commencer à travailler immédiatement.",
    "home.howItWorks.button": "En savoir plus",
    "home.cta.title": "Prêt à transformer votre IT ?",
    "home.cta.description":
      "Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.",
    "home.cta.button": "Nous contacter",
  },
  en: {
    "home.hero.description":
      "Rent your IT equipment and preserve your cash flow. Flexible solutions for businesses of all sizes.",
    "home.hero.button1": "Discover our solutions",
    "home.hero.button2": "Request a quote",
    "home.features.card1.title": "Preserve your cash flow",
    "home.features.card1.description":
      "No significant initial investment. Keep your capital for your strategic projects.",
    "home.features.card2.title": "Simplified fleet management",
    "home.features.card2.description":
      "We take care of everything: delivery, installation, maintenance and technical support.",
    "home.features.card3.title": "Always up-to-date equipment",
    "home.features.card3.description": "Benefit from the latest technologies without worrying about obsolescence.",
    "home.features.card4.title": "Technical support included",
    "home.features.card4.description": "A team of experts at your disposal to support you on a daily basis.",
    "home.products.title": "Our equipment catalog",
    "home.products.description":
      "Discover our wide range of IT equipment available for rent. From laptops to servers, we have everything you need.",
    "home.products.button": "View full catalog",
    "home.clients.title": "They trust us",
    "home.clients.description": "More than 500 companies in Morocco have chosen Ekwip for their IT equipment needs.",
    "home.howItWorks.title": "How does it work?",
    "home.howItWorks.description": "A simple and fast process to equip your business in a few steps.",
    "home.howItWorks.step1.title": "Choose your equipment",
    "home.howItWorks.step1.description": "Browse our catalog and select the equipment that suits your needs.",
    "home.howItWorks.step2.title": "Configure your contract",
    "home.howItWorks.step2.description":
      "Define the rental duration and associated services according to your preferences.",
    "home.howItWorks.step3.title": "Receive and use",
    "home.howItWorks.step3.description":
      "We deliver, install and configure your equipment. You can start working immediately.",
    "home.howItWorks.button": "Learn more",
    "home.cta.title": "Ready to transform your IT?",
    "home.cta.description": "Contact us today to discuss your needs and get a personalized quote.",
    "home.cta.button": "Contact us",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations.fr]
    return translation || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
