import { useTranslations } from 'next-intl';
import { use2faEnabled } from '../hooks/use-qr-enebled';

interface Enable2faProps {
  setQrCode: (qrCode: string) => void;
  init: boolean;
}

export const Enable2fa = ({ init, setQrCode }: Enable2faProps) => {
  const t = useTranslations('settings');
  const { isEnabled, handleToggleChange, isPending } = use2faEnabled(init, setQrCode);

  return (
    <div className="flex items-center justify-between">
      <label htmlFor="2fa-toggle" className="text-white font-semibold">
        {isEnabled ? t('disable2fa') : t('enable2fa')}
      </label>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          id="2fa-toggle"
          className="sr-only peer"
          checked={isEnabled}
          onChange={handleToggleChange}
          disabled={isPending}
        />
        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  )
}