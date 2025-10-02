"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function DataSync() {
  const router = useRouter()

  useEffect(() => {
    // Écouter les changements dans localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ekwip_admin_products" || e.key === "ekwip_admin_categories" || e.key === "ekwip_admin_brands") {
        // Rafraîchir la page pour charger les nouvelles données
        router.refresh()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [router])

  return null
}
