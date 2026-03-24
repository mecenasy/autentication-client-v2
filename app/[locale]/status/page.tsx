'use client'

import { useRouter } from '@/app/components/navigation/navigation';
import { graphql } from '@/app/gql';
import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';


const VERIFICATION_QUERY = graphql(`
  mutation Verification($token: String!) {
    verificationToken(token: $token) {
      status
    }
  }
`);

const Status = () => {
  const t = useTranslations('common');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verifyToken] = useMutation(VERIFICATION_QUERY);

  useEffect(() => {
    const verify = async () => {
      await verifyToken({
        variables: {
          token: searchParams.get('token') ?? ''
        }
      })
      router.replace('/');
    }
    verify();

  }, [router, searchParams, verifyToken])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
      <p className="text-white text-lg">{t('loading')}.</p>
    </div>
  )
};
const SuspenseStatus = () => (
  <Suspense fallback={null}>
    <Status />
  </Suspense>
)
export default SuspenseStatus;
