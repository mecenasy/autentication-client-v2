'use client';

import { useTranslations } from 'next-intl';

export const ConfigSection = () => {
  const t = useTranslations('documentation');

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">{t('sections.config.title')}</h2>
      <p className="mb-4 text-gray-300">{t('sections.config.desc')}</p>
      <ol className="list-decimal list-inside space-y-3 ml-4">
        <li><strong className="text-white">{t('sections.config.steps.1')}</strong></li>
        <li><strong className="text-white">{t('sections.config.steps.2')}</strong></li>
        <li><strong className="text-white">{t('sections.config.steps.3')}</strong>
          <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-400">
            <li><span className="text-green-400">{t('sections.config.credentials.clientId')}</span></li>
            <li><span className="text-green-400">{t('sections.config.credentials.secret')}</span></li>
            <li><span className="text-green-400">{t('sections.config.credentials.loginUrl')}</span></li>
            <li><span className="text-green-400">{t('sections.config.credentials.verifyUrl')}</span></li>
          </ul>
        </li>
      </ol>
    </section>
  );
};
