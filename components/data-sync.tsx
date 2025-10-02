"use client"

import { useEffect } from "react"

export function DataSync() {
  useEffect(() => {
    // Ce composant écoute les changements dans localStorage
    // et force un rafraîchissement quand les données changent
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ekwip_admin_products" || e.key === "ekwip_admin_categories" || e.key === "ekwip_admin_brands") {
        // Recharger la page pour mettre à jour les données
        window.location.reload()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return null
}
