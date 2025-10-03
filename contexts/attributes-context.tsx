"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Attribute } from "@/types/admin"
import { mockAttributes } from "@/lib/mock-data"

interface AttributesContextType {
  attributes: Attribute[]
  addAttribute: (attribute: Attribute) => void
  updateAttribute: (id: string, attribute: Partial<Attribute>) => void
  deleteAttribute: (id: string) => void
  getAttribute: (id: string) => Attribute | undefined
  getAttributeName: (slug: string) => string
  getAttributesByCategory: (categoryId: string) => Attribute[]
}

const AttributesContext = createContext<AttributesContextType | undefined>(undefined)

const STORAGE_KEY = "ekwip_admin_attributes"

export function AttributesProvider({ children }: { children: ReactNode }) {
  const [attributes, setAttributes] = useState<Attribute[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setAttributes(JSON.parse(stored))
      } else {
        setAttributes(mockAttributes)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAttributes))
      }
    } catch (error) {
      console.error("Error loading attributes:", error)
      setAttributes(mockAttributes)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (isInitialized && attributes.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(attributes))
      } catch (error) {
        console.error("Error saving attributes:", error)
      }
    }
  }, [attributes, isInitialized])

  const addAttribute = (attribute: Attribute) => {
    setAttributes((prev) => [...prev, attribute])
  }

  const updateAttribute = (id: string, updatedAttribute: Partial<Attribute>) => {
    setAttributes((prev) => prev.map((a) => (a.id === id ? { ...a, ...updatedAttribute } : a)))
  }

  const deleteAttribute = (id: string) => {
    setAttributes((prev) => prev.filter((a) => a.id !== id))
  }

  const getAttribute = (id: string) => {
    return attributes.find((a) => a.id === id)
  }

  const getAttributeName = (slug: string) => {
    const attribute = attributes.find((a) => a.slug === slug)
    return attribute?.name || slug
  }

  const getAttributesByCategory = (categoryId: string) => {
    return attributes.filter((a) => a.categories.includes(categoryId) || a.categories.length === 0)
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <AttributesContext.Provider
      value={{
        attributes,
        addAttribute,
        updateAttribute,
        deleteAttribute,
        getAttribute,
        getAttributeName,
        getAttributesByCategory,
      }}
    >
      {children}
    </AttributesContext.Provider>
  )
}

export function useAttributes() {
  const context = useContext(AttributesContext)
  if (context === undefined) {
    throw new Error("useAttributes must be used within an AttributesProvider")
  }
  return context
}
