"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '@/app/components/Input';
import { useTranslations } from 'next-intl';
import { graphql } from '@/app/gql';
import { useMutation } from '@apollo/client/react';
import { GetConfigByIdQuery, Provider } from '@/app/gql/graphql';

const configSchema = (t: (key: string) => string) => z.object({
  id: z.string().optional(),
  name: z.string().min(1, t('nameIsRequired')),
  clientId: z.string().min(1, t('clientIdIsRequired')),
  secret: z.string().min(1, t('secretIsRequired')),
  callbackUrl: z.string().optional(),
  provider: z.nativeEnum(Provider),
  active: z.boolean(),
});


const CRATE_CONFIG_MUTATION = graphql(`
  mutation CreateConfig($input: CreateSocialConfigDto!) {
    createSocialConfig(input: $input) {
      id
      name
      clientId
      secret
      callbackUrl
      provider
      active
    }
  }
`);

const UPDATE_CONFIG_MUTATION = graphql(`
  mutation UpdateConfig($id: String!, $config: UpdateSocialConfigDto!) {
    updateSocialConfig(config: $config, id: $id) {      
      id
      name
      clientId
      secret
      callbackUrl
      provider
      active
    }
  }
`);

type ConfigFormValues = z.infer<ReturnType<typeof configSchema>>;

type NullToUndefined<T> = {
  [K in keyof T]: T[K] extends null ? undefined : T[K];
};
export function ConfigForm({ initialData }: { initialData?: NullToUndefined<GetConfigByIdQuery['getConfig']> }) {
  const initialValues: ConfigFormValues = {
    id: initialData?.id,
    name: initialData?.name ?? '',
    clientId: initialData?.clientId ?? '',
    secret: initialData?.secret ?? '',
    callbackUrl: initialData?.callbackUrl ?? '',
    provider: initialData?.provider ?? Provider.Google,
    active: initialData?.active ?? true,
  }

  const t = useTranslations('ConfigForm');
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ConfigFormValues>({
    values: initialValues,
    resolver: zodResolver(configSchema(t)),
    defaultValues: {
      name: '',
      clientId: '',
      secret: '',
      provider: Provider.Google,
      active: false,
    },
  });
  const [createSocialConfig, createMeta] = useMutation(CRATE_CONFIG_MUTATION, {
    refetchQueries: ['GetAllSocialConfig'],
  });
  const [updateSocialConfig, updateMeta] = useMutation(UPDATE_CONFIG_MUTATION, {
    refetchQueries: ['GetAllSocialConfig'],
  });

  const onSubmit = async (data: ConfigFormValues) => {
    try {
      if (initialData) {
        await updateSocialConfig({ variables: { id: initialData.id ?? '', config: data } })
      } else {
        await createSocialConfig({ variables: { input: data } })
      }
      reset();
    } catch (error) {

    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        id="name"
        label={t('name')}
        register={register}
        error={errors.name}
        autoComplete="off"
      />
      <Input
        id="clientId"
        label={t('clientId')}
        register={register}
        error={errors.clientId}
        autoComplete="off"
      />
      <Input
        id="secret"
        label={t('secret')}
        register={register}
        error={errors.secret}
        autoComplete="off"
      />
      <Input
        id="callbackUrl"
        label={t('callbackUrl')}
        register={register}
        error={errors.callbackUrl}
        autoComplete="off"
      />

      <div className="mb-4">
        <label htmlFor="provider" className="block text-white text-sm font-bold mb-2">
          {t('provider')}
        </label>
        <select
          id="provider"
          {...register('provider')}
          className="w-full h-10 px-3 bg-white border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.values(Provider).map((p) => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="active-toggle" className="text-white font-semibold">
          {t('active')}
        </label>
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="active-toggle"
                className="sr-only peer"
                checked={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                ref={field.ref}
                disabled={createMeta.loading || updateMeta.loading}
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={createMeta.loading || updateMeta.loading}
        className="w-full px-6 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500"
      >
        {createMeta.loading || updateMeta.loading ? t('saving') : t('saveConfiguration')}
      </button>
    </form>
  );
}
