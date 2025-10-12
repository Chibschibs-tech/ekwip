'use client';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {locales, Locale} from '../i18n/config';

type Props = { current?: Locale };

export default function LanguageSwitcher({current = 'fr'}: Props) {
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const router = useRouter();

  const qs = () => {
    const q = new URLSearchParams();
    searchParams.forEach((v, k) => q.set(k, v));
    const s = q.toString();
    return s ? `?${s}` : '';
  };

  function switchTo(locale: Locale) {
    // Étape 2: navigation simple (on branchera le vrai routage à l’étape 3)
    router.push('/' + (locale === 'fr' ? '' : locale) + qs());
  }

  return (
    <div role="group" aria-label="Language switcher">
      {locales.map((l) => (
        <button key={l} onClick={() => switchTo(l as Locale)} style={{marginRight: 8}}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
