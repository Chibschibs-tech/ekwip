import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Submenu skeleton */}
      <div className="bg-white border-b h-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center gap-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-24 hidden md:block" />
          <Skeleton className="h-8 w-24 hidden md:block" />
          <Skeleton className="h-8 w-24 hidden md:block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-24 lg:hidden" />
            <Skeleton className="h-10 w-44" />
            <Skeleton className="h-10 w-20 hidden sm:block" />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar skeleton */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Skeleton className="h-6 w-20 mb-4" />
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-6 w-24 mt-6 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </aside>

          {/* Products grid skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <Skeleton className="aspect-square" />
                  <div className="p-4">
                    <Skeleton className="h-3 w-16 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-3" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
