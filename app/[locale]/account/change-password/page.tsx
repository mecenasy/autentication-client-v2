"use client";

import Input from "@/app/components/Input";
import { useChangePassword } from '../../../hooks/use-change-password';
import { useTranslations } from 'next-intl';

export default function ChangePasswordPage() {
  const { errors, register, onSubmit, isPending } = useChangePassword();
  const t = useTranslations('changePassword');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
      <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          {t('title')}
        </h1>
        <form onSubmit={onSubmit}>
          <Input
            id="oldPassword"
            label={t('old')}
            type="password"
            register={register}
            error={errors.oldPassword}
            autoComplete="current-password"
          />
          <Input
            id="password"
            label={t('new')}
            type="password"
            register={register}
            error={errors.password}
            autoComplete="new-password"
          />
          <Input
            id="confirmPassword"
            label={t('confirm')}
            type="password"
            register={register}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-6 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500"
          >
            {isPending ? t('sending') : t('send')}
          </button>
        </form>
      </main>
    </div>
  );
}
