"use client";

import { useTranslations } from 'next-intl';
import OAuthButtons from '../../components/button/o-auth-buttons';
import Input from "../../components/Input";
import { useRegister } from '../../hooks/use-register';

export default function RegistrationPage() {
  const { errors, isPending, register, onSubmit } = useRegister();
  const t = useTranslations('register');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
      <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          {t('register')}
        </h1>
        <form onSubmit={onSubmit}>
          <Input
            id="email"
            label={t('email')}
            type="email"
            register={register}
            error={errors.email}
            autoComplete="email"
          />
          <Input
            id="phone"
            label={t('phone')}
            type="tel"
            register={register}
            error={errors.phone}
            autoComplete="tel"
          />
          <Input
            id="password"
            label={t('password')}
            type="password"
            register={register}
            error={errors.password}
            autoComplete="new-password"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-6 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-gray-500"
          >
            {isPending ? t('registration') : t('singUp')}
          </button>
          <div className='text-white mt-5 mb-3 text-center'>
            {t('social')}
            <div className='my-3'>
              <OAuthButtons type={'register'} />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
