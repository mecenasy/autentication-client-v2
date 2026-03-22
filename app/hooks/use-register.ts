import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registrationSchema } from '../components/schemas/schemas';
import { useRouter } from '../components/navigation/navigation';
import { useTranslations } from 'next-intl';
import { graphql } from '../gql';
import { useMutation } from '@apollo/client/react';

type RegistrationFormValues = z.infer<ReturnType<typeof registrationSchema>>;

export const CREATE_USER_MUTATION = graphql(`
  mutation CreateUser($input: CreateUserType!) {
    createUser(input: $input) {
      id
      email
    }
  }
`);

export const useRegister = () => {
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION)
  const t = useTranslations('register');
  const tSchemas = useTranslations('schemas');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema(tSchemas)),
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      await createUser({ variables: { input: data } })
      router.replace("/");

    } catch {
      alert(t('registerWrong'));
    }
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isPending: loading,

  }
}