"use client";

import { useTranslations } from 'next-intl';
import { ConfigForm } from '../../components/config/config-form';
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';


export default function ConfigPage() {
  const t = useTranslations();
  return (
    <MainLoaderWrapper>
      <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
        <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            {t('new')}
          </h1>
          <ConfigForm />
        </main>
      </div>
    </MainLoaderWrapper>
  );
}
