
import axios from '@/src/api/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';


export const useAdaptiveLoginEnabled = (init: boolean) => {
  const [isEnabled, setIsEnabled] = useState(init);

  const mutation = useMutation({
    mutationFn: (accept: boolean) => axios.post('/api/user-settings/adaptive-login', { accept }),
  });

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsEnabled(checked);
    mutation.mutate(checked);
  };

  return {
    isEnabled,
    handleToggleChange,
    isPending: mutation.isPending,
  };
}