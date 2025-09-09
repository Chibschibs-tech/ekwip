"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface NeedsListItem {
  id: number
  name: string
  slug: string
  price: number
  image: string
  category: string
  brand: string
  quantity: number
  duration: number // rental duration in months
}

type NeedsListContextType = {
  items: NeedsListItem[]
  addToNeedsList: (item: Omit<NeedsListItem, "quantity" | "duration">) => void
  removeFromNeedsList: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  updateDuration: (id: number, duration: number) => void
  clearNeedsList: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  isInNeedsList: (id: number) => boolean
}

const NeedsListContext = createContext<NeedsListContextType>({
  items: [],
  addToNeedsList: () => {},
  removeFromNeedsList: () => {},
  updateQuantity: () => {},
  updateDuration: () => {},
  clearNeedsList: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  isInNeedsList: () => false,
})

export function NeedsListProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<NeedsListItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ekwip-needs-list")
      if (saved) {
        try {
          setItems(JSON.parse(saved))
        } catch (error) {
          console.error("Error loading needs list:", error)
        }
      }
    }
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ekwip-needs-list", JSON.stringify(items))
    }
  }, [items])

  const addToNeedsList = (newItem: Omit<NeedsListItem, "quantity" | "duration">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id)

      if (existingItem) {
        // If item exists, just increase quantity
        return currentItems.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Add new item with default values
        return [...currentItems, { ...newItem, quantity: 1, duration: 12 }]
      }
    })
  }

  const removeFromNeedsList = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromNeedsList(id)
      return
    }
    setItems((currentItems) => currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const updateDuration = (id: number, duration: number) => {
    setItems((currentItems) => currentItems.map((item) => (item.id === id ? { ...item, duration } : item)))
  }

  const clearNeedsList = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  // Fixed: Calculate monthly total, not total for entire duration
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const isInNeedsList = (id: number) => {
    return items.some((item) => item.id === id)
  }

  return (
    <NeedsListContext.Provider
      value={{
        items,
        addToNeedsList,
        removeFromNeedsList,
        updateQuantity,
        updateDuration,
        clearNeedsList,
        getTotalItems,
        getTotalPrice,
        isInNeedsList,
      }}
    >
      {children}
    </NeedsListContext.Provider>
  )
}

export function useNeedsList() {
  const context = useContext(NeedsListContext)
  if (!context) {
    throw new Error("useNeedsList must be used within a NeedsListProvider")
  }
  return context
}

// Keep the old exports for compatibility
export const useCart = useNeedsList
export const CartProvider = NeedsListProvider
export type CartItem = NeedsListItem
