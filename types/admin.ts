export interface ProductVariation {
  id: string
  name: string
  sku: string
  price: number
  compareAtPrice?: number
  stockQuantity: number
  attributes: Record<string, string>
  image?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  shortDescription: string
  description: string
  categoryId: string
  brandId: string
  price: number
  compareAtPrice?: number
  costPrice: number
  thumbnail: string
  images: string[]
  stockQuantity: number
  lowStockThreshold: number
  status: "active" | "draft" | "archived"
  isFeatured: boolean
  tags: string[]
  attributes: Record<string, string>
  variations?: ProductVariation[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId: string | null
  image?: string
  icon?: string
  isActive: boolean
  order: number
  productCount: number
  createdAt: string
  updatedAt: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
  isActive: boolean
  productCount: number
  createdAt: string
  updatedAt: string
}

export interface AttributeValue {
  value: string
  label?: string
}

export interface Attribute {
  id: string
  name: string
  slug: string
  type: "text" | "number" | "select" | "color" | "boolean"
  values: string[]
  isRequired: boolean
  isFilterable: boolean
  isVariation: boolean
  categories: string[]
  order: number
  createdAt: string
  updatedAt: string
}

export interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  averageOrderValue: number
  revenueGrowth: number
  ordersGrowth: number
  customersGrowth: number
  topProducts: Array<{
    id: string
    name: string
    revenue: number
    orders: number
  }>
  recentOrders: Array<{
    id: string
    customer: string
    date: string
    amount: number
    status: string
  }>
}
