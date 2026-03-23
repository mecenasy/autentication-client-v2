import { changePasswordSchema } from '@/app/components/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from '../components/navigation/navigation';
import { useTranslations } from 'next-intl';
import { graphql } from '../gql';
import { useMutation } from '@apollo/client/react';

type ChangePasswordFormValues = z.infer<ReturnType<typeof changePasswordSchema>>;

const CHANGE_PASSWORD_MUTATION = graphql(`
  mutation ChangePassword($input: ChangePasswordType!) {
    changePassword(input: $input) {
      status
    }
  }
`);

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

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD_MUTATION);

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      await changePassword({
        variables: {
          input: {
            oldPassword: data.oldPassword,
            newPassword: data.password,
          }
        }
      });

      alert(t('correct'));
      router.replace("/");
    } catch {
      alert(t('error'));

    }
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isPending: loading,
  };

}