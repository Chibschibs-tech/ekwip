"use client"

import { useState } from "react"
import Link from "next/link"
import { useNeedsList } from "@/contexts/cart-context"
import { ClipboardList } from "lucide-react"

export function CartIcon() {
  const { items } = useNeedsList()
  const [isHovered, setIsHovered] = useState(false)

  const itemCount = items.length

  return (
    <Link
      href="/ma-liste-besoins"
      className="relative flex items-center text-gray-700 hover:text-[#1f3b57] transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <ClipboardList className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#1f3b57] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
      <span className="ml-2 text-sm font-medium hidden md:inline-block">Liste de besoins</span>

      {/* Tooltip */}
      {isHovered && itemCount > 0 && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 p-3 z-50">
          <p className="text-sm font-medium mb-2 text-gray-700">
            {itemCount} {itemCount === 1 ? "équipement" : "équipements"} dans votre liste
          </p>
          <Link
            href="/ma-liste-besoins"
            className="block w-full text-center bg-[#1f3b57] hover:bg-[#1f3b57]/80 text-white text-xs py-1.5 px-3 rounded-md transition-colors"
          >
            Voir ma liste
          </Link>
        </div>
      )}
    </Link>
  )
}
