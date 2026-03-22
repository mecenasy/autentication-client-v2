"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '@/app/components/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/src/api/api';
import { useTranslations } from 'next-intl';

export enum Provider {
  microsoft = 'microsoft',
  google = 'google',
  facebook = 'facebook',
  apple = 'apple',
  github = 'github',
  linkedin = 'linkedin',
  twitter = 'twitter',
}

const configSchema = (t: (key: string) => string) => z.object({
  id: z.string().optional(),
  name: z.string().min(1, t('nameIsRequired')),
  clientId: z.string().min(1, t('clientIdIsRequired')),
  secret: z.string().min(1, t('secretIsRequired')),
  callbackUrl: z.string(),
  provider: z.nativeEnum(Provider),
  active: z.boolean(),
});

type ConfigFormValues = z.infer<ReturnType<typeof configSchema>>;

export function ConfigForm({ initialData }: { initialData?: ConfigFormValues }) {
  const queryClient = useQueryClient();
  const t = useTranslations('ConfigForm');
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ConfigFormValues>({
    values: initialData,
    resolver: zodResolver(configSchema(t)),
    defaultValues: {
      name: '',
      clientId: '',
      secret: '',
      callbackUrl: '',
      provider: Provider.google,
      active: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ConfigFormValues) => {
      if (initialData) {
        await axios.put(`/api/social-config/${initialData.id}`, data)
      } else {
        await axios.post('/api/social-config', data)
      }
      return { success: true, data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['config'] });
      reset();
    },
  });

  const onSubmit = (data: ConfigFormValues) => {
    mutation.mutate(data);
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
                disabled={mutation.isPending}
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full px-6 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500"
      >
        {mutation.isPending ? t('saving') : t('saveConfiguration')}
      </button>
    </form>
  );
}
