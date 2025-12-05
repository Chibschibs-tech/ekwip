"use client"

import { useEffect } from "react"

export default function MobileOptimizations() {
  useEffect(() => {
    // Ensure touch targets are at least 44x44px
    const enhanceTouchTargets = () => {
      const touchTargets = document.querySelectorAll('a, button, [role="button"]')
      touchTargets.forEach((target) => {
        const rect = target.getBoundingClientRect()
        if (rect.width < 44 || rect.height < 44) {
          target.classList.add("mobile-touch-target")
        }
      })
    }

    // Add padding to elements that might be too close to the edge
    const enhanceEdgePadding = () => {
      const edgeElements = document.querySelectorAll(".edge-content")
      edgeElements.forEach((element) => {
        element.classList.add("mobile-padding")
      })
    }

    // Run optimizations
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      enhanceTouchTargets()
      enhanceEdgePadding()
    }

    // Handle orientation change
    const handleOrientationChange = () => {
      setTimeout(() => {
        enhanceTouchTargets()
        enhanceEdgePadding()
      }, 300)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("orientationchange", handleOrientationChange)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("orientationchange", handleOrientationChange)
      }
    }
  }, [])

  return null
}
