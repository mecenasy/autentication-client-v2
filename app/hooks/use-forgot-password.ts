import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "@/src/api/api";
import { forgotPasswordSchema } from '../components/schemas/schemas';
import { useTranslations } from 'next-intl';


type ForgotPasswordFormValues = z.infer<ReturnType<typeof forgotPasswordSchema>>;

export const useForgotPassword = () => {
  const t = useTranslations('password');
  const tSchemas = useTranslations('schemas');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema(tSchemas)),
  });

  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordFormValues) => {
      return axios.post("/api/auth/forgot-password", data);
    },
    onSuccess: () => {
      alert(t('reset'));
    },
    onError: (error: Error) => {
      console.error("Password reset request failed:", error);
      alert(t('reset'));
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    mutation.mutate(data);
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isPending: mutation.isPending,

  }
}
