"use client";
import { useMutation } from '@tanstack/react-query';
import axios from '../../src/api/api';
import { PublicKeyCredentialCreationOptionsJSON, startAuthentication } from '@simplewebauthn/browser';
import { useTranslations } from 'next-intl';

export const useQuRodeLogin = () => {
  const t = useTranslations('auth');
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const { data: options } = await axios.post<PublicKeyCredentialCreationOptionsJSON>('/api/passkey/biometrics/login-options');
        const regResponse = await startAuthentication({ optionsJSON: options });

        await axios.post('/api/passkey/biometrics/verify-login', regResponse);
        alert(t('loginSuccess'));
      } catch {
        alert(t('loginWrong'));
      }
    },
  });

  const handleToggleChange = () => {
    mutation.mutate();
  };

  return {
    handleToggleChange,
  };
}
