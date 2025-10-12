import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton className="h-8 w-32 mb-6" />
              <Skeleton className="h-16 w-full mb-4" />
              <Skeleton className="h-16 w-3/4 mb-6" />
              <Skeleton className="h-24 w-full mb-8" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-48" />
              </div>
            </div>
            <Skeleton className="aspect-video w-full rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  )
}
