export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse" />
              <div className="h-16 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-16 bg-gray-200 rounded mb-8 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-12 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-48 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 w-96 bg-gray-200 rounded mx-auto mb-6 animate-pulse" />
            <div className="h-6 w-128 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 bg-gray-200 rounded-full mb-4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
