"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface DaasLinkProps {
    href: string
    className?: string
    children: React.ReactNode
}

/**
 * Smart link component that automatically uses the correct DaaS URL
 * - Local: http://daas.localhost:3000
 * - Production: https://daas.ekwip.ma
 */
export function DaasLink({ href, className, children }: DaasLinkProps) {
    const [daasUrl, setDaasUrl] = useState("https://daas.ekwip.ma")

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hostname = window.location.hostname
            const port = window.location.port || "3000"
            
            // Check if we're in local development
            if (hostname === "localhost" || hostname === "127.0.0.1") {
                setDaasUrl(`http://daas.localhost:${port}`)
            }
            // Production: keep default https://daas.ekwip.ma
        }
    }, [])

    const fullUrl = `${daasUrl}${href}`
    
    return (
        <Link href={fullUrl} className={className}>
            {children}
        </Link>
    )
}

