import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { useMutation } from '@tanstack/react-query';
import axios from '@/src/api/api';
import { loginSchema } from '../components/schemas/schemas';
import { AuthStatus } from '../components/types/auth-status';
import { useTranslations } from 'next-intl';
import { BaseSyntheticEvent } from 'react';

type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;

export interface LoginHook {
  errors: FieldErrors<LoginFormValues>;
  register: UseFormRegister<LoginFormValues>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
}

interface Response {
  status: AuthStatus;
  userId: string;
}

export const useProviderLogin = (
  setVerifyType: (type: AuthStatus) => void,
  setLogin: (login: string) => void,
  token: string
): LoginHook => {
  const t = useTranslations('login');
  const tSchemas = useTranslations('schemas');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(tSchemas)),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      setLogin(data.login);
      const { data: res } = await axios.post<Response>(`/api/provider-auth/${token}`, data);
      return res
    },
    onSuccess: (data) => {
      setVerifyType(data.status);
    },
    onError: (error) => {
      alert(t('loginWrong'));
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return {
    errors,
    register,
    onSubmit: handleSubmit(onSubmit),
    isPending: loginMutation.isPending,
  };
}
