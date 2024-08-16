import Image from 'next/image';
import logo from '@/public/resource.jpeg';
import Link from 'next/link';
import LogoutButton from '../buttons-and-switches/logout-button';
import { getCurrentUser } from '@/actions/auth-actions';
const Header = async () => {
  const user = await getCurrentUser();
  return (
    <header className=' px-4 lg:px-6 h-[96px] flex items-center justify-between container mx-auto'>
      <div className='flex items-center justify-center'>
        <Link href='/'>
          <Image
            src={logo}
            alt='The Resource'
            width={80}
            height={80}
          />
        </Link>
        <span className='sr-only'>The Resource</span>
      </div>

      {user && <LogoutButton>Logout</LogoutButton>}
    </header>
  );
};

export default Header;
