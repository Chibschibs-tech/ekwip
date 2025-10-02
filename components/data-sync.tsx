"use client"

import { useEffect } from "react"

export function DataSync() {
  useEffect(() => {
    // Cette fonction sera appelée côté client uniquement
    // Elle peut écouter les changements dans localStorage
    const handleStorageChange = () => {
      // Forcer un rechargement des données si nécessaire
      window.dispatchEvent(new Event("ekwip-data-updated"))
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return null
}
