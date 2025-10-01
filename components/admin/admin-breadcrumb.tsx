"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function AdminBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/")
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    return { label, path }
  })

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link href="/admin" className="flex items-center hover:text-[#1f3b57]">
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center">
          <ChevronRight className="h-4 w-4" />
          {index === breadcrumbs.length - 1 ? (
            <span className="ml-2 font-medium text-[#1f3b57]">{crumb.label}</span>
          ) : (
            <Link href={crumb.path} className="ml-2 hover:text-[#1f3b57]">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
