'use client';

import { SecuritySection } from '@/app/components/documentation/security-section';
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';
import { Link } from '@/app/components/navigation/navigation';
import { useTranslations } from 'next-intl';

export default function SecurityPage() {
  const t = useTranslations('documentation');

  return (
    <MainLoaderWrapper>
      <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
        <main className="flex flex-col mb-16 mt-32 w-l max-w-4xl items-center justify-start p-8 bg-gray-900 rounded-lgshadow-lg">
          <Link href="/projects/documentation" className="text-green-500 hover:text-green-400 mb-4 inline-block">
            &larr; {t('back_to_docs')}
          </Link>
          <SecuritySection />
          <div className="flex justify-between w-full mt-8">
            <Link href="/projects/documentation/process" className="text-green-500 hover:text-green-400">
              &larr; {t('nav.previous')}
            </Link>
            <span className="text-gray-500">{t('nav.next_disabled')}</span>
          </div>
        </main>
      </div>
    </MainLoaderWrapper>
  );
}
