"use client"

import { useEffect } from "react"

/**
 * Composant de synchronisation des données entre l'admin et le frontend
 * Ce composant écoute les changements dans localStorage et rafraîchit la page si nécessaire
 */
export function DataSync() {
  useEffect(() => {
    // Fonction pour vérifier les mises à jour
    const checkForUpdates = () => {
      // Vérifier si des données ont été mises à jour dans l'admin
      const lastUpdate = localStorage.getItem("admin_last_update")
      const lastCheck = sessionStorage.getItem("frontend_last_check")

      if (lastUpdate && lastUpdate !== lastCheck) {
        // Mettre à jour le dernier check
        sessionStorage.setItem("frontend_last_check", lastUpdate)

        // Si ce n'est pas la première visite, rafraîchir les données
        if (lastCheck) {
          console.log("Nouvelles données détectées depuis l'admin")
          // Forcer un rafraîchissement des données
          window.dispatchEvent(new Event("storage"))
        }
      }
    }

    // Vérifier au montage
    checkForUpdates()

    // Vérifier périodiquement (toutes les 5 secondes)
    const interval = setInterval(checkForUpdates, 5000)

    // Écouter les événements de stockage
    window.addEventListener("storage", checkForUpdates)

    return () => {
      clearInterval(interval)
      window.removeEventListener("storage", checkForUpdates)
    }
  }, [])

  return null
}
