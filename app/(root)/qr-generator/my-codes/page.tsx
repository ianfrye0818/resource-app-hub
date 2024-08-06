import { ApiRoutes } from '@/lib/api-routes';
import { BASE_API_URL } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import { QRCode as Code } from '@/lib/types';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { createServerAxios } from '@/api/serverAxios';
import { cookies } from 'next/headers';

const fetchCodes = async () => {
  const cookieStore = cookies();
  const serverAxios = createServerAxios(cookieStore);
  try {
    const { data } = await serverAxios.get<Code[]>(
      `${BASE_API_URL}${ApiRoutes.qrCodes.getAllCodes}`
    );
    return data;
  } catch (error) {
    console.error('Error fetching QR Codes', error);
    return [];
  }
};

export default async function MyQRCodesPage() {
  const qrCodes = await fetchCodes();

  console.log({ qrCodes });

  if (!qrCodes || qrCodes.length === 0) {
    return <div>No QR Codes found</div>;
  }

  return (
    <div className=''>
      <div className='py-6 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>My Saved QR Codes</h1>
        <Button asChild>
          <Link href={'/qr-generator'}>Add Code</Link>
        </Button>
      </div>
      <div className='flex flex-col gap-6'>
        {qrCodes.map((code, index) => (
          <Link
            key={code.id}
            href={`/qr-generator/result?qrCodeValue=${code.qrCode}`}
          >
            <div className='w-full p-3 shadow-md rounded-md flex gap-3 items-center'>
              {index + 1}
              {')'}
              <QRCode
                value={code.qrCode}
                size={30}
              />
              <p>{code.qrCode}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
