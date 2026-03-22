'use client';

import { ConfigSection } from '@/app/components/documentation/config-section';
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';
import { Link } from '@/app/components/navigation/navigation';
import { useTranslations } from 'next-intl';

export default function ConfigPage() {
  const t = useTranslations('documentation');

  return (
    <MainLoaderWrapper>
      <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
        <main className="flex flex-col mb-16 mt-32 w-l max-w-4xl items-center justify-start p-8 bg-gray-900 rounded-lgshadow-lg">
          <Link href="/projects/documentation" className="text-green-500 hover:text-green-400 mb-4 inline-block">
            &larr; {t('back_to_docs')}
          </Link>
          <ConfigSection />
          <div className="flex justify-between w-full mt-8">
            <span className="text-gray-500">{t('nav.previous_disabled')}</span>
            <Link href="/projects/documentation/process" className="text-green-500 hover:text-green-400">
              {t('nav.next')} &rarr;
            </Link>
          </div>
        </main>
      </div>
    </MainLoaderWrapper>
  );
}
