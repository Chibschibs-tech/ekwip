"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { useProducts } from "@/contexts/products-context"

// Labels mapping for better readability
const LABEL_MAPPING: Record<string, string> = {
  "admin": "Admin",
  "catalogue": "Catalogue",
  "products": "Produits",
  "categories": "Catégories",
  "brands": "Marques",
  "view": "Détails",
  "edit": "Modifier",
  "new": "Nouveau",
  "orders": "Commandes",
  "clients": "Clients",
  "settings": "Paramètres",
  "inventaire": "Inventaire",
  "fournisseurs": "Fournisseurs",
  "marketing": "Marketing",
  "contenu": "Contenu",
  "analytics": "Analytics",
  "parametres": "Paramètres",
}

export function AdminBreadcrumb() {
  const pathname = usePathname()
  const { products } = useProducts()
  const segments = pathname.split("/").filter(Boolean)

  // Ne pas afficher le breadcrumb sur la page d'accueil admin
  if (pathname === "/admin") {
    return null
  }

  // Helper to get label for segment
  const getLabel = (segment: string, index: number, allSegments: string[]): string => {
    // Check if this is a product ID (in view or edit pages)
    const previousSegment = allSegments[index - 1]
    if ((previousSegment === "view" || previousSegment === "edit") && segment.startsWith("prod-")) {
      // Try to find product name
      const product = products.find(p => p.id === segment)
      if (product) {
        // Truncate if too long
        const name = product.name.length > 40 ? product.name.substring(0, 40) + "..." : product.name
        return name
      }
    }

    // Check mapping
    const lowerSegment = segment.toLowerCase()
    if (LABEL_MAPPING[lowerSegment]) {
      return LABEL_MAPPING[lowerSegment]
    }

    // Default: capitalize and replace dashes
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
  }

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label = getLabel(segment, index, segments)
    const isLast = index === segments.length - 1

    return { href, label, isLast }
  })

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6 flex-wrap">
      <Link href="/admin" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
          {breadcrumb.isLast ? (
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]" title={breadcrumb.label}>
              {breadcrumb.label}
            </span>
          ) : (
            <Link href={breadcrumb.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
