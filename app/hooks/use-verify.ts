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
export const useVerify = (login: string, verifyType?: AuthStatus, callBack?: (status: AuthStatus) => void) => {
  const router = useRouter();
  const t = useTranslations('login');
  const tSchemas = useTranslations('schemas');
  const [verifyMfa, { loading }] = useMutation(VERIFY_MFA_MUTATION)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema(tSchemas)),
  });

  // const verification = useMutation1({
  //   mutationFn: async (data: VerificationFormValues) => {
  //     const { data: status } = await axios.post(getUrl(verifyType), { login, code: data.code });
  //     return status;
  //   },
  //   onSuccess: () => {
  //   },
  //   onError: (error) => {
  //   },
  // });

  const onSubmit = async ({ code }: VerificationFormValues) => {
    try {
      const result = await verifyMfa({ variables: { input: { email: login, code: +code } } })
      callBack?.(result.data?.verifyMfa.status as AuthStatus)
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
    isPending: loading,
  };

}