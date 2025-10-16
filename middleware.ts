import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const LOCALES = ['fr', 'en', 'ar'] as const;

export function middleware(req: NextRequest) {
  const {pathname, search} = req.nextUrl;

  // Laisser passer internals & assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // fichiers statiques
  ) return NextResponse.next();

  // Si déjà préfixé par une locale → ne rien faire
  const seg1 = pathname.split('/').filter(Boolean)[0];
  if ((LOCALES as readonly string[]).includes(seg1 as any)) {
    return NextResponse.next();
  }

  // Rediriger uniquement la racine
  if (pathname === '/' || pathname === '') {
    const url = req.nextUrl.clone();
    url.pathname = '/fr';
    url.search = search;
    return NextResponse.redirect(url);
  }

  // Laisser passer tout le reste
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)']
};
