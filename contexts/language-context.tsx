"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "fr" | "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    // Navigation
    "nav.how_it_works": "Comment ça marche",
    "nav.catalog": "Catalogue",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.customer_portal": "Portail Client",
    "nav.needs_list": "Liste de besoins",

    // Category page translations
    "category.breadcrumb.home": "Accueil",
    "category.breadcrumb.catalog": "Catalogue",
    "category.back_to_catalog": "Retour au catalogue",
    "category.product_available": "produit disponible",
    "category.products_available": "produits disponibles",
    "category.find_equipment": "Trouvez l'équipement parfait pour vos besoins professionnels.",
    "category.sort_by": "Trier par",
    "category.sort.popularity": "Popularité",
    "category.sort.price_asc": "Prix croissant",
    "category.sort.price_desc": "Prix décroissant",
    "category.sort.newest": "Plus récent",
    "category.no_products": "Aucun produit trouvé",
    "category.no_products_description": "Essayez de modifier vos critères de recherche.",
    "category.why_rent_title": "Pourquoi louer vos {category} ?",
    "category.why_rent_description": "La location d'équipements offre de nombreux avantages pour votre entreprise.",
    "category.benefit1.title": "Économies garanties",
    "category.benefit1.description": "Réduisez vos coûts d'investissement et optimisez votre trésorerie.",
    "category.benefit2.title": "Flexibilité totale",
    "category.benefit2.description": "Adaptez votre parc informatique selon vos besoins évolutifs.",
    "category.benefit3.title": "Support inclus",
    "category.benefit3.description": "Maintenance et support technique inclus dans votre contrat.",
    "category.cta.title": "Prêt à équiper votre entreprise ?",
    "category.cta.description": "Contactez nos experts pour une solution personnalisée.",
    "category.cta.button1": "Demander un devis",
    "category.cta.button2": "Nous contacter",

    // Catalogue page translations
    "catalogue.search_placeholder": "Rechercher un produit...",
    "catalogue.title": "Notre catalogue d'équipements",
    "catalogue.subtitle": "Découvrez notre gamme complète d'équipements informatiques en location",

    // Common
    "common.available": "Disponible",
    "common.unavailable": "Indisponible",
    "common.new": "Nouveau",
    "common.popular": "Populaire",
    "common.starting_from": "À partir de",
    "common.contract": "Contrat",
  },
  en: {
    // Navigation
    "nav.how_it_works": "How it works",
    "nav.catalog": "Catalog",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.customer_portal": "Customer Portal",
    "nav.needs_list": "Needs List",

    // Category page translations
    "category.breadcrumb.home": "Home",
    "category.breadcrumb.catalog": "Catalog",
    "category.back_to_catalog": "Back to catalog",
    "category.product_available": "product available",
    "category.products_available": "products available",
    "category.find_equipment": "Find the perfect equipment for your professional needs.",
    "category.sort_by": "Sort by",
    "category.sort.popularity": "Popularity",
    "category.sort.price_asc": "Price ascending",
    "category.sort.price_desc": "Price descending",
    "category.sort.newest": "Newest",
    "category.no_products": "No products found",
    "category.no_products_description": "Try modifying your search criteria.",
    "category.why_rent_title": "Why rent your {category}?",
    "category.why_rent_description": "Equipment rental offers many advantages for your business.",
    "category.benefit1.title": "Guaranteed savings",
    "category.benefit1.description": "Reduce your investment costs and optimize your cash flow.",
    "category.benefit2.title": "Total flexibility",
    "category.benefit2.description": "Adapt your IT fleet according to your evolving needs.",
    "category.benefit3.title": "Support included",
    "category.benefit3.description": "Maintenance and technical support included in your contract.",
    "category.cta.title": "Ready to equip your business?",
    "category.cta.description": "Contact our experts for a personalized solution.",
    "category.cta.button1": "Request a quote",
    "category.cta.button2": "Contact us",

    // Catalogue page translations
    "catalogue.search_placeholder": "Search for a product...",
    "catalogue.title": "Our equipment catalog",
    "catalogue.subtitle": "Discover our complete range of IT equipment for rent",

    // Common
    "common.available": "Available",
    "common.unavailable": "Unavailable",
    "common.new": "New",
    "common.popular": "Popular",
    "common.starting_from": "Starting from",
    "common.contract": "Contract",
  },
  ar: {
    // Navigation
    "nav.how_it_works": "كيف يعمل",
    "nav.catalog": "الكتالوج",
    "nav.blog": "المدونة",
    "nav.contact": "اتصل بنا",
    "nav.customer_portal": "بوابة العملاء",
    "nav.needs_list": "قائمة الاحتياجات",

    // Category page translations
    "category.breadcrumb.home": "الرئيسية",
    "category.breadcrumb.catalog": "الكتالوج",
    "category.back_to_catalog": "العودة إلى الكتالوج",
    "category.product_available": "منتج متاح",
    "category.products_available": "منتجات متاحة",
    "category.find_equipment": "اعثر على المعدات المثالية لاحتياجاتك المهنية.",
    "category.sort_by": "ترتيب حسب",
    "category.sort.popularity": "الشعبية",
    "category.sort.price_asc": "السعر تصاعدي",
    "category.sort.price_desc": "السعر تنازلي",
    "category.sort.newest": "الأحدث",
    "category.no_products": "لم يتم العثور على منتجات",
    "category.no_products_description": "حاول تعديل معايير البحث الخاصة بك.",
    "category.why_rent_title": "لماذا تستأجر {category} الخاصة بك؟",
    "category.why_rent_description": "تأجير المعدات يوفر العديد من المزايا لعملك.",
    "category.benefit1.title": "توفير مضمون",
    "category.benefit1.description": "قلل من تكاليف الاستثمار وحسن التدفق النقدي.",
    "category.benefit2.title": "مرونة كاملة",
    "category.benefit2.description": "تكيف مع أسطول تكنولوجيا المعلومات وفقًا لاحتياجاتك المتطورة.",
    "category.benefit3.title": "الدعم مشمول",
    "category.benefit3.description": "الصيانة والدعم الفني مشمولان في عقدك.",
    "category.cta.title": "مستعد لتجهيز عملك؟",
    "category.cta.description": "اتصل بخبرائنا للحصول على حل مخصص.",
    "category.cta.button1": "طلب عرض أسعار",
    "category.cta.button2": "اتصل بنا",

    // Catalogue page translations
    "catalogue.search_placeholder": "البحث عن منتج...",
    "catalogue.title": "كتالوج المعدات الخاص بنا",
    "catalogue.subtitle": "اكتشف مجموعتنا الكاملة من معدات تكنولوجيا المعلومات للإيجار",

    // Common
    "common.available": "متاح",
    "common.unavailable": "غير متاح",
    "common.new": "جديد",
    "common.popular": "شائع",
    "common.starting_from": "ابتداء من",
    "common.contract": "عقد",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Return the key if translation is not found
      }
    }

    return typeof value === "string" ? value : key
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
