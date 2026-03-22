import { useTranslations } from 'next-intl';

export const HomeInfo = () => {
  const t = useTranslations('authInfo');

  return (
    <div className="flex  min-h-screen items-center justify-center bg-gray-800 font-sans">
      <main className="flex mt-24 mb-12 max-w-3xl flex-col mx-4 items-center justify-center p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white mb-8">{t('title')}</h1>
        <div className="flex flex-col flex-nowrap gap-3">
          <p className="text-gray-300 max-w-2xl mb-2">{t('description')}</p>
          <p className="text-gray-300 max-w-2xl">{t('sections.social.title')}</p>
          <p className="text-gray-300 max-w-2xl ml-3 mb-2">{t('sections.social.description')}</p>
          <p className="text-gray-300 max-w-2xl">{t('sections.traditional.title')}</p>
          <p className="text-gray-300 max-w-2xl ml-3 mb-2">{t('sections.traditional.description')}</p>
          <p className="text-gray-300 max-w-2xl">{t('sections.advanced.title')}</p>
          <p className="text-gray-300 max-w-2xl ml-3">{t('sections.advanced.description')}</p>
          <div>
            <ul className="text-gray-300 list-inside list-['-']">
              <li className='ml-8'>{t('sections.advanced.methods.0')}</li>
              <li className='ml-8'>{t('sections.advanced.methods.1')}</li>
              <li className='ml-8'>{t('sections.advanced.methods.2')}</li>
            </ul>
          </div>
          <p className="text-gray-300 max-w-2xl">{t('sections.linking.title')}</p>
          <p className="text-gray-300 max-w-2xl ml-3 mb-2">{t('sections.linking.description')}</p>
          <p className="text-gray-300 max-w-2xl">{t('sections.sso.title')}</p>
          <p className="text-gray-300 max-w-2xl ml-3 mb-2">{t('sections.sso.description')}</p>
          <p className="text-gray-300 max-w-2xl ml-3 mb-2">{t('sections.sso.dataSecurity')}</p>
          <p className="text-gray-300 max-w-2xl ml-3 mb-2">{t('sections.sso.transparency')}</p>
          <p className="text-gray-300 max-w-2xl ml-3 mb-2">{t('sections.sso.accessManagement')}</p>
        </div>
      </main>
    </div>
  )
}

