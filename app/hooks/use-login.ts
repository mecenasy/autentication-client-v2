import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { loginSchema } from '../components/schemas/schemas';
import { useTranslations } from 'next-intl';
import { BaseSyntheticEvent } from 'react';
import { useRouter } from '../components/navigation/navigation';
import { graphql } from '../gql';
import { useMutation } from '@apollo/client/react';
import { AuthStatus } from '../gql/graphql';

type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;

export interface LoginHook {
  errors: FieldErrors<LoginFormValues>;
  register: UseFormRegister<LoginFormValues>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
}

const LOGIN_MUTATION = graphql(`
  mutation Login($input: LoginType!) {
    loginUser(input: $input) {
      status
    }
  }
`);

export const useLogin = (setVerifyType: (type: AuthStatus) => void, setLogin: (login: string) => void): LoginHook => {
  const router = useRouter();
  const [loginUser, { loading }] = useMutation(LOGIN_MUTATION);
  const t = useTranslations('login');
  const tSchemas = useTranslations('schemas');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(tSchemas)),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLogin(data.email);

    try {
      const result = await loginUser({ variables: { input: data } });
      const status = result.data?.loginUser.status;

      if (status === AuthStatus.Login) {
        router.replace("/");
        return;
      } else if (status === AuthStatus.Logout) {
        alert(t('loginWrong'));
        return
      }

      setVerifyType(status as AuthStatus)
    } catch {
      alert(t('loginWrong'));
    }
  };



  return {
    errors,
    register,
    onSubmit: handleSubmit(onSubmit),
    isPending: loading,
  };
}
