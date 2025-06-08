"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"

const Navbar = () => {
  const { t } = useLanguage()

  return (
    <div className="bg-white border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-2xl">
          Ekwip
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/comment-ca-marche" className="text-gray-700 hover:text-ekwip transition-colors">
            {t("nav.how_it_works")}
          </Link>
          <Link href="/catalogue" className="text-gray-700 hover:text-ekwip transition-colors">
            {t("nav.catalog")}
          </Link>
          <Link href="/store" className="text-gray-700 hover:text-ekwip transition-colors">
            {t("nav.store")}
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-ekwip transition-colors">
            {t("nav.contact")}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {t("nav.customer_portal")}
                <p className="text-xs text-gray-500 mt-1">{t("nav.customer_portal_description")}</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{t("nav.customer_portal")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("nav.my_account")}</DropdownMenuItem>
              <DropdownMenuItem>{t("nav.my_orders")}</DropdownMenuItem>
              <DropdownMenuItem>{t("nav.my_invoices")}</DropdownMenuItem>
              <DropdownMenuItem>{t("nav.my_quotes")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Navbar
