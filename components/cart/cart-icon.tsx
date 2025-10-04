"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useNeedsList } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"

export default function CartIcon() {
  const { totalItems } = useNeedsList()
  const { t } = useLanguage()

  return (
    <Link
      href="/ma-liste-besoins"
      className="relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="hidden sm:inline">{t("needs_list")}</span>
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
