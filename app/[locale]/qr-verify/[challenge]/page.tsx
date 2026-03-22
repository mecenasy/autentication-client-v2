"use client";

import { useRouter } from '@/app/components/navigation/navigation';
import { PublicKeyCredentialCreationOptionsJSON, startAuthentication } from '@simplewebauthn/browser';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { use } from 'react';

interface Props {
  params: Promise<{ challenge: string }>
  searchParams: Promise<{ nonce: string }>
}
export default function QrVerify(props: Props) {
  const { challenge } = use(props.params);
  const { nonce } = use(props.searchParams);
  const t = useTranslations('qrCodeLogin');
  const router = useRouter();

  useQuery({
    queryKey: ['qr-auth'],
    queryFn: async () => {
      try {
        const { data: options } = await axios.post<PublicKeyCredentialCreationOptionsJSON>(`/api/qr-auth/options`, { challenge, nonce });
        const regResponse = await startAuthentication({ optionsJSON: options });

        await axios.post(`/api/qr-auth/confirm/${challenge}`, regResponse);
        router.replace("/thankyou");
      } catch {
        console.log('')
        await axios.post(`/api/qr-auth/reject/${challenge}`);
        router.replace("/thankyou");

      }
    },
    enabled: !!challenge,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
      <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg mt-24 mb-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          {t('title')}
        </h1>
        <p className="text-white text-center mt-10">
          {t('description')}
        </p>
      </main>
    </div>
  );
}
