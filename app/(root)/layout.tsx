import { getCurrentUser } from '@/actions/auth-actions';
import { AuthProvider } from '@/contexts/AuthProvider';
import { redirect } from 'next/navigation';
import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getCurrentUser();
  if (!user) {
    throw redirect('/sign-in');
  }
  return <section>{children}</section>;
}
