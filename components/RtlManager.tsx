'use client';
import {useEffect} from 'react';

type Props = { locale: 'fr' | 'en' | 'ar' };

export default function RtlManager({locale}: Props) {
  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute('lang', locale);
    el.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
  }, [locale]);
  return null;
}
