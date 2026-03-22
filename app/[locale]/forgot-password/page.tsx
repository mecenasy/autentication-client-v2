"use client";

import Input from "@/app/components/Input";
import { useForgotPassword } from '../../hooks/use-forgot-password';
import { useTranslations } from 'next-intl';
import { Link } from '@/app/components/navigation/navigation';

export default function ForgotPasswordPage() {
  const { errors, isPending, register, onSubmit } = useForgotPassword();
  const t = useTranslations('password');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
      <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          {t('reset')}
        </h1>
        <p className="text-center text-gray-300 mb-8">{t('login')}</p>
        <form onSubmit={onSubmit}>
          <Input
            id="login"
            label={t('label')}
            type="text"
            register={register}
            error={errors.login}
            autoComplete="username"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-6 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500"
          >
            {isPending ? t('sending') : t('send')}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
            {t('back')}
          </Link>
        </div>
      </main>
    </div>
  );
}
