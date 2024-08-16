import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return <section className='h-full w-full container mx-auto'>{children}</section>;
}
