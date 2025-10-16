'use client';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

const LOCALES = ['fr', 'en', 'ar'] as const;
type Locale = typeof LOCALES[number];

function currentLocale(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return (LOCALES as readonly string[]).includes(first as any) ? (first as Locale) : 'fr';
}

export default function LanguageSwitcher() {
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
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) {
      router.push(`/${locale}${qs()}`);
      return;
    }
    if ((LOCALES as readonly string[]).includes(parts[0] as any)) {
      parts[0] = locale;
    } else {
      parts.unshift(locale);
    }
    const target = '/' + parts.join('/') + qs();

    // Hook analytics
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ekwip_lang_change', {
        detail: {from: currentLocale(pathname), to: locale, path: pathname}
      }));
    }

    router.push(target);
  }

  const active = currentLocale(pathname);

  return (
    <div role="group" aria-label="Language switcher">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-current={l === active ? 'true' : undefined}
          style={{marginRight: 8, fontWeight: l === active ? 700 : 400}}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
