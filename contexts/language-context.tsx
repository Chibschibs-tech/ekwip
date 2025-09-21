"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "fr" | "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  // Navigation
  "nav.home": "Accueil",
  "nav.catalog": "Catalogue",
  "nav.how-it-works": "Comment ça marche",
  "nav.about": "À propos",
  "nav.contact": "Contact",
  "nav.client-portal": "Portail Client",
  "nav.my-needs-list": "Ma liste de besoins",

  // Hero Section
  "hero.title": "Équipez votre entreprise sans investir",
  "hero.subtitle": "Location d'équipements informatiques professionnels avec maintenance incluse",
  "hero.cta.catalog": "Voir le catalogue",
  "hero.cta.quote": "Demander un devis",

  // Features
  "features.title": "Pourquoi choisir Ekwip ?",
  "features.cash.title": "Préservez votre trésorerie",
  "features.cash.description": "Pas d'investissement initial, loyers déductibles à 100%",
  "features.upgrade.title": "Matériel toujours à jour",
  "features.upgrade.description": "Renouvelez votre équipement régulièrement",
  "features.support.title": "Support technique inclus",
  "features.support.description": "Maintenance et assistance 24/7",
  "features.fleet.title": "Gestion de parc simplifiée",
  "features.fleet.description": "Nous gérons votre parc informatique",

  // Products
  "products.title": "Notre catalogue d'équipements",
  "products.subtitle": "Découvrez notre sélection d'équipements professionnels",
  "products.view-all": "Voir tout le catalogue",

  // Categories
  "categories.laptops": "Ordinateurs portables",
  "categories.desktops": "Ordinateurs de bureau",
  "categories.smartphones": "Smartphones",
  "categories.tablets": "Tablettes",
  "categories.printers": "Imprimantes",
  "categories.accessories": "Accessoires",

  // Clients
  "clients.title": "Ils nous font confiance",
  "clients.subtitle": "Plus de 500 entreprises nous font confiance",

  // How it works
  "how-it-works.title": "Comment ça marche",
  "how-it-works.step1.title": "Choisissez votre équipement",
  "how-it-works.step1.description": "Parcourez notre catalogue et sélectionnez vos équipements",
  "how-it-works.step2.title": "Définissez votre durée",
  "how-it-works.step2.description": "Choisissez la durée de location qui vous convient",
  "how-it-works.step3.title": "Recevez et utilisez",
  "how-it-works.step3.description": "Livraison sous 48h et support technique inclus",

  // Enterprise
  "enterprise.title": "Plus de 10 collaborateurs ?",
  "enterprise.subtitle": "Bénéficiez d'offres préférentielles et d'un accompagnement dédié",
  "enterprise.features.dedicated": "Gestionnaire dédié",
  "enterprise.features.volume": "Tarifs préférentiels",
  "enterprise.features.support": "Support prioritaire",
  "enterprise.cta": "Contactez-nous",

  // Testimonials
  "testimonials.title": "Ce que disent nos clients",
  "testimonials.subtitle": "Découvrez les témoignages de nos clients satisfaits",

  // CTA
  "cta.title": "Prêt à équiper votre entreprise ?",
  "cta.subtitle": "Demandez votre devis personnalisé en quelques clics",
  "cta.button": "Demander un devis gratuit",

  // Footer
  "footer.company": "Entreprise",
  "footer.products": "Produits",
  "footer.support": "Support",
  "footer.legal": "Légal",
  "footer.description": "Ekwip, votre partenaire pour la location d'équipements informatiques professionnels au Maroc.",

  // Common
  "common.loading": "Chargement...",
  "common.error": "Une erreur est survenue",
  "common.try-again": "Réessayer",
  "common.contact-us": "Nous contacter",
  "common.learn-more": "En savoir plus",
  "common.get-quote": "Demander un devis",
  "common.view-details": "Voir les détails",
  "common.add-to-cart": "Ajouter au panier",
  "common.month": "mois",
  "common.from": "À partir de",
  "common.per-month": "/mois",

  // Product details
  "product.specifications": "Caractéristiques",
  "product.included": "Inclus",
  "product.duration": "Durée",
  "product.monthly-price": "Prix mensuel",
  "product.first-month": "Premier mois",
  "product.popular": "Populaire",
  "product.new": "Nouveau",

  // Contact
  "contact.title": "Contactez-nous",
  "contact.subtitle": "Notre équipe est là pour vous accompagner",
  "contact.form.name": "Nom complet",
  "contact.form.email": "Email",
  "contact.form.company": "Entreprise",
  "contact.form.message": "Message",
  "contact.form.send": "Envoyer le message",
  "contact.success": "Message envoyé avec succès",
  "contact.error": "Erreur lors de l'envoi du message",
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
