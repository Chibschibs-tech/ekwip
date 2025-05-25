"use client"

import { useEffect } from "react"

export default function ResponsiveFixes() {
  useEffect(() => {
    // Fix for mobile menu items
    const fixMobileMenu = () => {
      const mobileMenuItems = document.querySelectorAll(".mobile-menu-item")
      mobileMenuItems.forEach((item) => {
        item.classList.add("w-full", "py-3", "px-4")
      })
    }

    // Fix for content overflow
    const fixContentOverflow = () => {
      const contentContainers = document.querySelectorAll("section > div")
      contentContainers.forEach((container) => {
        container.classList.add("max-w-full")
      })
    }

    // Fix for images
    const fixImages = () => {
      const images = document.querySelectorAll("img")
      images.forEach((img) => {
        if (!img.classList.contains("object-contain") && !img.classList.contains("object-cover")) {
          img.classList.add("max-w-full", "h-auto")
        }
      })
    }

    // Apply fixes on mobile
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      fixMobileMenu()
      fixContentOverflow()
      fixImages()
    }

    // Handle resize
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        fixMobileMenu()
        fixContentOverflow()
        fixImages()
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return null
}
