import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/src/api/api';
import { useForm } from 'react-hook-form';
import { verificationSchema } from '../components/schemas/schemas';
import { useRouter } from '../components/navigation/navigation';
import { useTranslations } from 'next-intl';
import { AuthStatus } from '../gql/graphql';
import { graphql } from '../gql';
import { useMutation } from '@apollo/client/react';
import { ca } from 'zod/v4/locales';
import { useCallback } from 'react';

type VerificationFormValues = z.infer<ReturnType<typeof verificationSchema>>;

const getUrl = (type?: AuthStatus) => {
  switch (type) {
    case AuthStatus.Tfa:
      return '/api/auth/verify-tfa';
    case AuthStatus.Sms:
    case AuthStatus.Email:
      return '/api/auth/verify-otp';
    case AuthStatus.Provider2fa:
      return '/api/provider-auth/verify-tfa';
    case AuthStatus.ProviderSms:
      return '/api/provider-auth/verify-otp';
    default:
      return '';
  }
}
const VERIFY_MFA_MUTATION = graphql(`
  mutation VerifyMfa($input:  VerifyCodeType!) {
    verifyMfa(input: $input) {
      status
    }
  }
`);
const VERIFY_2FA_MUTATION = graphql(`
  mutation Verify2faCode($input: Verify2faCodeType!) {
    verify2faCode(input: $input) {
      status
    }
  }
`);

export const useVerify = (login: string, verifyType?: AuthStatus, callBack?: (status: AuthStatus) => void) => {
  const router = useRouter();
  const t = useTranslations('login');
  const tSchemas = useTranslations('schemas');
  const [verifyMfa, verifyMfaMeta] = useMutation(VERIFY_MFA_MUTATION);
  const [verify2fa, verify2faMeta] = useMutation(VERIFY_2FA_MUTATION);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema(tSchemas)),
  });

  const verify = useCallback(async (email: string, code: string) => {
    switch (verifyType) {
      case AuthStatus.Sms:
      case AuthStatus.Email: {
        const result = await verifyMfa({ variables: { input: { email, code: +code } } });
        return result.data?.verifyMfa;
      }
      case AuthStatus.Tfa: {
        const result = await verify2fa({ variables: { input: { email, code } } });
        return result.data?.verify2faCode;
      }
      default:
        return;
    }
  }, [verifyType, verify2fa, verifyMfa]);

  const onSubmit = async ({ code }: VerificationFormValues) => {
    try {
      const result = await verify(login, code)
      callBack?.(result?.status as AuthStatus)
      router.replace("/");
    } catch (error) {
      console.error("Verification failed:", error);
      alert(t("verifyWrong"));
    }
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending: verifyMfaMeta.loading || verify2faMeta.loading,
  };

}