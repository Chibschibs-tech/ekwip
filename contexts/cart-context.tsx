"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
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

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  updateDuration: (id: number, duration: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getCartSummary: () => string
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  updateDuration: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  getCartSummary: () => "",
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("ekwip-cart")
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart))
        } catch (error) {
          console.error("Error loading cart from localStorage:", error)
        }
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ekwip-cart", JSON.stringify(items))
    }
  }, [items])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id)

      if (existingItem) {
        // If item exists, increase quantity
        return currentItems.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Add new item with default values
        return [...currentItems, { ...newItem, quantity: 1, duration: 12 }]
      }
    })
  }

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((currentItems) => currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const updateDuration = (id: number, duration: number) => {
    setItems((currentItems) => currentItems.map((item) => (item.id === id ? { ...item, duration } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity * item.duration, 0)
  }

  const getCartSummary = () => {
    if (items.length === 0) return ""

    let summary = "Équipements sélectionnés pour devis :\n\n"

    items.forEach((item) => {
      const totalPrice = item.price * item.quantity * item.duration
      summary += `• ${item.name}\n`
      summary += `  Quantité: ${item.quantity}\n`
      summary += `  Durée: ${item.duration} mois\n`
      summary += `  Prix: ${item.price} MAD/mois/unité\n`
      summary += `  Total: ${totalPrice} MAD\n\n`
    })

    summary += `TOTAL ESTIMÉ: ${getTotalPrice()} MAD\n\n`
    summary += "Merci de me fournir un devis détaillé pour ces équipements."

    return summary
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateDuration,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getCartSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
