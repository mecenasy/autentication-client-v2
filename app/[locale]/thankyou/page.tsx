"use client";

import { useTranslations } from 'next-intl';

export default function QrVerify() {
  const t = useTranslations('qrCodeLogin');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
      <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg mt-24 mb-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          {t('thankYou')}
        </h1>
      </main>
    </div>
  );
}
