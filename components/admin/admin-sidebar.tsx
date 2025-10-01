"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tags,
  Sliders,
  Warehouse,
  ShoppingCart,
  Users,
  Truck,
  Megaphone,
  FileText,
  BarChart3,
  Settings,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NavItem {
  title: string
  href?: string
  icon: React.ReactNode
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: "Tableau de bord",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Catalogue",
    icon: <Package className="h-5 w-5" />,
    children: [
      { title: "Produits", href: "/admin/catalogue/products", icon: <Package className="h-4 w-4" /> },
      { title: "Catégories", href: "/admin/catalogue/categories", icon: <FolderTree className="h-4 w-4" /> },
      { title: "Marques", href: "/admin/catalogue/brands", icon: <Tags className="h-4 w-4" /> },
      { title: "Attributs", href: "/admin/catalogue/attributes", icon: <Sliders className="h-4 w-4" /> },
    ],
  },
  {
    title: "Inventaire",
    icon: <Warehouse className="h-5 w-5" />,
    children: [
      { title: "Stocks", href: "/admin/inventory/stocks", icon: <Package className="h-4 w-4" /> },
      { title: "Entrepôts", href: "/admin/inventory/warehouses", icon: <Warehouse className="h-4 w-4" /> },
      { title: "Mouvements", href: "/admin/inventory/movements", icon: <BarChart3 className="h-4 w-4" /> },
    ],
  },
  {
    title: "Commandes",
    href: "/admin/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: "Clients",
    href: "/admin/customers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Fournisseurs",
    href: "/admin/suppliers",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "Marketing",
    icon: <Megaphone className="h-5 w-5" />,
    children: [{ title: "Coupons", href: "/admin/marketing/coupons", icon: <Tags className="h-4 w-4" /> }],
  },
  {
    title: "Contenu",
    icon: <FileText className="h-5 w-5" />,
    children: [
      { title: "Bannières", href: "/admin/content/banners", icon: <FileText className="h-4 w-4" /> },
      { title: "Pages", href: "/admin/content/pages", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Paramètres",
    icon: <Settings className="h-5 w-5" />,
    children: [
      { title: "Boutique", href: "/admin/settings/shop", icon: <Settings className="h-4 w-4" /> },
      { title: "Utilisateurs", href: "/admin/settings/users", icon: <Users className="h-4 w-4" /> },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>(["Catalogue"])

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-[#1f3b57]">Ekwip Admin</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <div>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm font-medium",
                      openItems.includes(item.title) && "bg-gray-100",
                    )}
                    onClick={() => toggleItem(item.title)}
                  >
                    {item.icon}
                    <span className="ml-3 flex-1 text-left">{item.title}</span>
                    <ChevronRight
                      className={cn("h-4 w-4 transition-transform", openItems.includes(item.title) && "rotate-90")}
                    />
                  </Button>
                  {openItems.includes(item.title) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href!}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100",
                            pathname === child.href ? "bg-[#1f3b57] text-white hover:bg-[#1f3b57]" : "text-gray-700",
                          )}
                        >
                          {child.icon}
                          <span className="ml-3">{child.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href!}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100",
                    pathname === item.href ? "bg-[#1f3b57] text-white hover:bg-[#1f3b57]" : "text-gray-700",
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
