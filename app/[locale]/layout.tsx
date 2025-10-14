// app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {locales, type Locale} from '../../i18n/config';
import {notFound} from 'next/navigation';
import RtlManager from '@/components/RtlManager';

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: Locale}>; // 👈 Promise
}) {
  const {locale} = await params;      // 👈 await

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // Segment layout (pas de <html>/<body>)
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RtlManager locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
