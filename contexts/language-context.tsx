"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "fr" | "en" | "es"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Complete translations object with all required keys
const TRANSLATIONS: Record<Language, Record<string, string>> = {
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
    "nav.needs_list": "Ma liste",
    "nav.needs_list_description": "Équipements sélectionnés pour votre devis",

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

    // Contact page
    "contact.title": "Contactez-nous",
    "contact.description": "Notre équipe est à votre disposition pour répondre à toutes vos questions",
    "contact.info.title": "Informations de contact",
    "contact.info.description": "Plusieurs moyens de nous joindre selon vos préférences",
    "contact.info.address": "Adresse",
    "contact.info.phone": "Téléphone",
    "contact.info.email": "Email",
    "contact.info.hours": "Horaires d'ouverture",
    "contact.form.title": "Envoyez-nous un message",
    "contact.form.description": "Remplissez le formulaire ci-dessous et nous vous répondrons rapidement",
    "contact.form.name": "Nom complet",
    "contact.form.email": "Adresse email",
    "contact.form.phone": "Téléphone",
    "contact.form.company": "Entreprise",
    "contact.form.message": "Message",
    "contact.form.submit": "Envoyer le message",
    "contact.form.submitting": "Envoi en cours...",
    "contact.form.success": "Message envoyé avec succès!",
    "contact.form.success_description": "Nous vous répondrons dans les plus brefs délais",
    "contact.map.title": "Notre localisation",
    "contact.map.description": "Venez nous rendre visite dans nos bureaux",

    // Blog page
    "blog.title": "Blog Ekwip",
    "blog.description": "Actualités, conseils et tendances du monde IT",
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
      "Ekwip, votre partenaire pour la location d'équipements IT professionnels. Solutions flexibles et sur-mesure pour entreprises.",
    "footer.services": "Nos services",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_description": "Restez informé de nos dernières actualités et offres spéciales",
    "footer.newsletter_placeholder": "Votre adresse email",
    "footer.rights": "Tous droits réservés.",
    "footer.legal_notice": "Mentions légales",
    "footer.privacy_policy": "Politique de confidentialité",
    "footer.terms": "CGV",

    // How it works page
    how_it_works: "Comment ça marche",

    // Catalogue page
    "catalogue.title": "Notre catalogue d'équipements",
    "catalogue.description":
      "Découvrez notre large gamme d'équipements IT disponibles à la location pour répondre à tous vos besoins professionnels.",
    "catalogue.categories.title": "Explorez nos catégories",
    "catalogue.categories.description":
      "Trouvez rapidement l'équipement dont vous avez besoin grâce à notre organisation par catégories",
    "catalogue.all_products.title": "Tous nos équipements",
    "catalogue.all_products.description":
      "Parcourez l'intégralité de notre catalogue d'équipements disponibles à la location.",
    "catalogue.filters": "Filtres :",
    "catalogue.search_placeholder": "Rechercher un équipement...",
    "catalogue.all_categories": "Toutes catégories",
    "catalogue.all_brands": "Toutes marques",
    "catalogue.in_stock_only": "En stock uniquement",
    "catalogue.new_items": "Nouveautés",
    "catalogue.load_more": "Charger plus d'équipements",
    "catalogue.popular_products": "Produits populaires",
    "catalogue.popular_description": "Découvrez nos équipements les plus demandés par nos clients.",
    "catalogue.from": "À partir de",
    "catalogue.view_details": "Voir détails",
    "catalogue.view_all_products": "Voir tous les produits",
    "catalogue.partner_brands": "Nos marques partenaires",
    "catalogue.partner_brands_description":
      "Nous travaillons avec les meilleures marques pour vous offrir des équipements de qualité.",
    "catalogue.not_found_title": "Vous ne trouvez pas ce que vous cherchez ?",
    "catalogue.not_found_description":
      "Contactez-nous pour discuter de vos besoins spécifiques. Nous pouvons vous proposer des solutions sur mesure.",
    "catalogue.custom_quote": "Demander un devis personnalisé",
    "catalogue.talk_to_expert": "Parler à un expert",

    // Category pages
    "category.breadcrumb.home": "Accueil",
    "category.breadcrumb.catalog": "Catalogue",
    "category.products_available": "produits disponibles",
    "category.product_available": "produit disponible",
    "category.find_equipment": "Trouvez l'équipement idéal pour votre entreprise",
    "category.sort_by": "Trier par :",
    "category.sort.popularity": "Popularité",
    "category.sort.price_asc": "Prix croissant",
    "category.sort.price_desc": "Prix décroissant",
    "category.sort.newest": "Nouveautés",
    "category.no_products": "Aucun produit trouvé",
    "category.no_products_description": "Aucun produit n'est disponible dans cette catégorie pour le moment.",
    "category.back_to_catalog": "Retour au catalogue",
    "category.why_rent_title": "Pourquoi louer des {category} ?",
    "category.why_rent_description": "Découvrez les avantages de la location d'équipements pour votre entreprise",
    "category.benefit1.title": "Coûts prévisibles",
    "category.benefit1.description":
      "Transformez vos dépenses d'investissement en coûts opérationnels prévisibles avec des mensualités fixes.",
    "category.benefit2.title": "Équipements à jour",
    "category.benefit2.description":
      "Accédez aux dernières technologies sans investissement majeur et renouvelez régulièrement votre matériel.",
    "category.benefit3.title": "Service inclus",
    "category.benefit3.description":
      "Bénéficiez d'un support technique, d'une maintenance et d'un remplacement en cas de panne.",
    "category.cta.title": "Besoin d'une solution personnalisée ?",
    "category.cta.description":
      "Nos experts sont à votre disposition pour vous aider à trouver les équipements adaptés à vos besoins spécifiques.",
    "category.cta.button1": "Demander un devis personnalisé",
    "category.cta.button2": "Nous contacter",

    // Category specific titles and descriptions
    "category.laptops.title": "Ordinateurs portables disponibles à la location",
    "category.laptops.description":
      "Louez des ordinateurs portables de dernière génération pour votre entreprise. Nous proposons une large gamme de modèles adaptés à tous les besoins professionnels, avec service de maintenance inclus.",
    "category.desktops.title": "Ordinateurs de bureau disponibles à la location",
    "category.desktops.description":
      "Équipez votre entreprise avec des ordinateurs de bureau performants en location. Solutions flexibles et évolutives pour tous types d'entreprises, avec support technique inclus.",
    "category.smartphones.title": "Smartphones disponibles à la location",
    "category.smartphones.description":
      "Location de smartphones professionnels pour vos équipes. Forfaits data inclus, gestion de flotte simplifiée et renouvellement régulier des appareils.",
    "category.tablets.title": "Tablettes disponibles à la location",
    "category.tablets.description":
      "Louez des tablettes tactiles pour vos besoins professionnels. Idéal pour la mobilité, les présentations clients ou les points de vente. Plusieurs modèles disponibles.",
    "category.accessories.title": "Accessoires informatiques disponibles à la location",
    "category.accessories.description":
      "Complétez votre équipement informatique avec notre gamme d'accessoires en location. Écrans, claviers, souris, casques et autres périphériques pour optimiser votre productivité.",
    "category.printers.title": "Imprimantes disponibles à la location",
    "category.printers.description":
      "Solutions d'impression professionnelles en location. Imprimantes laser, multifonctions et grands formats avec service de maintenance et consommables inclus.",
    "category.furniture.title": "Mobilier de bureau disponible à la location",
    "category.furniture.description":
      "Aménagez vos espaces de travail avec notre mobilier de bureau ergonomique en location. Bureaux, chaises, armoires et solutions d'aménagement flexibles.",

    // Product pages
    "product.specifications": "Spécifications techniques",
    "product.related_products": "Produits similaires",
    "product.interested_title": "Intéressé par ce produit ?",
    "product.interested_description":
      "Contactez nos experts pour obtenir un devis personnalisé et découvrir comment ce produit peut répondre à vos besoins spécifiques.",
    "product.request_quote": "Demander un devis",
    "product.talk_to_expert": "Parler à un expert",
    "product.insurance_included": "Assurance incluse",
    "product.complete_protection": "Protection complète",
    "product.free_delivery": "Livraison gratuite",
    "product.installation_included": "Installation incluse",
    "product.support_24_7": "Support 24/7",
    "product.technical_assistance": "Assistance technique",
    "product.maintenance_included": "Maintenance incluse",
    "product.free_repairs": "Réparations gratuites",
    "product.available": "Disponible",
    "product.unavailable": "Indisponible",

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
    "cart.add_to_quote": "Ajouter au devis",
    "cart.added": "Ajouté",
    "cart.quantity": "Quantité",
    "cart.duration": "Durée",
    "cart.total": "Total",
    "cart.back_to_catalog": "Retour au catalogue",
    "cart.quote_request": "Demande de devis",
    "cart.quote_description": "Sélectionnez vos équipements et demandez un devis personnalisé",
    "cart.selected_equipment": "Équipements sélectionnés",
    "cart.empty_title": "Votre sélection est vide",
    "cart.empty_description": "Parcourez notre catalogue et ajoutez des équipements à votre devis",
    "cart.browse_catalog": "Parcourir le catalogue",
    "cart.clear_all": "Vider la sélection",
    "cart.quote_form_title": "Informations de contact",
    "cart.total_estimate": "Estimation totale",
    "cart.estimate_note": "Prix indicatif, devis détaillé sur demande",
    "cart.additional_message": "Message supplémentaire",
    "cart.message_placeholder": "Précisez vos besoins, contraintes ou questions...",
    "cart.quote_sent": "Demande envoyée !",
    "cart.quote_sent_description": "Nous vous recontacterons sous 24h avec un devis détaillé",
    "cart.sending_quote": "Envoi en cours...",
    "cart.send_quote_request": "Envoyer la demande de devis",
    "needs_list.add_to_list": "Ajouter à ma liste",
    "needs_list.added": "Ajouté",
    "needs_list.title": "Ma liste d'équipements",
    "needs_list.description": "Sélectionnez vos équipements et demandez un devis personnalisé",
    "needs_list.selected_equipment": "Équipements sélectionnés",
    "needs_list.empty_title": "Votre liste est vide",
    "needs_list.empty_description": "Parcourez notre catalogue et ajoutez des équipements à votre liste",
    "needs_list.browse_catalog": "Parcourir le catalogue",
    "needs_list.clear_all": "Vider la liste",
    "needs_list.quantity": "Quantité",
    "needs_list.duration": "Durée",
    "needs_list.quote_form_title": "Informations de contact",
    "needs_list.total_estimate": "Estimation totale",
    "needs_list.estimate_note": "Prix indicatif, devis détaillé sur demande",
    "needs_list.message_placeholder": "Précisez vos besoins, contraintes ou questions...",
    "needs_list.request_sent": "Demande envoyée !",
    "needs_list.request_sent_description": "Nous vous recontacterons sous 24h avec un devis détaillé",
    "needs_list.browse_more": "Continuer à parcourir",
    "needs_list.sending_request": "Envoi en cours...",
    "needs_list.send_request": "Envoyer la demande de devis",
    "needs_list.back_to_catalog": "Retour au catalogue",
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
    "nav.needs_list": "My List",
    "nav.needs_list_description": "Selected equipment for your quote",

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

    // Contact page
    "contact.title": "Contact us",
    "contact.description": "Our team is at your disposal to answer all your questions",
    "contact.info.title": "Contact information",
    "contact.info.description": "Several ways to reach us according to your preferences",
    "contact.info.address": "Address",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.hours": "Opening hours",
    "contact.form.title": "Send us a message",
    "contact.form.description": "Fill out the form below and we will respond quickly",
    "contact.form.name": "Full name",
    "contact.form.email": "Email address",
    "contact.form.phone": "Phone",
    "contact.form.company": "Company",
    "contact.form.message": "Message",
    "contact.form.submit": "Send message",
    "contact.form.submitting": "Sending...",
    "contact.form.success": "Message sent successfully!",
    "contact.form.success_description": "We will respond as soon as possible",
    "contact.map.title": "Our location",
    "contact.map.description": "Come visit us at our offices",

    // Blog page
    "blog.title": "Ekwip Blog",
    "blog.description": "News, tips and trends from the IT world",
    "blog.featured": "Featured article",
    "blog.read_article": "Read article",
    "blog.recent_posts": "Recent posts",
    "blog.categories": "Categories",
    "blog.categories_list.treasury": "Treasury management",
    "blog.categories_list.equipment": "IT equipment",
    "blog.categories_list.optimization": "Optimization",
    "blog.categories_list.trends": "Trends",

    // Footer
    "footer.description":
      "Ekwip, your partner for professional IT equipment rental. Flexible and customized solutions for businesses.",
    "footer.services": "Our services",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_description": "Stay informed about our latest news and special offers",
    "footer.newsletter_placeholder": "Your email address",
    "footer.rights": "All rights reserved.",
    "footer.legal_notice": "Legal notice",
    "footer.privacy_policy": "Privacy policy",
    "footer.terms": "Terms",

    // How it works page
    how_it_works: "How it works",

    // Catalogue page
    "catalogue.title": "Our equipment catalog",
    "catalogue.description":
      "Discover our wide range of IT equipment available for rental to meet all your professional needs.",
    "catalogue.categories.title": "Explore our categories",
    "catalogue.categories.description": "Quickly find the equipment you need thanks to our organization by categories",
    "catalogue.all_products.title": "All our equipment",
    "catalogue.all_products.description": "Browse our complete catalog of equipment available for rental.",
    "catalogue.filters": "Filters:",
    "catalogue.search_placeholder": "Search for equipment...",
    "catalogue.all_categories": "All categories",
    "catalogue.all_brands": "All brands",
    "catalogue.in_stock_only": "In stock only",
    "catalogue.new_items": "New items",
    "catalogue.load_more": "Load more equipment",
    "catalogue.popular_products": "Popular products",
    "catalogue.popular_description": "Discover our most requested equipment by our customers.",
    "catalogue.from": "From",
    "catalogue.view_details": "View details",
    "catalogue.view_all_products": "View all products",
    "catalogue.partner_brands": "Our partner brands",
    "catalogue.partner_brands_description": "We work with the best brands to offer you quality equipment.",
    "catalogue.not_found_title": "Can't find what you're looking for?",
    "catalogue.not_found_description":
      "Contact us to discuss your specific needs. We can offer you customized solutions.",
    "catalogue.custom_quote": "Request a personalized quote",
    "catalogue.talk_to_expert": "Talk to an expert",

    // Category pages
    "category.breadcrumb.home": "Home",
    "category.breadcrumb.catalog": "Catalog",
    "category.products_available": "products available",
    "category.product_available": "product available",
    "category.find_equipment": "Find the ideal equipment for your business",
    "category.sort_by": "Sort by:",
    "category.sort.popularity": "Popularity",
    "category.sort.price_asc": "Price ascending",
    "category.sort.price_desc": "Price descending",
    "category.sort.newest": "Newest",
    "category.no_products": "No products found",
    "category.no_products_description": "No products are available in this category at the moment.",
    "category.back_to_catalog": "Back to catalog",
    "category.why_rent_title": "Why rent {category}?",
    "category.why_rent_description": "Discover the advantages of equipment rental for your business",
    "category.benefit1.title": "Predictable costs",
    "category.benefit1.description":
      "Transform your investment expenses into predictable operating costs with fixed monthly payments.",
    "category.benefit2.title": "Up-to-date equipment",
    "category.benefit2.description":
      "Access the latest technologies without major investment and regularly renew your equipment.",
    "category.benefit3.title": "Service included",
    "category.benefit3.description":
      "Benefit from technical support, maintenance and replacement in case of breakdown.",
    "category.cta.title": "Need a personalized solution?",
    "category.cta.description":
      "Our experts are at your disposal to help you find equipment adapted to your specific needs.",
    "category.cta.button1": "Request a personalized quote",
    "category.cta.button2": "Contact us",

    // Category specific titles and descriptions
    "category.laptops.title": "Laptops available for rental",
    "category.laptops.description":
      "Rent latest generation laptops for your business. We offer a wide range of models adapted to all professional needs, with maintenance service included.",
    "category.desktops.title": "Desktop computers available for rental",
    "category.desktops.description":
      "Equip your business with high-performance desktop computers for rental. Flexible and scalable solutions for all types of businesses, with technical support included.",
    "category.smartphones.title": "Smartphones available for rental",
    "category.smartphones.description":
      "Professional smartphone rental for your teams. Data plans included, simplified fleet management and regular device renewal.",
    "category.tablets.title": "Tablets available for rental",
    "category.tablets.description":
      "Rent touch tablets for your professional needs. Ideal for mobility, client presentations or point of sale. Several models available.",
    "category.accessories.title": "IT accessories available for rental",
    "category.accessories.description":
      "Complete your IT equipment with our range of rental accessories. Monitors, keyboards, mice, headsets and other peripherals to optimize your productivity.",
    "category.printers.title": "Printers available for rental",
    "category.printers.description":
      "Professional printing solutions for rental. Laser printers, multifunction and large format with maintenance service and consumables included.",
    "category.furniture.title": "Office furniture available for rental",
    "category.furniture.description":
      "Furnish your workspaces with our ergonomic office furniture for rental. Desks, chairs, cabinets and flexible layout solutions.",

    // Product pages
    "product.specifications": "Technical specifications",
    "product.related_products": "Similar products",
    "product.interested_title": "Interested in this product?",
    "product.interested_description":
      "Contact our experts to get a personalized quote and discover how this product can meet your specific needs.",
    "product.request_quote": "Request a quote",
    "product.talk_to_expert": "Talk to an expert",
    "product.insurance_included": "Insurance included",
    "product.complete_protection": "Complete protection",
    "product.free_delivery": "Free delivery",
    "product.installation_included": "Installation included",
    "product.support_24_7": "24/7 Support",
    "product.technical_assistance": "Technical assistance",
    "product.maintenance_included": "Maintenance included",
    "product.free_repairs": "Free repairs",
    "product.available": "Available",
    "product.unavailable": "Unavailable",

    // Common
    "common.discover": "Discover",
    "common.popular": "Popular",
    "common.new": "New",
    "common.products": "products",
    "common.product": "product",
    "common.month": "month",
    "common.start": "Start",
    "common.get_quote": "Get a quote",
    "common.contact_us": "Contact us",
    "common.learn_more": "Learn more",
    "common.view_details": "View details",
    "common.from": "From",
    "common.per_month": "per month",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "cart.add_to_quote": "Add to quote",
    "cart.added": "Added",
    "cart.quantity": "Quantity",
    "cart.duration": "Duration",
    "cart.total": "Total",
    "cart.back_to_catalog": "Back to catalog",
    "cart.quote_request": "Quote request",
    "cart.quote_description": "Select your equipment and request a personalized quote",
    "cart.selected_equipment": "Selected equipment",
    "cart.empty_title": "Your selection is empty",
    "cart.empty_description": "Browse our catalog and add equipment to your quote",
    "cart.browse_catalog": "Browse catalog",
    "cart.clear_all": "Clear selection",
    "cart.quote_form_title": "Contact information",
    "cart.total_estimate": "Total estimate",
    "cart.estimate_note": "Indicative price, detailed quote on request",
    "cart.additional_message": "Additional message",
    "cart.message_placeholder": "Specify your needs, constraints or questions...",
    "cart.quote_sent": "Request sent!",
    "cart.quote_sent_description": "We will contact you within 24h with a detailed quote",
    "cart.sending_quote": "Sending...",
    "cart.send_quote_request": "Send quote request",
    "needs_list.add_to_list": "Add to my list",
    "needs_list.added": "Added",
    "needs_list.title": "My Equipment List",
    "needs_list.description": "Select your equipment and request a personalized quote",
    "needs_list.selected_equipment": "Selected equipment",
    "needs_list.empty_title": "Your list is empty",
    "needs_list.empty_description": "Browse our catalog and add equipment to your list",
    "needs_list.browse_catalog": "Browse catalog",
    "needs_list.clear_all": "Clear list",
    "needs_list.quantity": "Quantity",
    "needs_list.duration": "Duration",
    "needs_list.quote_form_title": "Contact information",
    "needs_list.total_estimate": "Total estimate",
    "needs_list.estimate_note": "Indicative price, detailed quote on request",
    "needs_list.message_placeholder": "Specify your needs, constraints or questions...",
    "needs_list.request_sent": "Request sent!",
    "needs_list.request_sent_description": "We will contact you within 24h with a detailed quote",
    "needs_list.browse_more": "Continue browsing",
    "needs_list.sending_request": "Sending...",
    "needs_list.send_request": "Send quote request",
    "needs_list.back_to_catalog": "Back to catalog",
  },
  es: {
    // Navigation
    "nav.how_it_works": "Cómo funciona",
    "nav.catalog": "Catálogo",
    "nav.store": "Tienda",
    "nav.contact": "Contacto",
    "nav.client_portal": "Portal del Cliente",
    "nav.customer_portal": "Portal del Cliente",
    "nav.customer_portal_description": "Reservado para clientes con equipos en alquiler",
    "nav.blog": "Blog",
    "nav.needs_list": "Mi Lista",
    "nav.needs_list_description": "Equipos seleccionados para tu presupuesto",

    // Home page
    "home.hero.title": "¡Equípate, sin arruinar tu tesorería!",
    "home.hero.description":
      "Opta por el alquiler y accede a las mejores tecnologías con una solución flexible y sin compromiso pesado.",
    "home.hero.button1": "Descubrir nuestras ofertas",
    "home.hero.button2": "Cómo funciona",

    // Feature cards
    "home.features.card1.title": "Preserva tu tesorería",
    "home.features.card1.description":
      "Transforma tus gastos de inversión en costos operativos predecibles con mensualidades fijas.",
    "home.features.card2.title": "Gestiona tu flota IT",
    "home.features.card2.description": "Gestiona y optimiza todo tu parque informático desde una interfaz única.",
    "home.features.card3.title": "Actualiza en cualquier momento",
    "home.features.card3.description": "Intercambia o actualiza tu equipo según tus necesidades, sin restricciones.",
    "home.features.card4.title": "Soporte y mantenimiento incluidos",
    "home.features.card4.description": "Asistencia técnica y reemplazo rápido en caso de problemas.",

    // Catalog section
    "home.products.title": "Descubre nuestro catálogo de equipos en alquiler",
    "home.products.description":
      "Portátiles, tabletas, smartphones y mucho más, disponibles en alquiler para acompañar tu actividad. Ya sea que necesites una computadora potente para el trabajo, una tableta para la movilidad o un smartphone de última generación, tenemos el equipo adaptado a tus necesidades.",
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
      "Ekwip propone soluciones de alquiler de equipos IT adaptadas a las necesidades específicas de medianas y grandes empresas. Nuestros expertos te acompañan en la definición de tu parque informático y te proponen soluciones a medida.",
    "home.enterprise.feature1": "Gestión completa del parque informático",
    "home.enterprise.feature2": "Tarifas degresivas según el volumen",
    "home.enterprise.feature3": "Soporte técnico dedicado",
    "home.enterprise.feature4": "Portal cliente personalizado",
    "home.enterprise.cta_title": "¿Listo para equipar tu empresa?",
    "home.enterprise.cta_description":
      "Contáctanos hoy para discutir tus necesidades y obtener un presupuesto personalizado.",
    "home.enterprise.cta_button1": "Solicitar un presupuesto personalizado",
    "home.enterprise.cta_button2": "Contáctanos",

    // Contact page
    "contact.title": "Contáctanos",
    "contact.description": "Nuestro equipo está a tu disposición para responder todas tus preguntas",
    "contact.info.title": "Información de contacto",
    "contact.info.description": "Varias formas de contactarnos según tus preferencias",
    "contact.info.address": "Dirección",
    "contact.info.phone": "Teléfono",
    "contact.info.email": "Email",
    "contact.info.hours": "Horarios de apertura",
    "contact.form.title": "Envíanos un mensaje",
    "contact.form.description": "Completa el formulario a continuación y te responderemos rápidamente",
    "contact.form.name": "Nombre completo",
    "contact.form.email": "Dirección de email",
    "contact.form.phone": "Teléfono",
    "contact.form.company": "Empresa",
    "contact.form.message": "Mensaje",
    "contact.form.submit": "Enviar mensaje",
    "contact.form.submitting": "Enviando...",
    "contact.form.success": "¡Mensaje enviado con éxito!",
    "contact.form.success_description": "Responderemos lo antes posible",
    "contact.map.title": "Nuestra ubicación",
    "contact.map.description": "Ven a visitarnos a nuestras oficinas",

    // Blog page
    "blog.title": "Blog Ekwip",
    "blog.description": "Noticias, consejos y tendencias del mundo IT",
    "blog.featured": "Artículo destacado",
    "blog.read_article": "Leer artículo",
    "blog.recent_posts": "Artículos recientes",
    "blog.categories": "Categorías",
    "blog.categories_list.treasury": "Gestión de tesorería",
    "blog.categories_list.equipment": "Equipos IT",
    "blog.categories_list.optimization": "Optimización",
    "blog.categories_list.trends": "Tendencias",

    // Footer
    "footer.description":
      "Ekwip, tu socio para el alquiler de equipos IT profesionales. Soluciones flexibles y a medida para empresas.",
    "footer.services": "Nuestros servicios",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_description": "Mantente informado sobre nuestras últimas noticias y ofertas especiales",
    "footer.newsletter_placeholder": "Tu dirección de email",
    "footer.rights": "Todos los derechos reservados.",
    "footer.legal_notice": "Aviso legal",
    "footer.privacy_policy": "Política de privacidad",
    "footer.terms": "Términos",

    // How it works page
    how_it_works: "Cómo funciona",

    // Catalogue page
    "catalogue.title": "Nuestro catálogo de equipos",
    "catalogue.description":
      "Descubre nuestra amplia gama de equipos IT disponibles en alquiler para responder a todas tus necesidades profesionales.",
    "catalogue.categories.title": "Explora nuestras categorías",
    "catalogue.categories.description":
      "Encuentra rápidamente el equipo que necesitas gracias a nuestra organización por categorías",
    "catalogue.all_products.title": "Todos nuestros equipos",
    "catalogue.all_products.description":
      "Navega por la totalidad de nuestro catálogo de equipos disponibles en alquiler.",
    "catalogue.filters": "Filtros:",
    "catalogue.search_placeholder": "Buscar un equipo...",
    "catalogue.all_categories": "Todas las categorías",
    "catalogue.all_brands": "Todas las marcas",
    "catalogue.in_stock_only": "Solo en stock",
    "catalogue.new_items": "Novedades",
    "catalogue.load_more": "Cargar más equipos",
    "catalogue.popular_products": "Productos populares",
    "catalogue.popular_description": "Descubre nuestros equipos más solicitados por nuestros clientes.",
    "catalogue.from": "Desde",
    "catalogue.view_details": "Ver detalles",
    "catalogue.view_all_products": "Ver todos los productos",
    "catalogue.partner_brands": "Nuestras marcas asociadas",
    "catalogue.partner_brands_description": "Trabajamos con las mejores marcas para ofrecerte equipos de calidad.",
    "catalogue.not_found_title": "¿No encuentras lo que buscas?",
    "catalogue.not_found_description":
      "Contáctanos para discutir tus necesidades específicas. Podemos proponerte soluciones a medida.",
    "catalogue.custom_quote": "Solicitar un presupuesto personalizado",
    "catalogue.talk_to_expert": "Hablar con un experto",

    // Category pages
    "category.breadcrumb.home": "Inicio",
    "category.breadcrumb.catalog": "Catálogo",
    "category.products_available": "productos disponibles",
    "category.product_available": "producto disponible",
    "category.find_equipment": "Encuentra el equipo ideal para tu empresa",
    "category.sort_by": "Ordenar por:",
    "category.sort.popularity": "Popularidad",
    "category.sort.price_asc": "Precio ascendente",
    "category.sort.price_desc": "Precio descendente",
    "category.sort.newest": "Novedades",
    "category.no_products": "No se encontraron productos",
    "category.no_products_description": "No hay productos disponibles en esta categoría por el momento.",
    "category.back_to_catalog": "Volver al catálogo",
    "category.why_rent_title": "¿Por qué alquilar {category}?",
    "category.why_rent_description": "Descubre las ventajas del alquiler de equipos para tu empresa",
    "category.benefit1.title": "Costos predecibles",
    "category.benefit1.description":
      "Transforma tus gastos de inversión en costos operativos predecibles con mensualidades fijas.",
    "category.benefit2.title": "Equipos actualizados",
    "category.benefit2.description":
      "Accede a las últimas tecnologías sin inversión mayor y renueva regularmente tu material.",
    "category.benefit3.title": "Servicio incluido",
    "category.benefit3.description": "Benefíciate de soporte técnico, mantenimiento y reemplazo en caso de avería.",
    "category.cta.title": "¿Necesitas una solución personalizada?",
    "category.cta.description":
      "Nuestros expertos están a tu disposición para ayudarte a encontrar los equipos adaptados a tus necesidades específicas.",
    "category.cta.button1": "Solicitar un presupuesto personalizado",
    "category.cta.button2": "Contáctanos",

    // Category specific titles and descriptions
    "category.laptops.title": "Ordenadores portátiles disponibles en alquiler",
    "category.laptops.description":
      "Alquila ordenadores portátiles de última generación para tu empresa. Ofrecemos una amplia gama de modelos adaptados a todas las necesidades profesionales, con servicio de mantenimiento incluido.",
    "category.desktops.title": "Ordenadores de escritorio disponibles en alquiler",
    "category.desktops.description":
      "Equipa tu empresa con ordenadores de escritorio de alto rendimiento en alquiler. Soluciones flexibles y escalables para todo tipo de empresas, con soporte técnico incluido.",
    "category.smartphones.title": "Smartphones disponibles en alquiler",
    "category.smartphones.description":
      "Alquiler de smartphones profesionales para tus equipos. Planes de datos incluidos, gestión de flota simplificada y renovación regular de dispositivos.",
    "category.tablets.title": "Tabletas disponibles en alquiler",
    "category.tablets.description":
      "Alquila tabletas táctiles para tus necesidades profesionales. Ideal para la movilidad, presentaciones a clientes o puntos de venta. Varios modelos disponibles.",
    "category.accessories.title": "Accesorios informáticos disponibles en alquiler",
    "category.accessories.description":
      "Completa tu equipo informático con nuestra gama de accesorios en alquiler. Pantallas, teclados, ratones, auriculares y otros periféricos para optimizar tu productividad.",
    "category.printers.title": "Impresoras disponibles en alquiler",
    "category.printers.description":
      "Soluciones de impresión profesionales en alquiler. Impresoras láser, multifunción y gran formato con servicio de mantenimiento y consumibles incluidos.",
    "category.furniture.title": "Mobiliario de oficina disponible en alquiler",
    "category.furniture.description":
      "Acondiciona tus espacios de trabajo con nuestro mobiliario de oficina ergonómico en alquiler. Escritorios, sillas, armarios y soluciones de acondicionamiento flexibles.",

    // Product pages
    "product.specifications": "Especificaciones técnicas",
    "product.related_products": "Productos similares",
    "product.interested_title": "¿Interesado en este producto?",
    "product.interested_description":
      "Contacta a nuestros expertos para obtener un presupuesto personalizado y descubrir cómo este producto puede responder a tus necesidades específicas.",
    "product.request_quote": "Solicitar presupuesto",
    "product.talk_to_expert": "Hablar con un experto",
    "product.insurance_included": "Seguro incluido",
    "product.complete_protection": "Protección completa",
    "product.free_delivery": "Entrega gratuita",
    "product.installation_included": "Instalación incluida",
    "product.support_24_7": "Soporte 24/7",
    "product.technical_assistance": "Asistencia técnica",
    "product.maintenance_included": "Mantenimiento incluido",
    "product.free_repairs": "Reparaciones gratuitas",
    "product.available": "Disponible",
    "product.unavailable": "No disponible",

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
    "cart.add_to_quote": "Añadir al presupuesto",
    "cart.added": "Añadido",
    "cart.quantity": "Cantidad",
    "cart.duration": "Duración",
    "cart.total": "Total",
    "cart.back_to_catalog": "Volver al catálogo",
    "cart.quote_request": "Solicitud de presupuesto",
    "cart.quote_description": "Selecciona tu equipo y solicita un presupuesto personalizado",
    "cart.selected_equipment": "Equipos seleccionados",
    "cart.empty_title": "Tu selección está vacía",
    "cart.empty_description": "Navega por nuestro catálogo y añade equipos a tu presupuesto",
    "cart.browse_catalog": "Navegar catálogo",
    "cart.clear_all": "Vaciar selección",
    "cart.quote_form_title": "Información de contacto",
    "cart.total_estimate": "Estimación total",
    "cart.estimate_note": "Precio indicativo, presupuesto detallado bajo solicitud",
    "cart.additional_message": "Mensaje adicional",
    "cart.message_placeholder": "Especifica tus necesidades, restricciones o preguntas...",
    "cart.quote_sent": "¡Solicitud enviada!",
    "cart.quote_sent_description": "Te contactaremos en 24h con un presupuesto detallado",
    "cart.sending_quote": "Enviando...",
    "cart.send_quote_request": "Enviar solicitud de presupuesto",
    "needs_list.add_to_list": "Añadir a mi lista",
    "needs_list.added": "Añadido",
    "needs_list.title": "Mi Lista de Equipos",
    "needs_list.description": "Selecciona tu equipo y solicita un presupuesto personalizado",
    "needs_list.selected_equipment": "Equipos seleccionados",
    "needs_list.empty_title": "Tu lista está vacía",
    "needs_list.empty_description": "Navega por nuestro catálogo y añade equipos a tu lista",
    "needs_list.browse_catalog": "Navegar catálogo",
    "needs_list.clear_all": "Vaciar lista",
    "needs_list.quantity": "Cantidad",
    "needs_list.duration": "Duración",
    "needs_list.quote_form_title": "Información de contacto",
    "needs_list.total_estimate": "Estimación total",
    "needs_list.estimate_note": "Precio indicativo, presupuesto detallado bajo solicitud",
    "needs_list.message_placeholder": "Especifica tus necesidades, restricciones o preguntas...",
    "needs_list.request_sent": "¡Solicitud enviada!",
    "needs_list.request_sent_description": "Te contactaremos en 24h con un presupuesto detallado",
    "needs_list.browse_more": "Continuar navegando",
    "needs_list.sending_request": "Enviando...",
    "needs_list.send_request": "Enviar solicitud de presupuesto",
    "needs_list.back_to_catalog": "Volver al catálogo",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  t: (key) => TRANSLATIONS.fr[key] || key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    // Try to get saved language from localStorage
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["fr", "en", "es"].includes(savedLanguage)) {
        setLanguageState(savedLanguage)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
    }
  }

  const t = (key: string): string => {
    // Simple direct lookup
    const translation = TRANSLATIONS[language]?.[key]
    if (translation) {
      return translation
    }

    // Fallback to French
    const fallback = TRANSLATIONS.fr[key]
    if (fallback) {
      return fallback
    }

    // Return key if no translation found
    console.warn(`Translation missing for key: ${key}`)
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
