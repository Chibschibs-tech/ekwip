"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "fr" | "en" | "es"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  t: (key) => key,
})

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.how_it_works": "Comment ça marche",
    "nav.catalog": "Catalogue",
    "nav.store": "Boutique",
    "nav.contact": "Contact",
    "nav.client_portal": "Portail client",
    "nav.customer_portal": "Portail client",
    "nav.customer_portal_description": "Réservé aux clients ayant du matériel en location",
    "nav.blog": "Blog",

    // Home page
    "home.hero.title": "Équipez-vous, sans ruiner votre trésorerie!",
    "home.hero.description":
      "Optez pour la location et accédez aux meilleures technologies avec une solution flexible et sans engagement lourd.",
    "home.hero.button1": "Découvrir nos offres",
    "home.hero.button2": "Comment ça marche",

    // Feature cards
    "home.features.card1.title": "Préservez votre trésorerie",
    "home.features.card1.description":
      "Transformez vos dépenses d'investissement en coûts opérationnels prévisibles avec des mensualités fixes.",
    "home.features.card2.title": "Pilotez votre flotte IT",
    "home.features.card2.description": "Gérez et optimisez tout votre parc informatique depuis une interface unique.",
    "home.features.card3.title": "Upgradez à tout moment",
    "home.features.card3.description": "Échangez ou upgradez votre équipement selon vos besoins, sans contrainte.",
    "home.features.card4.title": "Support et maintenance inclus",
    "home.features.card4.description": "Assistance technique et remplacement rapide en cas de problème.",

    // Catalog section
    "home.products.title": "Découvrez notre catalogue d'équipements en location",
    "home.products.description":
      "Laptops, tablettes, smartphones et bien plus, disponibles en location pour accompagner votre activité. Que vous ayez besoin d'un ordinateur puissant pour le travail, d'une tablette pour la mobilité ou d'un smartphone dernier cri, nous avons l'équipement adapté à vos besoins.",
    "home.products.button": "Voir tout le catalogue",

    // Clients section
    "home.clients.title": "Ils nous font confiance",
    "home.clients.description": "Rejoignez les entreprises qui ont choisi Ekwip pour leur équipement IT",

    // How it works section
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
    "home.howItWorks.button": "En savoir plus",

    // Custom offer banner
    "home.offerBanner.title": "Plus de 10 collaborateurs?",
    "home.offerBanner.description":
      "Contactez-nous pour étudier ensemble votre besoin et obtenir une offre sur-mesure.",
    "home.offerBanner.button": "Contactez-nous",

    // Testimonials section
    "home.testimonials.title": "Ce que nos clients disent",
    "home.testimonials.description":
      "Découvrez les témoignages de nos clients satisfaits qui ont transformé leur gestion IT grâce à nos solutions de location.",

    // CTA section
    "home.cta.title": "Prêt à équiper votre entreprise?",
    "home.cta.description":
      "Contactez-nous dès aujourd'hui pour obtenir un devis personnalisé et découvrir comment Ekwip peut vous aider.",
    "home.cta.button": "Contactez-nous",

    // Enterprise section
    "home.enterprise.title": "Solutions pour entreprises",
    "home.enterprise.description":
      "Ekwip propose des solutions de location d'équipement IT adaptées aux besoins spécifiques des moyennes et grandes entreprises. Nos experts vous accompagnent dans la définition de votre parc informatique et vous proposent des solutions sur mesure.",
    "home.enterprise.feature1": "Gestion de parc informatique complète",
    "home.enterprise.feature2": "Tarifs dégressifs selon le volume",
    "home.enterprise.feature3": "Support technique dédié",
    "home.enterprise.feature4": "Portail client personnalisé",
    "home.enterprise.cta_title": "Prêt à équiper votre entreprise?",
    "home.enterprise.cta_description":
      "Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.",
    "home.enterprise.cta_button1": "Demander un devis personnalisé",
    "home.enterprise.cta_button2": "Nous contacter",

    // Common
    "common.discover": "Découvrir",
    "common.popular": "Populaire",
    "common.new": "Nouveau",
    "common.products": "produits",
    "common.product": "produit",
    "common.month": "mois",
    "common.start": "Démarrer",
    "common.get_quote": "Obtenir un devis",
    "common.contact_us": "Contactez-nous",
    "common.learn_more": "En savoir plus",
    "common.view_details": "Voir détails",
    "common.from": "À partir de",
    "common.per_month": "par mois",
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
  },
  en: {
    // Navigation
    "nav.how_it_works": "How it works",
    "nav.catalog": "Catalog",
    "nav.store": "Store",
    "nav.contact": "Contact",
    "nav.client_portal": "Client Portal",
    "nav.customer_portal": "Client Portal",
    "nav.customer_portal_description": "Reserved for customers with rented equipment",
    "nav.blog": "Blog",

    // Home page
    "home.hero.title": "Equip yourself, without draining your treasury!",
    "home.hero.description":
      "Choose rental and access the best technologies with a flexible solution and no heavy commitment.",
    "home.hero.button1": "Discover our offers",
    "home.hero.button2": "How it works",

    // Feature cards
    "home.features.card1.title": "Preserve your cash flow",
    "home.features.card1.description":
      "Transform your investment expenses into predictable operating costs with fixed monthly payments.",
    "home.features.card2.title": "Manage your IT fleet",
    "home.features.card2.description": "Manage and optimize your entire IT infrastructure from a single interface.",
    "home.features.card3.title": "Upgrade anytime",
    "home.features.card3.description":
      "Exchange or upgrade your equipment according to your needs, without constraints.",
    "home.features.card4.title": "Support and maintenance included",
    "home.features.card4.description": "Technical assistance and quick replacement in case of problems.",

    // Catalog section
    "home.products.title": "Discover our rental equipment catalog",
    "home.products.description":
      "Laptops, tablets, smartphones and more, available for rent to support your business. Whether you need a powerful computer for work, a tablet for mobility, or a cutting-edge smartphone, we have the equipment to meet your needs.",
    "home.products.button": "View the entire catalog",

    // Clients section
    "home.clients.title": "They trust us",
    "home.clients.description": "Join the companies that have chosen Ekwip for their IT equipment",

    // How it works section
    "home.howItWorks.title": "How it works",
    "home.howItWorks.description": "A simple and transparent process to equip your company",
    "home.howItWorks.step1.title": "Choose your equipment",
    "home.howItWorks.step1.description": "Browse our catalog and select the equipment that suits your needs.",
    "home.howItWorks.step2.title": "Define your duration",
    "home.howItWorks.step2.description":
      "Choose the rental duration that suits you, from 1 to 36 months depending on your projects.",
    "home.howItWorks.step3.title": "Receive and use",
    "home.howItWorks.step3.description":
      "We deliver and install your equipment. Enjoy technical support throughout the duration.",
    "home.howItWorks.button": "Learn more",

    // Custom offer banner
    "home.offerBanner.title": "More than 10 employees?",
    "home.offerBanner.description": "Contact us to discuss your needs together and get a customized offer.",
    "home.offerBanner.button": "Contact us",

    // Testimonials section
    "home.testimonials.title": "What our customers say",
    "home.testimonials.description":
      "Discover testimonials from our satisfied customers who have transformed their IT management thanks to our rental solutions.",

    // CTA section
    "home.cta.title": "Ready to equip your company?",
    "home.cta.description": "Contact us today to get a personalized quote and discover how Ekwip can help you.",
    "home.cta.button": "Contact us",

    // Enterprise section
    "home.enterprise.title": "Enterprise solutions",
    "home.enterprise.description":
      "Ekwip offers IT equipment rental solutions adapted to the specific needs of medium and large enterprises. Our experts support you in defining your IT infrastructure and offer you customized solutions.",
    "home.enterprise.feature1": "Complete IT fleet management",
    "home.enterprise.feature2": "Volume-based pricing",
    "home.enterprise.feature3": "Dedicated technical support",
    "home.enterprise.feature4": "Personalized client portal",
    "home.enterprise.cta_title": "Ready to equip your company?",
    "home.enterprise.cta_description": "Contact us today to discuss your needs and get a personalized quote.",
    "home.enterprise.cta_button1": "Request a personalized quote",
    "home.enterprise.cta_button2": "Contact us",

    // Common
    "common.discover": "Discover",
    "common.popular": "Popular",
    "common.new": "New",
    "common.products": "products",
    "common.product": "product",
    "common.month": "month",
    "common.start": "Start",
    "common.get_quote": "Get quote",
    "common.contact_us": "Contact us",
    "common.learn_more": "Learn more",
    "common.view_details": "View details",
    "common.from": "From",
    "common.per_month": "per month",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
  },
  es: {
    // Navigation
    "nav.how_it_works": "Cómo funciona",
    "nav.catalog": "Catálogo",
    "nav.store": "Tienda",
    "nav.contact": "Contacto",
    "nav.client_portal": "Portal del cliente",
    "nav.customer_portal": "Portal del cliente",
    "nav.customer_portal_description": "Reservado para clientes con equipos en alquiler",
    "nav.blog": "Blog",

    // Home page
    "home.hero.title": "¡Equípate, sin arruinar tu tesorería!",
    "home.hero.description":
      "Opta por el alquiler y accede a las mejores tecnologías con una solución flexible y sin compromiso pesado.",
    "home.hero.button1": "Descubrir nuestras ofertas",
    "home.hero.button2": "Cómo funciona",

    // Feature cards
    "home.features.card1.title": "Preserva tu tesorería",
    "home.features.card1.description":
      "Transforma tus gastos de inversión en costos operativos predecibles con pagos mensuales fijos.",
    "home.features.card2.title": "Gestiona tu flota IT",
    "home.features.card2.description": "Gestiona y optimiza toda tu infraestructura IT desde una interfaz única.",
    "home.features.card3.title": "Actualiza en cualquier momento",
    "home.features.card3.description": "Intercambia o actualiza tu equipo según tus necesidades, sin restricciones.",
    "home.features.card4.title": "Soporte y mantenimiento incluidos",
    "home.features.card4.description": "Asistencia técnica y reemplazo rápido en caso de problemas.",

    // Catalog section
    "home.products.title": "Descubre nuestro catálogo de equipos en alquiler",
    "home.products.description":
      "Laptops, tabletas, smartphones y mucho más, disponibles en alquiler para acompañar tu actividad. Ya sea que necesites una computadora potente para el trabajo, una tableta para la movilidad o un smartphone de última generación, tenemos el equipo adaptado a tus necesidades.",
    "home.products.button": "Ver todo el catálogo",

    // Clients section
    "home.clients.title": "Confían en nosotros",
    "home.clients.description": "Únete a las empresas que han elegido Ekwip para su equipo IT",

    // How it works section
    "home.howItWorks.title": "Cómo funciona",
    "home.howItWorks.description": "Un proceso simple y transparente para equipar tu empresa",
    "home.howItWorks.step1.title": "Elige tu equipo",
    "home.howItWorks.step1.description":
      "Navega por nuestro catálogo y selecciona los equipos adaptados a tus necesidades.",
    "home.howItWorks.step2.title": "Define tu duración",
    "home.howItWorks.step2.description":
      "Elige la duración de alquiler que te convenga, de 1 a 36 meses según tus proyectos.",
    "home.howItWorks.step3.title": "Recibe y utiliza",
    "home.howItWorks.step3.description":
      "Entregamos e instalamos tu equipo. Disfruta de soporte técnico durante toda la duración.",
    "home.howItWorks.button": "Saber más",

    // Custom offer banner
    "home.offerBanner.title": "¿Más de 10 colaboradores?",
    "home.offerBanner.description": "Contáctanos para estudiar juntos tu necesidad y obtener una oferta a medida.",
    "home.offerBanner.button": "Contáctanos",

    // Testimonials section
    "home.testimonials.title": "Lo que dicen nuestros clientes",
    "home.testimonials.description":
      "Descubre los testimonios de nuestros clientes satisfechos que han transformado su gestión IT gracias a nuestras soluciones de alquiler.",

    // CTA section
    "home.cta.title": "¿Listo para equipar tu empresa?",
    "home.cta.description":
      "Contáctanos hoy para obtener un presupuesto personalizado y descubrir cómo Ekwip puede ayudarte.",
    "home.cta.button": "Contáctanos",

    // Enterprise section
    "home.enterprise.title": "Soluciones para empresas",
    "home.enterprise.description":
      "Ekwip ofrece soluciones de alquiler de equipos IT adaptadas a las necesidades específicas de medianas y grandes empresas. Nuestros expertos te acompañan en la definición de tu infraestructura IT y te proponen soluciones a medida.",
    "home.enterprise.feature1": "Gestión completa de flota IT",
    "home.enterprise.feature2": "Precios según volumen",
    "home.enterprise.feature3": "Soporte técnico dedicado",
    "home.enterprise.feature4": "Portal cliente personalizado",
    "home.enterprise.cta_title": "¿Listo para equipar tu empresa?",
    "home.enterprise.cta_description":
      "Contáctanos hoy para discutir tus necesidades y obtener un presupuesto personalizado.",
    "home.enterprise.cta_button1": "Solicitar presupuesto personalizado",
    "home.enterprise.cta_button2": "Contáctanos",

    // Common
    "common.discover": "Descubrir",
    "common.popular": "Popular",
    "common.new": "Nuevo",
    "common.products": "productos",
    "common.product": "producto",
    "common.month": "mes",
    "common.start": "Comenzar",
    "common.get_quote": "Obtener presupuesto",
    "common.contact_us": "Contáctanos",
    "common.learn_more": "Saber más",
    "common.view_details": "Ver detalles",
    "common.from": "Desde",
    "common.per_month": "por mes",
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en" || savedLanguage === "es")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
