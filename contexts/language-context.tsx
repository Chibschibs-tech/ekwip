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
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.catalog": "Catalogue",
    "nav.how_it_works": "Comment ça marche",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.client_portal": "Portail Client",
    "nav.my_needs_list": "Ma liste de besoins",

    // Homepage
    "hero.title": "Location d'équipements informatiques professionnels",
    "hero.subtitle":
      "Louez vos équipements IT dernière génération avec Ekwip. Flexibilité, maintenance incluse et renouvellement garanti.",
    "hero.cta": "Découvrir notre catalogue",
    "hero.secondary_cta": "Comment ça marche",

    // Features
    "features.title": "Pourquoi choisir Ekwip ?",
    "features.cash_flow.title": "Préservez votre trésorerie",
    "features.cash_flow.description":
      "Évitez les gros investissements et gardez votre capital pour développer votre activité.",
    "features.fleet.title": "Gestion de parc simplifiée",
    "features.fleet.description":
      "Nous nous occupons de la maintenance, des mises à jour et du renouvellement de vos équipements.",
    "features.support.title": "Support technique inclus",
    "features.support.description": "Bénéficiez d'un support technique réactif et d'une assistance dédiée.",
    "features.upgrade.title": "Évolution technologique",
    "features.upgrade.description": "Restez à la pointe avec des équipements toujours récents et performants.",

    // Products
    "products.title": "Notre catalogue d'équipements",
    "products.subtitle": "Découvrez notre sélection d'équipements informatiques professionnels",
    "products.view_all": "Voir tout le catalogue",
    "products.starting_from": "À partir de",
    "products.per_month": "/mois",
    "products.new": "Nouveau",
    "products.featured": "Populaire",

    // Categories
    "categories.laptops": "Ordinateurs portables",
    "categories.desktops": "Ordinateurs de bureau",
    "categories.smartphones": "Smartphones",
    "categories.tablets": "Tablettes",
    "categories.printers": "Imprimantes",
    "categories.accessories": "Accessoires",

    // How it works
    how_it_works: "Comment ça marche",
    "how_it_works.title": "Comment ça marche",
    "how_it_works.subtitle": "Un processus simple et transparent pour équiper votre entreprise",
    "how_it_works.step1.title": "1. Choisissez vos équipements",
    "how_it_works.step1.description":
      "Parcourez notre catalogue et sélectionnez les équipements adaptés à vos besoins.",
    "how_it_works.step2.title": "2. Configurez votre contrat",
    "how_it_works.step2.description":
      "Définissez la durée de location et les options de service selon vos préférences.",
    "how_it_works.step3.title": "3. Livraison et installation",
    "how_it_works.step3.description": "Nous livrons et installons vos équipements directement dans vos locaux.",
    "how_it_works.step4.title": "4. Support et maintenance",
    "how_it_works.step4.description":
      "Profitez de notre support technique et de la maintenance incluse pendant toute la durée du contrat.",

    // Testimonials
    "testimonials.title": "Ce que disent nos clients",
    "testimonials.subtitle": "Découvrez les témoignages de nos clients satisfaits",

    // FAQ
    "faq.title": "Questions fréquentes",
    "faq.subtitle": "Trouvez les réponses aux questions les plus courantes",
    "faq.q1": "Quelle est la durée minimale de location ?",
    "faq.a1": "La durée minimale de location est de 12 mois pour la plupart de nos équipements.",
    "faq.q2": "La maintenance est-elle incluse ?",
    "faq.a2": "Oui, la maintenance et le support technique sont inclus dans tous nos contrats de location.",
    "faq.q3": "Puis-je acheter l'équipement en fin de contrat ?",
    "faq.a3": "Oui, vous avez la possibilité d'acheter l'équipement à sa valeur résiduelle en fin de contrat.",
    "faq.q4": "Que se passe-t-il en cas de panne ?",
    "faq.a4": "Nous intervenons rapidement pour réparer ou remplacer l'équipement défaillant.",

    // Contact
    "contact.title": "Contactez-nous",
    "contact.description": "Une question ? Un projet ? Contactez notre équipe pour discuter de vos besoins.",
    "contact.info.title": "Informations de contact",
    "contact.info.description": "Nous sommes là pour vous accompagner dans votre projet.",
    "contact.info.address": "Casablanca, Maroc",
    "contact.info.phone": "+212 5XX XX XX XX",
    "contact.info.email": "contact@ekwip.ma",
    "contact.info.hours": "Lun-Ven: 9h-18h",
    "contact.form.title": "Envoyez-nous un message",
    "contact.form.description": "Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.",
    "contact.form.name": "Nom complet",
    "contact.form.email": "Email",
    "contact.form.phone": "Téléphone",
    "contact.form.company": "Entreprise",
    "contact.form.message": "Message",
    "contact.form.submit": "Envoyer le message",
    "contact.map.title": "Notre localisation",
    "contact.map.description": "Retrouvez-nous à Casablanca",

    // Blog
    "blog.title": "Blog",
    "blog.description": "Actualités, conseils et tendances du monde de l'IT",
    "blog.featured": "Article à la une",
    "blog.read_article": "Lire l'article",
    "blog.recent_posts": "Articles récents",
    "blog.categories": "Catégories",
    "blog.categories_list.treasury": "Gestion de trésorerie",
    "blog.categories_list.equipment": "Équipements IT",
    "blog.categories_list.optimization": "Optimisation",
    "blog.categories_list.trends": "Tendances",

    // Footer
    "footer.description":
      "Ekwip, votre partenaire pour la location d'équipements informatiques professionnels au Maroc.",
    "footer.services": "Services",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_description": "Restez informé de nos dernières offres et actualités.",
    "footer.newsletter_placeholder": "Votre email",
    "footer.rights": "Tous droits réservés.",
    "footer.legal_notice": "Mentions légales",
    "footer.privacy_policy": "Politique de confidentialité",
    "footer.terms": "Conditions générales",

    // Client Portal
    "portal.login": "Connexion",
    "portal.dashboard": "Tableau de bord",
    "portal.equipment": "Mes équipements",
    "portal.orders": "Mes commandes",
    "portal.billing": "Facturation",
    "portal.tickets": "Support",
    "portal.profile": "Profil",
    "portal.logout": "Déconnexion",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Une erreur est survenue",
    "common.retry": "Réessayer",
    "common.cancel": "Annuler",
    "common.save": "Enregistrer",
    "common.edit": "Modifier",
    "common.delete": "Supprimer",
    "common.view": "Voir",
    "common.download": "Télécharger",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.sort": "Trier",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.close": "Fermer",
    "common.open": "Ouvrir",
    "common.yes": "Oui",
    "common.no": "Non",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.catalog": "الكتالوج",
    "nav.how_it_works": "كيف يعمل",
    "nav.blog": "المدونة",
    "nav.contact": "اتصل بنا",
    "nav.client_portal": "بوابة العميل",
    "nav.my_needs_list": "قائمة احتياجاتي",

    // Homepage
    "hero.title": "تأجير المعدات الاحترافية لتكنولوجيا المعلومات",
    "hero.subtitle": "استأجر أحدث معدات تكنولوجيا المعلومات مع إكويب. مرونة وصيانة مشمولة وتجديد مضمون.",
    "hero.cta": "اكتشف كتالوجنا",
    "hero.secondary_cta": "كيف يعمل",

    // Add more Arabic translations as needed...
    "footer.description": "إكويب، شريكك في تأجير المعدات الاحترافية لتكنولوجيا المعلومات في المغرب.",
    "footer.services": "الخدمات",
    "footer.newsletter": "النشرة الإخبارية",
    "footer.newsletter_description": "ابق على اطلاع بأحدث عروضنا وأخبارنا.",
    "footer.newsletter_placeholder": "بريدك الإلكتروني",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.legal_notice": "الإشعار القانوني",
    "footer.privacy_policy": "سياسة الخصوصية",
    "footer.terms": "الشروط العامة",

    // Contact
    "contact.title": "اتصل بنا",
    "contact.description": "سؤال؟ مشروع؟ اتصل بفريقنا لمناقشة احتياجاتك.",
    "contact.info.title": "معلومات الاتصال",
    "contact.info.description": "نحن هنا لمساعدتك في مشروعك.",
    "contact.info.address": "الدار البيضاء، المغرب",
    "contact.info.phone": "+212 5XX XX XX XX",
    "contact.info.email": "contact@ekwip.ma",
    "contact.info.hours": "الإثنين-الجمعة: 9ص-6م",
    "contact.form.title": "أرسل لنا رسالة",
    "contact.form.description": "املأ النموذج أدناه وسنعاود الاتصال بك قريباً.",
    "contact.form.name": "الاسم الكامل",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.phone": "الهاتف",
    "contact.form.company": "الشركة",
    "contact.form.message": "الرسالة",
    "contact.form.submit": "إرسال الرسالة",
    "contact.map.title": "موقعنا",
    "contact.map.description": "تجدنا في الدار البيضاء",

    // Blog
    "blog.title": "المدونة",
    "blog.description": "أخبار ونصائح واتجاهات عالم تكنولوجيا المعلومات",
    "blog.featured": "المقال المميز",
    "blog.read_article": "اقرأ المقال",
    "blog.recent_posts": "المقالات الحديثة",
    "blog.categories": "الفئات",
    "blog.categories_list.treasury": "إدارة الخزينة",
    "blog.categories_list.equipment": "معدات تكنولوجيا المعلومات",
    "blog.categories_list.optimization": "التحسين",
    "blog.categories_list.trends": "الاتجاهات",

    how_it_works: "كيف يعمل",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.catalog": "Catalog",
    "nav.how_it_works": "How it works",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.client_portal": "Client Portal",
    "nav.my_needs_list": "My needs list",

    // Homepage
    "hero.title": "Professional IT Equipment Rental",
    "hero.subtitle":
      "Rent your latest generation IT equipment with Ekwip. Flexibility, maintenance included and guaranteed renewal.",
    "hero.cta": "Discover our catalog",
    "hero.secondary_cta": "How it works",

    // Add more English translations as needed...
    "footer.description": "Ekwip, your partner for professional IT equipment rental in Morocco.",
    "footer.services": "Services",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_description": "Stay informed about our latest offers and news.",
    "footer.newsletter_placeholder": "Your email",
    "footer.rights": "All rights reserved.",
    "footer.legal_notice": "Legal notice",
    "footer.privacy_policy": "Privacy policy",
    "footer.terms": "Terms and conditions",

    // Contact
    "contact.title": "Contact us",
    "contact.description": "A question? A project? Contact our team to discuss your needs.",
    "contact.info.title": "Contact information",
    "contact.info.description": "We are here to help you with your project.",
    "contact.info.address": "Casablanca, Morocco",
    "contact.info.phone": "+212 5XX XX XX XX",
    "contact.info.email": "contact@ekwip.ma",
    "contact.info.hours": "Mon-Fri: 9am-6pm",
    "contact.form.title": "Send us a message",
    "contact.form.description": "Fill out the form below and we will get back to you soon.",
    "contact.form.name": "Full name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.company": "Company",
    "contact.form.message": "Message",
    "contact.form.submit": "Send message",
    "contact.map.title": "Our location",
    "contact.map.description": "Find us in Casablanca",

    // Blog
    "blog.title": "Blog",
    "blog.description": "News, tips and trends from the IT world",
    "blog.featured": "Featured article",
    "blog.read_article": "Read article",
    "blog.recent_posts": "Recent posts",
    "blog.categories": "Categories",
    "blog.categories_list.treasury": "Treasury management",
    "blog.categories_list.equipment": "IT Equipment",
    "blog.categories_list.optimization": "Optimization",
    "blog.categories_list.trends": "Trends",

    how_it_works: "How it works",
  },
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

    // Update document direction for Arabic
    if (lang === "ar") {
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    } else {
      document.documentElement.dir = "ltr"
      document.documentElement.lang = lang
    }
  }

  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof (typeof translations)[typeof language]]
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`)
      return key
    }
    return translation
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
