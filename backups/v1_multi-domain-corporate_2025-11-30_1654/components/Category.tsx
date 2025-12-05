import Link from "next/link"

interface CategoryProps {
  category: {
    id: number
    name: string
    count: number
  }
}

export function Category({ category }: CategoryProps) {
  return (
    <Link
      href={`/store?category=${category.id}`}
      className="block py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
    >
      {category.name} ({category.count})
    </Link>
  )
}
