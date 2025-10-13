// app/[locale]/page.tsx
import LanguageSwitcher from '../../components/LanguageSwitcher';
import type {Metadata} from 'next';
import type {Locale} from '@/i18n/config';

export function generateMetadata({params}: {params: {locale: Locale}}): Metadata {
  // on pointe les 3 locales + x-default
  return {
    alternates: {
      languages: {
        en: '/en',
        fr: '/fr',
        ar: '/ar',
        'x-default': '/fr'
      }
    }
  };
}

export default function HomeLocalized() {
  return (
    <main style={{ padding: 24 }}>
      <LanguageSwitcher />
      <h1>Home — Localized route</h1>
      <p>Cette page teste /fr et /en sans impacter les routes actuelles, 
         tout en préservant la route et la query lors du switch.</p>
    </main>
  );
}
