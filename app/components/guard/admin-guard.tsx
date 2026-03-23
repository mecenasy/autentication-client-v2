"use client";
import { useEffect, } from 'react';
import { useAuth } from '@/app/hooks/use-auth';
import { usePathname, useRouter } from '../navigation/navigation';

interface AdminGuardProps {
  children: React.ReactNode;
  url: string;
}

export default function AdminGuard({ url, children }: AdminGuardProps) {
  const { user, isLoading } = useAuth();
  const pathName = usePathname();

  const router = useRouter();

  useEffect(() => {
    if (isLoading) {

      if (pathName.includes(url) && typeof user?.admin === 'boolean' && !user?.admin) {
        router.replace('/');
      }
    }
  }, [isLoading, router, url, user, pathName]);

  if (!user?.admin) {
    return null;
  }

  return (<>{children}</>);
}