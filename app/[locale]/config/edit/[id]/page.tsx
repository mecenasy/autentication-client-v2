"use client";

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ConfigForm } from '@/app/components/config/config-form';
import { Config } from '@/app/components/config/config-list-item';
import axiosInstance from '@/src/api/api';
import AdminGuard from '@/app/components/guard/admin-guard';
import { useTranslations } from 'next-intl';
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';

const fetchConfigById = async (id: string): Promise<Config | undefined> => {
  const { data } = await axiosInstance.get(`/api/social-config/${id}`);
  return data;
};

export default function EditConfigPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const t = useTranslations('config')
  const { data: config, isError } = useQuery({
    queryKey: ['config', id],
    queryFn: () => fetchConfigById(id),
    enabled: !!id,
  });

  return (
    <AdminGuard url={'/config/list'}>
      <MainLoaderWrapper>
        <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
          <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-white text-center mb-8">
              {t('edit')}
            </h1>
            {isError && <p className="text-red-500 text-center">{t('error')}</p>}
            {config && (
              <ConfigForm initialData={config} />
            )}
          </main>
        </div>
      </MainLoaderWrapper>
    </AdminGuard>
  );
}