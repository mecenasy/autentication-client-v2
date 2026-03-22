import axios from '@/src/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface PassList {
  id: string;
  createAt: Date;
  deviceName: string;
}

export const useBiometricsSettings = (setShow: (show: boolean) => void) => {
  const queryClient = useQueryClient();

  const { data: keys = [], isLoading } = useQuery({
    queryKey: ['passkeys'],
    queryFn: async () => {
      const res = await axios.get<PassList[]>('/api/passkey/biometrics/keys');
      return res.data;
    }
  });

  const { data: isCurrentDeviceActive } = useQuery({
    queryKey: ['isDeviceRegistered', keys],
    queryFn: async () => {
      const isLocal = keys.some((key: PassList) => {
        return localStorage.getItem(`webauthn_${key.id}`) === 'true';

      });
      setShow(!isLocal);
      return isLocal;
    },
    enabled: keys.length >= 0,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/passkey/biometrics/${id}`);
      return id
    },
    onSuccess: (id) => {
      const isCurrentDeviceActive = localStorage.getItem(`webauthn_${id}`);

      if (isCurrentDeviceActive) {
        setShow(true)
        localStorage.removeItem(`webauthn_${id}`);
      }
      queryClient.invalidateQueries({ queryKey: ['passkeys'] });
    }
  });
  const onRemoveKey = (key: string) => {
    deleteMutation.mutate(key)
  }

  return { keys, isLoading, isCurrentDeviceActive, onRemoveKey };
}