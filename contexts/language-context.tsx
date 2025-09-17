"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "fr" | "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.catalogue": "Catalogue",
    "nav.how_it_works": "Comment ça marche",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.blog": "Blog",
    "nav.client_portal": "Portail Client",
    "nav.my_needs_list": "Ma liste de besoins",

    // Common
    "common.learn_more": "En savoir plus",
    "common.get_started": "Commencer",
    "common.contact_us": "Nous contacter",
    "common.read_more": "Lire la suite",
    "common.view_all": "Voir tout",
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.month": "mois",
    "common.months": "mois",
    "common.product": "produit",
    "common.products": "produits",
    "common.popular": "Populaire",
    "common.new": "Nouveau",
    "common.discover": "Découvrir",

    // Home page
    "home.hero.title": "Location d'équipements IT pour entreprises",
    "home.hero.subtitle":
      "Accédez aux dernières technologies sans investissement initial. Flexibilité, maintenance incluse, mise à jour garantie.",
    "home.hero.cta1": "Découvrir le catalogue",
    "home.hero.cta2": "Comment ça marche",

    // Catalogue
    "catalogue.title": "Notre Catalogue d'Équipements",
    "catalogue.description": "Découvrez notre gamme complète d'équipements IT en location pour votre entreprise",
    "catalogue.categories.title": "Catégories d'Équipements",
    "catalogue.categories.description": "Explorez nos différentes catégories d'équipements professionnels",
    "catalogue.all_products.title": "Tous nos Produits",
    "catalogue.all_products.description":
      "Parcourez l'ensemble de notre catalogue d'équipements disponibles en location",
    "catalogue.filters": "Filtres",
    "catalogue.search_placeholder": "Rechercher un produit...",
    "catalogue.all_categories": "Toutes les catégories",
    "catalogue.all_brands": "Toutes les marques",
    "catalogue.in_stock_only": "En stock uniquement",
    "catalogue.new_items": "Nouveautés",
    "catalogue.load_more": "Charger plus",
    "catalogue.popular_products": "Produits Populaires",
    "catalogue.popular_description": "Les équipements les plus demandés par nos clients",
    "catalogue.from": "À partir de",
    "catalogue.view_details": "Voir les détails",
    "catalogue.view_all_products": "Voir tous les produits",
    "catalogue.partner_brands": "Nos Marques Partenaires",
    "catalogue.partner_brands_description": "Nous travaillons avec les meilleures marques du marché",
    "catalogue.not_found_title": "Vous ne trouvez pas ce que vous cherchez ?",
    "catalogue.not_found_description":
      "Notre équipe peut vous aider à trouver l'équipement parfait pour vos besoins spécifiques",
    "catalogue.custom_quote": "Demander un devis personnalisé",
    "catalogue.talk_to_expert": "Parler à un expert",

    // Category pages
    "category.breadcrumb.home": "Accueil",
    "category.breadcrumb.catalog": "Catalogue",
    "category.back_to_catalog": "Retour au catalogue",
    "category.product_available": "produit disponible",
    "category.products_available": "produits disponibles",
    "category.find_equipment": "Trouvez l'équipement parfait pour vos besoins professionnels",
    "category.sort_by": "Trier par",
    "category.sort.popularity": "Popularité",
    "category.sort.price_asc": "Prix croissant",
    "category.sort.price_desc": "Prix décroissant",
    "category.sort.newest": "Plus récents",
    "category.no_products": "Aucun produit trouvé",
    "category.no_products_description":
      "Essayez de modifier vos critères de recherche ou contactez-nous pour des besoins spécifiques",
    "category.why_rent_title": "Pourquoi louer vos {category} ?",
    "category.why_rent_description": "La location d'équipements IT offre de nombreux avantages pour votre entreprise",
    "category.benefit1.title": "Économies garanties",
    "category.benefit1.description": "Réduisez vos coûts d'investissement et optimisez votre trésorerie",
    "category.benefit2.title": "Toujours à jour",
    "category.benefit2.description": "Bénéficiez des dernières technologies sans vous soucier de l'obsolescence",
    "category.benefit3.title": "Support inclus",
    "category.benefit3.description": "Maintenance, support technique et remplacement inclus dans votre contrat",
    "category.cta.title": "Prêt à équiper votre entreprise ?",
    "category.cta.description": "Contactez nos experts pour une solution personnalisée adaptée à vos besoins",
    "category.cta.button1": "Demander un devis",
    "category.cta.button2": "Planifier un appel",

    // Footer
    "footer.company": "Entreprise",
    "footer.services": "Services",
    "footer.support": "Support",
    "footer.legal": "Légal",
    "footer.follow_us": "Suivez-nous",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_description": "Restez informé de nos dernières offres et actualités",
    "footer.subscribe": "S'abonner",
    "footer.rights": "Tous droits réservés",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.catalogue": "Catalog",
    "nav.how_it_works": "How it Works",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.blog": "Blog",
    "nav.client_portal": "Client Portal",
    "nav.my_needs_list": "My Needs List",

    // Common
    "common.learn_more": "Learn More",
    "common.get_started": "Get Started",
    "common.contact_us": "Contact Us",
    "common.read_more": "Read More",
    "common.view_all": "View All",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.month": "month",
    "common.months": "months",
    "common.product": "product",
    "common.products": "products",
    "common.popular": "Popular",
    "common.new": "New",
    "common.discover": "Discover",

    // Home page
    "home.hero.title": "IT Equipment Rental for Businesses",
    "home.hero.subtitle":
      "Access the latest technology without initial investment. Flexibility, maintenance included, guaranteed updates.",
    "home.hero.cta1": "Explore Catalog",
    "home.hero.cta2": "How it Works",

    // Catalogue
    "catalogue.title": "Our Equipment Catalog",
    "catalogue.description": "Discover our complete range of IT equipment for rental for your business",
    "catalogue.categories.title": "Equipment Categories",
    "catalogue.categories.description": "Explore our different categories of professional equipment",
    "catalogue.all_products.title": "All Our Products",
    "catalogue.all_products.description": "Browse our complete catalog of equipment available for rental",
    "catalogue.filters": "Filters",
    "catalogue.search_placeholder": "Search for a product...",
    "catalogue.all_categories": "All categories",
    "catalogue.all_brands": "All brands",
    "catalogue.in_stock_only": "In stock only",
    "catalogue.new_items": "New items",
    "catalogue.load_more": "Load more",
    "catalogue.popular_products": "Popular Products",
    "catalogue.popular_description": "The most requested equipment by our clients",
    "catalogue.from": "From",
    "catalogue.view_details": "View details",
    "catalogue.view_all_products": "View all products",
    "catalogue.partner_brands": "Our Partner Brands",
    "catalogue.partner_brands_description": "We work with the best brands in the market",
    "catalogue.not_found_title": "Can't find what you're looking for?",
    "catalogue.not_found_description": "Our team can help you find the perfect equipment for your specific needs",
    "catalogue.custom_quote": "Request custom quote",
    "catalogue.talk_to_expert": "Talk to an expert",

    // Category pages
    "category.breadcrumb.home": "Home",
    "category.breadcrumb.catalog": "Catalog",
    "category.back_to_catalog": "Back to catalog",
    "category.product_available": "product available",
    "category.products_available": "products available",
    "category.find_equipment": "Find the perfect equipment for your professional needs",
    "category.sort_by": "Sort by",
    "category.sort.popularity": "Popularity",
    "category.sort.price_asc": "Price ascending",
    "category.sort.price_desc": "Price descending",
    "category.sort.newest": "Newest",
    "category.no_products": "No products found",
    "category.no_products_description": "Try modifying your search criteria or contact us for specific needs",
    "category.why_rent_title": "Why rent your {category}?",
    "category.why_rent_description": "IT equipment rental offers many advantages for your business",
    "category.benefit1.title": "Guaranteed savings",
    "category.benefit1.description": "Reduce your investment costs and optimize your cash flow",
    "category.benefit2.title": "Always up to date",
    "category.benefit2.description": "Benefit from the latest technologies without worrying about obsolescence",
    "category.benefit3.title": "Support included",
    "category.benefit3.description": "Maintenance, technical support and replacement included in your contract",
    "category.cta.title": "Ready to equip your business?",
    "category.cta.description": "Contact our experts for a personalized solution adapted to your needs",
    "category.cta.button1": "Request a quote",
    "category.cta.button2": "Schedule a call",

    // Footer
    "footer.company": "Company",
    "footer.services": "Services",
    "footer.support": "Support",
    "footer.legal": "Legal",
    "footer.follow_us": "Follow Us",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_description": "Stay informed about our latest offers and news",
    "footer.subscribe": "Subscribe",
    "footer.rights": "All rights reserved",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.catalogue": "الكتالوج",
    "nav.how_it_works": "كيف يعمل",
    "nav.about": "حول",
    "nav.contact": "اتصل",
    "nav.blog": "المدونة",
    "nav.client_portal": "بوابة العميل",
    "nav.my_needs_list": "قائمة احتياجاتي",

    // Common
    "common.learn_more": "اعرف المزيد",
    "common.get_started": "ابدأ",
    "common.contact_us": "اتصل بنا",
    "common.read_more": "اقرأ المزيد",
    "common.view_all": "عرض الكل",
    "common.loading": "جاري التحميل...",
    "common.error": "خطأ",
    "common.success": "نجح",
    "common.month": "شهر",
    "common.months": "أشهر",
    "common.product": "منتج",
    "common.products": "منتجات",
    "common.popular": "شائع",
    "common.new": "جديد",
    "common.discover": "اكتشف",

    // Home page
    "home.hero.title": "تأجير معدات تكنولوجيا المعلومات للشركات",
    "home.hero.subtitle": "احصل على أحدث التقنيات بدون استثمار أولي. مرونة، صيانة مشمولة، تحديثات مضمونة.",
    "home.hero.cta1": "استكشف الكتالوج",
    "home.hero.cta2": "كيف يعمل",

    // Catalogue
    "catalogue.title": "كتالوج معداتنا",
    "catalogue.description": "اكتشف مجموعتنا الكاملة من معدات تكنولوجيا المعلومات للإيجار لشركتك",
    "catalogue.categories.title": "فئات المعدات",
    "catalogue.categories.description": "استكشف فئاتنا المختلفة من المعدات المهنية",
    "catalogue.all_products.title": "جميع منتجاتنا",
    "catalogue.all_products.description": "تصفح كتالوجنا الكامل للمعدات المتاحة للإيجار",
    "catalogue.filters": "المرشحات",
    "catalogue.search_placeholder": "البحث عن منتج...",
    "catalogue.all_categories": "جميع الفئات",
    "catalogue.all_brands": "جميع العلامات التجارية",
    "catalogue.in_stock_only": "متوفر فقط",
    "catalogue.new_items": "عناصر جديدة",
    "catalogue.load_more": "تحميل المزيد",
    "catalogue.popular_products": "المنتجات الشائعة",
    "catalogue.popular_description": "المعدات الأكثر طلباً من قبل عملائنا",
    "catalogue.from": "من",
    "catalogue.view_details": "عرض التفاصيل",
    "catalogue.view_all_products": "عرض جميع المنتجات",
    "catalogue.partner_brands": "علاماتنا التجارية الشريكة",
    "catalogue.partner_brands_description": "نعمل مع أفضل العلامات التجارية في السوق",
    "catalogue.not_found_title": "لا تجد ما تبحث عنه؟",
    "catalogue.not_found_description": "يمكن لفريقنا مساعدتك في العثور على المعدات المثالية لاحتياجاتك المحددة",
    "catalogue.custom_quote": "طلب عرض أسعار مخصص",
    "catalogue.talk_to_expert": "تحدث مع خبير",

    // Category pages
    "category.breadcrumb.home": "الرئيسية",
    "category.breadcrumb.catalog": "الكتالوج",
    "category.back_to_catalog": "العودة إلى الكتالوج",
    "category.product_available": "منتج متاح",
    "category.products_available": "منتجات متاحة",
    "category.find_equipment": "اعثر على المعدات المثالية لاحتياجاتك المهنية",
    "category.sort_by": "ترتيب حسب",
    "category.sort.popularity": "الشعبية",
    "category.sort.price_asc": "السعر تصاعدي",
    "category.sort.price_desc": "السعر تنازلي",
    "category.sort.newest": "الأحدث",
    "category.no_products": "لم يتم العثور على منتجات",
    "category.no_products_description": "حاول تعديل معايير البحث أو اتصل بنا للاحتياجات المحددة",
    "category.why_rent_title": "لماذا تستأجر {category} الخاصة بك؟",
    "category.why_rent_description": "تأجير معدات تكنولوجيا المعلومات يوفر العديد من المزايا لشركتك",
    "category.benefit1.title": "توفير مضمون",
    "category.benefit1.description": "قلل تكاليف الاستثمار وحسن التدفق النقدي",
    "category.benefit2.title": "محدث دائماً",
    "category.benefit2.description": "استفد من أحدث التقنيات دون القلق بشأن التقادم",
    "category.benefit3.title": "الدعم مشمول",
    "category.benefit3.description": "الصيانة والدعم الفني والاستبدال مشمولة في عقدك",
    "category.cta.title": "مستعد لتجهيز شركتك؟",
    "category.cta.description": "اتصل بخبرائنا للحصول على حل شخصي يتناسب مع احتياجاتك",
    "category.cta.button1": "طلب عرض أسعار",
    "category.cta.button2": "جدولة مكالمة",

    // Footer
    "footer.company": "الشركة",
    "footer.services": "الخدمات",
    "footer.support": "الدعم",
    "footer.legal": "قانوني",
    "footer.follow_us": "تابعنا",
    "footer.newsletter": "النشرة الإخبارية",
    "footer.newsletter_description": "ابق على اطلاع بأحدث عروضنا وأخبارنا",
    "footer.subscribe": "اشترك",
    "footer.rights": "جميع الحقوق محفوظة",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to French if key not found
        value = translations.fr
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if not found in fallback
          }
        }
        break
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
