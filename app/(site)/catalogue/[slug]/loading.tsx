export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-12 w-64 bg-slate-200 animate-pulse rounded mx-auto mb-6"></div>
          <div className="h-6 w-96 bg-slate-200 animate-pulse rounded mx-auto"></div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-96 bg-slate-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
