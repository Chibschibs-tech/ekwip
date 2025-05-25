"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define available languages
export type Language = "fr" | "en"

// Define context type
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  t: (key) => key,
})

// Translations
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

    // Home page
    "home.hero.title": "Équipez-vous, sans ruiner votre trésorerie!",
    "home.hero.description":
      "Optez pour la location et accédez aux meilleures technologies avec une solution flexible et sans engagement lourd.",
    "home.hero.button1": "Découvrir nos offres",
    "home.hero.button2": "Comment ça marche",

    // Feature cards
    "home.features.card1.title": "Préservez votre trésorerie",
    "home.features.card1.description": "Louez votre matériel sans immobiliser votre capital et maîtrisez vos coûts IT.",
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

    // Client Portal
    "portal.title": "Portail Client",
    "portal.welcome": "Bienvenue dans votre espace client",
    "portal.dashboard": "Tableau de bord",
    "portal.orders": "Commandes",
    "portal.equipment": "Équipements",
    "portal.users": "Utilisateurs",
    "portal.billing": "Facturation",
    "portal.tickets": "Support",
    "portal.settings": "Paramètres",
    "portal.logout": "Déconnexion",

    "portal.dashboard.title": "Tableau de bord",
    "portal.dashboard.welcome": "Bienvenue, ",
    "portal.dashboard.summary": "Résumé de votre compte",
    "portal.dashboard.active_rentals": "Locations actives",
    "portal.dashboard.pending_orders": "Commandes en attente",
    "portal.dashboard.open_tickets": "Tickets ouverts",
    "portal.dashboard.upcoming_renewals": "Renouvellements à venir",
    "portal.dashboard.recent_activity": "Activité récente",
    "portal.dashboard.view_all": "Voir tout",

    "portal.orders.title": "Gestion des commandes",
    "portal.orders.all": "Toutes les commandes",
    "portal.orders.pending": "En attente",
    "portal.orders.processing": "En traitement",
    "portal.orders.completed": "Complétées",
    "portal.orders.cancelled": "Annulées",
    "portal.orders.search": "Rechercher une commande",
    "portal.orders.order_number": "N° de commande",
    "portal.orders.date": "Date",
    "portal.orders.status": "Statut",
    "portal.orders.total": "Total",
    "portal.orders.items": "Articles",
    "portal.orders.actions": "Actions",
    "portal.orders.view": "Voir",
    "portal.orders.no_orders": "Aucune commande trouvée",

    "portal.equipment.title": "Gestion des équipements",
    "portal.equipment.all": "Tous les équipements",
    "portal.equipment.active": "Actifs",
    "portal.equipment.expired": "Expirés",
    "portal.equipment.search": "Rechercher un équipement",
    "portal.equipment.name": "Nom",
    "portal.equipment.type": "Type",
    "portal.equipment.serial": "N° de série",
    "portal.equipment.start_date": "Date de début",
    "portal.equipment.end_date": "Date de fin",
    "portal.equipment.assigned_to": "Assigné à",
    "portal.equipment.status": "Statut",
    "portal.equipment.actions": "Actions",
    "portal.equipment.assign": "Assigner",
    "portal.equipment.view_details": "Voir détails",
    "portal.equipment.no_equipment": "Aucun équipement trouvé",
    "portal.equipment.days_remaining": "jours restants",
    "portal.equipment.expired": "Expiré",

    "portal.users.title": "Gestion des utilisateurs",
    "portal.users.all": "Tous les utilisateurs",
    "portal.users.active": "Actifs",
    "portal.users.inactive": "Inactifs",
    "portal.users.search": "Rechercher un utilisateur",
    "portal.users.add": "Ajouter un utilisateur",
    "portal.users.name": "Nom",
    "portal.users.email": "Email",
    "portal.users.role": "Rôle",
    "portal.users.department": "Département",
    "portal.users.equipment": "Équipements",
    "portal.users.status": "Statut",
    "portal.users.actions": "Actions",
    "portal.users.edit": "Modifier",
    "portal.users.delete": "Supprimer",
    "portal.users.no_users": "Aucun utilisateur trouvé",

    "portal.billing.title": "Historique de facturation",
    "portal.billing.all": "Toutes les factures",
    "portal.billing.paid": "Payées",
    "portal.billing.unpaid": "Non payées",
    "portal.billing.search": "Rechercher une facture",
    "portal.billing.invoice_number": "N° de facture",
    "portal.billing.date": "Date",
    "portal.billing.due_date": "Date d'échéance",
    "portal.billing.amount": "Montant",
    "portal.billing.status": "Statut",
    "portal.billing.actions": "Actions",
    "portal.billing.download": "Télécharger",
    "portal.billing.pay": "Payer",
    "portal.billing.no_invoices": "Aucune facture trouvée",

    "portal.tickets.title": "Support technique",
    "portal.tickets.all": "Tous les tickets",
    "portal.tickets.open": "Ouverts",
    "portal.tickets.closed": "Fermés",
    "portal.tickets.search": "Rechercher un ticket",
    "portal.tickets.create": "Créer un ticket",
    "portal.tickets.ticket_number": "N° de ticket",
    "portal.tickets.subject": "Sujet",
    "portal.tickets.equipment": "Équipement",
    "portal.tickets.date": "Date",
    "portal.tickets.status": "Statut",
    "portal.tickets.priority": "Priorité",
    "portal.tickets.actions": "Actions",
    "portal.tickets.view": "Voir",
    "portal.tickets.no_tickets": "Aucun ticket trouvé",

    // Footer
    "footer.description":
      "Location d'équipement IT flexible et sans engagement pour les entreprises au Maroc. Préservez votre trésorerie et accédez aux dernières technologies.",
    "footer.services": "Services",
    "footer.newsletter": "Newsletter",
    "footer.newsletter.description": "Inscrivez-vous pour recevoir nos actualités et offres spéciales",
    "footer.newsletter.placeholder": "Votre email",
    "footer.copyright": "Tous droits réservés.",
    "footer.legal": "Mentions légales",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "CGV",
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

    // Home page
    "home.hero.title": "Equip yourself, without draining your treasury!",
    "home.hero.description":
      "Choose rental and access the best technologies with a flexible solution and no heavy commitment.",
    "home.hero.button1": "Discover our offers",
    "home.hero.button2": "How it works",

    // Feature cards
    "home.features.card1.title": "Preserve your cash flow",
    "home.features.card1.description": "Rent your equipment without tying up your capital and control your IT costs.",
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

    // Client Portal
    "portal.title": "Client Portal",
    "portal.welcome": "Welcome to your client portal",
    "portal.dashboard": "Dashboard",
    "portal.orders": "Orders",
    "portal.equipment": "Equipment",
    "portal.users": "Users",
    "portal.billing": "Billing",
    "portal.tickets": "Support",
    "portal.settings": "Settings",
    "portal.logout": "Logout",

    "portal.dashboard.title": "Dashboard",
    "portal.dashboard.welcome": "Welcome, ",
    "portal.dashboard.summary": "Account Summary",
    "portal.dashboard.active_rentals": "Active Rentals",
    "portal.dashboard.pending_orders": "Pending Orders",
    "portal.dashboard.open_tickets": "Open Tickets",
    "portal.dashboard.upcoming_renewals": "Upcoming Renewals",
    "portal.dashboard.recent_activity": "Recent Activity",
    "portal.dashboard.view_all": "View All",

    "portal.orders.title": "Order Management",
    "portal.orders.all": "All Orders",
    "portal.orders.pending": "Pending",
    "portal.orders.processing": "Processing",
    "portal.orders.completed": "Completed",
    "portal.orders.cancelled": "Cancelled",
    "portal.orders.search": "Search orders",
    "portal.orders.order_number": "Order #",
    "portal.orders.date": "Date",
    "portal.orders.status": "Status",
    "portal.orders.total": "Total",
    "portal.orders.items": "Items",
    "portal.orders.actions": "Actions",
    "portal.orders.view": "View",
    "portal.orders.no_orders": "No orders found",

    "portal.equipment.title": "Equipment Management",
    "portal.equipment.all": "All Equipment",
    "portal.equipment.active": "Active",
    "portal.equipment.expired": "Expired",
    "portal.equipment.search": "Search equipment",
    "portal.equipment.name": "Name",
    "portal.equipment.type": "Type",
    "portal.equipment.serial": "Serial #",
    "portal.equipment.start_date": "Start Date",
    "portal.equipment.end_date": "End Date",
    "portal.equipment.assigned_to": "Assigned To",
    "portal.equipment.status": "Status",
    "portal.equipment.actions": "Actions",
    "portal.equipment.assign": "Assign",
    "portal.equipment.view_details": "View Details",
    "portal.equipment.no_equipment": "No equipment found",
    "portal.equipment.days_remaining": "days remaining",
    "portal.equipment.expired": "Expired",

    "portal.users.title": "User Management",
    "portal.users.all": "All Users",
    "portal.users.active": "Active",
    "portal.users.inactive": "Inactive",
    "portal.users.search": "Search users",
    "portal.users.add": "Add User",
    "portal.users.name": "Name",
    "portal.users.email": "Email",
    "portal.users.role": "Role",
    "portal.users.department": "Department",
    "portal.users.equipment": "Equipment",
    "portal.users.status": "Status",
    "portal.users.actions": "Actions",
    "portal.users.edit": "Edit",
    "portal.users.delete": "Delete",
    "portal.users.no_users": "No users found",

    "portal.billing.title": "Billing History",
    "portal.billing.all": "All Invoices",
    "portal.billing.paid": "Paid",
    "portal.billing.unpaid": "Unpaid",
    "portal.billing.search": "Search invoices",
    "portal.billing.invoice_number": "Invoice #",
    "portal.billing.date": "Date",
    "portal.billing.due_date": "Due Date",
    "portal.billing.amount": "Amount",
    "portal.billing.status": "Status",
    "portal.billing.actions": "Actions",
    "portal.billing.download": "Download",
    "portal.billing.pay": "Pay",
    "portal.billing.no_invoices": "No invoices found",

    "portal.tickets.title": "Technical Support",
    "portal.tickets.all": "All Tickets",
    "portal.tickets.open": "Open",
    "portal.tickets.closed": "Closed",
    "portal.tickets.search": "Search tickets",
    "portal.tickets.create": "Create Ticket",
    "portal.tickets.ticket_number": "Ticket #",
    "portal.tickets.subject": "Subject",
    "portal.tickets.equipment": "Equipment",
    "portal.tickets.date": "Date",
    "portal.tickets.status": "Status",
    "portal.tickets.priority": "Priority",
    "portal.tickets.actions": "Actions",
    "portal.tickets.view": "View",
    "portal.tickets.no_tickets": "No tickets found",

    // Footer
    "footer.description":
      "Flexible IT equipment rental without commitment for companies in Morocco. Preserve your cash flow and access the latest technologies.",
    "footer.services": "Services",
    "footer.newsletter": "Newsletter",
    "footer.newsletter.description": "Sign up to receive our news and special offers",
    "footer.newsletter.placeholder": "Your email",
    "footer.copyright": "All rights reserved.",
    "footer.legal": "Legal notice",
    "footer.privacy": "Privacy policy",
    "footer.terms": "Terms and conditions",
  },
}

// Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Get initial language from localStorage or default to French
  const [language, setLanguageState] = useState<Language>("fr")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  return useContext(LanguageContext)
}
