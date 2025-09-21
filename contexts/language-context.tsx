"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  // Hero Section
  "home.hero.badge": "Solution de location IT",
  "home.hero.title": "Équipez-vous, sans ruiner votre trésorerie!",
  "home.hero.description":
    "Louez vos équipements IT services applicatifs inclus. Flexibilité, performance et tranquillité d'esprit garanties.",
  "home.hero.cta.primary": "Demander un devis",
  "home.hero.cta.secondary": "Voir le catalogue",

  // Features Section
  "home.features.title": "Pourquoi choisir Ekwip ?",
  "home.features.description": "Des solutions flexibles et performantes pour tous vos besoins informatiques",
  "home.features.card1.title": "Préservez votre trésorerie",
  "home.features.card1.description":
    "Évitez les gros investissements et préservez votre cash-flow avec nos solutions de location.",
  "home.features.card2.title": "Gestion de parc simplifiée",
  "home.features.card2.description": "Nous nous occupons de la maintenance, des mises à jour et du support technique.",
  "home.features.card3.title": "Mise à niveau garantie",
  "home.features.card3.description":
    "Bénéficiez toujours des dernières technologies avec nos options de mise à niveau.",
  "home.features.card4.title": "Support technique 24/7",
  "home.features.card4.description": "Notre équipe d'experts est disponible pour vous accompagner à tout moment.",

  // Products Section
  "home.products.title": "Notre catalogue d'équipements",
  "home.products.description": "Découvrez notre gamme complète d'équipements informatiques professionnels",

  // Clients Section
  "home.clients.title": "Ils nous font confiance",
  "home.clients.description": "Plus de 500 entreprises nous font confiance pour leurs besoins IT",

  // How It Works Section
  "home.howItWorks.title": "Comment ça marche",
  "home.howItWorks.description": "Un processus simple et efficace pour équiper votre entreprise",
  "home.howItWorks.step1.title": "Choisissez vos équipements",
  "home.howItWorks.step1.description":
    "Parcourez notre catalogue et sélectionnez les équipements qui correspondent à vos besoins.",
  "home.howItWorks.step2.title": "Recevez votre devis",
  "home.howItWorks.step2.description":
    "Nous vous proposons une solution personnalisée avec un devis détaillé sous 24h.",
  "home.howItWorks.step3.title": "Profitez de vos équipements",
  "home.howItWorks.step3.description": "Recevez vos équipements configurés et bénéficiez de notre support complet.",

  // Enterprise Section
  "home.enterprise.title": "Plus de 10 collaborateurs ?",
  "home.enterprise.description":
    "Bénéficiez d'offres spéciales et d'un accompagnement personnalisé pour les grandes équipes.",
  "home.enterprise.feature1": "Tarifs préférentiels sur les volumes",
  "home.enterprise.feature2": "Gestionnaire de compte dédié",
  "home.enterprise.feature3": "Support prioritaire et SLA garantis",
  "home.enterprise.cta": "Contactez notre équipe entreprise",

  // Final CTA Section
  "home.finalCta.title": "Prêt à équiper votre entreprise ?",
  "home.finalCta.description":
    "Rejoignez les centaines d'entreprises qui nous font confiance pour leurs besoins informatiques.",
  "home.finalCta.primary": "Demander un devis gratuit",
  "home.finalCta.secondary": "Parler à un expert",

  // Navigation
  "nav.home": "Accueil",
  "nav.catalog": "Catalogue",
  "nav.howItWorks": "Comment ça marche",
  "nav.about": "À propos",
  "nav.contact": "Contact",
  "nav.clientPortal": "Portail client",
  "nav.needsList": "Ma liste de besoins",

  // Product categories
  "category.laptops": "Ordinateurs portables",
  "category.desktops": "Ordinateurs de bureau",
  "category.smartphones": "Smartphones",
  "category.tablets": "Tablettes",
  "category.accessories": "Accessoires",
  "category.printers": "Imprimantes",
  "category.servers": "Serveurs",

  // Common
  "common.loading": "Chargement...",
  "common.error": "Une erreur est survenue",
  "common.retry": "Réessayer",
  "common.viewMore": "Voir plus",
  "common.viewLess": "Voir moins",
  "common.addToCart": "Ajouter au panier",
  "common.requestQuote": "Demander un devis",
  "common.month": "mois",
  "common.from": "À partir de",
  "common.perMonth": "par mois",

  // Footer
  "footer.company": "Entreprise",
  "footer.products": "Produits",
  "footer.support": "Support",
  "footer.legal": "Légal",
  "footer.followUs": "Suivez-nous",
  "footer.newsletter": "Newsletter",
  "footer.newsletterDescription": "Restez informé de nos dernières offres",
  "footer.subscribe": "S'abonner",
  "footer.copyright": "Tous droits réservés.",

  // FAQ
  "faq.title": "Questions fréquentes",
  "faq.q1": "Quelle est la durée minimum de location ?",
  "faq.a1": "La durée minimum de location est de 12 mois pour la plupart de nos équipements.",
  "faq.q2": "Que se passe-t-il en cas de panne ?",
  "faq.a2": "Nous remplaçons l'équipement défaillant sous 24h ouvrées et prenons en charge toutes les réparations.",
  "faq.q3": "Puis-je acheter l'équipement en fin de contrat ?",
  "faq.a3": "Oui, vous avez la possibilité d'acquérir l'équipement à sa valeur résiduelle en fin de contrat.",

  // Testimonials
  "testimonials.title": "Ce que disent nos clients",
  "testimonials.client1.name": "Sarah Martin",
  "testimonials.client1.company": "Directrice IT, TechCorp",
  "testimonials.client1.text":
    "Ekwip nous a permis de moderniser notre parc informatique sans impact sur notre trésorerie. Le service est exceptionnel.",
  "testimonials.client2.name": "Ahmed Benali",
  "testimonials.client2.company": "CEO, StartupInnovante",
  "testimonials.client2.text":
    "Grâce à Ekwip, nous avons pu équiper rapidement nos équipes avec du matériel haut de gamme. Je recommande vivement.",
  "testimonials.client3.name": "Marie Dubois",
  "testimonials.client3.company": "Responsable Achats, GrandGroupe",
  "testimonials.client3.text":
    "La flexibilité des contrats et la qualité du support technique font d'Ekwip un partenaire de choix.",

  // Custom Offer Banner
  "customOffer.title": "Besoin d'une solution sur mesure ?",
  "customOffer.description": "Nos experts analysent vos besoins et vous proposent une solution personnalisée.",
  "customOffer.cta1": "Demander un devis personnalisé",
  "customOffer.cta2": "Parler à un expert",

  // Client Portal
  "clientPortal.login": "Connexion",
  "clientPortal.dashboard": "Tableau de bord",
  "clientPortal.equipment": "Mes équipements",
  "clientPortal.orders": "Mes commandes",
  "clientPortal.billing": "Facturation",
  "clientPortal.tickets": "Support",
  "clientPortal.profile": "Mon profil",
  "clientPortal.logout": "Déconnexion",

  // Coming Soon
  "comingSoon.title": "Bientôt disponible",
  "comingSoon.description":
    "Nous travaillons dur pour vous offrir la meilleure expérience. Laissez-nous vos coordonnées pour être informé du lancement.",
  "comingSoon.form.name": "Nom complet",
  "comingSoon.form.company": "Entreprise",
  "comingSoon.form.email": "Email",
  "comingSoon.form.message": "Message (optionnel)",
  "comingSoon.form.submit": "Être notifié",
  "comingSoon.form.success": "Merci ! Nous vous contacterons bientôt.",
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["fr", "ar", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
