"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from '@/src/msal/msal.config';
import { NextIntlClientProvider } from 'next-intl';
import GraphQlProvider from '../GraphQlProvider/GraphGlProvider';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}

export default function Providers({ children, locale, messages }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [msalInstance] = useState(new PublicClientApplication(msalConfig));

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Warsaw">
      <MsalProvider instance={msalInstance}>
        <QueryClientProvider client={queryClient}>
          <GraphQlProvider>
            {children}
          </GraphQlProvider>
        </QueryClientProvider>
      </MsalProvider>
    </NextIntlClientProvider>
  );
}
