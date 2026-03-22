import { useTranslations } from 'next-intl';
import { useAdaptiveLoginEnabled } from '../hooks/use-adaptive-login';

interface EnableAdaptiveLoginProps {
  init: boolean;
}

export const EnableAdaptiveLogin = ({ init }: EnableAdaptiveLoginProps) => {
  const t = useTranslations('settings');
  const { isEnabled, handleToggleChange, isPending } = useAdaptiveLoginEnabled(init);

  return (
    <div className="w-full max-w-md p-6 bg-gray-700 rounded-lg mt-6">
      <div className="flex items-center justify-between">
        <label htmlFor="2fa-toggle" className="text-white font-semibold">
          {isEnabled ? t('disableAdaptiveLogin') : t('enableAdaptiveLogin')}
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="adaptive-login-toggle"
            className="sr-only peer"
            checked={isEnabled}
            onChange={handleToggleChange}
            disabled={isPending}
          />
          <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  )
}