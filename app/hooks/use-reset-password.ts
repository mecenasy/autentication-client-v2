import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '@/src/api/api';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../components/schemas/schemas';
import { useTranslations } from 'next-intl';

export type ResetPasswordFormValues = z.infer<ReturnType<typeof resetPasswordSchema>>;

export const useResetPassword = (token: string, setMessage: (message: string) => void) => {
  const t = useTranslations('password');
  const tSchemas = useTranslations('schemas');

  const { data: tokenVerification, isLoading: isVerifying } = useQuery({
    queryKey: ['verifyResetToken', token],
    queryFn: () => axios.post('/auth/check-token', { token }),
    enabled: !!token,
    retry: false,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema(tSchemas)),
  });

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordFormValues) => {
      return axios.post('/auth/reset-password', { token, password: data.password });
    },
    onSuccess: () => {
      setMessage(t('resetSuccess'));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message === 'TOKEN_EXPIRED'
        ? t('tokenExpired')
        : t('resetWrong');
      setMessage(message);
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    mutation.mutate(data);
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isPending: mutation.isPending,
    isVerifying,
    tokenVerification,
  };
}

