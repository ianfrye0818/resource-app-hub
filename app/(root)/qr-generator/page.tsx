'use client';
import clientAxios from '@/api/clientAxios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiRoutes } from '@/api/api-routes';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const QRGeneratorPage = () => {
  const router = useRouter();
  const [qrCodeValue, setQrCodeValue] = useState('');
  return (
    <div className='self-start h-full  w-full container mx-auto justify-center'>
      <Button asChild>
        <Link href={'/qr-generator/my-codes'}>My Codes</Link>
      </Button>
      <div className='w-full flex justify-center items-center flex-col gap-8'>
        <h1 className='text-2xl font-bold'>Enter Link Below to Generate QR Code</h1>
        <form
          className='flex flex-col gap-6 w-full max-w-[450px]'
          onSubmit={async (e) => {
            e.preventDefault();
            if (!qrCodeValue) return;
            await clientAxios.post<void>(ApiRoutes.qrCodes.createCode, { qrCode: qrCodeValue });
            router.push(`/qr-generator/result?qrCodeValue=${qrCodeValue}`);
          }}
        >
          <Input
            placeholder='Enter Link'
            onChange={(e) => setQrCodeValue(e.target.value)}
            value={qrCodeValue}
          />

          <Button>Generate Code</Button>
        </form>
      </div>
    </div>
  );
};

export default QRGeneratorPage;
