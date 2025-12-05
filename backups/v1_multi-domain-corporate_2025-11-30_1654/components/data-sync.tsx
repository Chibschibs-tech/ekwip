"use client"

import { useEffect } from "react"

export function DataSync() {
  useEffect(() => {
    // This component listens for localStorage changes and forces a re-render
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith("ekwip_admin_")) {
        // Force a page reload when admin data changes
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
