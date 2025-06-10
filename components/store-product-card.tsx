import type { Product } from "@medusajs/medusa"
import { formatAmount } from "@medusajs/medusa-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import { Button } from "./ui/button"

type Props = {
  product: Product
}

const StoreProductCard = ({ product }: Props) => {
  const { t } = useTranslation()
  const [variant] = product.variants || []
  const price = variant?.prices?.[0]

  const displayPrice = price
    ? formatAmount({
        amount: price.amount,
        currency: price.currency_code || "",
      })
    : null

  return (
    <Link href={`/catalogue/product/${product.slug}`}>
      <div className="h-full w-full flex flex-col">
        <div className="relative w-full aspect-square">
          <Image src={product.thumbnail || ""} alt={product.title} fill className="object-cover" />
        </div>
        <div className="mt-4 flex flex-col">
          <h3 className="text-sm">{product.title}</h3>
          <div className="flex items-center justify-between text-sm mt-1">
            <p>{displayPrice}</p>
          </div>
          <Link href={`/catalogue/product/${product.slug}`}>
            <Button variant="outline" className="w-full" size="sm">
              {t("common.view_details")}
            </Button>
          </Link>
        </div>
      </div>
    </Link>
  )
}

export default StoreProductCard
