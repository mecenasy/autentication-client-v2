import { useBiometricsLogin } from '@/app/hooks/use-biometrics-login';
import { useTranslations } from 'next-intl';
interface Props {
  callback?: () => void;
  token?: string;

}
export const BiometricsButton = ({ token, callback }: Props) => {
  const t = useTranslations('auth');
  const { handleToggleChange } = useBiometricsLogin(token, callback);

  return (
    <button onClick={handleToggleChange} className='text-sm px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75'>
      <span className='hidden md:block'>{t('loginKey')}</span>
    </button>
  )
}