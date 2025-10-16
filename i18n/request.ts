// i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, locales} from './config';
import {MESSAGES} from './messages';

export default getRequestConfig(async ({locale}) => {
  const l = (locales as readonly string[]).includes(locale as string)
    ? (locale as string)
    : defaultLocale;

  // ⬇️ plus de dynamic import : on lit dans la map statique
  const messages = MESSAGES[l as keyof typeof MESSAGES] ?? MESSAGES[defaultLocale];

  return {locale: l, messages};
});
