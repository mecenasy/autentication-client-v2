import { useTranslations } from 'next-intl';
import { Link } from '../navigation/navigation';

const ReturnLogin = () => {
  const t = useTranslations('changePassword');
  return (
    <div className="text-center">
      <p className="text-red-400 text-lg">{t('linkExpired')}</p>
      <Link href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300 mt-4 inline-block" >
        {t('ask')}
      </Link>
    </div>
  )
};

export default ReturnLogin;
