"use client";
import { useMutation } from '@tanstack/react-query';
import axios from '../../src/api/api';
import { PublicKeyCredentialCreationOptionsJSON, startAuthentication } from '@simplewebauthn/browser';
import { useTranslations } from 'next-intl';
import { useRouter } from '../components/navigation/navigation';

export const useBiometricsLogin = (token?: string, callback?: () => void) => {
  const t = useTranslations('auth')
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const { data: options } = await axios.post<PublicKeyCredentialCreationOptionsJSON>('/api/passkey/biometrics/options');
        const regResponse = await startAuthentication({ optionsJSON: options });
        let verifyUrl = '/api/passkey/biometrics/verify';

        if (token) {
          verifyUrl = `/api/provider-auth/biometrics/verify/${token}`;
        }

        await axios.post(verifyUrl, regResponse);
        callback?.();
      } catch {
        alert(t('loginWrong'));
      }
    },
    onSuccess: () => {
      router.replace('/');
    },
    onError: () => {
      alert(t('loginWrong'));
    },
  });

  const handleToggleChange = () => {
    mutation.mutate();
  };

  return {
    handleToggleChange,
  };
}
