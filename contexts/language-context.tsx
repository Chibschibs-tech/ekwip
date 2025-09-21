"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "fr" | "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Flattened translations object for direct lookup
const translations = {
  // Navigation
  "nav.home": "Accueil",
  "nav.catalog": "Catalogue",
  "nav.howItWorks": "Comment ça marche",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  "nav.clientPortal": "Portail Client",
  "nav.myNeeds": "Ma liste de besoins",

  // Hero section
  "hero.title": "Location d'équipements informatiques pour entreprises",
  "hero.subtitle":
    "Louez vos équipements IT services inclus. Flexibilité, performance et tranquillité d'esprit pour votre entreprise.",
  "hero.cta_primary": "Découvrir le catalogue",
  "hero.cta_secondary": "Comment ça marche",

  // Categories section
  "categories.title": "Notre catalogue d'équipements",
  "categories.subtitle": "Découvrez notre gamme complète d'équipements informatiques professionnels",

  // Features section
  "features.title": "Pourquoi choisir Ekwip ?",
  "features.subtitle": "Des solutions flexibles pour équiper votre entreprise sans contrainte",
  "features.flexibility.title": "Préservez votre trésorerie",
  "features.flexibility.desc":
    "Transformez vos dépenses d'investissement en coûts opérationnels prévisibles avec des mensualités fixes.",
  "features.maintenance.title": "Support et maintenance inclus",
  "features.maintenance.desc": "Assistance technique et remplacement rapide en cas de problème.",
  "features.upgrade.title": "Upgradez à tout moment",
  "features.upgrade.desc": "Échangez ou upgradez votre équipement selon vos besoins, sans contrainte.",
  "features.support.title": "Pilotez votre flotte IT",
  "features.support.desc": "Gérez et optimisez tout votre parc informatique depuis une interface unique.",

  // How it works section
  "how_it_works.title": "Comment ça marche",
  "how_it_works.subtitle": "Un processus simple et transparent pour équiper votre entreprise",
  "how_it_works.step1.title": "Choisissez votre équipement",
  "how_it_works.step1.desc": "Parcourez notre catalogue et sélectionnez les équipements adaptés à vos besoins.",
  "how_it_works.step2.title": "Définissez votre durée",
  "how_it_works.step2.desc": "Choisissez la durée de location qui vous convient, de 1 à 36 mois selon vos projets.",
  "how_it_works.step3.title": "Recevez et utilisez",
  "how_it_works.step3.desc":
    "Nous livrons et installons votre équipement. Profitez d'un support technique pendant toute la durée.",
  "how_it_works.step4.title": "Retournez ou renouvelez",
  "how_it_works.step4.desc": "En fin de contrat, retournez l'équipement ou renouvelez avec du matériel plus récent.",

  // Products section
  "products.title": "Nos équipements populaires",
  "products.subtitle": "Découvrez une sélection de nos équipements les plus demandés",
  "products.view_all": "Voir tout le catalogue",

  // Catalogue
  "catalogue.title": "Notre catalogue",
  "catalogue.subtitle": "Découvrez tous nos équipements professionnels disponibles en location",
  "catalogue.search_placeholder": "Rechercher un équipement...",
  "catalogue.filter_by_category": "Filtrer par catégorie",
  "catalogue.all_categories": "Toutes les catégories",
  "catalogue.sort_by": "Trier par",
  "catalogue.sort.popularity": "Popularité",
  "catalogue.sort.price_asc": "Prix croissant",
  "catalogue.sort.price_desc": "Prix décroissant",
  "catalogue.sort.newest": "Plus récents",
  "catalogue.no_products": "Aucun produit trouvé",
  "catalogue.no_products_description": "Essayez de modifier vos critères de recherche",

  // Category pages
  "category.breadcrumb.home": "Accueil",
  "category.breadcrumb.catalog": "Catalogue",
  "category.back_to_catalog": "Retour au catalogue",
  "category.product_available": "produit disponible",
  "category.products_available": "produits disponibles",
  "category.find_equipment": "Trouvez l'équipement parfait pour vos besoins professionnels.",
  "category.sort_by": "Trier par :",
  "category.sort.popularity": "Popularité",
  "category.sort.price_asc": "Prix croissant",
  "category.sort.price_desc": "Prix décroissant",
  "category.sort.newest": "Plus récents",
  "category.no_products": "Aucun produit trouvé",
  "category.no_products_description": "Aucun produit ne correspond à vos critères de recherche.",
  "category.why_rent_title": "Pourquoi louer vos {category} ?",
  "category.why_rent_description": "La location vous offre flexibilité, économies et tranquillité d'esprit.",
  "category.benefit1.title": "Économies garanties",
  "category.benefit1.description": "Réduisez vos coûts d'investissement et préservez votre trésorerie.",
  "category.benefit2.title": "Toujours à jour",
  "category.benefit2.description": "Bénéficiez des dernières technologies sans obsolescence.",
  "category.benefit3.title": "Support inclus",
  "category.benefit3.description": "Maintenance et support technique inclus dans votre contrat.",
  "category.cta.title": "Prêt à équiper votre entreprise ?",
  "category.cta.description": "Contactez-nous pour obtenir un devis personnalisé et découvrir nos solutions.",
  "category.cta.button1": "Demander un devis",
  "category.cta.button2": "Nous contacter",

  // Footer
  "footer.company": "Entreprise",
  "footer.about": "À propos",
  "footer.careers": "Carrières",
  "footer.press": "Presse",
  "footer.support": "Support",
  "footer.help": "Aide",
  "footer.contact": "Contact",
  "footer.faq": "FAQ",
  "footer.legal": "Légal",
  "footer.privacy": "Confidentialité",
  "footer.terms": "Conditions",
  "footer.cookies": "Cookies",
  "footer.follow": "Suivez-nous",
  "footer.newsletter": "Newsletter",
  "footer.newsletter_desc": "Restez informé de nos dernières offres",
  "footer.subscribe": "S'abonner",
  "footer.rights": "Tous droits réservés.",

  // Home page
  "home.hero.badge": "Nouveau",
  "home.hero.title": "Location d'équipements informatiques pour entreprises",
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

  "home.offerBanner.title": "Notre offre sur-mesure",
  "home.offerBanner.description": "Contactez-nous pour une solution adaptée à vos besoins spécifiques",
  "home.offerBanner.button": "Nous contacter",

  "home.finalCta.title": "Prêt à moderniser votre parc informatique ?",
  "home.finalCta.description":
    "Découvrez nos solutions de location flexibles et bénéficiez de l'expertise de nos équipes.",
  "home.finalCta.primary": "Découvrir le catalogue",
  "home.finalCta.secondary": "Parler à un expert",

  // Common
  "common.loading": "Chargement...",
  "common.error": "Une erreur est survenue",
  "common.retry": "Réessayer",
  "common.cancel": "Annuler",
  "common.save": "Enregistrer",
  "common.delete": "Supprimer",
  "common.edit": "Modifier",
  "common.view": "Voir",
  "common.back": "Retour",
  "common.next": "Suivant",
  "common.previous": "Précédent",
  "common.search": "Rechercher",
  "common.filter": "Filtrer",
  "common.sort": "Trier",
  "common.price": "Prix",
  "common.duration": "Durée",
  "common.category": "Catégorie",
  "common.features": "Caractéristiques",
  "common.specifications": "Spécifications",
  "common.addToCart": "Ajouter au panier",
  "common.requestQuote": "Demander un devis",
  "common.contactUs": "Nous contacter",
  "common.learnMore": "En savoir plus",
  "common.readMore": "Lire la suite",
  "common.showMore": "Voir plus",
  "common.showLess": "Voir moins",
}

const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("fr")

  // Simple translation function with fallback
  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations]
    if (translation) {
      return translation
    }

    // Fallback: return the key itself if translation not found
    console.warn(`Translation missing for key: ${key}`)
    return key
  }

  const value = {
    language,
    setLanguage,
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export { LanguageProvider }
