"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/admin"

interface NeedsListItem {
  product: Product
  duration?: number
  quantity: number
}

interface NeedsListContextType {
  items: NeedsListItem[]
  addItem: (product: Product, duration?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearList: () => void
  totalItems: number
}

const NeedsListContext = createContext<NeedsListContextType | undefined>(undefined)

export function NeedsListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NeedsListItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("needsList")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse needs list:", e)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("needsList", JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (product: Product, duration?: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.duration === duration)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.duration === duration
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { product, duration, quantity: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      setItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
    }
  }

  const clearList = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <NeedsListContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearList, totalItems }}>
      {children}
    </NeedsListContext.Provider>
  )
}

export function useNeedsList() {
  const context = useContext(NeedsListContext)
  if (context === undefined) {
    throw new Error("useNeedsList must be used within a NeedsListProvider")
  }
  return context
}

// Alias for backward compatibility
export const CartProvider = NeedsListProvider
export const useCart = useNeedsList
