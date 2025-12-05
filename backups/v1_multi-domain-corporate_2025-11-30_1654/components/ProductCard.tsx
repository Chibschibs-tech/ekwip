import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  title: string
  image: string
  price: string
  slug: string
}

export function ProductCard({ title, image, price, slug }: ProductCardProps) {
  return (
    <Link href={`/store/product/${slug}`}>
      <Card className="h-full hover:shadow-md transition-all">
        <div className="relative h-48 bg-gray-100 rounded-t-xl overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain p-4" />
        </div>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
          <p className="text-xl font-bold text-blue-600">{price}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
