'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const QRGeneratorPage = () => {
  const router = useRouter();
  const [qrCodeValue, setQrCodeValue] = useState('');
  return (
    <div className='w-full h-dvh flex flex-col gap-6 items-center justify-center'>
      <h1 className='text-2xl font-bold'>Enter Link Below to Generate QR Code</h1>
      <form
        className='flex flex-col gap-3 w-full max-w-[450px]'
        onSubmit={(e) => {
          e.preventDefault();
          if (!qrCodeValue) return;
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
  );
};

export default QRGeneratorPage;
