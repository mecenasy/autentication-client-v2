"use client";
import { ConfigListItem } from '@/app/components/config/config-list-item';
import AdminGuard from '@/app/components/guard/admin-guard';
import Loading from '@/app/components/loading/loading';
import { useTranslations } from 'next-intl';
import { Link } from '@/app/components/navigation/navigation';
import { graphql } from '@/app/gql';
import { useQuery } from '@apollo/client/react';


const GET_SOCIAL_CONFIGS_MUTATION = graphql(`
  query GetAllSocialConfig {
    getAllConfig {
      configs {
        callbackUrl
        clientId
        id
        name
        provider
        secret
        active
      }
    } 
  }
`)
export default function ConfigListPage() {
  const t = useTranslations('config');
  const { data, loading, error } = useQuery(GET_SOCIAL_CONFIGS_MUTATION);
  const configs = data?.getAllConfig.configs;
  return (
    <AdminGuard url={'/config/list'}>
      <div className="flex min-h-screen items-start justify-center bg-gray-800 font-sans pt-10">
        <main className="w-full max-w-2xl p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg mt-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              {t('create')}
            </h1>
            <Link href="/config" passHref>
              <button
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {t('new')}
              </button>
            </Link>
          </div>

          {loading && <Loading />}
          {error && <p className="text-red-500 text-center">{t('error')}</p>}

          <div className="space-y-4">
            {configs?.map(config => (
              <ConfigListItem key={config.id} config={config} />
            ))}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
