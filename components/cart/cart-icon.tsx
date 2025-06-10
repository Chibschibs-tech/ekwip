import Link from "next/link"
import { useNeedsList } from "@/contexts/cart-context"
import { ShoppingBag } from "lucide-react"

const CartIcon = () => {
  const { getTotalItems } = useNeedsList()

  return (
    <Link href="/ma-liste-besoins" className="relative">
      <ShoppingBag className="h-6 w-6 text-gray-500" aria-hidden="true" />
      {getTotalItems() > 0 ? (
        <span className="absolute -top-2 -right-2 rounded-full bg-red-600 px-1 text-xs font-bold text-white">
          {getTotalItems()}
        </span>
      ) : null}
      <span className="text-xs">Ma liste de besoins</span>
    </Link>
  )
}

export default CartIcon
