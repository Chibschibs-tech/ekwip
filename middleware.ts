// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = new Set(['fr', 'en', 'ar'])

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Laisser passer internals & assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // fichiers statiques
  ) {
    return NextResponse.next()
  }

  // Prépare une réponse (pour pouvoir modifier les headers)
  const res = NextResponse.next()

  // Ajoute X-Robots-Tag: noindex en PREVIEW uniquement (pages HTML)
  if (process.env.VERCEL_ENV === 'preview') {
    const accept = req.headers.get('accept') || ''
    if (accept.includes('text/html')) {
      res.headers.set('x-robots-tag', 'noindex')
    }
  }

  // Si déjà préfixé par une locale → ne rien faire (on renvoie res pour garder les headers)
  const seg1 = pathname.split('/').filter(Boolean)[0]
  if (seg1 && LOCALES.has(seg1)) {
    return res
  }

  // ❌ NE PAS rediriger "/" → "/fr" (pour éviter les boucles avec les redirects `/:locale -> /`)
  // On laisse / et toutes les autres routes passer.
  return res
}

// Matcher: exclut _next, api, et fichiers statiques
export const config = {
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
}
