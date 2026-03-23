import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../components/schemas/schemas';
import { useTranslations } from 'next-intl';
import { graphql } from '../gql';
import { useMutation, useQuery } from '@apollo/client/react';

export type ResetPasswordFormValues = z.infer<ReturnType<typeof resetPasswordSchema>>;

const RESET_PASSWORD_MUTATION = graphql(`
  mutation ResetPassword($input: ResetPasswordType!) {
    resetPassword(input: $input) {
      status
    }
  }
`);

const VERIFY_RESET_TOKEN_QUERY = graphql(`
  query VerifyToken($token: String!) {
    verifyToken (token: $token) {
      verify
      } 
    }
`);

export const useResetPassword = (token: string, setMessage: (message: string) => void) => {
  const t = useTranslations('password');
  const tSchemas = useTranslations('schemas');

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION);

  const { data, loading: isVerifying } = useQuery(VERIFY_RESET_TOKEN_QUERY, {
    variables: { token },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema(tSchemas)),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPassword({ variables: { input: { password: data.password, token } } });
      setMessage(t('resetSuccess'));
    } catch (error) {
      const message = error.response?.data?.message === 'TOKEN_EXPIRED'
        ? t('tokenExpired')
        : t('resetWrong');
      setMessage(message);
    }
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isPending: loading,
    isVerifying,
    tokenVerification: data?.verifyToken.verify,
  };
}

