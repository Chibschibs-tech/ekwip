export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="h-8 w-48 bg-slate-200 animate-pulse rounded"></div>
              <div className="h-16 w-full bg-slate-200 animate-pulse rounded"></div>
              <div className="h-24 w-full bg-slate-200 animate-pulse rounded"></div>
            </div>
            <div className="h-96 bg-slate-200 animate-pulse rounded-2xl"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
