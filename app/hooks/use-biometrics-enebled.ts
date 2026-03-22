import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from '../../src/api/api';
import { PublicKeyCredentialCreationOptionsJSON, startRegistration } from '@simplewebauthn/browser';


export const useBiometricsEnabled = (setShow: (show: boolean) => void) => {
  const [credentialId, setCredentialId] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (accept: boolean) => {
      if (accept) {
        try {
          const { data: options } = await axios.get<PublicKeyCredentialCreationOptionsJSON>('/api/passkey/biometrics/register-options');
          const regResponse = await startRegistration({ optionsJSON: options });

          await axios.post('/api/passkey/biometrics/verify-registration', regResponse);
          localStorage.setItem(`webauthn_${regResponse.id}`, 'true')
          return regResponse.id;
        } catch (err) {
          console.error('Błąd biometrii:', err);
          setCredentialId('');
        }
      } else {
        localStorage.removeItem(`webauthn_${credentialId}`)
        await axios.delete(`/api/passkey/biometrics/${credentialId}`);
      }
    },

    onSuccess: (data) => {
      setShow(!data);
      setCredentialId(data ?? '');
      queryClient.invalidateQueries({ queryKey: ['passkeys'] });

    },
    onError: () => {
      setCredentialId('');
    },
  });

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    mutation.mutate(checked);
  };

  return {
    isEnabled: Boolean(credentialId),
    handleToggleChange,
    isPending: mutation.isPending,
  };
}
