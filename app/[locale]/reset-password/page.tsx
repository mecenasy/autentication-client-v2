"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useResetPassword } from '../../hooks/use-reset-password';
import ReturnLogin from '../../components/reset/return-login';
import TokenExpired from '../../components/reset/token-expired';
import ResetForm from '../../components/reset/reset-form';
import Loading from '@/app/components/loading/loading';
import { useTranslations } from 'next-intl';


function ResetPasswordComponent() {
  const searchParams = useSearchParams();
  const t = useTranslations('password');
  const token = searchParams.get('token');

  const [message, setMessage] = useState<string | null>(null);

  const {
    isVerifying,
    tokenVerification,
    ...rest
  } = useResetPassword(token ?? '', setMessage);

  if (isVerifying) {
    return <p className="text-white">{t('verifying')}</p>;
  }

  if (!token || tokenVerification?.status !== 200) {
    return <ReturnLogin />
  }

  if (message) {
    return <TokenExpired message={message} />
  }

  return <ResetForm {...rest} />;
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 font-sans">
      <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
        <Suspense fallback={<Loading />}>
          <ResetPasswordComponent />
        </Suspense>
      </main>
    </div>
  )
}
