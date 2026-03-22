"use client";

import { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { LoginInfo } from '../components/home/login-info';
import { HomeInfo } from '../components/home/home-info';
import { useRouter } from '../components/navigation/navigation';
import { MainLoaderWrapper } from '../components/loading/main-loader-wrapper';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const param = useSearchParams();
  const t = useTranslations('loggedInfo');
  const router = useRouter();


  useEffect(() => {
    const login = param.get('login');
    if (login === 'fail') {
      router.replace('/');
      alert(t('loginFail'))
    }
  }, [param, router, t]);

  return (
    <MainLoaderWrapper>
      {isAuthenticated && user ? <LoginInfo /> : <HomeInfo />}
    </MainLoaderWrapper>
  );
}
