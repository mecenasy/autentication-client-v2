import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Providers from "./providers";
import Menu, { Github, MenuGuard } from '../components/menu/menu';
import { getMessages } from 'next-intl/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentication app",
  description: "This is a simple authentication app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <Providers locale={locale} messages={messages}>
          <MenuGuard>
            <Menu />
          </MenuGuard>
          {children}
          <MenuGuard>
            <Github />
          </MenuGuard>
        </Providers>
      </body>
    </html>
  );
}
