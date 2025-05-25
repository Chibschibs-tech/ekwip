import { notFound } from "next/navigation"

import { fetchProductBySlug, fetchRelatedProducts, formatPrice } from "@/lib/wordpress-api"
import { AddToCart } from "@/components/store/add-to-cart"
import { RelatedProducts } from "@/components/store/related-products"

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await fetchProductBySlug(params.slug)

  if (!product) {
    return notFound()
  }

  const relatedProducts = await fetchRelatedProducts(product.id)

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.featuredImage?.node?.sourceUrl || "/placeholder.png"}
            alt={product.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: product.content }} />
          <p className="text-xl font-semibold mb-4">Price: {formatPrice(product.price)}</p>
          <AddToCart productId={product.id} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <RelatedProducts products={relatedProducts} />
        </div>
      )}
    </div>
  )
}
