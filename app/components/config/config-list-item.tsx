"use client";

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Provider } from './config-form';
import axios from '@/src/api/api';
import { useTranslations } from 'next-intl';

export interface Config {
  id: string;
  name: string;
  provider: Provider;
  clientId: string;
  secret: string;
  callbackUrl: string;
  active: boolean;
}

interface ConfigListItemProps {
  config: Config;
}

const toggleActiveState = async (config: Config) => {
  const { data } = await axios.patch(`/api/social-config/${config.id}`)

  return { ...config, active: data.active };
};

export function ConfigListItem({ config }: ConfigListItemProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('config');

  const mutation = useMutation({
    mutationFn: () => toggleActiveState(config),
    onSuccess: (updatedConfig) => {
      queryClient.setQueryData(['configs'], (oldData: Config[] | undefined) => {
        return oldData ? oldData.map(c => c.id === updatedConfig.id ? updatedConfig : c) : [];
      });
    },
    onError: (error) => {
      console.error("Failed to update active state:", error);
    }
  });

  const handleToggle = () => {
    mutation.mutate();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div className='flex items-center gap-4'>
        <span className="font-bold text-white">{config.name}</span>
        <span className="text-sm text-gray-400">{config.provider}</span>
      </div>
      <div className="flex items-center gap-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={config.active}
            onChange={handleToggle}
            disabled={mutation.isPending}
          />
          <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-300">{mutation.isPending ? '...' : (config.active ? 'Active' : 'Inactive')}</span>
        </label>
        <Link href={`/config/edit/${config.provider}`} passHref>
          <button className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
            {t('edit')}
          </button>
        </Link>
      </div>
    </div>
  );
}
