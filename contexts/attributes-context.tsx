"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Attribute } from "@/types/admin"
import { mockAttributes } from "@/lib/mock-data"

interface AttributesContextType {
  attributes: Attribute[]
  addAttribute: (attribute: Attribute) => void
  updateAttribute: (id: string, updates: Partial<Attribute>) => void
  deleteAttribute: (id: string) => void
  getAttribute: (id: string) => Attribute | undefined
  getAttributesByCategory: (categoryId: string) => Attribute[]
  getAttributeName: (attributeId: string) => string
  getAttributeLabel: (attributeId: string, value: string) => string
}

const AttributesContext = createContext<AttributesContextType | undefined>(undefined)

const STORAGE_KEY = "ekwip_admin_attributes"

export function AttributesProvider({ children }: { children: ReactNode }) {
  const [attributes, setAttributes] = useState<Attribute[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setAttributes(JSON.parse(stored))
      } catch (error) {
        console.error("Error loading attributes:", error)
        setAttributes(mockAttributes)
      }
    } else {
      setAttributes(mockAttributes)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAttributes))
    }
  }, [])

  const saveToStorage = (newAttributes: Attribute[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAttributes))
  }

  const addAttribute = (attribute: Attribute) => {
    const newAttributes = [...attributes, attribute]
    setAttributes(newAttributes)
    saveToStorage(newAttributes)
  }

  const updateAttribute = (id: string, updates: Partial<Attribute>) => {
    const newAttributes = attributes.map((attr) => (attr.id === id ? { ...attr, ...updates } : attr))
    setAttributes(newAttributes)
    saveToStorage(newAttributes)
  }

  const deleteAttribute = (id: string) => {
    const newAttributes = attributes.filter((attr) => attr.id !== id)
    setAttributes(newAttributes)
    saveToStorage(newAttributes)
  }

  const getAttribute = (id: string) => {
    return attributes.find((attr) => attr.id === id)
  }

  const getAttributesByCategory = (categoryId: string) => {
    return attributes.filter((attr) => attr.categories && attr.categories.includes(categoryId))
  }

  const getAttributeName = (attributeId: string): string => {
    const attribute = getAttribute(attributeId)
    return attribute?.name || attributeId
  }

  const getAttributeLabel = (attributeId: string, value: string): string => {
    const attribute = getAttribute(attributeId)
    if (!attribute) return value

    if (attribute.type === "select" && attribute.values.includes(value)) {
      return value
    }
    return value
  }

  return (
    <AttributesContext.Provider
      value={{
        attributes,
        addAttribute,
        updateAttribute,
        deleteAttribute,
        getAttribute,
        getAttributesByCategory,
        getAttributeName,
        getAttributeLabel,
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
