export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  inStock: boolean
  isNew?: boolean
  isPopular?: boolean
  slug: string
  specifications?: Record<string, string>
  images?: string[]
  variants?: ProductVariant[]
  configurations?: ProductConfiguration[]
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  specifications: Record<string, string>
  inStock: boolean
}

export interface ProductConfiguration {
  id: string
  name: string
  price: number
  firstMonthPrice: number
  processor: string
  memory: string
  storage: string
  graphics: string
  inStock: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  image: string
  productCount: number
}

// Sample products data
const products: Product[] = [
  // Laptops
  {
    id: "dell-precision-5690",
    name: "Dell Mobile Precision Workstation 5690",
    description: "Station de travail mobile ultra-performante pour les professionnels exigeants",
    price: 1150,
    image: "/images/dell-precision-5690.png",
    category: "ordinateurs-portables",
    brand: "Dell",
    inStock: true,
    isPopular: true,
    slug: "dell-precision-5690",
    specifications: {
      Écran: "16 pouces non-tactile FHD+",
      "Système d'exploitation": "Windows 11 Professionnel",
      Stockage: "SSD 1 To",
      Connectivité: "Wi-Fi 6E, Bluetooth 5.3",
      Ports: "USB-C, USB-A, HDMI, Ethernet",
      Batterie: "Jusqu'à 10 heures d'autonomie",
      Poids: "2.1 kg",
      Garantie: "3 ans sur site",
    },
    images: [
      "/images/dell-precision-5690-main.png",
      "/images/dell-precision-5690-side.png",
      "/images/dell-precision-5690-keyboard.png",
      "/images/dell-precision-5690-ports.png",
      "/images/dell-precision-5690-screen.png",
    ],
    configurations: [
      {
        id: "config-1",
        name: "Configuration Standard",
        price: 1150,
        firstMonthPrice: 2770,
        processor: "Intel® Core™ Ultra 7 165H vPro® Enterprise, 16 cœurs",
        memory: "16 Go de mémoire LPDDR5X",
        storage: "SSD 1 To",
        graphics: "NVIDIA® RTX™ 1000 Ada Generation",
        inStock: true,
      },
      {
        id: "config-2",
        name: "Configuration Performance",
        price: 1200,
        firstMonthPrice: 2850,
        processor: "Intel® Core™ Ultra 7 165H vPro® Enterprise, 16 cœurs",
        memory: "32 Go de mémoire LPDDR5X",
        storage: "SSD 1 To",
        graphics: "NVIDIA® RTX™ 2000 Ada Generation",
        inStock: true,
      },
      {
        id: "config-3",
        name: "Configuration Premium",
        price: 1250,
        firstMonthPrice: 3000,
        processor: "Intel® Core™ Ultra 7 165H vPro® Enterprise, 16 cœurs",
        memory: "32 Go de mémoire LPDDR5X",
        storage: "SSD 1 To",
        graphics: "NVIDIA® RTX™ 1000 Ada Generation",
        inStock: true,
      },
    ],
  },
  {
    id: "macbook-pro-16",
    name: 'MacBook Pro 16"',
    description: "Le MacBook Pro le plus puissant jamais conçu, avec la puce M3 Pro",
    price: 899,
    image: "/images/macbook-pro.png",
    category: "ordinateurs-portables",
    brand: "Apple",
    inStock: true,
    isNew: true,
    slug: "macbook-pro-16",
    specifications: {
      Processeur: "Apple M3 Pro",
      Mémoire: "18 Go de mémoire unifiée",
      Stockage: "SSD 512 Go",
      Écran: "16 pouces Liquid Retina XDR",
      Autonomie: "Jusqu'à 22 heures",
      Poids: "2.16 kg",
    },
    variants: [
      {
        id: "mbp-16-512",
        name: "512 Go",
        price: 899,
        specifications: { Stockage: "SSD 512 Go", Mémoire: "18 Go" },
        inStock: true,
      },
      {
        id: "mbp-16-1tb",
        name: "1 To",
        price: 1099,
        specifications: { Stockage: "SSD 1 To", Mémoire: "18 Go" },
        inStock: true,
      },
    ],
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13",
    description: "Ultrabook premium avec écran InfinityEdge et performances exceptionnelles",
    price: 649,
    image: "/images/dell-xps.png",
    category: "ordinateurs-portables",
    brand: "Dell",
    inStock: true,
    slug: "dell-xps-13",
    specifications: {
      Processeur: "Intel Core i7-1360P",
      Mémoire: "16 Go LPDDR5",
      Stockage: "SSD 512 Go",
      Écran: "13.4 pouces FHD+",
      Poids: "1.17 kg",
    },
  },
  {
    id: "hp-elitebook-840",
    name: "HP EliteBook 840 G10",
    description: "Ordinateur portable professionnel sécurisé avec Intel vPro",
    price: 729,
    image: "/images/laptop-hero.png",
    category: "ordinateurs-portables",
    brand: "HP",
    inStock: true,
    slug: "hp-elitebook-840",
  },
  {
    id: "lenovo-thinkpad-x1",
    name: "Lenovo ThinkPad X1 Carbon",
    description: "Ultrabook professionnel léger et robuste",
    price: 799,
    image: "/images/laptop-hero.png",
    category: "ordinateurs-portables",
    brand: "Lenovo",
    inStock: false,
    slug: "lenovo-thinkpad-x1",
  },

  // Desktops
  {
    id: "imac-24",
    name: 'iMac 24"',
    description: "iMac tout-en-un avec puce M3 et écran Retina 4.5K",
    price: 799,
    image: "/images/imac.png",
    category: "ordinateurs-de-bureau",
    brand: "Apple",
    inStock: true,
    isPopular: true,
    slug: "imac-24",
    specifications: {
      Processeur: "Apple M3",
      Mémoire: "8 Go de mémoire unifiée",
      Stockage: "SSD 256 Go",
      Écran: "24 pouces Retina 4.5K",
      Couleurs: "7 couleurs disponibles",
    },
  },
  {
    id: "dell-optiplex-7010",
    name: "Dell OptiPlex 7010",
    description: "PC de bureau compact et performant pour les entreprises",
    price: 449,
    image: "/images/laptop-hero.png",
    category: "ordinateurs-de-bureau",
    brand: "Dell",
    inStock: true,
    slug: "dell-optiplex-7010",
  },
  {
    id: "hp-prodesk-600",
    name: "HP ProDesk 600 G6",
    description: "Mini PC professionnel compact et silencieux",
    price: 399,
    image: "/images/laptop-hero.png",
    category: "ordinateurs-de-bureau",
    brand: "HP",
    inStock: true,
    slug: "hp-prodesk-600",
  },

  // Smartphones
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description: "iPhone Pro avec puce A17 Pro et appareil photo révolutionnaire",
    price: 89,
    image: "/images/iphone.png",
    category: "smartphones",
    brand: "Apple",
    inStock: true,
    isNew: true,
    slug: "iphone-15-pro",
    specifications: {
      Écran: "6.1 pouces Super Retina XDR",
      Processeur: "Puce A17 Pro",
      Stockage: "128 Go",
      "Appareil photo": "48 Mpx Principal",
      Batterie: "Jusqu'à 23h de vidéo",
    },
  },
  {
    id: "samsung-galaxy-s24",
    name: "Samsung Galaxy S24",
    description: "Smartphone Android premium avec IA intégrée",
    price: 79,
    image: "/images/iphone.png",
    category: "smartphones",
    brand: "Samsung",
    inStock: true,
    slug: "samsung-galaxy-s24",
  },
  {
    id: "google-pixel-8",
    name: "Google Pixel 8",
    description: "Smartphone Google avec photographie IA avancée",
    price: 69,
    image: "/images/iphone.png",
    category: "smartphones",
    brand: "Google",
    inStock: true,
    slug: "google-pixel-8",
  },

  // Tablets
  {
    id: "ipad-pro-12",
    name: 'iPad Pro 12.9"',
    description: "Tablette professionnelle avec puce M2 et écran Liquid Retina XDR",
    price: 149,
    image: "/images/tablet-hero.png",
    category: "tablettes",
    brand: "Apple",
    inStock: true,
    isPopular: true,
    slug: "ipad-pro-12",
  },
  {
    id: "surface-pro-9",
    name: "Microsoft Surface Pro 9",
    description: "Tablette 2-en-1 avec Windows 11 et processeur Intel",
    price: 129,
    image: "/images/tablet-hero.png",
    category: "tablettes",
    brand: "Microsoft",
    inStock: true,
    slug: "surface-pro-9",
  },

  // Accessories
  {
    id: "dell-monitor-27",
    name: 'Dell UltraSharp 27"',
    description: "Moniteur professionnel 4K avec USB-C",
    price: 49,
    image: "/images/accessories-hero.png",
    category: "accessoires",
    brand: "Dell",
    inStock: true,
    slug: "dell-monitor-27",
  },
  {
    id: "logitech-mx-master",
    name: "Logitech MX Master 3S",
    description: "Souris sans fil premium pour professionnels",
    price: 12,
    image: "/images/accessories-hero.png",
    category: "accessoires",
    brand: "Logitech",
    inStock: true,
    slug: "logitech-mx-master",
  },

  // Printers
  {
    id: "hp-laserjet-pro",
    name: "HP LaserJet Pro M404dn",
    description: "Imprimante laser monochrome professionnelle",
    price: 39,
    image: "/images/printer-hero.png",
    category: "imprimantes",
    brand: "HP",
    inStock: true,
    slug: "hp-laserjet-pro",
  },
  {
    id: "canon-pixma-pro",
    name: "Canon PIXMA PRO-200",
    description: "Imprimante photo professionnelle A3+",
    price: 59,
    image: "/images/printer-hero.png",
    category: "imprimantes",
    brand: "Canon",
    inStock: true,
    slug: "canon-pixma-pro",
  },
]

// Categories with dynamic product counts
export function getCategories(): Category[] {
  const categoryData = [
    {
      id: "ordinateurs-portables",
      name: "Ordinateurs portables",
      description: "Ordinateurs portables professionnels pour tous vos besoins",
      slug: "ordinateurs-portables",
      image: "/images/laptop-hero.png",
    },
    {
      id: "ordinateurs-de-bureau",
      name: "Ordinateurs de bureau",
      description: "Stations de travail performantes pour vos équipes",
      slug: "ordinateurs-de-bureau",
      image: "/images/laptop-hero.png",
    },
    {
      id: "smartphones",
      name: "Smartphones",
      description: "Smartphones professionnels pour vos équipes mobiles",
      slug: "smartphones",
      image: "/images/smartphone-hero.png",
    },
    {
      id: "tablettes",
      name: "Tablettes",
      description: "Tablettes tactiles pour une productivité en déplacement",
      slug: "tablettes",
      image: "/images/tablet-hero.png",
    },
    {
      id: "accessoires",
      name: "Accessoires",
      description: "Accessoires et périphériques pour compléter votre équipement",
      slug: "accessoires",
      image: "/images/accessories-hero.png",
    },
    {
      id: "imprimantes",
      name: "Imprimantes",
      description: "Solutions d'impression pour tous vos besoins professionnels",
      slug: "imprimantes",
      image: "/images/printer-hero.png",
    },
  ]

  // Calculate product count for each category dynamically
  return categoryData.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.category === category.id).length,
  }))
}

export function getProducts(): Product[] {
  return products
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isPopular || product.isNew).slice(0, 8)
}

export function getPopularProducts(): Product[] {
  return products.filter((product) => product.isPopular)
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.isNew)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery),
  )
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((product) => product.brand.toLowerCase() === brand.toLowerCase())
}

export function getAllBrands(): string[] {
  const brands = [...new Set(products.map((product) => product.brand))]
  return brands.sort()
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  return products.filter((p) => p.id !== productId && p.category === product.category).slice(0, limit)
}
