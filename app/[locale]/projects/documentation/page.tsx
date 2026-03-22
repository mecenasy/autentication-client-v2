'use client';

import { DocumentationView } from '@/app/components/documentation/documentation-view';
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';

export default function DocumentationPage() {
  return (
    <MainLoaderWrapper>
      <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
        <main className="flex flex-col mb-16 mt-32 w-l max-w-4xl items-center justify-start p-8 bg-gray-900 rounded-lgshadow-lg">
          <DocumentationView />
        </main>
      </div>
    </MainLoaderWrapper>
  );
}
