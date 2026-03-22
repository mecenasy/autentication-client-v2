'use client';

import { useTranslations } from 'next-intl';

export const SecuritySection = () => {
  const t = useTranslations('documentation');

  return (
    <section className="mb-12 bg-red-900/20 p-6 rounded-lg border border-red-900/50">
      <h2 className="text-2xl font-semibold text-red-400 mb-4">{t('sections.security.title')}</h2>
      <ul className="space-y-3">
        <li className="flex items-start">
          <span className="mr-2 text-red-500">⚠</span>
          <span className='text-gray-300'>{t('sections.security.p1')}</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-green-500">✓</span>
          <span className='text-gray-300'>{t('sections.security.p2')}</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-green-500">✓</span>
          <span className='text-gray-300'>{t('sections.security.p3')}</span>
        </li>
      </ul>
    </section>
  );
};
