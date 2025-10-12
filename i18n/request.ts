import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, locales} from './config';

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) locale = defaultLocale;
  const messages = (await import(`../messages/${locale}/common.json`)).default;
  return {messages};
});
