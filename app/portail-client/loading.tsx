import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-ekwip" />
        <h2 className="mt-4 text-xl font-semibold">Chargement...</h2>
        <p className="text-muted-foreground">Veuillez patienter</p>
      </div>
    </div>
  )
}
