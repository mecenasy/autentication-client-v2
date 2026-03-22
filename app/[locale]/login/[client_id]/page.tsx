"use client";

import { use, useState } from "react";
import LoginForm from '../../../components/auth/login-form';
import VerifyForm from '../../../components/auth/verify-form';
import { AuthStatus } from '../../../components/types/auth-status';
import { useProviderLogin } from '@/app/hooks/use-provider-login';
import axios from '@/src/api/api';
import { useQuery } from '@tanstack/react-query';
import { BiometricsButton } from '@/app/components/button/biometrics-button';
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';
import { useTranslations } from "next-intl";

interface Props {
  params: Promise<{ locale: string, client_id: string }>
  searchParams: Promise<{ nonce: string }>
}

interface Response {
  clientUrl: string;
  token: string;
}

const isUUID = (str: string) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(str);

export default function LoginPage(props: Props) {
  const t = useTranslations('login');
  const { client_id } = use(props.params)
  const { nonce } = use(props.searchParams)

  const isNonceValid = isUUID(nonce);

  const [verifyType, setVerifyType] = useState<AuthStatus | undefined>(undefined);
  const [login, setLogin] = useState("");

  const result = useQuery<Response>({
    queryKey: ['config'],
    queryFn: async () => {
      try {
        const { data } = await axios.get<Response>(`/api/discovery/${client_id}`);
        return data;

      } catch (error) {
        return Promise.reject(error);
      }
    },
    enabled: isNonceValid,
    refetchOnWindowFocus: false,
  });
  const { data, status } = result;

  const { errors, isPending, register, onSubmit } = useProviderLogin(setVerifyType, setLogin, data?.token ?? '');

  const handleUserVerify = () => {
    if (window.opener) {
      window.opener.postMessage(
        { type: 'AUTH_SUCCESS', token: data?.token, nonce },
        data?.clientUrl ?? ''
      );
    }
    window.close();
  }

  const nonceError = (
    <div className="text-white text-center">
      <h2 className="text-2xl font-bold mb-4">{t('nonceIdentityCrisis.title')}</h2>
      <p>{t('nonceIdentityCrisis.message')}</p>
    </div>);

  const clientError = (
    <div className="text-white text-center">
      <h2 className="text-2xl font-bold mb-4">{t('nonceIdentityCrisis.title')}</h2>
      <p>{t('nonceIdentityCrisis.message')}</p>
    </div>);

  const correct = (
    <>
      {!verifyType && <LoginForm
        hideForgotButton
        errors={errors}
        isPending={isPending}
        onSubmit={onSubmit}
        register={register}
      />}
      <VerifyForm
        verifyType={verifyType}
        login={login}
        callback={handleUserVerify}
      />
      <div className='text-white mt-5 mb-3 text-center'>
        <BiometricsButton callback={handleUserVerify} token={data?.token} />
      </div>
    </>
  )
  return (
    <MainLoaderWrapper>
      <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
        <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
          {isNonceValid
            ? (
              <>
                {status === 'error'
                  ? clientError
                  : status === 'success' && correct
                }
              </>
            )
            : <>{nonceError}</>
          }
        </main>
      </div>
    </MainLoaderWrapper >
  );
}
