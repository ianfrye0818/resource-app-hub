'use client';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import { LogOutIcon } from 'lucide-react';
import { logout } from '@/actions/auth-actions';

export default function LogoutButton({
  children,
  variant = 'default',
}: {
  children?: React.ReactNode;
  variant?: 'ghost' | 'default';
}) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      size='sm'
      onClick={async () => {
        await logout();
        localStorage.clear();
        router.replace('/sign-in');
      }}
    >
      {children ? children : <LogOutIcon />}
    </Button>
  );
}
