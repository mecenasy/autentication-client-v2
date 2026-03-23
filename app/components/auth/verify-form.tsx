import Input from '../Input';
import { useVerify } from '../../hooks/use-verify';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { AuthStatus } from '@/app/gql/graphql';

interface VerifyFormProps {
  verifyType?: AuthStatus;
  login: string
  callback?: () => void;
}

interface SockedData {
  type: string;
  code: string;
}
const VerifyForm = ({ verifyType, login, callback }: VerifyFormProps) => {
  const t = useTranslations('login');
  const { isPending, errors, register, onSubmit, } = useVerify(login, verifyType, callback);
  const webSocketUrl = useRef<Socket | null>(null);
  const [smsStatus, setSmsCode] = useState<string | null>(null);

  const getVerificationMessage = () => {
    switch (verifyType) {
      case AuthStatus.Sms:
      case AuthStatus.Email:
      case AuthStatus.ProviderSms:
        return t('sms');
      case AuthStatus.Tfa:
        return t('tfa');
      default:
        return t('default');
    }
  };


  useEffect(() => {
    webSocketUrl.current = io(`${process.env.NEXT_PUBLIC_API_HOST_URL}/getaway`, {
      query: {
        challenge: '6f7aee1a-3084-4790-abb4-95689432f0d2',
      },
      transports: ['websocket'],
    });

    webSocketUrl.current.on('code', ({ code, type }: SockedData) => {
      if (type === 'SMS-CODE') {
        setSmsCode(code);
      }
    });

    return () => {
      if (webSocketUrl.current) {
        webSocketUrl.current.close();
      }
    };
  }, []);

  if (!verifyType) {
    return null;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white text-center mb-4">{t('verifyType')}</h1>
      <p className="text-center text-gray-300 mb-6">{getVerificationMessage()}</p>
      <form onSubmit={onSubmit}>
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
          className="w-full px-6 py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:bg-gray-500"
        >
          {isPending ? t('verifying') : t('verify')}
        </button>
        {verifyType === AuthStatus.Sms && (
          <>
            <p className="text-center text-black p-2.5 border-2 border-blue-500 bg-gray-200 rounded-lg my-4">{smsStatus}</p>
            <p className="text-center text-gray-300 my-4">{t('smsInfo')}</p>
          </>
        )}
      </form>
    </>
  )
};

export default VerifyForm;
