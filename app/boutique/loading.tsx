import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function BoutiqueLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mb-4 bg-blue-500/20" />
          <Skeleton className="h-6 w-96 bg-blue-500/20" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Skeleton */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-40" />
            </div>
          </CardContent>
        </Card>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <Skeleton className="aspect-square rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-28" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
