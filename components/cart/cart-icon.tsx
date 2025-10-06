"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useNeedsList } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"

export function CartIcon() {
  const { totalItems } = useNeedsList()
  const { t } = useLanguage()

  return (
    <Link href="/ma-liste-besoins">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            {totalItems}
          </Badge>
        )}
        <span className="sr-only">{t("nav.my-needs")}</span>
      </Button>
    </Link>
  )
}
