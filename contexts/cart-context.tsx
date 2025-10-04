"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/admin"

interface NeedsListItem {
  product: Product
  quantity: number
  duration?: number
}

interface NeedsListContextType {
  items: NeedsListItem[]
  addItem: (product: Product, duration?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearList: () => void
}

const NeedsListContext = createContext<NeedsListContextType | undefined>(undefined)

export function NeedsListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NeedsListItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedItems = localStorage.getItem("needsList")
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems))
      } catch (error) {
        console.error("Error loading needs list:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("needsList", JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (product: Product, duration?: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1, duration } : item,
        )
      }
      return [...prevItems, { product, quantity: 1, duration }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const clearList = () => {
    setItems([])
  }

  return (
    <NeedsListContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearList }}>
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

// Alias pour la compatibilité
export const useCart = useNeedsList
export const CartProvider = NeedsListProvider
