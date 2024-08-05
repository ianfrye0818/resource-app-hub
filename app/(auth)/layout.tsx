import { getCurrentUser } from '@/actions/auth-actions';
import { redirect } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser();
  if (user) {
    throw redirect('/');
  }
  return <section className='h-full w-full flex justify-center items-center'>{children}</section>;
}
