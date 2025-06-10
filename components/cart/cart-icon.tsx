"use client"

import { ClipboardList } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function NeedsListIcon() {
  const { getTotalItems } = useCart()
  const { t } = useLanguage()
  const totalItems = getTotalItems()

  return (
    <Link href="/devis">
      <Button variant="outline" size="sm" className="relative group">
        <ClipboardList className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">{t("nav.needs_list")}</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-ekwip text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {t("nav.needs_list_description")}
        </div>
      </Button>
    </Link>
  )
}
