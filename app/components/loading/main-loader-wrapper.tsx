'use client';

import { useState, ReactNode } from 'react';
import { MainLoader } from './main-loader';

interface BackendLoaderWrapperProps {
  children: ReactNode;
}

export const MainLoaderWrapper = ({ children }: BackendLoaderWrapperProps) => {
  const [loaderFinished, setLoaderFinished] = useState(false);

  const onComplete = () => setLoaderFinished(true);

  if (!loaderFinished) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-800 font-sans">
        <MainLoader onComplete={onComplete} />
      </div>
    );
  }

  return <>{children}</>;
};
