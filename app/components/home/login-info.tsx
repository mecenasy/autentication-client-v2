import { useTranslations } from 'next-intl';

export const LoginInfo = () => {
  const t = useTranslations('loggedInfo');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
      <main className="flex my-24 max-w-3xl flex-col mx-4 items-center justify-center p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white mb-8">{t('title')}</h1>
        <div className="flex flex-col flex-nowrap gap-3">
          <p className="text-gray-300 font-bold">{t('settings.title')}</p>
          <p className="text-gray-300 ml-3 mb-2">{t('settings.description')}</p>
          <p className="text-gray-300 font-bold">{t('sourceCode.title')}</p>
          <p className="text-gray-300 ml-3" >
            <span className='inline-block'>{t('sourceCode.backend.title')}</span>
            <span className='inline-block'>{t('sourceCode.backend.description')}</span>
          </p>
          <p className="text-gray-300 ml-3" >
            <span className='inline-block'>{t('sourceCode.frontend.title')}</span>
            <span className='inline-block'>{t('sourceCode.frontend.description')}</span>
          </p>
        </div>
      </main>
    </div>
  )
}