export default function BoutiqueLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-6 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse" />
        </div>
      </section>

      <section className="py-8 px-4 md:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-4xl">
              <div className="h-10 bg-gray-200 rounded flex-1 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-48 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-48 animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
