import { routing } from '@/i18n/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'pl'];



export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);