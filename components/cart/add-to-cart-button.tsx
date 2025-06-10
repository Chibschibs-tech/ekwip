"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"

interface AddToNeedsListButtonProps {
  product: {
    id: number
    name: string
    slug?: string
    price: number
    image: string
    category: string
    brand: string
  }
  variant?: "default" | "outline" | "secondary"
  size?: "sm" | "default" | "lg"
  className?: string
}

export default function AddToNeedsListButton({
  product,
  variant = "default",
  size = "default",
  className = "",
}: AddToNeedsListButtonProps) {
  const { addItem, isInCart } = useCart()
  const { t } = useLanguage()
  const [justAdded, setJustAdded] = useState(false)

  const inCart = isInCart(product.id)

  const handleAddToNeedsList = () => {
    if (!inCart) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
      })

      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 2000)
    }
  }

  if (inCart) {
    return (
      <Button
        variant="outline"
        size={size}
        className={`${className} border-green-500 text-green-600 hover:bg-green-50`}
        disabled
      >
        <Check className="h-4 w-4 mr-2" />
        {t("needs_list.added") || "Ajouté"}
      </Button>
    )
  }

  return (
    <Button
      onClick={handleAddToNeedsList}
      variant={variant}
      size={size}
      className={`${className} ${justAdded ? "bg-green-600 hover:bg-green-700" : ""}`}
    >
      {justAdded ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          {t("needs_list.added") || "Ajouté"}
        </>
      ) : (
        <>
          <Plus className="h-4 w-4 mr-2" />
          {t("needs_list.add_to_list") || "Ajouter à ma liste"}
        </>
      )}
    </Button>
  )
}
