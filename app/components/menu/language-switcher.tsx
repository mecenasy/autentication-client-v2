'use client';

import { useLocale } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';
import { useRouter, usePathname } from '../navigation/navigation';
import Image from 'next/image';
import poland from '../../assets/poland.png';
import uk from '../../assets/uk.png';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const isEnabled = useLocale() === 'pl';
  const router = useRouter();
  const pathname = usePathname();
  const onSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextLocale = e.target.checked ? 'pl' : 'en';

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative flex gap-3 items-center">
      <Image src={uk} alt={'uk'} height={16} width={16} />
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          id="2fa-toggle"
          className="sr-only peer"
          checked={isEnabled}
          onChange={onSelectChange}
          disabled={isPending}
        />
        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
      </label>
      <Image src={poland} alt={'poland'} height={16} width={16} />
    </div>
  );
}
