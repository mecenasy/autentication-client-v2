"use client";

import { useRouter } from '@/app/components/navigation/navigation';
import { graphql } from '@/app/gql';
import { PublicKeyCredentialCreationOptionsJSON, startAuthentication } from '@simplewebauthn/browser';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@apollo/client/react';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { use, useEffect } from 'react';

interface Props {
  params: Promise<{ challenge: string }>
  searchParams: Promise<{ nonce: string }>
}

const QR_REJECT_MUTATION = graphql(`
  mutation QrReject ($challenge: String!) {
    qrReject(challenge: $challenge) {
      status
    }
  }
`);

const QR_OPTION_MUTATION = graphql(`
  mutation QrOption ($challenge: String!, $nonce: String!) {
    qrOption(challenge: $challenge, nonce: $nonce)    
  }
`);

const QR_CONFIRM_MUTATION = graphql(`
  mutation QrVerify ($challenge: String!, $data: JSON!) {
    qrConfirm(challenge: $challenge, data: $data) {
      status
    }    
  }
`)

export default function QrVerify(props: Props) {
  const { challenge } = use(props.params);
  const { nonce } = use(props.searchParams);

  const t = useTranslations('qrCodeLogin');

  const router = useRouter();

  const [qrReject] = useMutation(QR_REJECT_MUTATION);
  const [qrOption] = useMutation(QR_OPTION_MUTATION);
  const [qrConfirm] = useMutation(QR_CONFIRM_MUTATION);

  useEffect(() => {
    const login = async (challenge: string, nonce: string) => {
      try {
        const { data } = await qrOption({ variables: { challenge, nonce } });
        const options = data?.qrOption;
        console.log("🚀 ~ login ~ options:", options)

        const regResponse = await startAuthentication({ optionsJSON: options });

        await qrConfirm({ variables: { challenge, data: regResponse } });
        router.replace("/thankyou");
      } catch (error) {
        console.log(error)
        await qrReject({ variables: { challenge } });
        router.replace("/thankyou");
      }
    }
    login(challenge, nonce);
  }, [qrConfirm, qrOption, qrReject, challenge, nonce, router])

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
