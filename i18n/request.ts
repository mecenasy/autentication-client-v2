import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { routing } from './routing';

export default getRequestConfig(async ({ locale: providedLocale, }) => {
  let locale: string | undefined = providedLocale;

  if (!locale) {
    const cookieStore = await cookies();
    const headerStore = await headers();

    locale = cookieStore.get('NEXT_LOCALE')?.value ||
      headerStore.get('x-next-intl-locale') ||
      routing.defaultLocale;
  }

  if (!routing.locales.includes(locale as 'en' | 'pl')) {
    locale = routing.defaultLocale;
  }

  return ({
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Europe/Warsaw'
  })
});