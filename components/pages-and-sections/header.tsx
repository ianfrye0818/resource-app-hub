import Image from 'next/image';
import logo from '@/public/resource.jpeg';
import Link from 'next/link';
import LogoutButton from '../buttons-and-switches/logout-button';
import { Button } from '../ui/button';
const Header = () => {
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
      <LogoutButton>Logout</LogoutButton>
    </header>
  );
};

export default Header;
