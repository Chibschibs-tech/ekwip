// app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {locales, type Locale} from '../../i18n/config';
import {notFound} from 'next/navigation';
// ajoute cet import en haut
import RtlManager from '@/components/RtlManager';




export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: Locale};
}) {
  const locale = params.locale;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Indique la locale pour cette requête
  setRequestLocale(locale);

  // Charge les messages (via i18n/request.ts)
  const messages = await getMessages();

  // ⚠️ Ne pas rendre <html>/<body> ici : c’est géré par app/layout.tsx
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
   
<NextIntlClientProvider locale={locale} messages={messages}>
  <RtlManager locale={locale} />
  {children}
</NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  );
}
