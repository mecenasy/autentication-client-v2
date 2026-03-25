import { useTranslations } from 'next-intl';
import { BiometricsProps } from './types';
import { useBiometricsSettings } from '@/app/hooks/use-biometrics-settings';
import Loading from '../../loading/loading';

export default function BiometricsSettings({ setShow }: BiometricsProps) {
  const t = useTranslations('auth')
  const { keys, isLoading, isCurrentDeviceActive, onRemoveKey } = useBiometricsSettings(setShow);

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 mt-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-xl text-black font-bold mb-4">{t('title')}</h2>
      <div className="space-y-3 mb-6">
        {keys?.map((key) => (
          <div key={key.id} className="flex border text-black border-solid border-gray-300 bg-gray-200  justify-between items-center p-2  rounded">
            <div>
              <p className="font-medium">{key.deviceName || t('default')}</p>
              <p className="text-xs text-gray-500">{t('added', { date: new Date(key.createAt).toLocaleDateString() })}</p>
            </div>
            <button
              onClick={() => onRemoveKey(key.id, key.credentialID)}
              className="text-red-500 text-sm hover:underline"
            >
              {t('remove')}
            </button>
          </div>
        ))}
      </div>
      <hr className="my-4" />
      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
        <div>
          <p className="text-black font-semibold">{t('loggingIn')}</p>
          <p className="text-sm text-blue-700">
            {isCurrentDeviceActive
              ? t('active')
              : t('inactive')}
          </p>
        </div>
      </div>
    </div>
  );
}