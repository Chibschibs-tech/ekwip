"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Building2,
  Megaphone,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Tag,
  Warehouse,
  TrendingUp,
  FolderTree,
  Palette,
} from "lucide-react"

interface NavItem {
  title: string
  href?: string
  icon: any
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Catalogue",
    icon: Package,
    children: [
      { title: "Produits", href: "/admin/catalogue/products", icon: Package },
      { title: "Catégories", href: "/admin/catalogue/categories", icon: FolderTree },
      { title: "Marques", href: "/admin/catalogue/marques", icon: Tag },
      { title: "Attributs", href: "/admin/catalogue/attributs", icon: Palette },
    ],
  },
  {
    title: "Inventaire",
    icon: Warehouse,
    children: [
      { title: "Stocks", href: "/admin/inventory/stocks", icon: Package },
      { title: "Entrepôts", href: "/admin/inventory/warehouses", icon: Warehouse },
      { title: "Mouvements", href: "/admin/inventory/movements", icon: TrendingUp },
    ],
  },
  {
    title: "Commandes",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Clients",
    href: "/admin/clients",
    icon: Users,
  },
  {
    title: "Fournisseurs",
    href: "/admin/suppliers",
    icon: Building2,
  },
  {
    title: "Marketing",
    icon: Megaphone,
    children: [{ title: "Coupons", href: "/admin/marketing/coupons", icon: Tag }],
  },
  {
    title: "Contenu",
    icon: FileText,
    children: [
      { title: "Bannières", href: "/admin/content/banners", icon: FileText },
      { title: "Pages", href: "/admin/content/pages", icon: FileText },
    ],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Paramètres",
    icon: Settings,
    children: [
      { title: "Boutique", href: "/admin/settings/shop", icon: Settings },
      { title: "Utilisateurs & Rôles", href: "/admin/settings/users", icon: Users },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.title)
    const active = isActive(item.href)

    if (hasChildren) {
      return (
        <div key={item.title}>
          <button
            onClick={() => toggleExpand(item.title)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
              "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
              level > 0 && "pl-8",
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </div>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {isExpanded && (
            <div className="mt-1 space-y-1">{item.children?.map((child) => renderNavItem(child, level + 1))}</div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.title}
        href={item.href || "#"}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
          active
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
          level > 0 && "pl-12",
        )}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.title}</span>
      </Link>
    )
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Ekwip</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="px-3 pb-6 space-y-1">{navigation.map((item) => renderNavItem(item))}</nav>
    </aside>
  )
}
