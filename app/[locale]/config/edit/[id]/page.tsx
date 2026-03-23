"use client";

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client/react';
import { ConfigForm } from '@/app/components/config/config-form';
import AdminGuard from '@/app/components/guard/admin-guard';
import { useTranslations } from 'next-intl';
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';
import { graphql } from '@/app/gql';


const GET_CONFIG_BY_ID_QUERY = graphql(`
  query GetConfigById($id: String!) {
    getConfig(id: $id) {
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
export default function EditConfigPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const t = useTranslations('config')
  const { data, error } = useQuery(GET_CONFIG_BY_ID_QUERY, {
    variables: { id },
    skip: !id,
  });
  const config = data?.getConfig;

  return (
    <AdminGuard url={'/config/list'}>
      <MainLoaderWrapper>
        <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
          <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-white text-center mb-8">
              {t('edit')}
            </h1>
            {error && <p className="text-red-500 text-center">{t('error')}</p>}
            {config && (
              <ConfigForm initialData={config} />
            )}
          </main>
        </div>
      </MainLoaderWrapper>
    </AdminGuard>
  );
}