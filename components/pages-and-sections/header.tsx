import Image from 'next/image';
import logo from '@/public/resource.jpeg';
import Link from 'next/link';
const Header = () => {
  return (
    <header className=' px-4 lg:px-6 h-[96px] flex items-center container mx-auto'>
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
    </header>
  );
};

export default Header;
