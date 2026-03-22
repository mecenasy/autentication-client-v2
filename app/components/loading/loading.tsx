import { useTranslations } from 'next-intl';

const Loading = () => {
  const t = useTranslations('common');
  return (
    <div className="flex h-32 items-center justify-center bg-gray-800 font-sans">
      <p className="text-white text-lg">{t('loading')}.</p>
    </div>
  )
};

export default Loading;
