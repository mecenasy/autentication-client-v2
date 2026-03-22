import { changePasswordSchema } from '@/app/components/schemas/schemas';
import axios from '@/src/api/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from '../components/navigation/navigation';
import { useTranslations } from 'next-intl';

type ChangePasswordFormValues = z.infer<ReturnType<typeof changePasswordSchema>>;

export const useChangePassword = () => {
  const t = useTranslations('changePassword');
  const tSchemas = useTranslations('schemas');

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema(tSchemas)),
  });

  const mutation = useMutation({
    mutationFn: (data: ChangePasswordFormValues) => {
      return axios.post("/api/auth/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.password,
      });
    },
    onSuccess: () => {
      alert(t('correct'));
      router.replace("/");
    },
    onError: (error: Error) => {
      alert(t('error'));
    },
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    mutation.mutate(data);
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isPending: mutation.isPending,
  };

}