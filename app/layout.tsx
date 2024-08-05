import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/pages-and-sections/header';
import { AuthProvider } from '@/contexts/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Resource Apps',
  description: 'Apps specifically designed for The Resource Staffing Company by Ian Frye',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='h-dvh'>
          <Header />
          <div className='w-full h-[calc(100dvh-96px)]'>
            <AuthProvider>{children}</AuthProvider>
          </div>
        </main>
      </body>
      <Analytics />
    </html>
  );
}
