// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  description: string
  shortDescription: string
  categoryId: string
  brandId: string
  price: number
  compareAtPrice?: number
  costPrice: number
  images: string[]
  thumbnail: string
  status: "active" | "draft" | "archived"
  stockQuantity: number
  lowStockThreshold: number
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  attributes: Record<string, string>
  tags: string[]
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  image?: string
  icon?: string
  order: number
  isActive: boolean
  productCount: number
  createdAt: string
  updatedAt: string
}

// Brand Types
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

// Attribute Types
export interface Attribute {
  id: string
  name: string
  slug: string
  type: "select" | "text" | "number" | "color"
  values: string[]
  isRequired: boolean
  isFilterable: boolean
  order: number
  categories?: string[] // Liste des IDs de catégories où cet attribut s'applique
  createdAt: string
  updatedAt: string
}

// Inventory Types
export interface Stock {
  id: string
  productId: string
  warehouseId: string
  quantity: number
  reserved: number
  available: number
  lastUpdated: string
}

export interface Warehouse {
  id: string
  name: string
  code: string
  address: string
  city: string
  phone: string
  email: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface StockMovement {
  id: string
  productId: string
  warehouseId: string
  type: "in" | "out" | "adjustment" | "transfer"
  quantity: number
  previousQuantity: number
  newQuantity: number
  reason: string
  reference?: string
  createdBy: string
  createdAt: string
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  shippingAddress: Address
  billingAddress: Address
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  sku: string
  quantity: number
  price: number
  total: number
}

export interface Address {
  fullName: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

// Customer Types
export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  addresses: Address[]
  orders: number
  totalSpent: number
  status: "active" | "inactive" | "blocked"
  notes?: string
  createdAt: string
  updatedAt: string
}

// Supplier Types
export interface Supplier {
  id: string
  name: string
  code: string
  email: string
  phone: string
  website?: string
  address: string
  city: string
  contactPerson: string
  contactPhone: string
  contactEmail: string
  paymentTerms: string
  notes?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Marketing Types
export interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed" | "free_shipping"
  value: number
  description?: string
  minimumPurchase?: number
  usageLimit?: number
  usageCount: number
  perCustomerLimit?: number
  startDate: string
  endDate?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Content Types
export interface Banner {
  id: string
  title: string
  description?: string
  image: string
  link?: string
  buttonText?: string
  position: "hero" | "sidebar" | "footer"
  order: number
  startDate: string
  endDate?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Page {
  id: string
  title: string
  slug: string
  content: string
  metaTitle?: string
  metaDescription?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

// Analytics Types
export interface DashboardStats {
  revenue: {
    total: number
    change: number
  }
  orders: {
    total: number
    change: number
  }
  customers: {
    total: number
    change: number
  }
  products: {
    total: number
    change: number
  }
}

export interface SalesData {
  date: string
  revenue: number
  orders: number
}

// Settings Types
export interface ShopSettings {
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  currency: string
  timezone: string
  language: string
  taxRate: number
  shippingCost: number
  freeShippingThreshold?: number
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
