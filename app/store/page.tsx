import { fetchAllCategories, fetchFilteredProducts, formatPrice } from "@/lib/wordpress-api"
import { Category } from "@/components/Category"
import { ProductCard } from "@/components/ProductCard"

export default async function StorePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const products = await fetchFilteredProducts({
    category: searchParams?.category as string,
  })
  const categories = await fetchAllCategories()

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Store</h1>
      <div className="flex">
        <aside className="w-1/4 pr-4">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Category category={category} />
              </li>
            ))}
          </ul>
        </aside>
        <main className="w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.featuredImage?.node.sourceUrl || ""}
                price={formatPrice(product.price)}
                slug={product.slug}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
