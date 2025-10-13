'use client';
import Link, {LinkProps} from 'next/link';
import {useParams, useSearchParams} from 'next/navigation';
import type {Locale} from '@/i18n/config';

type Props = LinkProps & {
  locale?: Locale;
  preserveQuery?: boolean;
  children?: React.ReactNode;
};

export default function LocaleLink({
  locale,
  preserveQuery = true,
  href,
  children,
  ...rest
}: Props) {
  const params = useParams() as {locale?: Locale};
  const currentLocale: Locale = locale ?? params?.locale ?? 'fr';

  // rebuild ?a=1&b=2 si demandé
  const search = useSearchParams();
  const q = new URLSearchParams();
  if (preserveQuery) {
    search.forEach((v, k) => q.set(k, v));
  }
  const suffix = q.toString() ? `?${q.toString()}` : '';

  // normalise la cible
  let path = typeof href === 'string' ? href : String(href);
  if (!path.startsWith('/')) path = `/${path}`;

  // préfixe /[locale] si manquant, ou remplace la 1ère section si déjà locale
  const parts = path.split('/').filter(Boolean);
  const KNOWN = ['fr', 'en', 'ar'] as const;
  if ((KNOWN as readonly string[]).includes(parts[0] as any)) {
    parts[0] = currentLocale;
  } else {
    parts.unshift(currentLocale);
  }
  const localized = '/' + parts.join('/') + suffix;

  return (
    <Link href={localized} {...rest}>
      {children}
    </Link>
  );
}
