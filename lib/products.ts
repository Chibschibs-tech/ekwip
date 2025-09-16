// This file will be used to fetch products from WooCommerce in the future
// For now, it returns mock data

export type ProductVariant = {
  id: string
  name: string
  price: number
  firstMonthPrice?: number
  specifications: { [key: string]: string }
}

export type ProductConfiguration = {
  processor: ProductVariant[]
  memory: ProductVariant[]
  storage: ProductVariant[]
}

export type Product = {
  id: number
  name: string
  description: string
  shortDescription: string
  basePrice: number
  baseFirstMonthPrice?: number
  rentalDuration?: number // in months
  image: string
  images?: string[]
  category: string
  slug: string
  featured: boolean
  new: boolean
  configurations?: ProductConfiguration
  specifications?: { [key: string]: string }
}

// Update the product images and pricing
export const products: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    description: "Ordinateur portable professionnel Apple avec puce M2 Pro, idéal pour les créatifs et développeurs.",
    shortDescription: "Ordinateur portable professionnel Apple",
    basePrice: 12000,
    rentalDuration: 36,
    image: "/images/macbook-pro.png",
    category: "Ordinateurs portables",
    slug: "macbook-pro-14",
    featured: true,
    new: false,
    configurations: {
      processor: [
        {
          id: "m2-pro",
          name: "Apple M2 Pro",
          price: 0,
          specifications: { Processeur: "Apple M2 Pro" },
        },
        {
          id: "m2-max",
          name: "Apple M2 Max",
          price: 2000,
          specifications: { Processeur: "Apple M2 Max" },
        },
      ],
      memory: [
        {
          id: "16gb",
          name: "16 Go RAM",
          price: 0,
          specifications: { Mémoire: "16 Go RAM" },
        },
        {
          id: "32gb",
          name: "32 Go RAM",
          price: 1500,
          specifications: { Mémoire: "32 Go RAM" },
        },
      ],
      storage: [
        {
          id: "512gb",
          name: "512 Go SSD",
          price: 0,
          specifications: { Stockage: "512 Go SSD" },
        },
        {
          id: "1tb",
          name: "1 To SSD",
          price: 1000,
          specifications: { Stockage: "1 To SSD" },
        },
      ],
    },
    specifications: {
      Écran: '14" Liquid Retina XDR',
      Garantie: "1 an Apple Care",
    },
  },
  {
    id: 2,
    name: "Dell XPS 15",
    description: "Ordinateur portable haut de gamme avec écran InfinityEdge et performances exceptionnelles.",
    shortDescription: "Ordinateur portable haut de gamme Dell",
    basePrice: 9500,
    rentalDuration: 36,
    image: "/images/dell-xps.png",
    category: "Ordinateurs portables",
    slug: "dell-xps-15",
    featured: false,
    new: false,
    configurations: {
      processor: [
        {
          id: "i5-13500h",
          name: "Intel Core i5-13500H",
          price: 0,
          specifications: { Processeur: "Intel Core i5-13500H" },
        },
        {
          id: "i7-13700h",
          name: "Intel Core i7-13700H",
          price: 1200,
          specifications: { Processeur: "Intel Core i7-13700H" },
        },
      ],
      memory: [
        {
          id: "16gb",
          name: "16 Go RAM",
          price: 0,
          specifications: { Mémoire: "16 Go RAM" },
        },
        {
          id: "32gb",
          name: "32 Go RAM",
          price: 800,
          specifications: { Mémoire: "32 Go RAM" },
        },
      ],
      storage: [
        {
          id: "512gb",
          name: "512 Go SSD",
          price: 0,
          specifications: { Stockage: "512 Go SSD" },
        },
        {
          id: "1tb",
          name: "1 To SSD",
          price: 600,
          specifications: { Stockage: "1 To SSD" },
        },
      ],
    },
    specifications: {
      Écran: '15.6" 4K OLED',
      "Carte graphique": "NVIDIA RTX 4060",
    },
  },
  {
    id: 3,
    name: 'iMac 24"',
    description: "Ordinateur tout-en-un élégant avec écran Retina 4.5K et puce Apple M1.",
    shortDescription: "Ordinateur tout-en-un Apple",
    basePrice: 8500,
    rentalDuration: 36,
    image: "/images/imac.png",
    category: "Ordinateurs de bureau",
    slug: "imac-24",
    featured: false,
    new: true,
    specifications: {
      Processeur: "Apple M1",
      Mémoire: "16 Go RAM",
      Stockage: "512 Go SSD",
      Écran: '24" 4.5K Retina',
      Couleurs: "7 couleurs disponibles",
    },
  },
  {
    id: 4,
    name: "iPhone 15 Pro",
    description: "Smartphone haut de gamme avec appareil photo professionnel et puce A17 Pro.",
    shortDescription: "Smartphone haut de gamme Apple",
    basePrice: 4500,
    rentalDuration: 24,
    image: "/images/iphone.png",
    category: "Smartphones",
    slug: "iphone-15-pro",
    featured: true,
    new: false,
    specifications: {
      Processeur: "Apple A17 Pro",
      Stockage: "256 Go",
      Écran: '6.1" Super Retina XDR',
      "Appareil photo": "48 MP Pro",
      Forfait: "100 Go data inclus",
    },
  },
  {
    id: 5,
    name: "Dell Mobile Precision Workstation 5690",
    description:
      "Station de travail mobile haut de gamme avec processeur Intel Core Ultra 7 165H vPro, 32 Go LPDDR5x, carte graphique NVIDIA RTX 2000 Ada 8 Go GDDR6, écran 16\" FHD tactile, clavier français rétroéclairé avec lecteur d'empreintes, Wi-Fi 7, Bluetooth, Windows 11 Professionnel et suite logicielle complète incluant Microsoft 365.",
    shortDescription: "Station de travail mobile haut de gamme",
    basePrice: 1029,
    baseFirstMonthPrice: 2590,
    rentalDuration: 36,
    image:
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-2.avif",
    images: [
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-1.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-2.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-3.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-5.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-6.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-7.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-8.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-9.avif",
      "https://hs6evtdbiabuzmxs.public.blob.vercel-storage.com/products/precision-5690-workstation/workstation-precision-16-5690-black-gallery-10.avif",
    ],
    category: "Ordinateurs portables",
    slug: "dell-mobile-precision-workstation-5690",
    featured: true,
    new: true,
    configurations: {
      processor: [
        {
          id: "ultra7-155h",
          name: "Intel Core Ultra 7 155H vPro",
          price: 0,
          specifications: { Processeur: "Intel Core Ultra 7 155H vPro" },
        },
        {
          id: "ultra7-165h",
          name: "Intel Core Ultra 7 165H vPro",
          price: 200,
          specifications: { Processeur: "Intel Core Ultra 7 165H vPro" },
        },
        {
          id: "ultra9-185h",
          name: "Intel Core Ultra 9 185H vPro",
          price: 500,
          specifications: { Processeur: "Intel Core Ultra 9 185H vPro" },
        },
      ],
      memory: [
        {
          id: "16gb",
          name: "16 Go LPDDR5x",
          price: 0,
          specifications: { Mémoire: "16 Go LPDDR5x" },
        },
        {
          id: "32gb",
          name: "32 Go LPDDR5x",
          price: 400,
          specifications: { Mémoire: "32 Go LPDDR5x" },
        },
        {
          id: "64gb",
          name: "64 Go LPDDR5x",
          price: 1000,
          specifications: { Mémoire: "64 Go LPDDR5x" },
        },
      ],
      storage: [
        {
          id: "512gb",
          name: "512 Go SSD NVMe",
          price: 0,
          specifications: { Stockage: "512 Go SSD NVMe" },
        },
        {
          id: "1tb",
          name: "1 To SSD NVMe",
          price: 300,
          specifications: { Stockage: "1 To SSD NVMe" },
        },
        {
          id: "2tb",
          name: "2 To SSD NVMe",
          price: 800,
          specifications: { Stockage: "2 To SSD NVMe" },
        },
      ],
    },
    specifications: {
      "Carte graphique": "NVIDIA RTX 2000 Ada 8 Go GDDR6",
      Écran: '16" FHD (1920x1200) tactile',
      Clavier: "Français rétroéclairé avec lecteur d'empreintes",
      Connectivité: "Wi-Fi 7, Bluetooth 5.3",
      Système: "Windows 11 Professionnel",
      Logiciels: "Microsoft 365 inclus",
      Garantie: "3 ans Dell ProSupport",
    },
  },
]

// These functions will be replaced with actual API calls in the future
export const getProducts = () => products

export const getFeaturedProducts = () => products.filter((product) => product.featured)

export const getNewProducts = () => products.filter((product) => product.new)

export const getProductsByCategory = (category: string) => products.filter((product) => product.category === category)

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug)

// Helper function to format price with spaces
export const formatPrice = (price: number): string => {
  return price.toLocaleString("fr-FR").replace(/,/g, " ")
}
