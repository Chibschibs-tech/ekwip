import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="text-center">
        <Image src="/images/logo-black.png" alt="Ekwip" width={180} height={60} className="h-12 w-auto mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">Page non trouvée</h2>
        <p className="mt-2 text-gray-500">Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
        <div className="mt-6">
          <Link href="/portail-client/dashboard">
            <Button>Retour au tableau de bord</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
