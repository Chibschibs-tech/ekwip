// i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, locales} from './config';

export default getRequestConfig(async ({locale}) => {
  // Normalise la locale reçue
  const l = (locales as readonly string[]).includes(locale as string)
    ? (locale as string)
    : defaultLocale;

  const messages = (await import(`../messages/${l}/common.json`)).default;

  // 👇 renvoyer explicitement la locale + les messages
  return {locale: l, messages};
});
