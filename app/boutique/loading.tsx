import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BoutiqueLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="mb-2 h-10 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* Filters Skeleton */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Skeleton className="h-10 md:col-span-2" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>

      {/* Sort and Results Skeleton */}
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-[180px]" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-0">
              <Skeleton className="h-48 w-full rounded-t-lg" />
              <div className="p-4">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-2 h-8 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
