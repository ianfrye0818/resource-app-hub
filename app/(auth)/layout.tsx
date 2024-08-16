interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return <section className='h-full w-full flex justify-center items-center'>{children}</section>;
}
