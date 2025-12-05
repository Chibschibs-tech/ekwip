"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Minus, Plus } from "lucide-react"
import { useCart, type CartItem } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"

interface CartItemProps {
  item: CartItem
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, updateDuration, removeItem } = useCart()
  const { t } = useLanguage()

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, item.quantity + change)
    updateQuantity(item.id, newQuantity)
  }

  const handleDurationChange = (duration: string) => {
    updateDuration(item.id, Number.parseInt(duration))
  }

  const totalPrice = item.price * item.quantity * item.duration

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Link href={`/catalogue/product/${item.slug}`}>
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={64}
              height={64}
              className="w-full h-full object-contain p-2"
            />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <Link href={`/catalogue/product/${item.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-ekwip transition-colors">{item.name}</h3>
        </Link>
        <p className="text-sm text-gray-600">
          {item.category} • {item.brand}
        </p>
        <p className="text-sm font-medium text-ekwip">{item.price} MAD/mois</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Quantity */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 min-w-[60px]">{t("cart.quantity")}:</span>
          <div className="flex items-center border rounded-lg">
            <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} className="h-8 w-8 p-0">
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">{item.quantity}</span>
            <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(1)} className="h-8 w-8 p-0">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 min-w-[50px]">{t("cart.duration")}:</span>
          <Select value={item.duration.toString()} onValueChange={handleDurationChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="36">36</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">{t("common.month")}</span>
        </div>

        {/* Total Price */}
        <div className="text-right min-w-[100px]">
          <p className="font-semibold text-gray-800">{totalPrice} MAD</p>
          <p className="text-xs text-gray-500">{t("cart.total")}</p>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
