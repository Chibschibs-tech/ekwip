// Enhanced product database with comprehensive product catalog

export interface StoreProduct {
  id: number
  name: string
  slug: string
  price: number
  salePrice?: number
  stock: number
  image: string
  category: string
  brand: string
  tags: string[]
  specifications?: Record<string, string>
  shortDescription: string
  description: string
  featured: boolean
  new: boolean
}

export const storeProducts: StoreProduct[] = [
  // Laptops
  {
    id: 1,
    name: 'MacBook Pro 14"',
    slug: "macbook-pro-14",
    price: 120,
    stock: 15,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png",
    category: "Ordinateurs portables",
    brand: "Apple",
    tags: ["professionnel", "créatif", "développement"],
    specifications: {
      Processeur: "Apple M2 Pro",
      RAM: "16 Go",
      Stockage: "512 Go SSD",
      Écran: '14" Liquid Retina XDR',
      Autonomie: "Jusqu'à 18 heures",
    },
    shortDescription: "Processeur M2 Pro, 16 Go RAM, 512 Go SSD",
    description:
      "Ordinateur portable professionnel Apple avec puce M2 Pro, idéal pour les créatifs et développeurs. Performance exceptionnelle pour les tâches les plus exigeantes.",
    featured: true,
    new: false,
  },
  {
    id: 2,
    name: "Dell XPS 15",
    slug: "dell-xps-15",
    price: 95,
    stock: 12,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png",
    category: "Ordinateurs portables",
    brand: "Dell",
    tags: ["professionnel", "performance", "design"],
    specifications: {
      Processeur: "Intel Core i7-13700H",
      RAM: "32 Go DDR5",
      Stockage: "1 To SSD",
      Écran: '15.6" 4K OLED',
      "Carte graphique": "NVIDIA RTX 4060",
    },
    shortDescription: "Intel i7, 32 Go RAM, 1 To SSD, écran 4K OLED",
    description:
      "Ordinateur portable haut de gamme avec écran InfinityEdge et performances exceptionnelles pour les professionnels exigeants.",
    featured: false,
    new: false,
  },
  {
    id: 3,
    name: "Lenovo ThinkPad X1 Carbon",
    slug: "lenovo-thinkpad-x1-carbon",
    price: 85,
    stock: 18,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png",
    category: "Ordinateurs portables",
    brand: "Lenovo",
    tags: ["business", "léger", "sécurisé"],
    specifications: {
      Processeur: "Intel Core i7-1365U",
      RAM: "16 Go LPDDR5",
      Stockage: "512 Go SSD",
      Écran: '14" 2.8K OLED',
      Poids: "1.12 kg",
    },
    shortDescription: "Intel i7, 16 Go RAM, 512 Go SSD, ultra-léger",
    description:
      "Ultrabook professionnel ultra-léger avec sécurité renforcée et autonomie exceptionnelle pour les déplacements d'affaires.",
    featured: false,
    new: true,
  },

  // Desktops
  {
    id: 4,
    name: "Mac Mini M2",
    slug: "mac-mini-m2",
    price: 65,
    stock: 10,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/laptop.png",
    category: "Ordinateurs de bureau",
    brand: "Apple",
    tags: ["compact", "silencieux", "efficace"],
    specifications: {
      Processeur: "Apple M2",
      RAM: "16 Go",
      Stockage: "512 Go SSD",
      Connectivité: "2x Thunderbolt 4, 2x USB-A",
      Dimensions: "19.7 x 19.7 x 3.6 cm",
    },
    shortDescription: "Apple M2, 16 Go RAM, 512 Go SSD, ultra-compact",
    description:
      "Ordinateur de bureau compact et puissant, parfait pour les espaces de travail restreints sans compromis sur les performances.",
    featured: false,
    new: false,
  },

  // Smartphones
  {
    id: 5,
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    price: 45,
    stock: 25,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/smartphone.webp",
    category: "Smartphones",
    brand: "Apple",
    tags: ["professionnel", "photo", "5G"],
    specifications: {
      Processeur: "A17 Pro",
      Stockage: "256 Go",
      Écran: '6.1" Super Retina XDR',
      "Appareil photo": "48 MP principal",
      Connectivité: "5G, Wi-Fi 6E",
    },
    shortDescription: "256 Go, forfait data 100 Go inclus, A17 Pro",
    description:
      "Smartphone haut de gamme avec appareil photo professionnel et puce A17 Pro. Forfait data professionnel inclus.",
    featured: true,
    new: false,
  },
  {
    id: 6,
    name: "Samsung Galaxy S23 Ultra",
    slug: "samsung-galaxy-s23-ultra",
    price: 42,
    stock: 20,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/smartphone.webp",
    category: "Smartphones",
    brand: "Samsung",
    tags: ["professionnel", "S Pen", "zoom"],
    specifications: {
      Processeur: "Snapdragon 8 Gen 2",
      Stockage: "512 Go",
      Écran: '6.8" Dynamic AMOLED 2X',
      "Appareil photo": "200 MP principal",
      "S Pen": "Inclus",
    },
    shortDescription: "512 Go, S Pen inclus, zoom 100x, forfait data inclus",
    description:
      "Smartphone professionnel avec S Pen intégré et capacités photo exceptionnelles. Parfait pour la productivité mobile.",
    featured: false,
    new: false,
  },

  // Tablets
  {
    id: 7,
    name: 'iPad Pro 12.9"',
    slug: "ipad-pro-12-9",
    price: 35,
    stock: 15,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/tablet.png",
    category: "Tablettes",
    brand: "Apple",
    tags: ["créatif", "professionnel", "Apple Pencil"],
    specifications: {
      Processeur: "Apple M2",
      Stockage: "256 Go",
      Écran: '12.9" Liquid Retina XDR',
      Connectivité: "Wi-Fi 6E + 5G",
      Accessoires: "Apple Pencil 2 inclus",
    },
    shortDescription: "M2, 256 Go, écran Liquid Retina XDR, Apple Pencil inclus",
    description:
      "Tablette professionnelle haut de gamme avec puce M2 et écran XDR. Apple Pencil inclus pour la créativité et la productivité.",
    featured: false,
    new: false,
  },
  {
    id: 8,
    name: "reMarkable Paper Pro",
    slug: "remarkable-paper-pro",
    price: 85,
    stock: 8,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/tablet.png",
    category: "Tablettes",
    brand: "reMarkable",
    tags: ["papier numérique", "écriture", "couleur"],
    specifications: {
      Écran: '11.8" couleur E Ink',
      Résolution: "2160 x 1620",
      Rétroéclairage: "Oui, ajustable",
      Autonomie: "Jusqu'à 2 semaines",
      Marker: "Marker Plus inclus",
    },
    shortDescription: "Tablette papier numérique couleur avec Marker inclus, rétroéclairage et batterie longue durée",
    description:
      "La tablette papier numérique la plus avancée avec écran couleur, rétroéclairage et expérience d'écriture naturelle. Parfaite pour la prise de notes professionnelle.",
    featured: true,
    new: true,
  },
  {
    id: 9,
    name: "reMarkable 2",
    slug: "remarkable-2",
    price: 65,
    stock: 12,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/tablet.png",
    category: "Tablettes",
    brand: "reMarkable",
    tags: ["papier numérique", "écriture", "minimaliste"],
    specifications: {
      Écran: '10.3" E Ink Carta',
      Résolution: "1872 x 1404",
      Épaisseur: "4.7 mm",
      Autonomie: "Jusqu'à 2 semaines",
      Marker: "Marker inclus",
    },
    shortDescription: "Tablette papier numérique avec Marker inclus, expérience d'écriture naturelle",
    description:
      "Tablette papier numérique révolutionnaire avec sensation d'écriture sur papier. Idéale pour les notes, croquis et lecture sans distraction.",
    featured: false,
    new: false,
  },

  // Accessories
  {
    id: 10,
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    price: 15,
    stock: 30,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/keyboard%20%26%20mouse.png",
    category: "Accessoires",
    brand: "Sony",
    tags: ["casque", "noise cancelling", "bluetooth"],
    specifications: {
      Type: "Casque circum-auriculaire",
      "Réduction de bruit": "Adaptive Noise Cancelling",
      Autonomie: "30 heures",
      Connectivité: "Bluetooth 5.2, USB-C",
      Microphones: "8 microphones pour appels",
    },
    shortDescription: "Casque sans fil avec réduction de bruit active, 30h d'autonomie",
    description:
      "Casque professionnel haut de gamme avec réduction de bruit adaptative et qualité audio exceptionnelle pour le télétravail.",
    featured: false,
    new: false,
  },
  {
    id: 11,
    name: "Logitech MX Master 3S",
    slug: "logitech-mx-master-3s",
    price: 8,
    stock: 40,
    image: "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/Hero/keyboard%20%26%20mouse.png",
    category: "Accessoires",
    brand: "Logitech",
    tags: ["souris", "ergonomique", "productivité"],
    specifications: {
      Type: "Souris sans fil ergonomique",
      Capteur: "Darkfield 8000 DPI",
      Autonomie: "70 jours",
      Connectivité: "Bluetooth, USB-C",
      Boutons: "7 boutons programmables",
    },
    shortDescription: "Souris ergonomique sans fil, 8000 DPI, 70 jours d'autonomie",
    description:
      "Souris ergonomique professionnelle avec précision exceptionnelle et fonctionnalités avancées pour une productivité optimale.",
    featured: false,
    new: false,
  },

  // Printers
  {
    id: 12,
    name: "HP LaserJet Pro MFP M428fdw",
    slug: "hp-laserjet-pro-mfp-m428fdw",
    price: 25,
    stock: 8,
    image: "/images/printer-hero.png",
    category: "Imprimantes",
    brand: "HP",
    tags: ["multifonction", "laser", "wifi"],
    specifications: {
      Type: "Imprimante laser multifonction",
      Vitesse: "38 ppm",
      Résolution: "1200 x 1200 dpi",
      Connectivité: "Wi-Fi, Ethernet, USB",
      Fonctions: "Impression, copie, scan, fax",
    },
    shortDescription: "Imprimante laser multifonction, 38 ppm, Wi-Fi, fax",
    description:
      "Imprimante laser multifonction professionnelle avec connectivité complète et fonctionnalités avancées pour les bureaux.",
    featured: false,
    new: false,
  },
]

// Utility functions
export const getProductsByCategory = (category: string) => {
  return storeProducts.filter((product) => product.category === category)
}

export const getProductBySlug = (slug: string) => {
  return storeProducts.find((product) => product.slug === slug)
}

export const getFeaturedProducts = () => {
  return storeProducts.filter((product) => product.featured)
}

export const getNewProducts = () => {
  return storeProducts.filter((product) => product.new)
}

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return storeProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

export const getProductsByBrand = (brand: string) => {
  return storeProducts.filter((product) => product.brand === brand)
}

export const getAllBrands = () => {
  return Array.from(new Set(storeProducts.map((product) => product.brand)))
}

export const getAllCategories = () => {
  return Array.from(new Set(storeProducts.map((product) => product.category)))
}
