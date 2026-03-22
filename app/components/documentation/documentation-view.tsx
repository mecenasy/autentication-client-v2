'use client';

import { Link } from '../../components/navigation/navigation';
import { useTranslations } from 'next-intl';

export const DocumentationView = () => {
  const t = useTranslations('documentation');

  const sections = [
    {
      title: t('sections.config.title'),
      description: t('sections.config.short_desc'),
      link: '/projects/documentation/config',
    },
    {
      title: t('sections.process.title'),
      description: t('sections.process.short_desc'),
      link: '/projects/documentation/process',
    },
    {
      title: t('sections.security.title'),
      description: t('sections.security.short_desc'),
      link: '/projects/documentation/security',
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-5xl text-gray-300">
      <div className="mb-8">
        <div className='flex justify-between'>
          <Link href="/projects" className="text-green-500 hover:text-green-400 mb-4 inline-block">
            &larr; {t('back')}
          </Link>
          <Link href={process.env.NEXT_PUBLIC_DEMO_URL ?? ''} className="text-green-500 hover:text-green-400 mb-4 inline-block">
            {t('demo')}
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">{t('title')}</h1>
        <p className="text-lg text-gray-400">{t('subtitle')}</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="mb-8 text-lg leading-relaxed">
          {t('intro')}
        </p>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <Link key={index} href={section.link} className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <h2 className="text-2xl font-semibold text-white mb-2">{section.title}</h2>
              <p className="text-gray-400">{section.description}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};
