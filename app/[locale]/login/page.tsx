"use client";

import { useState } from "react";
import LoginForm from '../../components/auth/login-form';
import VerifyForm from '../../components/auth/verify-form';
import { useTranslations } from 'next-intl';
import { useLogin } from '@/app/hooks/use-login';
import OAuthButtons from '@/app/components/button/o-auth-buttons';
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';
import { BiometricsButton } from '@/app/components/button/biometrics-button';
import Link from 'next/link';
import { AuthStatus } from '@/app/gql/graphql';

export default function LoginPage() {
  const [verifyType, setVerifyType] = useState<AuthStatus | undefined>(undefined);
  const [login, setLogin] = useState("");
  const { errors, isPending, register, onSubmit } = useLogin(setVerifyType, setLogin);

  const t = useTranslations('login');

  return (
    <MainLoaderWrapper>
      <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
        <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
          {!verifyType && <LoginForm errors={errors} isPending={isPending} onSubmit={onSubmit} register={register} />}
          <VerifyForm verifyType={verifyType} login={login} />

          <div className='flex justify-between  gap-3 text-white mt-5 mb-3 text-center'>
            <BiometricsButton />
            <Link href="/qr-auth" className="text-sm px-6 py-3 flex items-center bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75">
              <span >{t('loginQrCode')}</span>
            </Link>
          </div>


          <div className='text-white mt-5 mb-3 text-center'>
            {t('social')}
            <div className='my-3'>
              <OAuthButtons type={'login'} />
            </div>
          </div>
        </main>
      </div>
    </MainLoaderWrapper>
  );
}
