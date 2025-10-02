"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function AdminBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // Ne pas afficher le breadcrumb sur la page d'accueil admin
  if (pathname === "/admin") {
    return null
  }

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    const isLast = index === segments.length - 1

    return { href, label, isLast }
  })

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link href="/admin" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-2" />
          {breadcrumb.isLast ? (
            <span className="text-gray-900 dark:text-white font-medium">{breadcrumb.label}</span>
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
