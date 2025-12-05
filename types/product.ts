export interface Product {
  id: number
  name: string
  description: string
  shortDescription: string
  price: number
  salePrice?: number
  stock: number
  image: string
  category: string
  brand: string
  tags: string[]
  specifications: Record<string, string>
  slug: string
  featured: boolean
  new: boolean
}

export interface FilterOption {
  id: string
  label: string
  count: number
}

export interface PriceRange {
  min: number
  max: number
}

export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: PriceRange
  specifications: Record<string, string[]>
  inStock: boolean
  onSale: boolean
  search: string
}
