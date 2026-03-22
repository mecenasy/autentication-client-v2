"use client";

import Biometrics from '@/app/components/auth/biometrics/biometrics';
import { EnableAdaptiveLogin } from '@/app/components/enable-adaptive-login';
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';
import TwoFactorAuth from '@/app/components/two-factory-auth';
import { useAuth } from '@/app/hooks/use-auth';
import { useTranslations } from 'next-intl';

export default function SettingsPage() {
  const { isAuthenticated, user } = useAuth();
  const t = useTranslations('settings');

  return (
    <MainLoaderWrapper>
      {isAuthenticated && user && (
        <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
          <main className="flex flex-col w-l min-h-96 items-center justify-center p-8 bg-gray-900 rounded-lgshadow-lg">
            <h1 className="text-4xl font-bold text-white text-center mb-8">{t('manage')}</h1>
            <EnableAdaptiveLogin init={user.isAdaptiveLoginEnabled} />
            <TwoFactorAuth isInitiallyEnabled={user.is2faEnabled} login={user.email} />
            <Biometrics />
          </main>
        </div>
      )}
    </MainLoaderWrapper>
  )
}
