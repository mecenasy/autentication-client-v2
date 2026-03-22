'use client'

import { useRouter } from '@/app/components/navigation/navigation';
import axios from '@/src/api/api';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const Status = () => {
  const t = useTranslations('common');
  const router = useRouter();
  const searchParams = useSearchParams();

  useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const token = searchParams.get('token');
      await axios.post('/api/auth/verification', { token })

      router.replace('/');
      return token;
    },
    retry: false,

  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
      <p className="text-white text-lg">{t('loading')}.</p>
    </div>
  )
};
const SuspenseStatus = () => (
  <Suspense fallback={null}>
    <Status />
  </Suspense>
)
export default SuspenseStatus;
