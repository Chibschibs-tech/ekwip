"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "fr" | "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  "home.hero.badge": "Nouveau",
  "home.hero.title": "Équipez-vous sans vous ruiner",
  "home.hero.description":
    "Louez vos équipements IT services inclus. Flexibilité, performance et tranquillité d'esprit pour votre entreprise.",
  "home.hero.cta.primary": "Découvrir le catalogue",
  "home.hero.cta.secondary": "Comment ça marche",
  "home.features.title": "Pourquoi choisir Ekwip ?",
  "home.features.description": "Des solutions flexibles pour équiper votre entreprise sans contrainte",
  "home.features.card1.title": "Préservez votre trésorerie",
  "home.features.card1.description":
    "Transformez vos dépenses d'investissement en coûts opérationnels prévisibles avec des mensualités fixes.",
  "home.features.card2.title": "Pilotez votre flotte IT",
  "home.features.card2.description": "Gérez et optimisez tout votre parc informatique depuis une interface unique.",
  "home.features.card3.title": "Upgradez à tout moment",
  "home.features.card3.description": "Échangez ou upgradez votre équipement selon vos besoins, sans contrainte.",
  "home.features.card4.title": "Support et maintenance inclus",
  "home.features.card4.description": "Assistance technique et remplacement rapide en cas de problème.",
  "home.products.title": "Notre catalogue d'équipements",
  "home.products.description": "Découvrez notre gamme complète d'équipements informatiques professionnels",
  "home.clients.title": "Ils nous font confiance",
  "home.clients.description": "Rejoignez les entreprises qui ont choisi Ekwip",
  "home.howItWorks.title": "Comment ça marche",
  "home.howItWorks.description": "Un processus simple et transparent pour équiper votre entreprise",
  "home.howItWorks.step1.title": "Choisissez votre équipement",
  "home.howItWorks.step1.description":
    "Parcourez notre catalogue et sélectionnez les équipements adaptés à vos besoins.",
  "home.howItWorks.step2.title": "Définissez votre durée",
  "home.howItWorks.step2.description":
    "Choisissez la durée de location qui vous convient, de 1 à 36 mois selon vos projets.",
  "home.howItWorks.step3.title": "Recevez et utilisez",
  "home.howItWorks.step3.description":
    "Nous livrons et installons votre équipement. Profitez d'un support technique pendant toute la durée.",
  "home.enterprise.title": "Plus de 10 collaborateurs?",
  "home.enterprise.description": "Contactez-nous pour étudier ensemble votre besoin et obtenir une offre sur-mesure.",
  "home.enterprise.feature1": "Gestion de parc informatique complète",
  "home.enterprise.feature2": "Tarifs dégressifs selon le volume",
  "home.enterprise.feature3": "Support technique dédié",
  "home.enterprise.cta": "Obtenir un devis",
  "home.finalCta.title": "Prêt à moderniser votre parc informatique ?",
  "home.finalCta.description":
    "Découvrez nos solutions de location flexibles et bénéficiez de l'expertise de nos équipes.",
  "home.finalCta.primary": "Découvrir le catalogue",
  "home.finalCta.secondary": "Parler à un expert",
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key
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
