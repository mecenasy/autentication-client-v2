import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { forgotPasswordSchema } from '../components/schemas/schemas';
import { useTranslations } from 'next-intl';
import { graphql } from '../gql';
import { useMutation } from '@apollo/client/react';


type ForgotPasswordFormValues = z.infer<ReturnType<typeof forgotPasswordSchema>>;

const FORGOT_PASSWORD_MUTATION = graphql(`
  mutation ForgotPassword($input: ForgotPasswordType!) {
    forgotPassword(input: $input) {
      status
    }
  }
`);

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

  const [resetPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await resetPassword({ variables: { input: { email: data.login } } })
      alert(t('reset'));
    } catch (error) {
      console.error("Password reset request failed:", error);
      alert(t('reset'));
    }
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isPending: loading,

  }
}
