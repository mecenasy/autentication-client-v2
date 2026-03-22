import Input from './Input';
import Image from 'next/image';
import { use2fa } from '../hooks/use-2fa';
import { useTranslations } from 'next-intl';
import { useSpring, animated } from '@react-spring/web';

interface QrVerifyProps {
  qrCode: string;
  login: string;
  onSuccess: () => void
}

const QrVerify = ({ qrCode, login, onSuccess }: QrVerifyProps) => {
  const t = useTranslations('settings');
  const { errors, isPending, register, onSubmit } = use2fa(login, onSuccess);
  const animationProps = useSpring({
    from: { opacity: 0, height: '0px', marginTop: '0px' },
    to: { opacity: 1, height: qrCode ? '460px' : '0px', marginTop: qrCode ? '16px' : '0px' },
    config: { tension: 200, duration: 200, friction: 20 },
  });

  return (
    <animated.div style={animationProps} className="flex overflow-hidden flex-col items-center">
      <p className="text-white text-center mb-4">
        {t('scan')}
      </p>
      <div className="p-4 bg-white rounded-lg">
        {qrCode && <Image src={qrCode} alt="QR Code" width={200} height={200} />}
      </div>
      <form onSubmit={onSubmit} className="w-full mt-4">
        <Input
          id="code"
          label={t('code')}
          type="text"
          register={register}
          error={errors.code}
          autoComplete="one-time-code"
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500"
        >
          {isPending ? t('verifying') : t('verify')}
        </button>
      </form>
    </animated.div>
  )
};

export default QrVerify;
