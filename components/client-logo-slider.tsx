"use client"

import { useEffect, useState } from "react"
import ClientLogo from "@/components/client-logo"
import { fetchClientLogos } from "@/lib/wordpress-api"

export default function ClientLogoSlider() {
  const [clients, setClients] = useState([
    { name: "Client 1", logo: "/images/client-logo-1.png" },
    { name: "Client 2", logo: "/images/client-logo-2.png" },
    { name: "Client 3", logo: "/images/client-logo-3.png" },
    { name: "Client 4", logo: "/images/client-logo-4.png" },
    { name: "Client 5", logo: "/images/client-logo-5.png" },
    { name: "Client 6", logo: "/images/client-logo-6.png" },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true)
        const logos = await fetchClientLogos()
        if (logos && logos.length > 0) {
          // Duplicate logos for continuous scrolling
          setClients([...logos, ...logos])
        }
      } catch (error) {
        console.error("Error in client logo slider:", error)
        // Keep the default logos that were set in useState
      } finally {
        setLoading(false)
      }
    }

    fetchLogos()
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <div className="client-logo-slider">
        {clients.map((client, index) => (
          <ClientLogo key={`${client.name}-${index}`} name={client.name} logo={client.logo} />
        ))}
      </div>
    </div>
  )
}
